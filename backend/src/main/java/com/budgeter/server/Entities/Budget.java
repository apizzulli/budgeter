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
    private String name;
    private double total;
    private List<Category> categories;

    public Budget() {}
    public Budget(String name, double total, List<Category> categories){
        this.name = name;
        this.total = total;
        this.categories = categories;
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
