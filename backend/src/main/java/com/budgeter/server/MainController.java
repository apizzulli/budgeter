package com.budgeter.server;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

    @CrossOrigin(origins="http://localhost:3000")
    @GetMapping("/home")
    public String home(String name) {
        return "Hello "+name+" , welcome home!!";
    }

}
