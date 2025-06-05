<?php
include_once 'Conexion.php';

class CrudMatriculas {
    public static function seleccionarTodos() {
        $conn = (new Conexion())->conectar();
        $sql = "SELECT m.id, m.fecha, 
                       e.ced_est, e.nom_est, e.ape_est, 
                       c.id_curso, c.nombre AS curso_nombre
                FROM matriculas m
                JOIN estudiantes e ON m.ced_est = e.ced_est
                JOIN cursos c ON m.id_curso = c.id_curso";
        $result = $conn->query($sql);
        $data = [];
        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
            $data[] = $row;
        }
        return $data;
    }

    public static function insertar($ced_est, $id_curso, $fecha) {
        $conn = (new Conexion())->conectar();
        $stmt = $conn->prepare("INSERT INTO matriculas (ced_est, id_curso, fecha) VALUES (?, ?, ?)");
        $stmt->bindValue(1, $ced_est, PDO::PARAM_STR);
        $stmt->bindValue(2, $id_curso, PDO::PARAM_INT);
        $stmt->bindValue(3, $fecha, PDO::PARAM_STR);
        return $stmt->execute();
    }

    public static function actualizar($id, $ced_est, $id_curso, $fecha) {
        $conn = (new Conexion())->conectar();
        $stmt = $conn->prepare("UPDATE matriculas SET ced_est = ?, id_curso = ?, fecha = ? WHERE id = ?");
        $stmt->bindValue(1, $ced_est, PDO::PARAM_STR);
        $stmt->bindValue(2, $id_curso, PDO::PARAM_INT);
        $stmt->bindValue(3, $fecha, PDO::PARAM_STR);
        $stmt->bindValue(4, $id, PDO::PARAM_INT);
        return $stmt->execute();
    }

    public static function eliminar($id) {
        $conn = (new Conexion())->conectar();
        $stmt = $conn->prepare("DELETE FROM matriculas WHERE id = ?");
        $stmt->bindValue(1, $id, PDO::PARAM_INT);
        return $stmt->execute();
    }
}
?>