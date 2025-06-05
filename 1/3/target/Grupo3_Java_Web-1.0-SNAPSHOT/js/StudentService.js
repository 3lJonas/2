/*const API_BASE = 'http://localhost/soa/SOA/Controllers/ApiRest.php';
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
                tbody.append('<tr><td colspan="5" class="text-center">No students found</td></tr>');
            }
        },
        error: function(xhr, status, error) {
            console.error('Error loading data:', {xhr, status, error});
            showToast('Failed to load data: ' + (xhr.responseText || error), 'danger');
        }
    });
}

function selectRow(rowElement, rowData) {
    $('#userTable tbody tr').removeClass('table-active');
    $(rowElement).addClass('table-active');
    selectedRow = rowData;
    console.log('Selected row:', selectedRow);
}

function newUser() {
    $('#fm')[0].reset();
    selectedRow = null;
    $('[name="ced_est"]').prop('disabled', false);

    url = API_BASE;
    $('#modalTitle').text('New Student');
    new bootstrap.Modal(document.getElementById('userModal')).show();
}

function editUser() {
    if (!selectedRow) {
        showToast('Please select a student first.', 'warning');
        return;
    }

    $('#fm')[0].reset();

    // Mapear los datos del usuario seleccionado a los campos del formulario
    $('[name="ced_est"]').val(selectedRow.ced_est || '');
    $('[name="nom_est"]').val(selectedRow.nom_est || '');
    $('[name="ape_est"]').val(selectedRow.ape_est || '');
    $('[name="dir_est"]').val(selectedRow.dir_est || '');
    $('[name="tel_est"]').val(selectedRow.tel_est || '');

    $('[name="ced_est"]').prop('disabled', true);

    url = `${API_BASE}?ced_est=${encodeURIComponent(selectedRow.ced_est)}`;
    $('#modalTitle').text('Edit Student');
    new bootstrap.Modal(document.getElementById('userModal')).show();
}

function saveUser() {
    const formData = $('#fm').serializeArray();
    const dataObj = {};

    formData.forEach(item => {
        dataObj[item.name] = item.value;
    });

    // Si el HTML tiene "nom_esr" pero el API espera "nom_est"
    if (dataObj['nom_esr']) {
        dataObj['nom_est'] = dataObj['nom_esr'];
        delete dataObj['nom_esr'];
    }

    console.log('Data to send:', dataObj);

    const isEdit = url.includes('ced_est=');
    const method = isEdit ? 'PUT' : 'POST';

    $.ajax({
        url: url,
        type: method,
        data: JSON.stringify(dataObj),
        contentType: 'application/json',
        success: function(response) {
            console.log('Save response:', response);
            bootstrap.Modal.getInstance(document.getElementById('userModal')).hide();
            loadData();
            showToast(isEdit ? 'Student updated successfully.' : 'Student created successfully.', 'success');
        },
        error: function(xhr, status, error) {
            console.error('Save error:', {xhr, status, error});
            let errorMessage = 'Failed to save student';
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
        showToast('Please select a student first.', 'warning');
        return;
    }
    showConfirm('Are you sure you want to delete this student?', () => {
        destroyUser(selectedRow.ced_est);
    });
}

function destroyUser(ced_est) {
    $.ajax({
        url: `${API_BASE}?ced_est=${encodeURIComponent(ced_est)}`,
        type: 'DELETE',
        success: function(response) {
            console.log('Delete response:', response);
            loadData();
            selectedRow = null; // Limpiar selección
            showToast('Student deleted successfully.', 'success');
        },
        error: function(xhr, status, error) {
            console.error('Delete error:', {xhr, status, error});
            let errorMessage = 'Failed to delete student';
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
}*/
const API_BASE = 'http://localhost/soa/Soa1/Controllers/ApiRest.php?tabla=estudiantes';
let url;
let selectedRow = null;

$(document).ready(() => {
    loadData();
});

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
                tbody.append('<tr><td colspan="5" class="text-center">No students found</td></tr>');
            }
        },
        error: function(xhr, status, error) {
            showToast('Failed to load data: ' + (xhr.responseText || error), 'danger');
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
    $('#modalTitle').text('New Student');
    new bootstrap.Modal(document.getElementById('userModal')).show();
}

function editUser() {
    if (!selectedRow) {
        showToast('Please select a student first.', 'warning');
        return;
    }

    $('#fm')[0].reset();

    $('[name="ced_est"]').val(selectedRow.ced_est || '');
    $('[name="nom_est"]').val(selectedRow.nom_est || '');
    $('[name="ape_est"]').val(selectedRow.ape_est || '');
    $('[name="dir_est"]').val(selectedRow.dir_est || '');
    $('[name="tel_est"]').val(selectedRow.tel_est || '');

    $('[name="ced_est"]').prop('disabled', true);

    url = `${API_BASE}&ced_est=${encodeURIComponent(selectedRow.ced_est)}`;
    $('#modalTitle').text('Edit Student');
    new bootstrap.Modal(document.getElementById('userModal')).show();
}

function saveUser() {
    const formData = $('#fm').serializeArray();
    const dataObj = {};

    formData.forEach(item => {
        dataObj[item.name] = item.value;
    });

    const isEdit = url.includes('ced_est=');
    const method = isEdit ? 'PUT' : 'POST';

    $.ajax({
        url: url,
        type: method,
        data: JSON.stringify(dataObj),
        contentType: 'application/json',
        success: function(response) {
            bootstrap.Modal.getInstance(document.getElementById('userModal')).hide();
            loadData();
            showToast(isEdit ? 'Student updated successfully.' : 'Student created successfully.', 'success');
        },
        error: function(xhr, status, error) {
            let errorMessage = 'Failed to save student';
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
        showToast('Please select a student first.', 'warning');
        return;
    }
    showConfirm('Are you sure you want to delete this student?', () => {
        destroyUser(selectedRow.ced_est);
    });
}

function destroyUser(ced_est) {
    $.ajax({
        url: `${API_BASE}&ced_est=${encodeURIComponent(ced_est)}`,
        type: 'DELETE',
        success: function(response) {
            loadData();
            selectedRow = null;
            showToast('Student deleted successfully.', 'success');
        },
        error: function(xhr, status, error) {
            let errorMessage = 'Failed to delete student';
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

// showToast y showConfirm deben ser globales para todos los servicios (puedes ponerlos aquí o en un archivo utilitario)
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