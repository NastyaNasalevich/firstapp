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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;


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

        checkEmailExist(registrationRequest.getEmail());
        checkUsernameExist(registrationRequest.getUsername());
        UnconfirmedUser unconfirmedUser = unconfirmedUserTransformer.makeEntity(registrationRequest);
        Object check = unconfirmedUserRepository.save(unconfirmedUser);
        if(check != null) {
            sendConfirmationMessage(unconfirmedUser.getEmail(), unconfirmedUser.getRegistrationHash());
            return new RegistrationResponseDto(RegistrationResponseStatus.OK.name());
        } else {
            throw new RegistrationException("Saving of registration data was unsuccessful.");
        }
    }

    public void confirm(String confirmationHash) {
        UnconfirmedUser unconfirmedUser = unconfirmedUserRepository.findByRegistrationHash(confirmationHash);
        User user = registrationUserTransformer.makeEntity(unconfirmedUser);
        userRepository.save(user);
        unconfirmedUserRepository.deleteByEmail(unconfirmedUser.getEmail());
    }

    private void checkEmailExist(String email) {
        User user = userRepository.findUserByEmail(email);
        if (user != null) {
            throw new RegistrationException("User with such email already exist.");
        }

        UnconfirmedUser unconfirmedUser = unconfirmedUserRepository.findByEmail(email);
        if(unconfirmedUser != null) {
            unconfirmedUserRepository.deleteByEmail(email);
        }
    }

    private void checkUsernameExist(String username) {
        User user = userRepository.findUserByUsername(username);
        if (user != null) {
            throw new RegistrationException("User with such username already exist.");
        }
        UnconfirmedUser unconfirmedUser = unconfirmedUserRepository.findByUsername(username);
        if (unconfirmedUser != null) {
            throw new RegistrationException("User with such username already exist.");
        }
    }

    private void sendConfirmationMessage(String to, String registrationHash) {
        MimeMessage message = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject("Please confirm your email address");
            helper.setText("<html><body>To confirm registration go to: <a href='http://localhost:4200/confirm?registrationHash=" + registrationHash+"'>Confirm login</a></body></html>", true);
            sendEmail(message, to);
        } catch (MessagingException e) {
            unconfirmedUserRepository.deleteByEmail(to);
            throw new RegistrationException("Cannot send mail.\n" +
                    "Registration data deleted.\nRecipient : " + to);
        }
    }

    private void sendEmail(MimeMessage message, String to) {
        try {
            javaMailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
            unconfirmedUserRepository.deleteByEmail(to);
            throw new RegistrationException("Cannot send mail.\n" +
                    "Registration data deleted.\nRecipient : " + to);
        }
    }
}
