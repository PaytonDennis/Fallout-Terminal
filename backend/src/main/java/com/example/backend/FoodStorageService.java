package com.example.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FoodStorageService {
    @Autowired
    private FoodStorageRepository repository;


     public List<FoodStorage> findAll() {
        return repository.findAll();
    }

    public FoodStorage findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food Storage not found"));
    }

    public FoodStorage save(FoodStorage foodStorage) {
        return repository.save(foodStorage);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
