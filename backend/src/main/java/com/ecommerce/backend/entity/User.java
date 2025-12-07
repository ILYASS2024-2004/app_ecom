package com.ecommerce.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "users") // "user" est un mot réservé en SQL, on utilise "users"
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    private String name;

    private String pictureUrl;

    // Pour simplifier, on stocke le rôle en String ("USER" ou "ADMIN")
    private String role = "USER"; 
}