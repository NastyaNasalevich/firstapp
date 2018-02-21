package com.example.firstapp.repository;

import com.example.firstapp.model.UnconfirmedUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UnconfirmedUserRepository extends JpaRepository<UnconfirmedUser, Long> {

    void deleteByEmail(String email);

    UnconfirmedUser findByEmail(String email);
    UnconfirmedUser findByUsername(String username);
    UnconfirmedUser findByRegistrationHash(String registrationHash);
}
