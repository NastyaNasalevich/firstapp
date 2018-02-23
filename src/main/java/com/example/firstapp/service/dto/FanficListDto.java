package com.example.firstapp.service.dto;

import com.example.firstapp.model.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Component
public class FanficListDto {

    private Long id;
    private String title;
    private String creatorUser;
    private String creationDate;
    private String description;
    private String genre;
    private String image;
    private List<Tag> tags;
    private List<Chapter> chapters;
}
