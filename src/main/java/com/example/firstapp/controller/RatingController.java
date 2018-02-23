package com.example.firstapp.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(value = "/rating")
@RequiredArgsConstructor
public class RatingController {

    private final RatingService ratingService;

    @PreAuthorize("isAuthenticated()")
    @GetMapping(value = "/check/{projectId}")
    public Boolean checkRatingEnable(@PathVariable Long projectId) {
        return ratingService.checkEnable(projectId);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/rate")
    public RatingDto rate(@RequestBody RatingDto ratingDto) {
        return ratingService.rate(ratingDto);
    }
}
