package com.example.firstapp;

import com.example.firstapp.configuration.SecurityConfiguration;
import com.example.firstapp.configuration.WebConfiguration;
import com.example.firstapp.model.User;
import com.example.firstapp.model.UserRole;
import com.example.firstapp.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
@Import({ SecurityConfiguration.class, WebConfiguration.class })
public class FirstappApplication {

	public static void main(String[] args) {
		SpringApplication.run(FirstappApplication.class, args);
	}


}
