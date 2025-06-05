<!--
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>xdd</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="./js/StudentService.js"></script>
</head>
<body class="p-4">
    <div class="container">
        <h2 class="mb-4">Students</h2>
        <div class="mb-3">
            <button class="btn btn-primary" onclick="newUser()">New User</button>
            <button class="btn btn-success" onclick="editUser()">Edit User</button>
            <button class="btn btn-danger" onclick="proxyDestroyUser()">Remove User</button>
        </div>
        
        <table class="table table-hover " id="userTable">
            <thead >
                <tr>
                    <th>Cedula Estudiante</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                </tr>
            </thead>
            <tbody id="userTableBody"></tbody>
        </table>
    </div>
    
    <div class="modal fade" id="userModal" tabindex="-1" aria-labelledby="modalTitle" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <form id="fm">
              <div class="modal-header">
                <h5 class="modal-title" id="modalTitle">User Info</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label">Cedula</label>
                        <input type="text" name="ced_est" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">First Name</label>
                        <input type="text" name="nom_est" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Last Name</label>
                        <input type="text" name="ape_est" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Telephone</label>
                        <input type="text" name="tel_est" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Address</label>
                        <input type="text" name="dir_est" class="form-control" required>
                    </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-success" onclick="saveUser()">Save</button>
              </div>
          </form>
        </div>
      </div>
    </div>

    
    <div class="modal fade" id="confirmModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Confirm</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body" id="confirmMessage">Are you sure?</div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" id="confirmBtn" class="btn btn-danger">Yes, Delete</button>
                </div>
            </div>
        </div>
    </div>    

    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 1055">
        <div id="toastMsg" class="toast align-items-center text-white bg-primary border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body" id="toastBody"></div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    </div>
</body>
</html>

-->
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Gestión Académica</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Asegúrate que estos scripts están en la carpeta js/ y con estos nombres -->
    <script src="./js/StudentService.js"></script>
    <script src="./js/CourseService.js"></script>
    <script src="./js/MatriculaService.js"></script>
</head>
<body class="p-4">
<div class="container">
    <h2 class="mb-4">Gestión Académica</h2>
    <ul class="nav nav-tabs mb-3" id="mainTabs" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="students-tab" data-bs-toggle="tab" data-bs-target="#students" type="button" role="tab">Estudiantes</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="courses-tab" data-bs-toggle="tab" data-bs-target="#courses" type="button" role="tab">Cursos</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="matriculas-tab" data-bs-toggle="tab" data-bs-target="#matriculas" type="button" role="tab">Matrículas</button>
        </li>
    </ul>
    <div class="tab-content" id="mainTabsContent">
        <!-- Estudiantes -->
        <div class="tab-pane fade show active" id="students" role="tabpanel">
            <div class="mb-3">
                <button class="btn btn-primary" onclick="newUser()">Nuevo Estudiante</button>
                <button class="btn btn-success" onclick="editUser()">Editar</button>
                <button class="btn btn-danger" onclick="proxyDestroyUser()">Eliminar</button>
            </div>
            <table class="table table-hover" id="userTable">
                <thead>
                <tr>
                    <th>Cédula</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Dirección</th>
                    <th>Teléfono</th>
                </tr>
                </thead>
                <tbody id="userTableBody"></tbody>
            </table>
        </div>
        <!-- Cursos -->
        <div class="tab-pane fade" id="courses" role="tabpanel">
            <div class="mb-3">
                <button class="btn btn-primary" onclick="newCourse()">Nuevo Curso</button>
                <button class="btn btn-success" onclick="editCourse()">Editar</button>
                <button class="btn btn-danger" onclick="proxyDestroyCourse()">Eliminar</button>
            </div>
            <table class="table table-hover" id="courseTable">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                </tr>
                </thead>
                <tbody id="courseTableBody"></tbody>
            </table>
        </div>
        <!-- Matrículas -->
        <div class="tab-pane fade" id="matriculas" role="tabpanel">
            <div class="mb-3">
                <button class="btn btn-primary" onclick="newMatricula()">Nueva Matrícula</button>
                <button class="btn btn-success" onclick="editMatricula()">Editar</button>
                <button class="btn btn-danger" onclick="proxyDestroyMatricula()">Eliminar</button>
            </div>
            <table class="table table-hover" id="matriculaTable">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Fecha</th>
                    <th>Cédula Estudiante</th>
                    <th>Nombre Estudiante</th>
                    <th>Curso</th>
                </tr>
                </thead>
                <tbody id="matriculaTableBody"></tbody>
            </table>
        </div>
    </div>
