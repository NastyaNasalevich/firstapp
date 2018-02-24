package com.example.firstapp.service.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class UserListDto implements Dto {

    private long id;
    private String username;
    private String role;
    private Set<FanficListDto> projects;

}
