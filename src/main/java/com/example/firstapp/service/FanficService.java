package com.example.firstapp.service;

import com.example.firstapp.exceptions.FanficSavingException;
import com.example.firstapp.model.Fanfic;
import com.example.firstapp.model.User;
import com.example.firstapp.repository.FanficRepository;
import com.example.firstapp.repository.TagRepository;
import com.example.firstapp.repository.UserRepository;
import com.example.firstapp.security.SecurityHelper;
import com.example.firstapp.security.model.JwtUserDetails;
import com.example.firstapp.service.dto.FanficListDto;
import com.example.firstapp.service.dto.FanficPreviewDto;
import com.example.firstapp.service.transformer.FanficListTransformer;
import com.example.firstapp.service.transformer.FanficPreviewTransformer;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
public class FanficService {

    private final FanficRepository fanficRepository;
    private final FanficListTransformer fanficListTransformer;
    private final FanficPreviewTransformer fanficPreviewTransformer;

    private Pageable newFanfics = new PageRequest(0, 8);

    public FanficListDto getFullFanfic(Long id) {
        return fanficListTransformer.makeDto(fanficRepository.findOne(id));
    }

    public List<FanficListDto> getMyFanfics() {
        JwtUserDetails userDetails = (JwtUserDetails) SecurityHelper.getAuthenticationWithCheck().getPrincipal();
        List<Fanfic> fanfics = fanficRepository.findAllByCreatorUserId(userDetails.getId());
        List<FanficListDto> fanficDtoList = new ArrayList<>();
        for (Fanfic fanfic : fanfics) {
            FanficListDto dto = this.fanficListTransformer.makeDto(fanfic);
            fanficDtoList.add(dto);
        }
        return fanficDtoList;
    }

    public Boolean createFanfic(FanficListDto fanficListDto, User user) {
        boolean success = fanficRepository.save(fanficListTransformer.makeEntity(fanficListDto, user)) != null;
        if (!success) {
            throw new FanficSavingException("Error through saving Fanfic to database.");
        }
        return true;
    }

    public Boolean updateFanfic(FanficListDto fanficListDto, User user) {
        Fanfic fanfic = fanficListTransformer.makeEntity(fanficListDto, user);
        fanfic.setId(fanficListDto.getId());
        fanficRepository.saveAndFlush(fanfic);
        return true;
    }

    public Map<String, Object> getMainPageFanfics() {
        Map<String, Object> result = new HashMap<>();
        Page<Fanfic> newFanficCurrentPage = fanficRepository.findAllByOrderByIdDesc(newFanfics);
        result.put("page", fanficPreviewTransformer.makeDtoList(newFanficCurrentPage.getContent()));
        newFanfics = isLastPageCheck(newFanficCurrentPage, result) ?
                newFanfics.first() : newFanfics.next();
        return result;
    }

    private boolean isLastPageCheck(Page<Fanfic> page, Map<String, Object> result) {
        result.put("last", !page.hasNext());
        return !page.hasNext();
    }
}
