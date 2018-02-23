package com.example.firstapp.controller;

import com.example.firstapp.service.UserService;
import com.example.firstapp.service.dto.UserListDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/users", produces = MediaType.APPLICATION_JSON_VALUE)
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class UserController {

    private final UserService userService;

    @GetMapping
    @ResponseStatus(value = HttpStatus.OK)
    public List<UserListDto> finalAll(
    ) {
        return this.userService.findAll();
    }


    @PostMapping(value = "/block")
    public Boolean blockUsers(@RequestBody List<UserListDto> users) {
        return userService.setBlockingStatus(users, true);
    }

    @PostMapping(value = "/unblock")
    public Boolean unblockUsers(@RequestBody List<UserListDto> users) {
        return userService.setBlockingStatus(users, false);
    }

    @DeleteMapping(value = "/delete")
    @ResponseStatus(value = HttpStatus.OK)
    public void deleteCurrentUser() {
        userService.deleteCurrentUser();
    }

}
