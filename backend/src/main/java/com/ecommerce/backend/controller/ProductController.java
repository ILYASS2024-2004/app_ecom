package com.ecommerce.backend.controller;

import com.ecommerce.backend.entity.Product;
import com.ecommerce.backend.repository.ProductRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // Pour autoriser React
public class ProductController {

    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // --- PARTIE PUBLIQUE (Tout le monde peut voir) ---

    @GetMapping("/public/products")
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @GetMapping("/public/products/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return productRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // --- PARTIE ADMIN (Nécessite une connexion Google) ---
    // Note : Pour l'instant, tout utilisateur connecté peut faire ça.
    // On sécurisera le rôle "ADMIN" spécifiquement juste après.

    @PostMapping("/products")
    public Product createProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {
        return productRepository.findById(id).map(product -> {
            product.setName(productDetails.getName());
            product.setPrice(productDetails.getPrice());
            product.setDescription(productDetails.getDescription());
            product.setImageUrl(productDetails.getImageUrl());
            return ResponseEntity.ok(productRepository.save(product));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        return productRepository.findById(id).map(product -> {
            productRepository.delete(product);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}