import Gericht from './gericht';

export default class Bestellung {
    constructor(timestamp, abgerechnet, gerichtName, gerichtPreis) {
        this.timestamp = timestamp;
        this.abgerechnet = abgerechnet;
        this.gericht = new Gericht(gerichtName, gerichtPreis);
    }
}