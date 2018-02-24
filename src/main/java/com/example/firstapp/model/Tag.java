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
    @Column(name = "id")
    private Long id;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "fanfics_tags", joinColumns = @JoinColumn(name = "tag_id"),
            inverseJoinColumns = @JoinColumn(name = "fanfic_id"))
    private List<Fanfic> fanfics;

    @Column(name = "tag_name")
    @Field
    private String tagName;
}
