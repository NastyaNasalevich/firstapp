package com.example.firstapp.repository;

import com.example.firstapp.model.User;
import com.example.firstapp.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findUserByEmail(String email);
    User findUserByUsername(String username);
    User deleteUserByUsername(String username);


    @Modifying
    @Query("update User u set u.isBlocked = ?1 where u.id = ?2")
    void setBlockChanges(Boolean isBlocked, Long id);

    @Query("update User u set u.role = ?1 where u.id = ?2")
    User setRoleChanges(UserRole role, Long id);
}
