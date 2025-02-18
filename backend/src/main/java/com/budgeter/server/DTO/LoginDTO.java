package com.budgeter.server.DTO;

import com.budgeter.server.Entities.Budget;

import java.util.List;

public class LoginDTO {

    private Long id;
    private List<Budget> budgets;
    private long expiresIn;
    private String token;

    public LoginDTO(){}
    public LoginDTO(Long id, List<Budget> budgets, long expiresIn, String token) {
        this.id = id;
        this.budgets = budgets;
        this.expiresIn = expiresIn;
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token){
        this.token = token;
    }

    public long getExpiresIn(){
        return this.expiresIn;
    }

    public void setExpiresIn(long expiresIn) {
        this.expiresIn = expiresIn;
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
