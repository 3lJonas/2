/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

/**
 *
 * @author ASUS GAMER
 */
public class Matricula {
    private int id_matricula;
    private String ced_est;
    private int id_curso;
    private String fecha;

    public Matricula() {}
    public Matricula(int id_matricula, String ced_est, int id_curso, String fecha) {
        this.id_matricula = id_matricula;
        this.ced_est = ced_est;
        this.id_curso = id_curso;
        this.fecha = fecha;
    }

    public int getId_matricula() { return id_matricula; }
    public void setId_matricula(int id_matricula) { this.id_matricula = id_matricula; }
    public String getCed_est() { return ced_est; }
    public void setCed_est(String ced_est) { this.ced_est = ced_est; }
    public int getId_curso() { return id_curso; }
    public void setId_curso(int id_curso) { this.id_curso = id_curso; }
    public String getFecha() { return fecha; }
    public void setFecha(String fecha) { this.fecha = fecha; }
}
