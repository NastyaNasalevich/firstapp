package com.example.firstapp.repository;

import com.example.firstapp.model.Fanfic;
import com.example.firstapp.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FanficRepository extends JpaRepository<Fanfic, Long> {

    List<Fanfic> findAllByCreatorUserId(Long id);

    Page<Fanfic> findAllByOrderByIdDesc(Pageable pageable);
}
