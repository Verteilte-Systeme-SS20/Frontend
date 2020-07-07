export default class Abrechnung {
    constructor(nr, tischNr, sitzplatzNr, abrechnungsNr, positionen, timestamp, sum) {
        this.nr = nr;
        this.tischNr = tischNr;
        this.sitzplatzNr = sitzplatzNr;
        this.abrechnungsNr = abrechnungsNr;
        this.positionen = positionen;
        this.timestamp = timestamp;
        this.sum = sum;
    }
}