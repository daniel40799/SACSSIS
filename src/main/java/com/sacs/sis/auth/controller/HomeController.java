package com.sacs.sis.auth.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
public class HomeController {

    @GetMapping("/dashboard")
    public Map<String, Object> dashboard(Principal principal) {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("message", "Login successful");
        response.put("user", principal != null ? principal.getName() : null);
        return response;
    }
}