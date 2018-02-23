package com.example.firstapp.service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.sql.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Component
public class FanficPreviewDto {

    private String title;
    private String creatorUser;
    private String creationDate;
    private String description;
    private String genre;
    private String image;
}
