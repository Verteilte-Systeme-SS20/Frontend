package de.reutlingenuniversity.vs_frontend.restclients;

import de.reutlingenuniversity.vs_frontend.models.GerichtDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name="gericht", url = "http://gericht:8888", fallbackFactory = TableClientFallbackFactory.class)
public interface GerichtClient {

    @GetMapping("/v1/gerichte")
    List<GerichtDTO> getAll();
}
