package com.example.firstapp.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/fanficId}/chapters", produces = MediaType.APPLICATION_JSON_VALUE)
public class ChapterController {
}
