import Gericht from './gericht';

export default class Bestellung {
    constructor(nr, timestamp, abgerechnet, gerichtName, gerichtPreis) {
        this.nr = nr;
        this.timestamp = timestamp;
        this.abgerechnet = abgerechnet;
        this.gericht = new Gericht(gerichtName, gerichtPreis);
    }
}