package com.ecommerce.backend.repository;

import com.ecommerce.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    // Pas besoin d'ajouter de code, Spring génère tout magiquement !
}