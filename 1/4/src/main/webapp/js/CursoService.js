const API_CURSO = window.location.pathname.replace(/\/[^\/]+$/, '') + '/CursoServlet';
let urlCurso, selectedCurso = null;

$(document).ready(() => {
    loadCursos();
});

function loadCursos() {
    $.ajax({
        url: API_CURSO,
        type: "GET",
        dataType: "json",
        success: function(data) {
            const tbody = $('#cursoTableBody');
            tbody.empty();
            if (Array.isArray(data) && data.length > 0) {
                data.forEach(curso => {
                    const row = $('<tr></tr>').click(() => selectCursoRow(row, curso));
                    row.append(`<td>${curso.id_curso || ''}</td>`);
                    row.append(`<td>${curso.nombre || ''}</td>`);
                    row.append(`<td>${curso.creditos || ''}</td>`);
                    row.append(`<td>${curso.docente || ''}</td>`);
                    tbody.append(row);
                });
            } else {
                tbody.append('<tr><td colspan="4" class="text-center">No se encontraron cursos</td></tr>');
            }
        },
        error: function(xhr, status, error) {
            showToast('No se pudieron cargar los cursos: ' + (xhr.responseText || error), 'danger');
        }
    });
}
function selectCursoRow(rowElement, cursoData) {
    $('#cursoTable tbody tr').removeClass('table-active');
    $(rowElement).addClass('table-active');
    selectedCurso = cursoData;
}
function newCurso() {
    $('#fmCurso')[0].reset();
    selectedCurso = null;
    $('[name="id_curso"]').val('').prop('disabled', true);
    urlCurso = API_CURSO;
    $('#cursoModalTitle').text('Nuevo Curso');
    new bootstrap.Modal(document.getElementById('cursoModal')).show();
}
function editCurso() {
    if (!selectedCurso) {
        showToast('Por favor selecciona un curso primero.', 'warning');
        return;
    }
    $('#fmCurso')[0].reset();
    $('[name="id_curso"]').val(selectedCurso.id_curso || '').prop('disabled', true);
    $('[name="nombre"]').val(selectedCurso.nombre || '');
    $('[name="creditos"]').val(selectedCurso.creditos || '');
    $('[name="docente"]').val(selectedCurso.docente || '');
    urlCurso = `${API_CURSO}?id_curso=${encodeURIComponent(selectedCurso.id_curso)}`;
    $('#cursoModalTitle').text('Editar Curso');
    new bootstrap.Modal(document.getElementById('cursoModal')).show();
}
function saveCurso() {
    $('[name="id_curso"]').prop('disabled', false);
    const formData = $('#fmCurso').serializeArray();
    const dataObj = {};
    formData.forEach(item => { dataObj[item.name] = item.value; });
    const isEdit = urlCurso.includes('id_curso=');
    if (isEdit) { $('[name="id_curso"]').prop('disabled', true); dataObj.id_curso = selectedCurso.id_curso; }
    const method = isEdit ? 'PUT' : 'POST';
    $.ajax({
        url: urlCurso,
        type: method,
        data: JSON.stringify(dataObj),
        contentType: 'application/json',
        success: function(response) {
            bootstrap.Modal.getInstance(document.getElementById('cursoModal')).hide();
            loadCursos();
            showToast(isEdit ? 'Curso actualizado exitosamente.' : 'Curso creado exitosamente.', 'success');
        },
        error: function(xhr, status, error) {
            let errorMessage = 'No se pudo guardar el curso';
            if (xhr.responseText) {
                try {
                    const errorResponse = JSON.parse(xhr.responseText);
                    errorMessage += ': ' + (errorResponse.error || errorResponse.message || xhr.responseText);
                } catch (e) { errorMessage += ': ' + xhr.responseText; }
            }
            showToast(errorMessage, 'danger');
        }
    });
}
function proxyDestroyCurso() {
    if (!selectedCurso) {
        showToast('Por favor selecciona un curso primero.', 'warning');
        return;
    }
    if (confirm('¿Estás seguro que deseas eliminar este curso?')) {
        destroyCurso(selectedCurso.id_curso);
    }
}
function destroyCurso(id_curso) {
    $.ajax({
        url: `${API_CURSO}?id_curso=${encodeURIComponent(id_curso)}`,
        type: 'DELETE',
        success: function(response) {
            loadCursos();
            selectedCurso = null;
            showToast('Curso eliminado exitosamente.', 'success');
        },
        error: function(xhr, status, error) {
            let errorMessage = 'No se pudo eliminar el curso';
            if (xhr.responseText) {
                try {
                    const errorResponse = JSON.parse(xhr.responseText);
                    errorMessage += ': ' + (errorResponse.error || errorResponse.message || xhr.responseText);
                } catch (e) { errorMessage += ': ' + xhr.responseText; }
            }
            showToast(errorMessage, 'danger');
        }
    });
}
function searchCursoById(id) {
    if (!id || !id.trim()) {
        showToast('Por favor ingresa un ID para buscar.', 'warning');
        return;
    }
    $.ajax({
        url: API_CURSO + '?id_curso=' + encodeURIComponent(id),
        type: "GET",
        dataType: "json",
        success: function(data) {
            const tbody = $('#cursoTableBody');
            tbody.empty();
            selectedCurso = null;
            if (!data || (Array.isArray(data) && data.length === 0) || (typeof data === "object" && Object.keys(data).length === 0)) {
                tbody.append('<tr><td colspan="4" class="text-center">No se encontró un curso con ese ID</td></tr>');
                return;
            }
            let cursos = [];
            if (Array.isArray(data)) { cursos = data; } else { cursos = [data]; }
            cursos.forEach(curso => {
                const row = $('<tr></tr>').click(() => selectCursoRow(row, curso));
                row.append(`<td>${curso.id_curso || ''}</td>`);
                row.append(`<td>${curso.nombre || ''}</td>`);
                row.append(`<td>${curso.creditos || ''}</td>`);
                row.append(`<td>${curso.docente || ''}</td>`);
                tbody.append(row);
            });
        },
        error: function(xhr, status, error) {
            const tbody = $('#cursoTableBody');
            tbody.empty();
            tbody.append('<tr><td colspan="4" class="text-center">No se encontró un curso con ese ID</td></tr>');
            showToast('Error al buscar por ID: ' + (xhr.responseText || error), 'danger');
        }
    });
}