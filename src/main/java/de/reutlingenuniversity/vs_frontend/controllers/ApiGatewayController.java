package de.reutlingenuniversity.vs_frontend.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.reutlingenuniversity.vs_frontend.models.*;
import de.reutlingenuniversity.vs_frontend.restclients.GerichtClient;
import de.reutlingenuniversity.vs_frontend.restclients.TableClient;
import feign.FeignException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping(value = "/api/v1")
public class ApiGatewayController {
    private final TableClient tableClient;
    private final GerichtClient gerichtClient;
    private final SimpMessagingTemplate simpMessagingTemplate;

    public ApiGatewayController(TableClient tableClient, GerichtClient gerichtClient, SimpMessagingTemplate simpMessagingTemplate) {
        this.tableClient = tableClient;
        this.gerichtClient = gerichtClient;
        this.simpMessagingTemplate = simpMessagingTemplate;
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

    @MessageMapping("/abrechnung")
    ResponseEntity<Object> getBestellungenByTischNrSitzplatzNr(AbrechnungsAuftragMessage abrechnungsAuftragMessage) {
        ResponseEntity<Object> response;
        try {
            response = tableClient.getBestellungenByTischNrSitzplatzNr(abrechnungsAuftragMessage.getTischNr(), abrechnungsAuftragMessage.getSitzplatzNr());
        } catch (FeignException e) {
            response = new ResponseEntity<>(new String(e.content()), HttpStatus.valueOf(e.status()));
        }
        return response;
    }

    @DeleteMapping("/bestellungen/{bestellNr}")
    ResponseEntity<Object> deleteBestellungByBestellNr (@PathVariable("bestellNr") final int bestellNr){
        ResponseEntity<Object> response;
        try {
            response = tableClient.deleteBestellungByBestellNr(bestellNr);
        } catch (FeignException e) {
            response = new ResponseEntity<>(new String(e.content()), HttpStatus.valueOf(e.status()));
        }
        return response;
    }

    // Abrechnungen
    @PostMapping("/abrechnungen/completed/forward")
    ResponseEntity<Object> sendAbrechnungForward(@RequestBody AbrechnungDTO abrechnungDTO) {
        // Message tisch service
        System.out.println("Got abrechnung and forwarding:" + abrechnungDTO.toString());
        ResponseEntity<Object> tableResponse;
        try {
            tableResponse = tableClient.setBestellungToAbgerechnet(abrechnungDTO.getTischNr(), abrechnungDTO.getSitzplatzNr());
        } catch (FeignException e) {
            tableResponse = new ResponseEntity<>(new String(e.content()), HttpStatus.valueOf(e.status()));
        }
        System.out.println("tableresponse: " + tableResponse.getStatusCode());
        // Respond to Abrechnung
        return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
    }

    @PostMapping("/abrechnungen/completed/notification")
    ResponseEntity<Object> sendAbrechnungNotification(@RequestBody String abrechnungDTOSerialized) {
        System.out.println("Got abrechnung and messaging frontend:" + abrechnungDTOSerialized);
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            // Parse abrechnungDTO
            AbrechnungDTO abrechnungDTO = objectMapper.readValue(abrechnungDTOSerialized, AbrechnungDTO.class);
            // Message frontend
            AbrechnungMessage abrechnungMessage = new AbrechnungMessage(true, null, abrechnungDTO);
            String abrechnungsMessageSerialized = objectMapper.writeValueAsString(abrechnungMessage);
            System.out.println("Sending message: " + abrechnungsMessageSerialized);
            this.simpMessagingTemplate.convertAndSend("/topic/abrechnung", abrechnungsMessageSerialized);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        // Respond to Abrechnung
        return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
    }

}
