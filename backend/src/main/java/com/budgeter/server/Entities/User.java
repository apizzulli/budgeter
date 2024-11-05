package com.budgeter.server.Entities;
import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name="Users")
public class User {

    private @Id @GeneratedValue Long id;
    private String username;
    private String password;

    @OneToOne(cascade = CascadeType.ALL)
    @OneToMany List<Budget> budgets;

    public User(){}
    public User(Long id, String username, String password, List<Budget> budgets) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.budgets = budgets;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Budget> getBudgets() {
        return budgets;
    }

    public void setBudgets(List<Budget> budgets) {
        this.budgets = budgets;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

}
