package controller;
import com.google.gson.Gson;
import Model.Estudiante;
import util.Conexion;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import javax.servlet.ServletException;
import java.io.*;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@WebServlet(name = "EstudianteServlet", urlPatterns = {"/EstudianteServlet"})
public class EstudianteServlet extends HttpServlet {
    private final Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        String ced_est = req.getParameter("ced_est");
        PrintWriter out = res.getWriter();

        try (Connection conn = Conexion.getConnection()) {
            if (ced_est != null && !ced_est.isEmpty()) {
                String sql = "SELECT * FROM estudiantes WHERE ced_est = ?";
                try (PreparedStatement ps = conn.prepareStatement(sql)) {
                    ps.setString(1, ced_est);
                    try (ResultSet rs = ps.executeQuery()) {
                        if (rs.next()) {
                            Estudiante e = new Estudiante();
                            e.setCed_est(rs.getString("ced_est"));
                            e.setNom_est(rs.getString("nom_est"));
                            e.setApe_est(rs.getString("ape_est"));
                            e.setTel_est(rs.getString("tel_est"));
                            e.setDir_est(rs.getString("dir_est"));
                            out.write(gson.toJson(e));
                        } else {
                            out.write("{}");
                        }
                    }
                }
            } else {
                List<Estudiante> lista = new ArrayList<>();
                String sql = "SELECT * FROM estudiantes";
                try (PreparedStatement ps = conn.prepareStatement(sql);
                     ResultSet rs = ps.executeQuery()) {
                    while (rs.next()) {
                        Estudiante e = new Estudiante();
                        e.setCed_est(rs.getString("ced_est"));
                        e.setNom_est(rs.getString("nom_est"));
                        e.setApe_est(rs.getString("ape_est"));
                        e.setTel_est(rs.getString("tel_est"));
                        e.setDir_est(rs.getString("dir_est"));
                        lista.add(e);
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
        Estudiante est = gson.fromJson(req.getReader(), Estudiante.class);
        try (Connection conn = Conexion.getConnection();
             PreparedStatement ps = conn.prepareStatement(
                     "INSERT INTO estudiantes (ced_est, nom_est, ape_est, tel_est, dir_est) VALUES (?, ?, ?, ?, ?)")) {
            ps.setString(1, est.getCed_est());
            ps.setString(2, est.getNom_est());
            ps.setString(3, est.getApe_est());
            ps.setString(4, est.getTel_est());
            ps.setString(5, est.getDir_est());
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
        Estudiante est = gson.fromJson(req.getReader(), Estudiante.class);
        try (Connection conn = Conexion.getConnection();
             PreparedStatement ps = conn.prepareStatement(
                     "UPDATE estudiantes SET nom_est=?, ape_est=?, tel_est=?, dir_est=? WHERE ced_est=?")) {
            ps.setString(1, est.getNom_est());
            ps.setString(2, est.getApe_est());
            ps.setString(3, est.getTel_est());
            ps.setString(4, est.getDir_est());
            ps.setString(5, est.getCed_est());
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
        String ced_est = req.getParameter("ced_est");
        try (Connection conn = Conexion.getConnection();
             PreparedStatement ps = conn.prepareStatement(
                     "DELETE FROM estudiantes WHERE ced_est=?")) {
            ps.setString(1, ced_est);
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