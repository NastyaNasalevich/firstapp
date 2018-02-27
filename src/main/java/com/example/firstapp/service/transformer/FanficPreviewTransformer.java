package com.example.firstapp.service.transformer;

import com.example.firstapp.model.Fanfic;
import com.example.firstapp.service.dto.FanficPreviewDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

//@Component
public class FanficPreviewTransformer {

//    private final FanficPreviewDto fanficPreviewDto;
//
//    public FanficPreviewDto makeDto(final Fanfic fanfic) {
//        FanficPreviewDto dto = new FanficPreviewDto();
//        dto.setTitle(fanfic.getTitle());
//        dto.setCreatorUser(fanfic.getCreatorUser().getUsername());
//        dto.setCreationDate(new SimpleDateFormat("dd-MM-yyyy HH:mm").format(fanfic.getCreationDate()));
//        dto.setDescription(fanfic.getDescription());
//        dto.setGenre(fanfic.getGenre().name());
//        dto.setImage(fanfic.getImage());
//        return dto;
//    }
//
//    public List<FanficPreviewDto> makeDtoList(List<Fanfic> fanfics) {
//        List<FanficPreviewDto> fanficPreviewDtos = new ArrayList<>();
//        for (Fanfic fanfic : fanfics) {
//            FanficPreviewDto dto = this.fanficPreviewDto.makeDto(fanfic);
//            fanficPreviewDtos.add(dto);
//        }
//        return fanficPreviewDtos;
//    }
}
