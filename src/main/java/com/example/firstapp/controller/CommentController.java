package com.example.firstapp.controller;

import com.example.firstapp.model.Comment;
import com.example.firstapp.model.User;
import com.example.firstapp.repository.UserRepository;
import com.example.firstapp.security.model.JwtAuthenticationToken;
import com.example.firstapp.security.model.JwtUserDetails;
import com.example.firstapp.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin
@RequestMapping(value = "/fanfic/chapter", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class CommentController {

    private final UserRepository userRepository;
    private final CommentService commentService;

    @PostMapping(value = "/addComment")
    @ResponseBody
    public boolean addComment(@RequestBody Comment comment, JwtAuthenticationToken token) {
        JwtUserDetails jwtUserDetails = (JwtUserDetails) token.getPrincipal();
        User user = userRepository.findUserByUsername(jwtUserDetails.getUsername());
        if(user !=null) {
            comment.setUser(user);
            commentService.addComment(comment);
            return true;
        }
        return false;
    }

    @GetMapping(value = "/comment/delete")
    @ResponseBody
    public boolean deleteComment(@RequestParam Long id, JwtAuthenticationToken token) {
        JwtUserDetails jwtUserDetails = (JwtUserDetails) token.getPrincipal();
        Comment comment = commentService.getComment(id);
        User user = userRepository.findUserByUsername(jwtUserDetails.getUsername());
        if(user !=null && (token.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN")) || user.getUsername().equals(jwtUserDetails.getUsername()))){
                commentService.deleteComment(id);
            return true;
        }
        return false;
    }
}