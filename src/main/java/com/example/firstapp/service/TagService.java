package com.example.firstapp.service;

import com.example.firstapp.model.Fanfic;
import com.example.firstapp.model.Tag;
import com.example.firstapp.repository.TagRepository;
import com.example.firstapp.service.dto.TagDto;
import com.example.firstapp.service.transformer.FanficPreviewTransformer;
import com.example.firstapp.service.transformer.TagTransformer;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class TagService {


//    private final FanficPreviewTransformer fanficPreviewTransformer;
    private final TagTransformer tagTransformer;
    private final TagRepository tagRepository;

//    Pageable fanficsPageable = new PageRequest(0, 8);
//    Page<Fanfic> fanficsPage;


    public List<TagDto> getAllTags() {
        List<Tag> tags = tagRepository.findAll();
        List<TagDto> tagDtos = new ArrayList<>();
        for (Tag tag : tags) {
            TagDto dto = this.tagTransformer.makeDto(tag);
            tagDtos.add(dto);
        }
        return tagDtos;
    }

//    public Map<String, Object> findFanficsNextPageByTag(String tagName) {
//        Map<String, Object> result = new HashMap<>();
//        fanficsPage = tagRepository.findTagedProjectsOrderByIdDesc(tagName, fanficsPageable);
//        fanficsPageable = chooseNextPage(fanficsPage, result, fanficsPageable);
//        result.put("page", fanficPreviewTransformer.makeDtoList(fanficsPage.getContent()));
//        return result;
//    }
//
//    private Pageable chooseNextPage(Page<Fanfic> projectsPage, Map<String, Object> result, Pageable pageable) {
//        return isLastPageCheck(projectsPage, result) ? pageable.first() : pageable.next();
//    }
//
//    private boolean isLastPageCheck(Page<Fanfic> page, Map<String, Object> result) {
//        result.put("last", !page.hasNext());
//        return !page.hasNext();
//    }

    public List<Tag> addAllTag(List<Tag> tags) {
        List<Tag> resultList = new ArrayList<Tag>();
        for (Tag tag: tags) {
            Tag tempTag = tagRepository.findByTagName(tag.getTagName());
            if(tempTag == null){
                resultList.add(tagRepository.save(tag));
            }
            else {
                resultList.add(tempTag);
            }
        }
        return resultList;
    }
}
