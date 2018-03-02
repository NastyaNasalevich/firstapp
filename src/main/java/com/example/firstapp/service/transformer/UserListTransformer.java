package com.example.firstapp.service.transformer;

import com.example.firstapp.model.User;
import com.example.firstapp.model.UserRole;
import com.example.firstapp.service.dto.RegistrationRequestDto;
import com.example.firstapp.service.dto.UserListDto;
import lombok.NonNull;
import org.springframework.stereotype.Component;

@Component
public class UserListTransformer {

    public UserListDto makeDto(final User user) {
        UserListDto dto = new UserListDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setRole(user.getRole().name());

        return dto;
    }
}
