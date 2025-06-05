const API_MATRICULA = 'http://localhost/soa/Soa1/Controllers/ApiRest.php?tabla=matriculas';
let matriculaUrl;
let selectedMatricula = null;

function loadMatriculas() {
    $.ajax({
        url: API_MATRICULA,
        type: "GET",
        dataType: "json",
        success: function(data) {
            const tbody = $('#matriculaTableBody');
            tbody.empty();

            if (Array.isArray(data) && data.length > 0) {
                data.forEach(matricula => {
                    const row = $('<tr></tr>').click(() => selectMatriculaRow(row, matricula));
                    row.append(`<td>${matricula.id || ''}</td>`);
                    row.append(`<td>${matricula.fecha || ''}</td>`);
                    row.append(`<td>${matricula.ced_est || ''}</td>`);
                    row.append(`<td>${matricula.nom_est || ''} ${matricula.ape_est || ''}</td>`);
                    row.append(`<td>${matricula.curso_nombre || ''}</td>`);
                    tbody.append(row);
                });
            } else {
                tbody.append('<tr><td colspan="5" class="text-center">No matriculas found</td></tr>');
            }
        },
        error: function(xhr, status, error) {
            showToast('Failed to load matriculas: ' + (xhr.responseText || error), 'danger');
        }
    });
}

function selectMatriculaRow(rowElement, rowData) {
    $('#matriculaTable tbody tr').removeClass('table-active');
    $(rowElement).addClass('table-active');
    selectedMatricula = rowData;
}

function newMatricula() {
    $('#matriculaForm')[0].reset();
    selectedMatricula = null;
    $('[name="id"]').prop('disabled', true);
    matriculaUrl = API_MATRICULA;
    $('#matriculaModalTitle').text('New Matricula');
    new bootstrap.Modal(document.getElementById('matriculaModal')).show();
}

function editMatricula() {
    if (!selectedMatricula) {
        showToast('Please select a matricula first.', 'warning');
        return;
    }
    $('#matriculaForm')[0].reset();
    $('[name="id"]').val(selectedMatricula.id || '').prop('disabled', true);
    $('[name="ced_est"]').val(selectedMatricula.ced_est || '');
    $('[name="id_curso"]').val(selectedMatricula.id_curso || '');
    $('[name="fecha"]').val(selectedMatricula.fecha || '');
    matriculaUrl = `${API_MATRICULA}&id=${encodeURIComponent(selectedMatricula.id)}`;
    $('#matriculaModalTitle').text('Edit Matricula');
    new bootstrap.Modal(document.getElementById('matriculaModal')).show();
}

function saveMatricula() {
    const formData = $('#matriculaForm').serializeArray();
    const dataObj = {};
    formData.forEach(item => {
        dataObj[item.name] = item.value;
    });
    const isEdit = matriculaUrl.includes('id=');
    const method = isEdit ? 'PUT' : 'POST';

    $.ajax({
        url: matriculaUrl,
        type: method,
        data: JSON.stringify(dataObj),
        contentType: 'application/json',
        success: function(response) {
            bootstrap.Modal.getInstance(document.getElementById('matriculaModal')).hide();
            loadMatriculas();
            showToast(isEdit ? 'Matricula updated successfully.' : 'Matricula created successfully.', 'success');
        },
        error: function(xhr, status, error) {
            let errorMessage = 'Failed to save matricula';
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

function proxyDestroyMatricula() {
    if (!selectedMatricula) {
        showToast('Please select a matricula first.', 'warning');
        return;
    }
    showConfirm('Are you sure you want to delete this matricula?', () => {
        destroyMatricula(selectedMatricula.id);
    });
}

function destroyMatricula(id) {
    $.ajax({
        url: `${API_MATRICULA}&id=${encodeURIComponent(id)}`,
        type: 'DELETE',
        success: function(response) {
            loadMatriculas();
            selectedMatricula = null;
            showToast('Matricula deleted successfully.', 'success');
        },
        error: function(xhr, status, error) {
            let errorMessage = 'Failed to delete matricula';
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