<?php
// Mostrar errores para depuración (elimina o desactiva en producción)
ini_set('display_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Determina la tabla a trabajar según query (?tabla=estudiantes/cursos/matriculas)
$tabla = $_GET['tabla'] ?? 'estudiantes';
$method = $_SERVER['REQUEST_METHOD'];

// Para simular PUT o DELETE con POST y ?_method=PUT
if ($method == 'POST' && isset($_GET['_method'])) {
    $method = strtoupper($_GET['_method']);
}

// Leer JSON crudo del body para POST, PUT y DELETE
$input = json_decode(file_get_contents("php://input"), true);

switch ($tabla) {
    case 'estudiantes':
        include_once '../Models/CrudEstudiantes.php';
        $crud = 'CrudEstudiantes';
        break;
    case 'cursos':
        include_once '../Models/CrudCursos.php';
        $crud = 'CrudCursos';
        break;
    case 'matriculas':
        include_once '../Models/CrudMatriculas.php';
        $crud = 'CrudMatriculas';
        break;
    default:
        http_response_code(400);
        echo json_encode(["error" => "Tabla no válida"]);
        exit;
}

// Rutas de la API para cada método y tabla
switch ($method) {
    case 'GET':
        // Estudiantes: ?tabla=estudiantes
        // Cursos: ?tabla=cursos
        // Matriculas: ?tabla=matriculas
        echo json_encode($crud::seleccionarTodos());
        break;

    case 'POST':
        // INSERT
        if ($tabla == 'estudiantes') {
            $ok = $crud::insertar(
                $input['ced_est'] ?? '',
                $input['nom_est'] ?? '',
                $input['ape_est'] ?? '',
                $input['tel_est'] ?? '',
                $input['dir_est'] ?? ''
            );
            echo json_encode(["success" => $ok]);
        } elseif ($tabla == 'cursos') {
            $ok = $crud::insertar(
                $input['nombre'] ?? '',
                $input['descripcion'] ?? ''
            );
            echo json_encode(["success" => $ok]);
        } elseif ($tabla == 'matriculas') {
            $ok = $crud::insertar(
                $input['ced_est'] ?? '',
                $input['id_curso'] ?? '',
                $input['fecha'] ?? date('Y-m-d')
            );
            echo json_encode(["success" => $ok]);
        }
        break;

    case 'PUT':
        // UPDATE
        parse_str($_SERVER['QUERY_STRING'] ?? '', $queryVars);
        if ($tabla == 'estudiantes') {
            $ok = $crud::actualizar(
                $queryVars['ced_est'] ?? $input['ced_est'] ?? '',
                $input['nom_est'] ?? '',
                $input['ape_est'] ?? '',
                $input['tel_est'] ?? '',
                $input['dir_est'] ?? ''
            );
            echo json_encode(["success" => $ok]);
        } elseif ($tabla == 'cursos') {
            $ok = $crud::actualizar(
                $queryVars['id_curso'] ?? $input['id_curso'] ?? '',
                $input['nombre'] ?? '',
                $input['descripcion'] ?? ''
            );
            echo json_encode(["success" => $ok]);
        } elseif ($tabla == 'matriculas') {
            $ok = $crud::actualizar(
                $queryVars['id'] ?? $input['id'] ?? '',
                $input['ced_est'] ?? '',
                $input['id_curso'] ?? '',
                $input['fecha'] ?? date('Y-m-d')
            );
            echo json_encode(["success" => $ok]);
        }
        break;

    case 'DELETE':
        // DELETE
        parse_str($_SERVER['QUERY_STRING'] ?? '', $queryVars);
        if ($tabla == 'estudiantes') {
            $ok = $crud::eliminar($queryVars['ced_est'] ?? $input['ced_est'] ?? '');
            echo json_encode(["success" => $ok]);
        } elseif ($tabla == 'cursos') {
            $ok = $crud::eliminar($queryVars['id_curso'] ?? $input['id_curso'] ?? '');
            echo json_encode(["success" => $ok]);
        } elseif ($tabla == 'matriculas') {
            $ok = $crud::eliminar($queryVars['id'] ?? $input['id'] ?? '');
            echo json_encode(["success" => $ok]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método no permitido']);
        break;
}
?>