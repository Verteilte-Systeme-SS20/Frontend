package de.reutlingenuniversity.vs_frontend.models;

import java.util.List;

public class SitzplatzDTO {
    private int tischNr;
    private int sitzplatzNr;
    private List<BestellungDTO> bestellungen;

    public SitzplatzDTO(){
    }

    public SitzplatzDTO(int tischNr, int sitzplatzNr, List<BestellungDTO> bestellungen){
        this.setTischNr(tischNr);
        this.setSitzplatzNr(sitzplatzNr);
        this.setBestellungen(bestellungen);
    }

    public int getTischNr() {
        return tischNr;
    }

    public void setTischNr(int tischNr) {
        this.tischNr = tischNr;
    }

    public int getSitzplatzNr() {
        return sitzplatzNr;
    }

    public void setSitzplatzNr(int sitzplatzNr) {
        this.sitzplatzNr = sitzplatzNr;
    }

    public List<BestellungDTO> getBestellungen() {
        return bestellungen;
    }

    public void setBestellungen(List<BestellungDTO> bestellungen) {
        this.bestellungen = bestellungen;
    }
}
