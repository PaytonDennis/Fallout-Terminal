package com.example.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;

public class DisplayMessageTest {

    @Test
    void getMainMessage_returnsExpectedGreeting() {
        DisplayMessage displayMessage = new DisplayMessage();

        String result = displayMessage.getMainMessage();

        assertEquals("Backend is functional ", result);
    }
}

