package com.example.firstapp.controller;

import com.example.firstapp.model.Chapter;
import com.example.firstapp.model.User;
import com.example.firstapp.security.model.JwtAuthenticationToken;
import com.example.firstapp.service.ChapterService;
import com.example.firstapp.service.CommentService;
import com.example.firstapp.service.TagService;
import com.example.firstapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/fanficId}/chapters", produces = MediaType.APPLICATION_JSON_VALUE)
public class ChapterController {

    private final ChapterService chapterService;

//    @PostMapping(value = "/createPost")
//    @ResponseBody
//    public Long addChapter(@RequestBody Chapter chapter, JwtAuthenticationToken token) {
//        UserContext userContext = (UserContext) token.getPrincipal();
//        Optional<User> userOptional = userService.getByUsername(userContext.getUsername());
//        if(userOptional.isPresent()){
//            post.setDate(new Timestamp(new Date().getTime()));
//            post.setOwner(userOptional.get());
//            post.setTags(tagService.addAllTag(post.getTags()));
//            Long id = postService.addPost(post);
//            return id;
//        }
//        return -1L;
//    }

    @GetMapping(value = "/chapter")
    @ResponseBody
    public Chapter getChapterById(@RequestParam Long id) {
        return chapterService.getChapter(id);
    }

//    @RequestMapping(value = "/post/user", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
//    @ResponseBody
//    public User getUserByPostId(@RequestParam Long id) {
//        User user = chapterService.getChapter(id).getOwner();
//        return user;
//    }


//
//    @GetMapping(value = "/post/delete")
//    @ResponseBody
//    public boolean deletePost(@RequestParam Long id, JwtAuthenticationToken token) {
//        UserContext userContext = (UserContext) token.getPrincipal();
//        Optional<User> user = userService.getByUsername(userContext.getUsername());
//        if(user.isPresent() && (token.getAuthorities().contains(new SimpleGrantedAuthority("admin")) || user.get().getUsername().equals(userContext.getUsername()))){
//            postService.deletePost(id);
//            return true;
//        }
//        return false;
//    }
//
//
//    @GetMapping(value = "/user/posts")
//    @ResponseBody
//    public List<Post> getUserPosts(@RequestParam Long id, JwtAuthenticationToken token) {
//        UserContext userContext = (UserContext) token.getPrincipal();
//        User user = userService.getUser(id);
//        if(user != null && (token.getAuthorities().contains(new SimpleGrantedAuthority("admin")) || user.getUsername().equals(userContext.getUsername()))){
//            return postService.getPostsByUserId(user);
//        }
//        return null;
//    }
//
//    @GetMapping(value = "/posts/last")
//    @ResponseBody
//    public List<Post> getLastPosts(@RequestParam int page) {
//        return postService.getLastPosts(page);
//    }
//
//    @GetMapping(value = "/posts/tag")
//    @ResponseBody
//    public List<Post> getPostsByTag(@RequestParam String name) {
//        return postService.getPostsByTagName(name);
//    }
//
//    @GetMapping(value = "/posts/popular")
//    @ResponseBody
//    public List<Post> getPopularPosts() {
//        return postService.getPopularPosts();
//    }
//
//    @GetMapping(value = "/search")
//    @ResponseBody
//    public List<Post> getPostsSearch(@RequestParam String param) {
//        return postService.findFullText(param);
//    }
}
