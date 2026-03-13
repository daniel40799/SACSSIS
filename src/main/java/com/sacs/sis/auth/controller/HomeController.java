package com.sacs.sis.auth.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
public class HomeController {

    @GetMapping("/api/dashboard")
    public ResponseEntity<Map<String, Object>> dashboard(Principal principal) {
        Map<String, Object> response = new LinkedHashMap<>();

        if (principal == null) {
            response.put("message", "Not authenticated");
            response.put("user", null);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        response.put("message", "Login successful");
        response.put("user", principal.getName());
        return ResponseEntity.ok(response);
    }
}
