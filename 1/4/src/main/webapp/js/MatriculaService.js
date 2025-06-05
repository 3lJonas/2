const API_MATRICULA = window.location.pathname.replace(/\/[^\/]+$/, '') + '/MatriculaServlet';
let urlMatricula, selectedMatricula = null;

$(document).ready(() => {
    loadMatriculas();
});

function loadMatriculas() {
    $.ajax({
        url: API_MATRICULA,
        type: "GET",
        dataType: "json",
        success: function(data) {
            const tbody = $('#matriculaTableBody');
            tbody.empty();
            if (Array.isArray(data) && data.length > 0) {
                data.forEach(m => {
                    const row = $('<tr></tr>').click(() => selectMatriculaRow(row, m));
                    row.append(`<td>${m.id_matricula || ''}</td>`);
                    row.append(`<td>${m.ced_est || ''}</td>`);
                    row.append(`<td>${m.id_curso || ''}</td>`);
                    row.append(`<td>${m.fecha || ''}</td>`);
                    tbody.append(row);
                });
            } else {
                tbody.append('<tr><td colspan="4" class="text-center">No se encontraron matrículas</td></tr>');
            }
        },
        error: function(xhr, status, error) {
            showToast('No se pudieron cargar las matrículas: ' + (xhr.responseText || error), 'danger');
        }
    });
}
function selectMatriculaRow(rowElement, data) {
    $('#matriculaTable tbody tr').removeClass('table-active');
    $(rowElement).addClass('table-active');
    selectedMatricula = data;
}
function newMatricula() {
    $('#fmMatricula')[0].reset();
    selectedMatricula = null;
    $('[name="id_matricula"]').val('').prop('disabled', true);
    urlMatricula = API_MATRICULA;
    $('#matriculaModalTitle').text('Nueva Matrícula');
    new bootstrap.Modal(document.getElementById('matriculaModal')).show();
}
function editMatricula() {
    if (!selectedMatricula) {
        showToast('Por favor selecciona una matrícula primero.', 'warning');
        return;
    }
    $('#fmMatricula')[0].reset();
    $('[name="id_matricula"]').val(selectedMatricula.id_matricula || '').prop('disabled', true);
    $('[name="ced_est"]').val(selectedMatricula.ced_est || '');
    $('[name="id_curso"]').val(selectedMatricula.id_curso || '');
    $('[name="fecha"]').val(selectedMatricula.fecha || '');
    urlMatricula = `${API_MATRICULA}?id_matricula=${encodeURIComponent(selectedMatricula.id_matricula)}`;
    $('#matriculaModalTitle').text('Editar Matrícula');
    new bootstrap.Modal(document.getElementById('matriculaModal')).show();
}
function saveMatricula() {
    $('[name="id_matricula"]').prop('disabled', false);
    const formData = $('#fmMatricula').serializeArray();
    const dataObj = {};
    formData.forEach(item => { dataObj[item.name] = item.value; });
    const isEdit = urlMatricula.includes('id_matricula=');
    if (isEdit) { $('[name="id_matricula"]').prop('disabled', true); dataObj.id_matricula = selectedMatricula.id_matricula; }
    const method = isEdit ? 'PUT' : 'POST';
    $.ajax({
        url: urlMatricula,
        type: method,
        data: JSON.stringify(dataObj),
        contentType: 'application/json',
        success: function(response) {
            bootstrap.Modal.getInstance(document.getElementById('matriculaModal')).hide();
            loadMatriculas();
            showToast(isEdit ? 'Matrícula actualizada exitosamente.' : 'Matrícula creada exitosamente.', 'success');
        },
        error: function(xhr, status, error) {
            let errorMessage = 'No se pudo guardar la matrícula';
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
function proxyDestroyMatricula() {
    if (!selectedMatricula) {
        showToast('Por favor selecciona una matrícula primero.', 'warning');
        return;
    }
    if (confirm('¿Estás seguro que deseas eliminar esta matrícula?')) {
        destroyMatricula(selectedMatricula.id_matricula);
    }
}
function destroyMatricula(id_matricula) {
    $.ajax({
        url: `${API_MATRICULA}?id_matricula=${encodeURIComponent(id_matricula)}`,
        type: 'DELETE',
        success: function(response) {
            loadMatriculas();
            selectedMatricula = null;
            showToast('Matrícula eliminada exitosamente.', 'success');
        },
        error: function(xhr, status, error) {
            let errorMessage = 'No se pudo eliminar la matrícula';
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
function searchMatriculaById(id) {
    if (!id || !id.trim()) {
        showToast('Por favor ingresa un ID de matrícula para buscar.', 'warning');
        return;
    }
    $.ajax({
        url: API_MATRICULA + '?id_matricula=' + encodeURIComponent(id),
        type: "GET",
        dataType: "json",
        success: function(data) {
            const tbody = $('#matriculaTableBody');
            tbody.empty();
            selectedMatricula = null;
            if (!data || (Array.isArray(data) && data.length === 0) || (typeof data === "object" && Object.keys(data).length === 0)) {
                tbody.append('<tr><td colspan="4" class="text-center">No se encontró una matrícula con ese ID</td></tr>');
                return;
            }
            let matriculas = [];
            if (Array.isArray(data)) { matriculas = data; } else { matriculas = [data]; }
            matriculas.forEach(m => {
                const row = $('<tr></tr>').click(() => selectMatriculaRow(row, m));
                row.append(`<td>${m.id_matricula || ''}</td>`);
                row.append(`<td>${m.ced_est || ''}</td>`);
                row.append(`<td>${m.id_curso || ''}</td>`);
                row.append(`<td>${m.fecha || ''}</td>`);
                tbody.append(row);
            });
        },
        error: function(xhr, status, error) {
            const tbody = $('#matriculaTableBody');
            tbody.empty();
            tbody.append('<tr><td colspan="4" class="text-center">No se encontró una matrícula con ese ID</td></tr>');
            showToast('Error al buscar por ID: ' + (xhr.responseText || error), 'danger');
        }
    });
}