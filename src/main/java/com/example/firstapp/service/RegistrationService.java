package com.example.firstapp.service;

import com.example.firstapp.model.RegistrationResponseStatus;
import com.example.firstapp.model.UnconfirmedUser;
import com.example.firstapp.model.User;
import com.example.firstapp.repository.UnconfirmedUserRepository;
import com.example.firstapp.repository.UserRepository;
import com.example.firstapp.security.exception.RegistrationException;
import com.example.firstapp.service.dto.RegistrationRequestDto;
import com.example.firstapp.service.dto.RegistrationResponseDto;
import com.example.firstapp.service.transformer.RegistrationUserTransformer;
import com.example.firstapp.service.transformer.UnconfirmedUserTransformer;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.Optional;


@Service
@Transactional
@RequiredArgsConstructor
public class RegistrationService {

    private final JavaMailSender javaMailSender;
    private final UserRepository userRepository;
    private final RegistrationUserTransformer registrationUserTransformer;
    private final UnconfirmedUserRepository unconfirmedUserRepository;
    private final UnconfirmedUserTransformer unconfirmedUserTransformer;


    public RegistrationResponseDto register(RegistrationRequestDto registrationRequest) {

        String email = Optional.ofNullable(registrationRequest.getEmail())
                .orElseThrow(() -> new BadCredentialsException("Email should be passed."));

        String password = Optional.ofNullable(registrationRequest.getPassword())
                .orElseThrow(() -> new BadCredentialsException("Password should be passed."));

        String username = Optional.ofNullable(registrationRequest.getUsername())
                .orElseThrow(() -> new BadCredentialsException("Username should be passed."));

        checkEmailExist(email);
        UnconfirmedUser unconfirmedUser = unconfirmedUserTransformer.makeEntity(registrationRequest);
        unconfirmedUserRepository.save(unconfirmedUser);
        sendConfirmationMessage(unconfirmedUser.getEmail(), unconfirmedUser.getRegistrationHash());
        return new RegistrationResponseDto(RegistrationResponseStatus.OK.name());
    }

    public void confirm(String confirmationHash) {
        UnconfirmedUser unconfirmedUser = unconfirmedUserRepository.findByRegistrationHash(confirmationHash);
        User user = registrationUserTransformer.makeEntity(unconfirmedUser);
        userRepository.save(user);
        unconfirmedUserRepository.deleteByEmail(unconfirmedUser.getEmail());
    }

    private void checkEmailExist(String email) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            throw new RegistrationException("User with such email already exist.");
        }

        UnconfirmedUser unconfirmedUser = unconfirmedUserRepository.findByEmail(email);
        if(unconfirmedUser != null) {
            unconfirmedUserRepository.deleteByEmail(email);
        }
    }

    private void sendConfirmationMessage(String to, String registrationHash) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject("Please confirm your email address");
            helper.setText("<html><body>To confirm registration go to: <a href='http://localhost:8080/registration/" + registrationHash+"'>Confirm login</a></body></html>", true);
            javaMailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
            throw new RegistrationException("Cannot send mail.\n" +
                    "Registration data deleted.\nRecipient : " + to);
        }
    }
}
