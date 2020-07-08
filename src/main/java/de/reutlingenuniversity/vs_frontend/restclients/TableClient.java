package de.reutlingenuniversity.vs_frontend.restclients;

import de.reutlingenuniversity.vs_frontend.models.TischDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name="tisch", url = "http://tisch:8888", fallbackFactory = TableClientFallbackFactory.class)
public interface TableClient {
    String prefixTische = "/v1/tische";
    String prefixBestellungen = "/v1/bestellungen";

    // Tische

    @GetMapping(prefixTische + "/")
    List<TischDTO> getTables();

    @PostMapping(prefixTische + "/{tischNr}/{anzSitzplaetze}")
    ResponseEntity<Object> createTable(@PathVariable("tischNr") final int tischNr,
                                       @PathVariable("anzSitzplaetze") final int sitzplaetze);

    @PutMapping(prefixTische + "/{tischNr}/{anzSitzplaetze}")
    ResponseEntity<Object> updateSeatsOfTable(@PathVariable("tischNr") final int tischNr,
                                              @PathVariable("anzSitzplaetze") final int anzSitzplaetze);

    @PostMapping(prefixTische + "/abrechnung/{tischNr}/{anzSitzplaetze}")
    ResponseEntity<Object> tischAbrechnen(@PathVariable("tischNr") final int tischNr,
                                              @PathVariable("anzSitzplaetze") final int anzSitzplaetze);

    @PutMapping(prefixTische + "/abrechnung/{tischNr}/{anzSitzplaetze}")
    ResponseEntity<Object> tischAbgerechnet(@PathVariable("tischNr") final int tischNr,
                                          @PathVariable("anzSitzplaetze") final int anzSitzplaetze);

    @GetMapping(prefixTische + "/all")
    ResponseEntity<Object> getAllTablesWithBestellungen();

    @DeleteMapping(prefixTische + "/{tischNr}")
    ResponseEntity<Object> deleteTable(@PathVariable("tischNr") final int tischNr);

    // Bestellungen

    @PostMapping(prefixBestellungen + "/{tischNr}/{sitzplatzNr}/{gerichtName}")
    ResponseEntity<Object> addBestellungToTischNrAndSitzplatz (@PathVariable("tischNr") final int tischNr,
                                                               @PathVariable("sitzplatzNr") final int sitzplatzNr,
                                                               @PathVariable("gerichtName") String name);

    @PutMapping(prefixBestellungen + "/abrechnung/{tischNr}/{sitzplatzNr}")
    ResponseEntity<Object> setBestellungToAbgerechnet(@PathVariable("tischNr") final int tischNr,
                                                      @PathVariable("sitzplatzNr") final int sitzplatzNr);

    @DeleteMapping(prefixBestellungen + "/{bestellNr}")
    ResponseEntity<Object> deleteBestellungByBestellNr (@PathVariable("bestellNr") final int bestellNr);

    @GetMapping(prefixBestellungen + "/abrechnung/{tischNr}/{sitzplatzNr}")
    ResponseEntity<Object> getBestellungenByTischNrSitzplatzNr(@PathVariable("tischNr") final int tischNr,
                                                            @PathVariable("sitzplatzNr") final int sitzplatz);
}
