package de.reutlingenuniversity.vs_frontend.restclients;

import de.reutlingenuniversity.vs_frontend.models.TableDTO;
import feign.hystrix.FallbackFactory;
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
        public List<TableDTO> getTables() {
            return null;
        }
    }
}