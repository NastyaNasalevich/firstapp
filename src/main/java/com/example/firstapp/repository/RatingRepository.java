package com.example.firstapp.repository;

import com.example.firstapp.model.Chapter;
import com.example.firstapp.model.Rating;
import com.example.firstapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
    List<Rating> findRatingByChapter(Chapter chapter);
    Rating findOneByUserAndChapter(User user, Chapter chapter);
}
