package com.example.firstapp.service.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
public class RegistrationRequestDto implements Dto {
    private String email;
    private String password;
    private String username;
}
