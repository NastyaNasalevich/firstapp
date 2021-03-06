package com.example.firstapp.security.exception;

import org.springframework.security.core.AuthenticationException;


public class ExpiredTokenAuthenticationException extends AuthenticationException {

    public ExpiredTokenAuthenticationException() {
        super("Authentication token is expired.");
    }
}
