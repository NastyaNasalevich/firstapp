package com.example.firstapp.controller;

import com.example.firstapp.service.RegistrationService;
import com.example.firstapp.service.dto.RegistrationRequestDto;
import com.example.firstapp.service.dto.RegistrationResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/registration", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class RegistrationController {


    private final RegistrationService registrationService;


    @PostMapping
    public RegistrationResponseDto registerUser(@RequestBody final RegistrationRequestDto registrationRequestDto) {
        return registrationService.register(registrationRequestDto);
    }

    @GetMapping(value = "/{registrationHash}")
    public String confirm(@PathVariable String registrationHash) {
        registrationService.confirm(registrationHash);
        return "redirect:http://localhost:8082/confirm";
    }
}
