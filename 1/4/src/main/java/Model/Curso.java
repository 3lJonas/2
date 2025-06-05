/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

/**
 *
 * @author ASUS GAMER
 */

public class Curso {
    private int id_curso;
    private String nombre;
    private int creditos;
    private String docente;

    public Curso() {}
    public Curso(int id_curso, String nombre, int creditos, String docente) {
        this.id_curso = id_curso;
        this.nombre = nombre;
        this.creditos = creditos;
        this.docente = docente;
    }

    public int getId_curso() { return id_curso; }
    public void setId_curso(int id_curso) { this.id_curso = id_curso; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public int getCreditos() { return creditos; }
    public void setCreditos(int creditos) { this.creditos = creditos; }
    public String getDocente() { return docente; }
    public void setDocente(String docente) { this.docente = docente; }
}