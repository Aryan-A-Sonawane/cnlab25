package com.marks.model;

import javax.persistence.Embeddable;

@Embeddable
public class Subject {
    private String name;
    private double mse; // Out of 30
    private double ese; // Out of 70
    private double total;

    public Subject() {}

    public Subject(String name, double mse, double ese) {
        this.name = name;
        this.mse = mse;
        this.ese = ese;
        calculateTotal();
    }

    private void calculateTotal() {
        this.total = this.mse + this.ese;
    }

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public double getMse() { return mse; }
    public void setMse(double mse) { 
        this.mse = mse;
        calculateTotal();
    }
    
    public double getEse() { return ese; }
    public void setEse(double ese) { 
        this.ese = ese;
        calculateTotal();
    }
    
    public double getTotal() { return total; }
    public void setTotal(double total) { this.total = total; }
}
