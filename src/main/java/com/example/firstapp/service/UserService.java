package com.example.firstapp.service;

import com.example.firstapp.model.User;
import com.example.firstapp.repository.UserRepository;
import com.example.firstapp.security.SecurityHelper;
import com.example.firstapp.service.dto.UserListDto;
import com.example.firstapp.service.transformer.UserListTransformer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserListTransformer userListTransformer;

    @Transactional(readOnly = true)
    public List<UserListDto> findAll() {
        List<User> users = userRepository.findAll();

        List<UserListDto> userDtoList = new ArrayList<>();
        for (User user : users) {
            UserListDto dto = this.userListTransformer.makeDto(user);
            userDtoList.add(dto);
        }

        return userDtoList;
    }

    public void deleteCurrentUser() {
        User user = userRepository.findUserByUsername(SecurityHelper.getAuthenticationWithCheck().getName());
        userRepository.deleteUserByUsername(user.getUsername());
    }


//    @Transactional
//    public boolean setBlockingStatus(List<UserListDto> users, boolean block) {
//        for (UserListDto user: users) {
//            userRepository.setBlockChanges(block, user.getId());
//        }
//        return true;
//    }

}
