package de.reutlingenuniversity.vs_frontend.restclients;

import de.reutlingenuniversity.vs_frontend.models.TischDTO;
import feign.hystrix.FallbackFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

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
            return null;
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
    }
}