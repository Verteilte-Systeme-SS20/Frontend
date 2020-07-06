package de.reutlingenuniversity.vs_frontend.restclients;

import de.reutlingenuniversity.vs_frontend.models.TischDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.List;

@FeignClient(name="tisch", url = "http://localhost:8001", fallbackFactory = TableClientFallbackFactory.class)
public interface TableClient {

    @GetMapping("/v1/tische/")
    List<TischDTO> getTables();

    @PostMapping("/v1/tische/{tischNr}/{anzSitzplaetze}")
    ResponseEntity<Object> createTable(@PathVariable("tischNr") final int tischNr,
                                       @PathVariable("anzSitzplaetze") final int sitzplaetze);

    @PutMapping("v1/tische/{tischNr}/{anzSitzplaetze}")
    ResponseEntity<Object> updateSeatsOfTable(@PathVariable("tischNr") final int tischNr,
                                              @PathVariable("anzSitzplaetze") final int anzSitzplaetze);

    @PostMapping("v1/tische/abrechnung/{tischNr}/{anzSitzplaetze}")
    ResponseEntity<Object> tischAbrechnen(@PathVariable("tischNr") final int tischNr,
                                              @PathVariable("anzSitzplaetze") final int anzSitzplaetze);

    @PutMapping("v1/tische/abrechnung/{tischNr}/{anzSitzplaetze}")
    ResponseEntity<Object> tischAbgerechnet(@PathVariable("tischNr") final int tischNr,
                                          @PathVariable("anzSitzplaetze") final int anzSitzplaetze);

    @GetMapping("v1/tische/all")
    ResponseEntity<Object> getAllTablesWithBestellungen();
}
