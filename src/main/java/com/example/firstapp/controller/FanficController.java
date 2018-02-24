package com.example.firstapp.controller;

import com.example.firstapp.model.User;
import com.example.firstapp.repository.UserRepository;
import com.example.firstapp.security.model.JwtAuthenticationToken;
import com.example.firstapp.security.model.JwtUserDetails;
import com.example.firstapp.service.FanficService;
import com.example.firstapp.service.TagService;
import com.example.firstapp.service.dto.FanficListDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/fanfics", produces = MediaType.APPLICATION_JSON_VALUE)
public class FanficController {

    private final FanficService fanficService;
    private final TagService tagService;
    private final UserRepository userRepository;

    @GetMapping(value = "/{fanficId}")
    public FanficListDto getFanfic(@PathVariable Long fanficId) {
        return fanficService.getFullFanfic(fanficId);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping(value = "/my")
    public List<FanficListDto> getMyFanfics() {
        return fanficService.getMyFanfics();
    }


    @PreAuthorize("isAuthenticated()")
    @PostMapping(value = "/create")
    public Boolean createFanfic(@RequestBody FanficListDto fanficListDto, JwtAuthenticationToken token) {
        JwtUserDetails jwtUserDetails = (JwtUserDetails) token.getPrincipal();
        User user = userRepository.findUserByUsername(jwtUserDetails.getUsername());
        if(user !=null) {
            return fanficService.createFanfic(fanficListDto, user);
        }
        return false;
    }


    @PreAuthorize("isAuthenticated()")
    @PostMapping(value = "/update")
    public Boolean updateFanfic(@RequestBody FanficListDto fanficListDto, JwtAuthenticationToken token) {
        JwtUserDetails jwtUserDetails = (JwtUserDetails) token.getPrincipal();
        User user = userRepository.findUserByUsername(jwtUserDetails.getUsername());
        if(user !=null) {
            return fanficService.updateFanfic(fanficListDto, user);
        }
        return false;
    }

    @GetMapping(value = "/delete", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public boolean deletePost(@RequestParam Long id, JwtAuthenticationToken token) {
        JwtUserDetails jwtUserDetails = (JwtUserDetails) token.getPrincipal();
        User user = userRepository.findUserByUsername(jwtUserDetails.getUsername());
        if(user !=null && (token.getAuthorities().contains(new SimpleGrantedAuthority("admin")) || user.getUsername().equals(jwtUserDetails.getUsername()))){
            fanficService.deleteFanfic(id);
            return true;
        }
        return false;
    }

    @GetMapping(value = "/main_page")
    public Map<String, Object> getMainPageFanfics() {
        return fanficService.getMainPageFanfics();
    }
}
