package com.example.firstapp.security.service;

import com.example.firstapp.model.User;
import com.example.firstapp.repository.UserRepository;
import com.example.firstapp.security.model.JwtUserDetails;
import com.example.firstapp.service.dto.JsonException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class JwtUserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User byEmail = this.userRepository.findByEmail(email);

        return Optional.ofNullable(byEmail)
                .map(JwtUserDetails::new)
                .orElseThrow(() -> new JsonException("User nor found."));
    }
}
