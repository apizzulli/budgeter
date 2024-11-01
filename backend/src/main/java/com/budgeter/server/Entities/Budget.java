package com.budgeter.server.Entities;

import com.budgeter.server.Category;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

@Entity
@Table(name="Budget")
@JsonSerialize
@JsonDeserialize
public class Budget implements Serializable {

    private @Id @GeneratedValue Long id;
    private String name;
    private double total;
    @ElementCollection
    private Map<String, Double> categories;

    public Budget() {}
    @JsonCreator
    public Budget(String name, double total, Map<String, Double> categories){
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

    public void setCategories(Map<String, Double> categories) {
        this.categories = categories;
    }

    public Map<String, Double> getCategories() {
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
//        for(Category cat: this.categories){
//            toRet += cat.toString() + "\n";
//        }
        return toRet;
    }

}
