package de.reutlingenuniversity.vs_frontend.restclients;

import de.reutlingenuniversity.vs_frontend.models.TableDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name="tisch", url = "http://localhost:8001", fallbackFactory = TableClientFallbackFactory.class)
public interface TableClient {

    @GetMapping("/v1/tables")
    List<TableDTO> getTables();
}
