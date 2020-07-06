package de.reutlingenuniversity.vs_frontend.models;

public class GerichtDTO {

    private String name;
    private double preis;

    public GerichtDTO(String name, double preis){
        this.setName(name);
        this.setPreis(preis);
    }

    @Override
    public String toString() {
        return "GerichtDTO{" +
                "name='" + name + '\'' +
                ", preis=" + preis +
                '}';
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPreis() {
        return preis;
    }

    public void setPreis(double preis) {
        this.preis = preis;
    }
}