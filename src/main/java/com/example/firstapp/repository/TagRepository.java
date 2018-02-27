package com.example.firstapp.repository;

import com.example.firstapp.model.Fanfic;
import com.example.firstapp.model.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {

    Tag findByTagName(String tagName);
//
//    @Query(value = "SELECT * FROM posts_tags, tags " +
//            "WHERE posts_tags.tag_id = tags.tag_id " +
//            "GROUP BY posts_tags.tag_id " +
//            "ORDER BY COUNT(posts_tags.post_id) DESC LIMIT 10", nativeQuery = true)
//    List<Tag> findPopular();
//
//    @Query("select t.projects from Tag t where t.tagName = :tagNameParam order by t.id desc")
//    Page<Fanfic> findTagedProjectsOrderByIdDesc(@Param("tagNameParam") String tagNameParam, Pageable pageable);

}
