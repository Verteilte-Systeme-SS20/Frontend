package de.reutlingenuniversity.vs_frontend.models;

public class AbrechnungsAuftragMessage {
    int tischNr;
    int sitzplatzNr;

    public AbrechnungsAuftragMessage() {
    }

    public AbrechnungsAuftragMessage(int tischNr, int sitzplatzNr) {
        this.tischNr = tischNr;
        this.sitzplatzNr = sitzplatzNr;
    }

    @Override
    public String toString() {
        return "AbrechnungsAuftragMessage{" +
                "tischNr='" + tischNr + '\'' +
                ", sitzplatzNr='" + sitzplatzNr + '\'' +
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
}
