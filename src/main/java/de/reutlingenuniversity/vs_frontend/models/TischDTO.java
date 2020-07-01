package de.reutlingenuniversity.vs_frontend.models;


import java.util.List;

public class TischDTO {
    private Long id;
    private int nr;
    private String description;
    private int anzSitzplaetze;
    private List<SitzplatzDTO> bestellungen;

    public TischDTO(){
    }
    public TischDTO(Long id, int nr, String description, int anzSitzplaetze, List<SitzplatzDTO> bestellungen){
        this.setId(id);
        this.setNr(nr);
        this.setDescription(description);
        this.setAnzSitzplaetze(anzSitzplaetze);
        this.setBestellungen(bestellungen);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public List<SitzplatzDTO> getBestellungen() {
        return bestellungen;
    }

    public void setBestellungen(List<SitzplatzDTO> bestellungen) {
        this.bestellungen = bestellungen;
    }
}
