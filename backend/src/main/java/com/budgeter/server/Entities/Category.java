package com.budgeter.server.Entities;

public class Category {

    private String name;
    private double amount;

    public Category(String name, double amount) {
        this.name = name;
        this.amount = amount;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return this.name + " budget: Amount = "+ this.amount;
    }
}
