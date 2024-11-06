package com.budgeter.server.Entities;
import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name="users")
public class User {

    private @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;
    private String username;
    private String password;
    @JoinColumn(name="user_id") @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true) List<Budget> budgets;

    public User(){}
    public User(Long id, String username, String password) {
        this.id = id;
        this.username = username;
        this.password = password;
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

    public static void addBudget(User user, Budget newBudget){
        List<Budget> newBudgets = user.getBudgets();
        newBudgets.add(newBudget);
        user.setBudgets(newBudgets);
    }

}
