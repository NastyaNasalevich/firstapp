package com.example.firstapp.service;

import com.example.firstapp.model.Chapter;
import com.example.firstapp.repository.ChapterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ChapterService {

    private final ChapterRepository chapterRepository;

    public Chapter getChapter(Long id) {
        return chapterRepository.findOne(id);
    }
}
