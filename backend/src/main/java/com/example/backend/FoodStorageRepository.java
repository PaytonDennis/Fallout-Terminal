package com.example.backend;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodStorageRepository extends JpaRepository<FoodStorage, Long> {
}
