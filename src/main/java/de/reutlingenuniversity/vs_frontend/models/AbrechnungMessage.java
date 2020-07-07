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

    @Override
    public String toString() {
        return "AbrechnungMessage{" +
                "successful=" + successful +
                ", error='" + error + '\'' +
                ", abrechnungDTO=" + abrechnungDTO +
                '}';
    }

    public boolean isSuccessful() {
        return successful;
    }

    public void setSuccessful(boolean successful) {
        this.successful = successful;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public AbrechnungDTO getAbrechnungDTO() {
        return abrechnungDTO;
    }

    public void setAbrechnungDTO(AbrechnungDTO abrechnungDTO) {
        this.abrechnungDTO = abrechnungDTO;
    }
}
