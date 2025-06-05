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
import Model.Curso;
import util.Conexion;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import javax.servlet.ServletException;
import java.io.*;
import java.sql.*;
import java.util.*;

@WebServlet(name = "CursoServlet", urlPatterns = {"/CursoServlet"})
public class CursoServlet extends HttpServlet {
    private final Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        String id = req.getParameter("id_curso");
        PrintWriter out = res.getWriter();

        try (Connection conn = Conexion.getConnection()) {
            if (id != null && !id.isEmpty()) {
                String sql = "SELECT * FROM cursos WHERE id_curso = ?";
                try (PreparedStatement ps = conn.prepareStatement(sql)) {
                    ps.setInt(1, Integer.parseInt(id));
                    try (ResultSet rs = ps.executeQuery()) {
                        if (rs.next()) {
                            Curso c = new Curso(
                                rs.getInt("id_curso"),
                                rs.getString("nombre"),
                                rs.getInt("creditos"),
                                rs.getString("docente")
                            );
                            out.write(gson.toJson(c));
                        } else {
                            out.write("{}");
                        }
                    }
                }
            } else {
                List<Curso> lista = new ArrayList<>();
                String sql = "SELECT * FROM cursos";
                try (PreparedStatement ps = conn.prepareStatement(sql);
                     ResultSet rs = ps.executeQuery()) {
                    while (rs.next()) {
                        Curso c = new Curso(
                            rs.getInt("id_curso"),
                            rs.getString("nombre"),
                            rs.getInt("creditos"),
                            rs.getString("docente")
                        );
                        lista.add(c);
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
        Curso curso = gson.fromJson(req.getReader(), Curso.class);
        try (Connection conn = Conexion.getConnection();
             PreparedStatement ps = conn.prepareStatement(
                     "INSERT INTO cursos (nombre, creditos, docente) VALUES (?, ?, ?)")) {
            ps.setString(1, curso.getNombre());
            ps.setInt(2, curso.getCreditos());
            ps.setString(3, curso.getDocente());
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
        Curso curso = gson.fromJson(req.getReader(), Curso.class);
        try (Connection conn = Conexion.getConnection();
             PreparedStatement ps = conn.prepareStatement(
                     "UPDATE cursos SET nombre=?, creditos=?, docente=? WHERE id_curso=?")) {
            ps.setString(1, curso.getNombre());
            ps.setInt(2, curso.getCreditos());
            ps.setString(3, curso.getDocente());
            ps.setInt(4, curso.getId_curso());
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
        String id = req.getParameter("id_curso");
        try (Connection conn = Conexion.getConnection();
             PreparedStatement ps = conn.prepareStatement(
                     "DELETE FROM cursos WHERE id_curso=?")) {
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
