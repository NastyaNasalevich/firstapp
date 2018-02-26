package com.example.firstapp.service;

import com.example.firstapp.model.Comment;
import com.example.firstapp.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;

    public void addComment(Comment comment) {
        commentRepository.save(comment);
    }

    public Comment getComment(Long id) {
        return commentRepository.findOne(id);
    }

    public void deleteComment(Long id) {
        commentRepository.delete(id);
    }

}
