const API_BASE = window.location.pathname.replace(/\/[^\/]+$/, '') + '/EstudianteServlet';
let url;
let selectedRow = null;

$(document).ready(() => {
    loadData();
});

function showToast(message, type = 'primary') {
    const toastEl = $('#toastMsg');
    $('#toastBody').text(message);
    toastEl.removeClass().addClass(`toast align-items-center text-white bg-${type} border-0`);
    new bootstrap.Toast(toastEl[0]).show();
}

function showConfirm(message, onConfirm) {
    $('#confirmMessage').text(message);
    const confirmBtn = $('#confirmBtn');
    const confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'));
    confirmBtn.off('click').on('click', () => {
        confirmModal.hide();
        onConfirm();
    });
    confirmModal.show();
}

function loadData() {
    $.ajax({
        url: API_BASE,
        type: "GET",
        dataType: "json",
        success: function(data) {
            const tbody = $('#userTableBody');
            tbody.empty();
            if (Array.isArray(data) && data.length > 0) {
                data.forEach(user => {
                    const row = $('<tr></tr>').click(() => selectRow(row, user));
                    row.append(`<td>${user.ced_est || ''}</td>`);
                    row.append(`<td>${user.nom_est || ''}</td>`);
                    row.append(`<td>${user.ape_est || ''}</td>`);
                    row.append(`<td>${user.dir_est || ''}</td>`);
                    row.append(`<td>${user.tel_est || ''}</td>`);
                    tbody.append(row);
                });
            } else {
                tbody.append('<tr><td colspan="5" class="text-center">No se encontraron estudiantes</td></tr>');
            }
        },
        error: function(xhr, status, error) {
            showToast('No se pudieron cargar los datos: ' + (xhr.responseText || error), 'danger');
        }
    });
}

function selectRow(rowElement, rowData) {
    $('#userTable tbody tr').removeClass('table-active');
    $(rowElement).addClass('table-active');
    selectedRow = rowData;
}

function newUser() {
    $('#fm')[0].reset();
    selectedRow = null;
    $('[name="ced_est"]').prop('disabled', false);
    url = API_BASE;
    $('#modalTitle').text('Nuevo Estudiante');
    new bootstrap.Modal(document.getElementById('userModal')).show();
}

function editUser() {
    if (!selectedRow) {
        showToast('Por favor selecciona un estudiante primero.', 'warning');
        return;
    }
    $('#fm')[0].reset();
    $('[name="ced_est"]').val(selectedRow.ced_est || '').prop('disabled', true);
    $('[name="nom_est"]').val(selectedRow.nom_est || '');
    $('[name="ape_est"]').val(selectedRow.ape_est || '');
    $('[name="dir_est"]').val(selectedRow.dir_est || '');
    $('[name="tel_est"]').val(selectedRow.tel_est || '');
    url = `${API_BASE}?ced_est=${encodeURIComponent(selectedRow.ced_est)}`;
    $('#modalTitle').text('Editar Estudiante');
    new bootstrap.Modal(document.getElementById('userModal')).show();
}

function saveUser() {
    $('[name="ced_est"]').prop('disabled', false); // para serializar
    const formData = $('#fm').serializeArray();
    const dataObj = {};
    formData.forEach(item => {
        dataObj[item.name] = item.value;
    });
    const isEdit = url.includes('ced_est=');
    if (isEdit) {
        $('[name="ced_est"]').prop('disabled', true);
    }
    const method = isEdit ? 'PUT' : 'POST';
    $.ajax({
        url: url,
        type: method,
        data: JSON.stringify(dataObj),
        contentType: 'application/json',
        success: function(response) {
            bootstrap.Modal.getInstance(document.getElementById('userModal')).hide();
            loadData();
            showToast(isEdit ? 'Estudiante actualizado exitosamente.' : 'Estudiante creado exitosamente.', 'success');
        },
        error: function(xhr, status, error) {
            let errorMessage = 'No se pudo guardar el estudiante';
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

function proxyDestroyUser() {
    if (!selectedRow) {
        showToast('Por favor selecciona un estudiante primero.', 'warning');
        return;
    }
    showConfirm('¿Estás seguro que deseas eliminar este estudiante?', () => {
        destroyUser(selectedRow.ced_est);
    });
}

function destroyUser(ced_est) {
    $.ajax({
        url: `${API_BASE}?ced_est=${encodeURIComponent(ced_est)}`,
        type: 'DELETE',
        success: function(response) {
            loadData();
            selectedRow = null;
            showToast('Estudiante eliminado exitosamente.', 'success');
        },
        error: function(xhr, status, error) {
            let errorMessage = 'No se pudo eliminar el estudiante';
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

function searchByCedula(cedula) {
    if (!cedula || !cedula.trim()) {
        showToast('Por favor ingresa una cédula para buscar.', 'warning');
        return;
    }
    $.ajax({
        url: API_BASE + '?ced_est=' + encodeURIComponent(cedula),
        type: "GET",
        dataType: "json",
        success: function(data) {
            const tbody = $('#userTableBody');
            tbody.empty();
            selectedRow = null;
            if (!data || (Array.isArray(data) && data.length === 0) || (typeof data === "object" && Object.keys(data).length === 0)) {
                tbody.append('<tr><td colspan="5" class="text-center">No se encontró un estudiante con esa cédula</td></tr>');
                return;
            }
            let students = [];
            if (Array.isArray(data)) {
                students = data;
            } else {
                students = [data];
            }
            students.forEach(user => {
                const row = $('<tr></tr>').click(() => selectRow(row, user));
                row.append(`<td>${user.ced_est || ''}</td>`);
                row.append(`<td>${user.nom_est || ''}</td>`);
                row.append(`<td>${user.ape_est || ''}</td>`);
                row.append(`<td>${user.dir_est || ''}</td>`);
                row.append(`<td>${user.tel_est || ''}</td>`);
                tbody.append(row);
            });
        },
        error: function(xhr, status, error) {
            const tbody = $('#userTableBody');
            tbody.empty();
            tbody.append('<tr><td colspan="5" class="text-center">No se encontró un estudiante con esa cédula</td></tr>');
            showToast('Error al buscar por cédula: ' + (xhr.responseText || error), 'danger');
        }
    });
}