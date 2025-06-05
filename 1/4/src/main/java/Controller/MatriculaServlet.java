/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Controller;

/**
 *
 * @author ASUS GAMER
 */
import com.google.gson.Gson;
import Model.Matricula;
import util.Conexion;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import javax.servlet.ServletException;
import java.io.*;
import java.sql.*;
import java.util.*;

@WebServlet(name = "MatriculaServlet", urlPatterns = {"/MatriculaServlet"})
public class MatriculaServlet extends HttpServlet {
    private final Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        String id = req.getParameter("id_matricula");
        PrintWriter out = res.getWriter();

        try (Connection conn = Conexion.getConnection()) {
            if (id != null && !id.isEmpty()) {
                String sql = "SELECT * FROM matriculas WHERE id_matricula = ?";
                try (PreparedStatement ps = conn.prepareStatement(sql)) {
                    ps.setInt(1, Integer.parseInt(id));
                    try (ResultSet rs = ps.executeQuery()) {
                        if (rs.next()) {
                            Matricula m = new Matricula(
                                rs.getInt("id_matricula"),
                                rs.getString("ced_est"),
                                rs.getInt("id_curso"),
                                rs.getString("fecha")
                            );
                            out.write(gson.toJson(m));
                        } else {
                            out.write("{}");
                        }
                    }
                }
            } else {
                List<Matricula> lista = new ArrayList<>();
                String sql = "SELECT * FROM matriculas";
                try (PreparedStatement ps = conn.prepareStatement(sql);
                     ResultSet rs = ps.executeQuery()) {
                    while (rs.next()) {
                        Matricula m = new Matricula(
                            rs.getInt("id_matricula"),
                            rs.getString("ced_est"),
                            rs.getInt("id_curso"),
                            rs.getString("fecha")
                        );
                        lista.add(m);
                    }
                }
                out.write(gson.toJson(lista));
            }
        } catch (Exception e) {
            e.printStackTrace();
            out.write("{\"error\":\"" + e.getMessage() + "\"}");
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        Matricula matricula = gson.fromJson(req.getReader(), Matricula.class);
        try (Connection conn = Conexion.getConnection();
             PreparedStatement ps = conn.prepareStatement(
                     "INSERT INTO matriculas (ced_est, id_curso, fecha) VALUES (?, ?, ?)")) {
            ps.setString(1, matricula.getCed_est());
            ps.setInt(2, matricula.getId_curso());
            ps.setString(3, matricula.getFecha());
            int done = ps.executeUpdate();
            sendJson(res, done > 0 ? 201 : 400, done > 0 ? "Creado" : "Error al crear");
        } catch (Exception e) {
            e.printStackTrace();
            sendJson(res, 500, "Error: " + e.getMessage());
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        Matricula matricula = gson.fromJson(req.getReader(), Matricula.class);
        try (Connection conn = Conexion.getConnection();
             PreparedStatement ps = conn.prepareStatement(
                     "UPDATE matriculas SET ced_est=?, id_curso=?, fecha=? WHERE id_matricula=?")) {
            ps.setString(1, matricula.getCed_est());
            ps.setInt(2, matricula.getId_curso());
            ps.setString(3, matricula.getFecha());
            ps.setInt(4, matricula.getId_matricula());
            int done = ps.executeUpdate();
            sendJson(res, done > 0 ? 200 : 400, done > 0 ? "Actualizado" : "Error al actualizar");
        } catch (Exception e) {
            e.printStackTrace();
            sendJson(res, 500, "Error: " + e.getMessage());
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        String id = req.getParameter("id_matricula");
        try (Connection conn = Conexion.getConnection();
             PreparedStatement ps = conn.prepareStatement(
                     "DELETE FROM matriculas WHERE id_matricula=?")) {
            ps.setInt(1, Integer.parseInt(id));
            int done = ps.executeUpdate();
            sendJson(res, done > 0 ? 200 : 400, done > 0 ? "Eliminado" : "Error al eliminar");
        } catch (Exception e) {
            e.printStackTrace();
            sendJson(res, 500, "Error: " + e.getMessage());
        }
    }

    private void sendJson(HttpServletResponse res, int code, String msg) throws IOException {
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        res.setStatus(code);
        res.getWriter().write("{\"message\":\"" + msg + "\"}");
    }
}
