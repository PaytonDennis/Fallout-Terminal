package com.example.backend;

import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class VaultDwellerServiceTest {

    @Mock
    private VaultDwellerRepository repository;

    @InjectMocks
    private VaultDwellerService service;

}
