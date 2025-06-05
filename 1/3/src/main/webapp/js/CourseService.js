const API_COURSE = 'http://localhost/soa/Soa1/Controllers/ApiRest.php?tabla=cursos';
let courseUrl;
let selectedCourse = null;

function loadCourses() {
    $.ajax({
        url: API_COURSE,
        type: "GET",
        dataType: "json",
        success: function(data) {
            const tbody = $('#courseTableBody');
            tbody.empty();

            if (Array.isArray(data) && data.length > 0) {
                data.forEach(course => {
                    const row = $('<tr></tr>').click(() => selectCourseRow(row, course));
                    row.append(`<td>${course.id_curso || ''}</td>`);
                    row.append(`<td>${course.nombre || ''}</td>`);
                    row.append(`<td>${course.descripcion || ''}</td>`);
                    tbody.append(row);
                });
            } else {
                tbody.append('<tr><td colspan="3" class="text-center">No courses found</td></tr>');
            }
        },
        error: function(xhr, status, error) {
            showToast('Failed to load courses: ' + (xhr.responseText || error), 'danger');
        }
    });
}

function selectCourseRow(rowElement, rowData) {
    $('#courseTable tbody tr').removeClass('table-active');
    $(rowElement).addClass('table-active');
    selectedCourse = rowData;
}

function newCourse() {
    $('#courseForm')[0].reset();
    selectedCourse = null;
    $('[name="id_curso"]').prop('disabled', true);
    courseUrl = API_COURSE;
    $('#courseModalTitle').text('New Course');
    new bootstrap.Modal(document.getElementById('courseModal')).show();
}

function editCourse() {
    if (!selectedCourse) {
        showToast('Please select a course first.', 'warning');
        return;
    }
    $('#courseForm')[0].reset();
    $('[name="id_curso"]').val(selectedCourse.id_curso || '').prop('disabled', true);
    $('[name="nombre"]').val(selectedCourse.nombre || '');
    $('[name="descripcion"]').val(selectedCourse.descripcion || '');
    courseUrl = `${API_COURSE}&id_curso=${encodeURIComponent(selectedCourse.id_curso)}`;
    $('#courseModalTitle').text('Edit Course');
    new bootstrap.Modal(document.getElementById('courseModal')).show();
}

function saveCourse() {
    const formData = $('#courseForm').serializeArray();
    const dataObj = {};
    formData.forEach(item => {
        dataObj[item.name] = item.value;
    });
    const isEdit = courseUrl.includes('id_curso=');
    const method = isEdit ? 'PUT' : 'POST';

    $.ajax({
        url: courseUrl,
        type: method,
        data: JSON.stringify(dataObj),
        contentType: 'application/json',
        success: function(response) {
            bootstrap.Modal.getInstance(document.getElementById('courseModal')).hide();
            loadCourses();
            showToast(isEdit ? 'Course updated successfully.' : 'Course created successfully.', 'success');
        },
        error: function(xhr, status, error) {
            let errorMessage = 'Failed to save course';
            if (xhr.responseText) {
                try {
                    const errorResponse = JSON.parse(xhr.responseText);
                    errorMessage += ': ' + (errorResponse.error || errorResponse.message || xhr.responseText);
                } catch (e) {
                    errorMessage += ': ' + xhr.responseText;
                }
            }
            showToast(errorMessage, 'danger');
        }
    });
}

function proxyDestroyCourse() {
    if (!selectedCourse) {
        showToast('Please select a course first.', 'warning');
        return;
    }
    showConfirm('Are you sure you want to delete this course?', () => {
        destroyCourse(selectedCourse.id_curso);
    });
}

function destroyCourse(id_curso) {
    $.ajax({
        url: `${API_COURSE}&id_curso=${encodeURIComponent(id_curso)}`,
        type: 'DELETE',
        success: function(response) {
            loadCourses();
            selectedCourse = null;
            showToast('Course deleted successfully.', 'success');
        },
        error: function(xhr, status, error) {
            let errorMessage = 'Failed to delete course';
            if (xhr.responseText) {
                try {
                    const errorResponse = JSON.parse(xhr.responseText);
                    errorMessage += ': ' + (errorResponse.error || errorResponse.message || xhr.responseText);
                } catch (e) {
                    errorMessage += ': ' + xhr.responseText;
                }
            }
            showToast(errorMessage, 'danger');
        }
    });
}