package com.example.firstapp.service.transformer;

import com.example.firstapp.model.UnconfirmedUser;
import com.example.firstapp.service.dto.RegistrationRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.security.SecureRandom;

@Component
@RequiredArgsConstructor
public class UnconfirmedUserTransformer {

    private int registrationExpirationTime = 1000000;

    public UnconfirmedUser makeEntity(RegistrationRequestDto registrationRequestDto) {
        UnconfirmedUser unconfirmedUser = new UnconfirmedUser();

        unconfirmedUser.setExpirationTime(registrationExpirationTime);
        unconfirmedUser.setUsername(registrationRequestDto.getUsername());
        unconfirmedUser.setEmail(registrationRequestDto.getEmail());
        unconfirmedUser.setPassword(registrationRequestDto.getPassword());
        unconfirmedUser.setRegistrationHash(createHash(unconfirmedUser.getUsername()));

        return unconfirmedUser;
    }

    private String createHash(String username) {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(11, new SecureRandom());
        String hash = bCryptPasswordEncoder.encode(username);
        return hash;
    }

}
