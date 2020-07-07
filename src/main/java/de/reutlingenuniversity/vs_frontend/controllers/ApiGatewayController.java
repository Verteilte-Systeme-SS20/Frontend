package de.reutlingenuniversity.vs_frontend.controllers;

import de.reutlingenuniversity.vs_frontend.models.AbrechnungDTO;
import de.reutlingenuniversity.vs_frontend.models.GerichtDTO;
import de.reutlingenuniversity.vs_frontend.models.TischDTO;
import de.reutlingenuniversity.vs_frontend.restclients.GerichtClient;
import de.reutlingenuniversity.vs_frontend.restclients.TableClient;
import feign.FeignException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping(value = "/api/v1")
public class ApiGatewayController {
    private final TableClient tableClient;
    private final GerichtClient gerichtClient;

    public ApiGatewayController(TableClient tableClient, GerichtClient gerichtClient) {
        this.tableClient = tableClient;
        this.gerichtClient = gerichtClient;
    }

    // Tische

    @GetMapping(value = "/tische", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<TischDTO> getTables() {
        return tableClient.getTables();
    }

    @PostMapping("/tische/{tischNr}/{anzSitzplaetze}")
    ResponseEntity<Object> createTable(@PathVariable("tischNr") final int tischNr,
                                       @PathVariable("anzSitzplaetze") final int sitzplaetze){
        ResponseEntity<Object> response;
        try {
            response = tableClient.createTable(tischNr, sitzplaetze);
        } catch (FeignException e) {
            response = new ResponseEntity<>(new String(e.content()), HttpStatus.valueOf(e.status()));
        }
        return response;
    }

    @PutMapping(value = "/tische/{tischNr}/{anzSitzplaetze}", produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<Object> updateSeatsOfTable(@PathVariable("tischNr") final int tischNr,
                                              @PathVariable("anzSitzplaetze") final int anzSitzplaetze){
        ResponseEntity<Object> response;
        try {
            response = tableClient.updateSeatsOfTable(tischNr, anzSitzplaetze);
        } catch (FeignException e) {
            response = new ResponseEntity<>(new String(e.content()), HttpStatus.valueOf(e.status()));
        }
        return response;
    }

    @GetMapping(value = "/gerichte", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<GerichtDTO> getGerichte() {
        return gerichtClient.getAll();
    }

    @PostMapping("/tische/abrechnung/{tischNr}/{anzSitzplaetze}")
    ResponseEntity<Object> tischAbrechnen(@PathVariable("tischAbrechnenischNr") final int tischNr,
                                          @PathVariable("anzSitzplaetze") final int anzSitzplaetze) {
        ResponseEntity<Object> response;
        try {
            response = tableClient.tischAbrechnen(tischNr, anzSitzplaetze);
        } catch (FeignException e) {
            response = new ResponseEntity<>(new String(e.content()), HttpStatus.valueOf(e.status()));
        }
        return response;
    }

    @PutMapping("/tische/abrechnung/{tischNr}/{sitzplatz}")
    ResponseEntity<Object> tischAbgerechnet(@PathVariable("tischNr") final int tischNr,
                                            @PathVariable("anzSitzplaetze") final int anzSitzplaetze) {
        ResponseEntity<Object> response;
        try {
            response = tableClient.tischAbgerechnet(tischNr, anzSitzplaetze);
        } catch (FeignException e) {
            response = new ResponseEntity<>(new String(e.content()), HttpStatus.valueOf(e.status()));
        }
        return response;
    }

    @GetMapping("/tische/all")
    ResponseEntity<Object> getAllTablesWithBestellungen(){
        ResponseEntity<Object> response;
        try {
            response = tableClient.getAllTablesWithBestellungen();
        } catch (FeignException e) {
            response = new ResponseEntity<>(new String(e.content()), HttpStatus.valueOf(e.status()));
        }
        return response;
    }

    @DeleteMapping("/tische/{tischNr}")
    ResponseEntity<Object> deleteTable(@PathVariable("tischNr") final int tischNr){
        ResponseEntity<Object> response;
        try {
            response = tableClient.deleteTable(tischNr);
        } catch (FeignException e) {
            response = new ResponseEntity<>(new String(e.content()), HttpStatus.valueOf(e.status()));
        }
        return response;
    }

    // Bestellungen

    @PostMapping("/bestellungen/{tischNr}/{sitzplatzNr}/{gerichtName}")
    ResponseEntity<Object> addBestellungToTischNrAndSitzplatz (@PathVariable("tischNr") final int tischNr,
                                                               @PathVariable("sitzplatzNr") final int sitzplatzNr,
                                                               @PathVariable("gerichtName") String name){
        ResponseEntity<Object> response;
        try {
            response = tableClient.addBestellungToTischNrAndSitzplatz(tischNr, sitzplatzNr, name);
        } catch (FeignException e) {
            response = new ResponseEntity<>(new String(e.content()), HttpStatus.valueOf(e.status()));
        }
        return response;
    }

    @GetMapping("/bestellungen/abrechnung/{tischNr}/{sitzplatzNr}")
    ResponseEntity<Object> getBestellungenByTischNrSitzplatzNr(@PathVariable("tischNr") final int tischNr,
                                                            @PathVariable("sitzplatzNr") final int sitzplatz) {
        ResponseEntity<Object> response;
        try {
            response = tableClient.getBestellungenByTischNrSitzplatzNr(tischNr, sitzplatz);
        } catch (FeignException e) {
            response = new ResponseEntity<>(new String(e.content()), HttpStatus.valueOf(e.status()));
        }
        return response;
    }

    // Abrechnungen
    @PostMapping("/abrechnungen/completed")
    ResponseEntity<Object> sendAbrechnung(@RequestBody AbrechnungDTO abrechnungDTO) {
        // Message tisch service
        ResponseEntity<Object> tableResponse;
        try {
            tableResponse = tableClient.setBestellungToAbgerechnet(abrechnungDTO.getTischNr(), abrechnungDTO.getSitzplatzNr());
        } catch (FeignException e) {
            tableResponse = new ResponseEntity<>(new String(e.content()), HttpStatus.valueOf(e.status()));
        }
        System.out.println("tableresponse: " + tableResponse.getStatusCode());
        // TODO: message frontend

        // Respond to Abrechnung
        ResponseEntity<Object> response = new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
        System.out.println("Got abrechnung:" + abrechnungDTO.toString());
        return response;
    }

}
