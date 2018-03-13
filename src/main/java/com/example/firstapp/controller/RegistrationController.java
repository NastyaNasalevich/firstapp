package com.example.firstapp.controller;

import com.example.firstapp.service.RegistrationService;
import com.example.firstapp.service.dto.RegistrationRequestDto;
import com.example.firstapp.service.dto.RegistrationResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/registration", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class RegistrationController {


    private final RegistrationService registrationService;


    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    RegistrationResponseDto registerUser(@RequestBody final RegistrationRequestDto registrationRequestDto) {
        return registrationService.register(registrationRequestDto);
    }

    @PostMapping(value = "/confirm")
    public void confirm(@RequestBody final String registrationHash) {
        registrationService.confirm(registrationHash);
    }
}
