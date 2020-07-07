package de.reutlingenuniversity.vs_frontend.models;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Arrays;

public class AbrechnungDTO implements Serializable {
    private int tischNr;
    private int sitzplatzNr;
    private int abrechnungsNr;
    private double summeBetrag;
    private String[] positionen;
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    private LocalDateTime timeOfAbrechnung;

    public AbrechnungDTO(int tischNr, int sitzplatzNr, int abrechnungsNr, double summeBetrag, String[] positionen, LocalDateTime timeOfAbrechnung) {
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

    public double getSummeBetrag() {
        return summeBetrag;
    }

    public void setSummeBetrag(double summeBetrag) {
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
