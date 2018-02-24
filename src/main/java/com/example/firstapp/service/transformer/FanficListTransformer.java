package com.example.firstapp.service.transformer;

import com.example.firstapp.model.Fanfic;
import com.example.firstapp.model.Genre;
import com.example.firstapp.model.User;
import com.example.firstapp.repository.UserRepository;
import com.example.firstapp.service.TagService;
import com.example.firstapp.service.dto.FanficListDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class FanficListTransformer {


    private final UserRepository userRepository;
    private final TagService tagService;

    public FanficListDto makeDto(final Fanfic fanfic) {
        FanficListDto dto = new FanficListDto();
        dto.setTitle(fanfic.getTitle());
        dto.setCreatorUser(fanfic.getCreatorUser().getUsername());
        dto.setCreationDate(new SimpleDateFormat("dd-MM-yyyy HH:mm").format(fanfic.getCreationDate()));
        dto.setDescription(fanfic.getDescription());
        dto.setGenre(fanfic.getGenre().name());
        dto.setImage(fanfic.getImage());
        dto.setChapters(fanfic.getChapters());
        dto.setTags(fanfic.getTags());

        return dto;
    }

    public Fanfic makeEntity(FanficListDto fanficListDto, User user) {
        Fanfic fanfic = new Fanfic();
        fanfic.setTitle(fanficListDto.getTitle());
        fanfic.setCreatorUser(user);
        fanfic.setCreationDate(new Timestamp(new Date().getTime()));
        fanfic.setCreatorUser(userRepository.findUserByUsername(fanficListDto.getCreatorUser()));
        fanfic.setDescription(fanficListDto.getDescription());
        fanfic.setGenre(Genre.valueOf(fanficListDto.getGenre()));
        fanfic.setImage(fanficListDto.getImage());
        fanfic.setTags(tagService.addAllTag(fanficListDto.getTags()));

        return fanfic;
    }
}

