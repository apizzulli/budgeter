package com.budgeter.server.Entities;

import com.budgeter.server.Category;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Budget {

    @Id @GeneratedValue private Long id;
    private Category category;
    private Double amount;

    public Budget(Category category, Double amount){
        this.category = category;
        this.amount = amount;
    }
    public Category getCategory() {
        return category;
    }

    public void setString(Category category) {
        this.category = category;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    @Override
    public String toString(){
        return this.category.toString() + " Budget: Amount = $" + Double.toString(this.amount);
    }

}
