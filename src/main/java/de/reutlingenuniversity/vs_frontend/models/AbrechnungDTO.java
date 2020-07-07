package de.reutlingenuniversity.vs_frontend.models;

import java.time.LocalDateTime;
import java.util.Arrays;

public class AbrechnungDTO {
    private int tischNr;
    private int sitzplatzNr;
    private int abrechnungsNr;
    private int summeBetrag;
    private String[] positionen;
    private LocalDateTime timeOfAbrechnung;

    public AbrechnungDTO(int tischNr, int sitzplatzNr, int abrechnungsNr, int summeBetrag, String[] positionen, LocalDateTime timeOfAbrechnung) {
        this.tischNr = tischNr;
        this.sitzplatzNr = sitzplatzNr;
        this.abrechnungsNr = abrechnungsNr;
        this.summeBetrag = summeBetrag;
        this.positionen = positionen;
        this.timeOfAbrechnung = timeOfAbrechnung;
    }

    @Override
    public String toString() {
        return "AbrechnungDTO{" +
                "tischNr=" + tischNr +
                ", sitzplatzNr=" + sitzplatzNr +
                ", abrechnungsNr=" + abrechnungsNr +
                ", summeBetrag=" + summeBetrag +
                ", positionen=" + Arrays.toString(positionen) +
                ", timeOfAbrechnung=" + timeOfAbrechnung +
                '}';
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

    public int getAbrechnungsNr() {
        return abrechnungsNr;
    }

    public void setAbrechnungsNr(int abrechnungsNr) {
        this.abrechnungsNr = abrechnungsNr;
    }

    public int getSummeBetrag() {
        return summeBetrag;
    }

    public void setSummeBetrag(int summeBetrag) {
        this.summeBetrag = summeBetrag;
    }

    public String[] getPositionen() {
        return positionen;
    }

    public void setPositionen(String[] positionen) {
        this.positionen = positionen;
    }

    public LocalDateTime getTimeOfAbrechnung() {
        return timeOfAbrechnung;
    }

    public void setTimeOfAbrechnung(LocalDateTime timeOfAbrechnung) {
        this.timeOfAbrechnung = timeOfAbrechnung;
    }
}
