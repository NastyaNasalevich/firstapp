package com.example.firstapp.controller;

import com.example.firstapp.service.TagService;
import com.example.firstapp.service.dto.TagDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping(value = "/tags")
@RequiredArgsConstructor
public class TagController {

    private final TagService tagService;

    @GetMapping(value = "/all")
    public List<TagDto> getTags() {
        return  tagService.getAllTags();
    }


    @GetMapping(value = "/tag/{tagName}")
    public Map<String, Object> getFanficsByTags(@PathVariable String tagName) {
        return tagService.findFanficsNextPageByTag(tagName);
    }
}
