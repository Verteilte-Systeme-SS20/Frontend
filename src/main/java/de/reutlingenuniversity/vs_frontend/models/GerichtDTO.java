package de.reutlingenuniversity.vs_frontend.models;

public class GerichtDTO {
    String name;
    double preis;

    public GerichtDTO(String name, double preis) {
        this.name = name;
        this.preis = preis;
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
