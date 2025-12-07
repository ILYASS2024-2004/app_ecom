package com.ecommerce.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Double price;

    @Column(length = 1000) // Pour permettre une description plus longue
    private String description;

    private String imageUrl; // L'URL de l'image (stockée sur le web)
}