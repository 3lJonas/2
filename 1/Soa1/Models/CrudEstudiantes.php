<?php
include_once 'Conexion.php';

class CrudEstudiantes {
    public static function seleccionarTodos() {
        $conn = (new Conexion())->conectar();
        $result = $conn->query("SELECT * FROM estudiantes");
        $data = [];
        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
            $data[] = $row;
        }
        return $data;
    }

    public static function insertar($ced_est, $nom_est, $ape_est, $tel_est, $dir_est) {
        $conn = (new Conexion())->conectar();
        $stmt = $conn->prepare("INSERT INTO estudiantes (ced_est, nom_est, ape_est, tel_est, dir_est) VALUES (?, ?, ?, ?, ?)");
        $stmt->bindValue(1, $ced_est, PDO::PARAM_STR);
        $stmt->bindValue(2, $nom_est, PDO::PARAM_STR);
        $stmt->bindValue(3, $ape_est, PDO::PARAM_STR);
        $stmt->bindValue(4, $tel_est, PDO::PARAM_STR);
        $stmt->bindValue(5, $dir_est, PDO::PARAM_STR);
        return $stmt->execute();
    }

    public static function actualizar($ced_est, $nom_est, $ape_est, $tel_est, $dir_est) {
        $conn = (new Conexion())->conectar();
        $stmt = $conn->prepare("UPDATE estudiantes SET nom_est = ?, ape_est = ?, tel_est = ?, dir_est = ? WHERE ced_est = ?");
        $stmt->bindValue(1, $nom_est, PDO::PARAM_STR);
        $stmt->bindValue(2, $ape_est, PDO::PARAM_STR);
        $stmt->bindValue(3, $tel_est, PDO::PARAM_STR);
        $stmt->bindValue(4, $dir_est, PDO::PARAM_STR);
        $stmt->bindValue(5, $ced_est, PDO::PARAM_STR);
        return $stmt->execute();
    }

    public static function eliminar($ced_est) {
        $conn = (new Conexion())->conectar();
        $stmt = $conn->prepare("DELETE FROM estudiantes WHERE ced_est = ?");
        $stmt->bindValue(1, $ced_est, PDO::PARAM_STR);
        return $stmt->execute();
    }
}
?>