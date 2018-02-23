package com.example.firstapp.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.search.annotations.IndexedEmbedded;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "chapters")
public class Chapter {

    @Id
    @GeneratedValue
    private Long id;

    private String title;

    @Lob
    private String content;

    private String imageURL;

    @OneToMany(targetEntity = Comment.class, fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @IndexedEmbedded
    private List<Comment> comments;

    @OneToMany(mappedBy = "id.fanfic", cascade = CascadeType.ALL)
    private List<Rating> ratings;
}
