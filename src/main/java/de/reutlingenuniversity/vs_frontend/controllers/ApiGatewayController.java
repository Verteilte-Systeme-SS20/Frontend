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
                                              @PathVariable("anzSitzplaetze") final int anzSitzpleatze){
        ResponseEntity<Object> response;
        try {
            response = tableClient.updateSeatsOfTable(tischNr, anzSitzpleatze);
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

    @PostMapping(value = "/sendAbrechnung", produces = MediaType.APPLICATION_JSON_VALUE)
    public void sendAbrechnung(@RequestBody AbrechnungDTO abrechnungDTO) {
        // Send to website client via Websocket
    }

    /*

    @PostMapping(value = "/tables")
    public String createTable() {
        return null;
    }

    @DeleteMapping(value = "/tables")
    public List<TableDTO> removeTable() {
        return tableClient.getTables();
    }*/
}
