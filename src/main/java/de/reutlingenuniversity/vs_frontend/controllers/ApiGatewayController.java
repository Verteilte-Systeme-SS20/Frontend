package de.reutlingenuniversity.vs_frontend.controllers;

import de.reutlingenuniversity.vs_frontend.models.TableDTO;
import de.reutlingenuniversity.vs_frontend.restclients.TableClient;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping(value = "/api/v1")
public class ApiGatewayController {
    private final TableClient tableClient;

    public ApiGatewayController(TableClient tableClient) {
        this.tableClient = tableClient;
    }

    @GetMapping(value = "/tables")
    public List<TableDTO> getTables() {
        return tableClient.getTables();
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
