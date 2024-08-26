package com.budgeter.server.Entities;

import com.budgeter.server.Category;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.List;

@Entity
@Table(name="Budget")
public class Budget {

    private @Id @GeneratedValue Long id;
    private List<Category> categories;
    private double total;
    private String name;

    public Budget() {}
    public Budget(List<Category> categories, String name, double total){
        this.categories = categories;
        this.name = name;
        this.total = total;
    }

    public void setId(Long id){
        this.id = id;
    }

    public Long getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }

    public List<Category> getCategories() {
        return this.categories;
    }

    public double getTotal(){
        return this.total;
    }

    public void setTotal(double total){
        this.total = total;
    }

    @Override
    public String toString(){
        String toRet = this.name + " budget: Total amount = "+this.total + "\n";
        for(Category cat: this.categories){
            toRet += cat.toString() + "\n";
        }
        return toRet;
    }

}
