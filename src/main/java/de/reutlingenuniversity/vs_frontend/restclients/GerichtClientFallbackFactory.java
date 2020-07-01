package de.reutlingenuniversity.vs_frontend.restclients;

import de.reutlingenuniversity.vs_frontend.models.GerichtDTO;
import feign.hystrix.FallbackFactory;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class GerichtClientFallbackFactory implements FallbackFactory<GerichtClient> {

    @Override
    public GerichtClient create(Throwable throwable) {
        return new GerichtClientFallback(throwable);
    }

    public class GerichtClientFallback implements GerichtClient {

        private final Throwable cause;

        public GerichtClientFallback(Throwable cause) {
            this.cause = cause;
        }

        @Override
        public List<GerichtDTO> getAll() {
            return null;
        }
    }
}