package com.example.firstapp.service.transformer;

import com.example.firstapp.model.Fanfic;
import com.example.firstapp.service.dto.FanficPreviewDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;

@Component
@RequiredArgsConstructor
public class FanficPreviewTransformer {

    public FanficPreviewDto makeDto(final Fanfic fanfic) {
        FanficPreviewDto dto = new FanficPreviewDto();
        dto.setTitle(fanfic.getTitle());
        dto.setCreatorUser(fanfic.getCreatorUser().getUsername());
        dto.setCreationDate(new SimpleDateFormat("dd-MM-yyyy HH:mm").format(fanfic.getCreationDate()));
        dto.setDescription(fanfic.getDescription());
        dto.setGenre(fanfic.getGenre().name());
        dto.setImage(fanfic.getImage());
        return dto;
    }
}
