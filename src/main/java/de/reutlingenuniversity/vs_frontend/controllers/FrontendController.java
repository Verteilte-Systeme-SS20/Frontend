package de.reutlingenuniversity.vs_frontend.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "")
public class FrontendController {
    // Index route
    @RequestMapping(value = "")
    public String index() {
        return "index"; // Is resolved to /src/main/resources/templates/index.html
    }
}
