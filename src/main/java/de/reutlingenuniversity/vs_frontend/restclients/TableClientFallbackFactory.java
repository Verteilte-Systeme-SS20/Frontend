package de.reutlingenuniversity.vs_frontend.restclients;

import de.reutlingenuniversity.vs_frontend.models.TischDTO;
import feign.hystrix.FallbackFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class TableClientFallbackFactory implements FallbackFactory<TableClient> {

    @Override
    public TableClient create(Throwable throwable) {
        return new TableClientFallback(throwable);
    }

    public class TableClientFallback implements TableClient {

        private final Throwable cause;

        public TableClientFallback(Throwable cause) {
            this.cause = cause;
        }

        @Override
        public List<TischDTO> getTables() {
            return new ArrayList<>();
        }

        @Override
        public ResponseEntity<Object> createTable(int tischNr, int sitzplaetze) {
            return null;
        }

        @Override
        public ResponseEntity<Object> updateSeatsOfTable(int tischNr, int anzSitzpleatze) {
            return null;
        }

        @Override
        public ResponseEntity<Object> tischAbrechnen(int tischNr, int anzSitzplaetze) {
            return null;
        }

        @Override
        public ResponseEntity<Object> tischAbgerechnet(int tischNr, int anzSitzplaetze) {
            return null;
        }

        @Override
        public ResponseEntity<Object> addBestellungToTischNrAndSitzplatz(int tischNr, int sitzplatzNr, String name) {
            return null;
        }

        @Override
        public ResponseEntity<Object> setBestellungToAbgerechnet(int tischNr, int sitzplatzNr) {
            return null;
        }

        @Override
        public ResponseEntity<Object> deleteBestellungByBestellNr(int bestellNr) {
            return null;
        }

        @Override
        public ResponseEntity<Object> getBestellungenByTischNrSitzplatzNr(int tischNr, int sitzplatz) {
            return null;
        }

        @Override
        public ResponseEntity<Object> deleteTable(int tischNr) {
            return null;
        }

        @Override
        public ResponseEntity<Object> getAllTablesWithBestellungen() {
            return new ResponseEntity<>("Tisch-Dienst ist aktuell noch nicht verfügbar", HttpStatus.SERVICE_UNAVAILABLE);
        }
    }
}