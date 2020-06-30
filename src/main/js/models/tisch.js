export default class Tisch {
    constructor(name, tischNr, anzSitzplaetze, sitzplaetze) {
        this.name = name;
        this.tischNr = tischNr;
        this.anzSitzplaetze = anzSitzplaetze;
        this.sitzplaetze = sitzplaetze ?? [];
    }
}