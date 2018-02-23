package com.example.firstapp.model;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Transient;

public class Rating {
    private RatingId id;

    @Column(name = "amount")
    private int amount;

    @EmbeddedId
    public RatingId getId() {
        return id;
    }

    public void setId(RatingId id) {
        this.id = id;
    }

    @Transient
    public User getUser() {
        return this.id.getUser();
    }

    @Transient
    public Project getProject() {
        return this.id.getProject();
    }

    public void setUser(User user) {
        this.id.setUser(user);
    }

    public void setProject(Project project) {
        this.id.setProject(project);
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }
}
