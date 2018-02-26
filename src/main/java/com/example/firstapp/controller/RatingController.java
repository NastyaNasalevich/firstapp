package com.example.firstapp.controller;

import com.example.firstapp.model.Rating;
import com.example.firstapp.model.User;
import com.example.firstapp.repository.UserRepository;
import com.example.firstapp.security.model.JwtAuthenticationToken;
import com.example.firstapp.security.model.JwtUserDetails;
import com.example.firstapp.service.RatingService;
import com.example.firstapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin
@RequestMapping(value = "/")
@RequiredArgsConstructor
public class RatingController {


    private final RatingService ratingService;
    private final UserRepository userRepository;
    private final UserService userService;

    @PostMapping(value = "/rating")
    @ResponseBody
    public boolean addPost(@RequestBody Rating rating, JwtAuthenticationToken token) {
        JwtUserDetails jwtUserDetails = (JwtUserDetails) token.getPrincipal();
        User user = userRepository.findUserByUsername(jwtUserDetails.getUsername());
        if(user !=null){
            rating.setUser(user);
            ratingService.addRating(rating);
            return true;
        }
        return false;
    }

    @GetMapping(value = "/checkRating")
    @ResponseBody
    public Rating getRatingValue(@RequestParam Long id, JwtAuthenticationToken token) {
        JwtUserDetails jwtUserDetails = (JwtUserDetails) token.getPrincipal();
        User user = userRepository.findUserByUsername(jwtUserDetails.getUsername());
        if(user !=null){
            return ratingService.isUserRateChapter(user, id);
        }
        return null;
    }
}
