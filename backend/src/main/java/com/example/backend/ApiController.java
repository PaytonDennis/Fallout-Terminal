package com.example.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ApiController {

    @GetMapping("/message")
    public String getOopMessage() {
        DisplayMessage practice = new DisplayMessage();
        return practice.getMainMessage();
    }
}