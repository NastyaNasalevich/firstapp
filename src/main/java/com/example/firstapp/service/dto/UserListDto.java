package com.example.firstapp.service.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserListDto implements Dto {

    private long id;
    private String email;
    private String role;

}
