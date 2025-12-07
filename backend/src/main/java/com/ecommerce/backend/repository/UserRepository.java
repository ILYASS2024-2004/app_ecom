package com.ecommerce.backend.repository;

import com.ecommerce.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // Méthode magique pour trouver quelqu'un par son email
    Optional<User> findByEmail(String email);
}