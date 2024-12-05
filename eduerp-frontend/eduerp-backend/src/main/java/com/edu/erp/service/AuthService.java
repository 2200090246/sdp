package com.edu.erp.service;

import com.edu.erp.repository.UserRepository;
import com.edu.erp.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public boolean authenticate(String username, String password, String role) {
        Optional<User> user = userRepository.findByUsernameAndRole(username, role);

        if (user.isEmpty()) {
            System.out.println("Authentication failed: User with username " + username + " and role " + role + " not found.");
            return false;
        }

        if (!user.get().getPassword().equals(password)) {
            System.out.println("Authentication failed: Incorrect password for username " + username + ".");
            return false;
        }

        // Authentication successful
        System.out.println("Authentication successful for username: " + username + ", Role: " + role);
        return true;
    }
}
