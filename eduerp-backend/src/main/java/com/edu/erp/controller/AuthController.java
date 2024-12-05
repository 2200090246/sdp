package com.edu.erp.controller;



import com.edu.erp.service.AuthService;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "http://localhost:3001")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");
        String role = loginData.get("role");

        // Log the login attempt
        System.out.println("Login attempt: Username = " + username + ", Role = " + role);

        boolean isAuthenticated = authService.authenticate(username, password, role);

        if (isAuthenticated) {
            // Authentication successful
            return ResponseEntity.ok().body(Map.of("success", true, "role", role));
        } else {
            // Authentication failed
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("success", false, "message", "Login failed. Check username, password, and role."));
        }
    }
}
