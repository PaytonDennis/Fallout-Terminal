package com.example.backend;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class FoodStorageServiceTest {

    @Mock
    private FoodStorageRepository repository;

    @InjectMocks
    private FoodStorageService service;

    @Test
    void findAll_returnsFoodStorageFromRepository() {
        FoodStorage food = new FoodStorage();
        food.setName("Rice");
        when(repository.findAll()).thenReturn(List.of(food));

        List<FoodStorage> result = service.findAll();

        assertEquals(1, result.size());
        assertEquals("Rice", result.get(0).getName());
    }

    @Test
    void findById_whenFound_returnsFoodStorage() {
        FoodStorage food = new FoodStorage();
        food.setId(1L);
        when(repository.findById(1L)).thenReturn(Optional.of(food));

        FoodStorage result = service.findById(1L);

        assertEquals(1L, result.getId());
    }

    @Test
    void findById_whenMissing_throwsRuntimeException() {
        when(repository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> service.findById(99L));
    }

    @Test
    void save_delegatesToRepositoryAndReturnsResult() {
        FoodStorage food = new FoodStorage();
        food.setName("Purified Water");
        when(repository.save(food)).thenReturn(food);

        FoodStorage result = service.save(food);

        assertEquals("Purified Water", result.getName());
        verify(repository).save(food);
    }

    @Test
    void delete_callsRepositoryDeleteById() {
        service.delete(5L);

        verify(repository).deleteById(5L);
    }
}
