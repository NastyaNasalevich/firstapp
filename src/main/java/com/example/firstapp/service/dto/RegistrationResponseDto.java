package com.example.firstapp.service.dto;

import com.example.firstapp.model.RegistrationResponseStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Component
public class RegistrationResponseDto {
    private String status;

    public RegistrationResponseDto(RegistrationResponseStatus status) {
        this.status = status.name();
    }
}
