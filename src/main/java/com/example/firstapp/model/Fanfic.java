package com.example.firstapp.model;

import lombok.*;
import org.hibernate.annotations.Type;
import org.hibernate.search.annotations.Indexed;
import org.hibernate.search.annotations.IndexedEmbedded;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "fanfics")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Indexed
public class Fanfic {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @ManyToOne
    @JoinColumn(name = "creator_user")
    private User creatorUser;

    @Column(name = "creation_date")
    private Date creationDate;

    @Column(name = "description")
    @Type(type = "text")
    private String description;

    @Column(name = "genre")
    @Enumerated(value = EnumType.STRING)
    private Genre genre;

    @Column(name = "image")
    private String image;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "fanfics_tags", joinColumns = @JoinColumn(name = "fanfic_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id"))
    @IndexedEmbedded
    private List<Tag> tags;

    @OneToMany(mappedBy = "mainFanfic", fetch = FetchType.LAZY)
    private List<Chapter> chapters;
}
