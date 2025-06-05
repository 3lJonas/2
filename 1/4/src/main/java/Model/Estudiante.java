/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

/**
 *
 * @author ASUS GAMER
 */
public class Estudiante {
   private String ced_est; 
   private String nom_est; 
   private String ape_est; 
   private String tel_est; 
   private String dir_est; 

    public Estudiante() {
    }

    public Estudiante(String ced_est, String nom_est, String ape_est, String tel_est, String dir_est) {
        this.ced_est = ced_est;
        this.nom_est = nom_est;
        this.ape_est = ape_est;
        this.tel_est = tel_est;
        this.dir_est = dir_est;
    }

    public String getCed_est() {
        return ced_est;
    }

    public void setCed_est(String ced_est) {
        this.ced_est = ced_est;
    }

    public String getNom_est() {
        return nom_est;
    }

    public void setNom_est(String nom_est) {
        this.nom_est = nom_est;
    }

    public String getApe_est() {
        return ape_est;
    }

    public void setApe_est(String ape_est) {
        this.ape_est = ape_est;
    }

    public String getTel_est() {
        return tel_est;
    }

    public void setTel_est(String tel_est) {
        this.tel_est = tel_est;
    }

    public String getDir_est() {
        return dir_est;
    }

    public void setDir_est(String dir_est) {
        this.dir_est = dir_est;
    }
   
}
