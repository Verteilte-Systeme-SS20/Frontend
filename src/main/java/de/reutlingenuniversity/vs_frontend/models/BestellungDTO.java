package de.reutlingenuniversity.vs_frontend.models;

import java.time.LocalDateTime;

public class BestellungDTO {
    private Long id;
    private int sitzplatzNr;
    private int tischNr;
    private Long gerichtsId;
    private String gerichtName;
    private double gerichtPreis;
    private LocalDateTime timeOfBestellung;


    public BestellungDTO(){
    }

    public BestellungDTO(Long id, int sitzplatzNr, int tischNr, Long gerichtsId,
                         String gerichtName, double gerichtPreis, LocalDateTime timeOfBestellung){
        this.setId(id);
        this.setSitzplatzNr(sitzplatzNr);
        this.setTischNr(tischNr);
        this.setGerichtsId(gerichtsId);
        this.setGerichtName(gerichtName);
        this.setGerichtPreis(gerichtPreis);
        this.setTimeOfBestellung(timeOfBestellung);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getSitzplatzNr() {
        return sitzplatzNr;
    }

    public void setSitzplatzNr(int sitzplatzNr) {
        this.sitzplatzNr = sitzplatzNr;
    }

    public int getTischNr() {
        return tischNr;
    }

    public void setTischNr(int tischNr) {
        this.tischNr = tischNr;
    }

    public Long getGerichtsId() {
        return gerichtsId;
    }

    public void setGerichtsId(Long gerichtsId) {
        this.gerichtsId = gerichtsId;
    }

    public String getGerichtName() {
        return gerichtName;
    }

    public void setGerichtName(String gerichtName) {
        this.gerichtName = gerichtName;
    }

    public double getGerichtPreis() {
        return gerichtPreis;
    }

    public void setGerichtPreis(double gerichtPreis) {
        this.gerichtPreis = gerichtPreis;
    }

    public LocalDateTime getTimeOfBestellung() {
        return timeOfBestellung;
    }

    public void setTimeOfBestellung(LocalDateTime timeOfBestellung) {
        this.timeOfBestellung = timeOfBestellung;
    }
}
