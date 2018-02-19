package com.example.firstapp.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "unconfirmedUser")
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

    @Column(name = "registration_hash")
    private String registrationHash;
}
