package com.example.firstapp.service;

import com.example.firstapp.model.Rating;
import com.example.firstapp.model.User;
import com.example.firstapp.repository.ChapterRepository;
import com.example.firstapp.repository.RatingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
@RequiredArgsConstructor
public class RatingService {

    private final RatingRepository ratingRepository;
    private final ChapterRepository chapterRepository;

    public void addRating(Rating rating) {
        ratingRepository.save(rating);
    }


    public Rating isUserRateChapter(User user, Long postId){
        return ratingRepository.findOneByUserAndChapter(user, chapterRepository.findOne(postId));
    }
}
