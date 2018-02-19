package com.example.firstapp.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "unconfirmed_registration_data")
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class UnconfirmedUser {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "email")
    private String email;

    @Column(name = "image")
    private String image;

    @Column(name = "expiration_time")
    private int expirationTime;

    @Column(name = "registration_hash")
    private String registrationHash;
}
