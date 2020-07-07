import Sitzplatz from './sitzplatz';

export default class Tisch {
    constructor(anzSitzplaetze, sitzplaetze, description, id, nr) {
        this.anzSitzplaetze = anzSitzplaetze;
        this.sitzplaetze = sitzplaetze.map(s => new Sitzplatz(s.sitzplatzNr, s.tischNr, s.bestellungen));
        this.description = description;
        this.id = id;
        this.nr = nr;
    }
}