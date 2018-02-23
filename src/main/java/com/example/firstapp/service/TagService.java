package com.example.firstapp.service;

import com.example.firstapp.model.Tag;
import com.example.firstapp.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class TagService {

    @Autowired
    private TagRepository tagRepository;

    public List<Tag> addAllTag(List<Tag> tags) {
        List<Tag> resultList = new ArrayList<Tag>();
        for (Tag tag: tags) {
            Tag tempTag = tagRepository.findByName(tag.getTagName());
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
