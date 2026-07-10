package com.example.backend;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/food")
public class FoodStorageController {

    @Autowired
    private FoodStorageService service;

    @GetMapping
    public List<FoodStorage> getAll() {
        return service.findAll();
    }

    @PostMapping
    public FoodStorage create(@RequestBody FoodStorage foodStorage) {
        return service.save(foodStorage);
    }

    @PutMapping("/{id}")
    public FoodStorage update(@PathVariable Long id, @RequestBody FoodStorage foodStorage) {
        foodStorage.setId(id);
        return service.save(foodStorage);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
    service.delete(id); 
    }
}