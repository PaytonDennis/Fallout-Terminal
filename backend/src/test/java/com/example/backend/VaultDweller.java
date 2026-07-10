package com.example.backend;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class VaultDweller {
    @Id
    @GeneratedValue

    private String Name;
    private int Age;
    private String Occupation;
}
