<?php
include_once 'Conexion.php';

class CrudCursos {
    public static function seleccionarTodos() {
        $conn = (new Conexion())->conectar();
        $result = $conn->query("SELECT * FROM cursos");
        $data = [];
        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
            $data[] = $row;
        }
        return $data;
    }

    public static function insertar($nombre, $descripcion) {
        $conn = (new Conexion())->conectar();
        $stmt = $conn->prepare("INSERT INTO cursos (nombre, descripcion) VALUES (?, ?)");
        $stmt->bindValue(1, $nombre, PDO::PARAM_STR);
        $stmt->bindValue(2, $descripcion, PDO::PARAM_STR);
        return $stmt->execute();
    }

    public static function actualizar($id_curso, $nombre, $descripcion) {
        $conn = (new Conexion())->conectar();
        $stmt = $conn->prepare("UPDATE cursos SET nombre = ?, descripcion = ? WHERE id_curso = ?");
        $stmt->bindValue(1, $nombre, PDO::PARAM_STR);
        $stmt->bindValue(2, $descripcion, PDO::PARAM_STR);
        $stmt->bindValue(3, $id_curso, PDO::PARAM_INT);
        return $stmt->execute();
    }

    public static function eliminar($id_curso) {
        $conn = (new Conexion())->conectar();
        $stmt = $conn->prepare("DELETE FROM cursos WHERE id_curso = ?");
        $stmt->bindValue(1, $id_curso, PDO::PARAM_INT);
        return $stmt->execute();
    }
}
?>