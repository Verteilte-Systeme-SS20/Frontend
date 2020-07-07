package de.reutlingenuniversity.vs_frontend.models;

public class AbrechnungMessage {
    private boolean successful;
    private String error;
    private AbrechnungDTO abrechnungDTO;

    public AbrechnungMessage(boolean successful, String error, AbrechnungDTO abrechnungDTO) {
        this.successful = successful;
        this.error = error;
        this.abrechnungDTO = abrechnungDTO;
    }
}
