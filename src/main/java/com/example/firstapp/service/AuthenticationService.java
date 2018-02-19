package com.example.firstapp.service;

import com.example.firstapp.model.User;
import com.example.firstapp.repository.UserRepository;
import com.example.firstapp.security.SecurityHelper;
import com.example.firstapp.security.model.JwtUserDetails;
import com.example.firstapp.security.service.AuthenticationHelper;
import com.example.firstapp.service.dto.AuthUserDto;
import com.example.firstapp.service.dto.JsonException;
import com.example.firstapp.service.dto.LoginRequestDto;
import com.example.firstapp.service.dto.LoginResponseDto;
import com.example.firstapp.service.transformer.AuthUserTransformer;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final AuthUserTransformer authUserTransformer;
    private final AuthenticationHelper authenticationHelper;
    private final AuthenticationManager authenticationManager;

    public LoginResponseDto login(final LoginRequestDto loginRequestDto) {
        try {
            String email = Optional.ofNullable(loginRequestDto.getEmail())
                    .orElseThrow(() -> new BadCredentialsException("Email should be passed."));

            String password = Optional.ofNullable(loginRequestDto.getPassword())
                    .orElseThrow(() -> new BadCredentialsException("Password should be passed."));

            UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(email,
                    password);

            // Try to authenticate with this token
            final Authentication authResult = this.authenticationManager.authenticate(authRequest);

            // Set generated JWT token to response header
            if (authResult.isAuthenticated()) {
                JwtUserDetails userDetails = (JwtUserDetails) authResult.getPrincipal();

                User user = userRepository.findOne(userDetails.getId());
                if (Objects.isNull(user)) {
                    throw new JsonException("User not exist in system.");
                }

                String token = this.authenticationHelper.generateToken(userDetails.getId());

                return new LoginResponseDto(token);
            } else {
                throw new JsonException("Authentication failed.");
            }

        } catch (BadCredentialsException exception) {
            throw new JsonException("Email or password was incorrect. Please try again.", exception);
        }
    }

    /**
     * Get user info.
     * @return user info.
     */
    @Transactional(readOnly = true)
    public AuthUserDto getMe() {
        Authentication authentication = SecurityHelper.getAuthenticationWithCheck();
        User byEmail = userRepository.findByEmail(authentication.getName());

        return authUserTransformer.makeDto(byEmail);
    }
}
