package de.reutlingenuniversity.vs_frontend.models;


import java.util.List;

public class TischDTO {
    private int nr;
    private String description;
    private int anzSitzplaetze;
    private List<SitzplatzDTO> bestellungenToSitzplatz;

    public TischDTO(){
    }
    public TischDTO(int nr, String description, int anzSitzplaetze, List<SitzplatzDTO> bestellungen){
        this.setNr(nr);
        this.setDescription(description);
        this.setAnzSitzplaetze(anzSitzplaetze);
        this.setBestellungenToSitzplatz(bestellungen);
    }

    @Override
    public String toString() {
        return "TischDTO{" +
                "nr=" + nr +
                ", description='" + description + '\'' +
                ", anzSitzplaetze=" + anzSitzplaetze +
                ", bestellungenToSitzplatz=" + bestellungenToSitzplatz +
                '}';
    }

    public int getNr() {
        return nr;
    }

    public void setNr(int nr) {
        this.nr = nr;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getAnzSitzplaetze() {
        return anzSitzplaetze;
    }

    public void setAnzSitzplaetze(int anzSitzplaetze) {
        this.anzSitzplaetze = anzSitzplaetze;
    }

    public List<SitzplatzDTO> getBestellungenToSitzplatz() {
        return bestellungenToSitzplatz;
    }

    public void setBestellungenToSitzplatz(List<SitzplatzDTO> bestellungenToSitzplatz) {
        this.bestellungenToSitzplatz = bestellungenToSitzplatz;
    }
}
