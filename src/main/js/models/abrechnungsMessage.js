import Abrechnung from './abrechnung';

export default class AbrechnungsMessage {
    constructor(successful, error, abrechnung) {
        this.successful = successful;
        this.error = error;
        this.abrechnung = new Abrechnung(
            abrechnung.abrechnungsNr,
            abrechnung.tischNr,
            abrechnung.sitzplatzNr,
            abrechnung.abrechnungsNr,
            abrechnung.positionen,
            abrechnung.timeOfAbrechnung,
            abrechnung.summeBetrag
        );
    }
}