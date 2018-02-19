package com.example.firstapp.service.transformer;

import com.example.firstapp.model.UnconfirmedUser;
import com.example.firstapp.model.User;
import com.example.firstapp.model.UserRole;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RegistrationUserTransformer {

    private final PasswordEncoder passwordEncoder;

    public UnconfirmedUser makeDto(User user) {
        throw new UnsupportedOperationException();
    }

    public User makeEntity(UnconfirmedUser unconfirmedUser) {
        User user = new User();
        user.setUsername(unconfirmedUser.getUsername());
        user.setPassword(passwordEncoder.encode(unconfirmedUser.getPassword()));
        user.setEmail(unconfirmedUser.getEmail());
        user.setRole(UserRole.ROLE_USER);
        return user;
    }
}
