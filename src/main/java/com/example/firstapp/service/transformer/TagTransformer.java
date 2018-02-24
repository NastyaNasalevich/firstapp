package com.example.firstapp.service.transformer;

import com.example.firstapp.model.Tag;
import com.example.firstapp.service.dto.TagDto;

public class TagTransformer {

    public TagDto makeDto(final Tag tag) {
        TagDto dto = new TagDto();
        dto.setValue(tag.getTagName());

        return dto;
    }
}