</div>

<!-- Modal Estudiantes -->
<div class="modal fade" id="userModal" tabindex="-1" aria-labelledby="modalTitle" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <form id="fm">
          <div class="modal-header">
            <h5 class="modal-title" id="modalTitle">Datos del Estudiante</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
                <div class="mb-3">
                    <label class="form-label">Cédula</label>
                    <input type="text" name="ced_est" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">Nombre</label>
                    <input type="text" name="nom_est" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">Apellido</label>
                    <input type="text" name="ape_est" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">Teléfono</label>
                    <input type="text" name="tel_est" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">Dirección</label>
                    <input type="text" name="dir_est" class="form-control" required>
                </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-success" onclick="saveUser()">Guardar</button>
          </div>
      </form>
    </div>
  </div>
</div>

<!-- Modal Cursos -->
<div class="modal fade" id="courseModal" tabindex="-1" aria-labelledby="courseModalTitle" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <form id="courseForm">
          <div class="modal-header">
            <h5 class="modal-title" id="courseModalTitle">Datos del Curso</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
                <div class="mb-3">
                    <label class="form-label">ID</label>
                    <input type="text" name="id_curso" class="form-control" disabled>
                </div>
                <div class="mb-3">
                    <label class="form-label">Nombre</label>
                    <input type="text" name="nombre" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">Descripción</label>
                    <textarea name="descripcion" class="form-control" required></textarea>
                </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-success" onclick="saveCourse()">Guardar</button>
          </div>
      </form>
    </div>
  </div>
</div>

<!-- Modal Matrículas -->
<div class="modal fade" id="matriculaModal" tabindex="-1" aria-labelledby="matriculaModalTitle" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <form id="matriculaForm">
          <div class="modal-header">
            <h5 class="modal-title" id="matriculaModalTitle">Datos de la Matrícula</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
                <div class="mb-3">
                    <label class="form-label">ID Matrícula</label>
                    <input type="text" name="id" class="form-control" disabled>
                </div>
                <div class="mb-3">
                    <label class="form-label">Cédula Estudiante</label>
                    <input type="text" name="ced_est" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">ID Curso</label>
                    <input type="text" name="id_curso" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">Fecha</label>
                    <input type="date" name="fecha" class="form-control" required>
                </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-success" onclick="saveMatricula()">Guardar</button>
          </div>
      </form>
    </div>
  </div>
</div>

<!-- Modal Confirmación -->
<div class="modal fade" id="confirmModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Confirmar</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body" id="confirmMessage">¿Estás seguro?</div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" id="confirmBtn" class="btn btn-danger">Sí, Eliminar</button>
            </div>
        </div>
    </div>
</div>

<div class="position-fixed bottom-0 end-0 p-3" style="z-index: 1055">
    <div id="toastMsg" class="toast align-items-center text-white bg-primary border-0" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
            <div class="toast-body" id="toastBody"></div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    </div>
</div>

<script>
$(function() {
    // Cargar estudiantes por defecto
    loadData();
    $('#students-tab').on('shown.bs.tab', loadData);
    $('#courses-tab').on('shown.bs.tab', loadCourses);
    $('#matriculas-tab').on('shown.bs.tab', loadMatriculas);
});
</script>
</body>
</html>