import Bestellung from './bestellung';

export default class Sitzplatz {
    constructor(sitzplatzNr, tischNr, bestellungen) {
        this.sitzplatzNr = sitzplatzNr;
        this.tischNr = tischNr;
        this.bestellungen = bestellungen.map(b => new Bestellung(b.bestellNr, b.timeOfBestellung, b.abgerechnet, b.gerichtName, b.gerichtPreis));
        this.abrechnungProcessing = false;
    }
}