package com.example.firstapp.model;

import lombok.*;
import org.hibernate.search.annotations.Field;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "tags")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "tag_id")
    private Long id;

    @ManyToMany(mappedBy = "tags", cascade = {CascadeType.REFRESH, CascadeType.MERGE, CascadeType.DETACH, CascadeType.PERSIST},
            fetch = FetchType.LAZY)
    private List<Fanfic> fanfics;

    @Column(name = "tag_name")
    @Field
    private String tagName;

}
