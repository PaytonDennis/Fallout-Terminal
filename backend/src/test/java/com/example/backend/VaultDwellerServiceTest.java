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
class VaultDwellerServiceTest {

    @Mock
    private VaultDwellerRepository repository;

    @InjectMocks
    private VaultDwellerService service;

    @Test
    void findAll_returnsDwellersFromRepository() {
        VaultDweller dweller = new VaultDweller();
        dweller.setName("Butch");
        when(repository.findAll()).thenReturn(List.of(dweller));

        List<VaultDweller> result = service.findAll();

        assertEquals(1, result.size());
        assertEquals("Butch", result.get(0).getName());
    }

    @Test
    void findById_whenFound_returnsDweller() {
        VaultDweller dweller = new VaultDweller();
        dweller.setId(1L);
        when(repository.findById(1L)).thenReturn(Optional.of(dweller));

        VaultDweller result = service.findById(1L);

        assertEquals(1L, result.getId());
    }

    @Test
    void findById_whenMissing_throwsRuntimeException() {
        when(repository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> service.findById(99L));
    }

    @Test
    void save_delegatesToRepositoryAndReturnsResult() {
        VaultDweller dweller = new VaultDweller();
        dweller.setName("Amata");
        when(repository.save(dweller)).thenReturn(dweller);

        VaultDweller result = service.save(dweller);

        assertEquals("Amata", result.getName());
        verify(repository).save(dweller);
    }

    @Test
    void delete_callsRepositoryDeleteById() {
        service.delete(5L);

        verify(repository).deleteById(5L);
    }
}
