package com.ecommerce.backend.controller;

import com.ecommerce.backend.entity.User;
import com.ecommerce.backend.repository.UserRepository;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Cette méthode est appelée juste après la connexion Google côté React
    @PostMapping("/login")
    public User login(@AuthenticationPrincipal Jwt jwt) {
        // 1. Récupérer les infos du token Google
        String email = jwt.getClaimAsString("email");
        String name = jwt.getClaimAsString("name");
        String pictureUrl = jwt.getClaimAsString("picture");

        // 2. Vérifier si l'utilisateur existe déjà
        Optional<User> existingUser = userRepository.findByEmail(email);

        if (existingUser.isPresent()) {
            // Mettre à jour l'utilisateur existant (au cas où il a changé de photo)
            User user = existingUser.get();
            user.setName(name);
            user.setPictureUrl(pictureUrl);
            return userRepository.save(user);
        } else {
            // 3. Créer un nouvel utilisateur
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setName(name);
            newUser.setPictureUrl(pictureUrl);
            newUser.setRole("USER"); // Par défaut, tout le monde est simple USER
            return userRepository.save(newUser);
        }
    }
}