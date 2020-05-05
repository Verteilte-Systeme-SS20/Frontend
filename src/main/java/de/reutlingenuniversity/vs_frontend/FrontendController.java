package de.reutlingenuniversity.vs_frontend;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FrontendController {
    // Index route
    @RequestMapping(value = "/")
    public String index() {
        return "index"; // Is resolved to /src/main/resources/templates/index.html
    }
}
