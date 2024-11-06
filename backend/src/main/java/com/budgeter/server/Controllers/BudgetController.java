package com.budgeter.server.Controllers;
import com.budgeter.server.Entities.Budget;
import com.budgeter.server.Repositories.BudgetRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class BudgetController {

    private final BudgetRepository budgetRepo;

    public BudgetController(BudgetRepository budgetRepo){
        this.budgetRepo = budgetRepo;
    }

//    @CrossOrigin(origins="http://localhost:3000")
//    @PostMapping(value="/createBudget")
//    public String createBudget(@RequestBody Budget newBudget) {
//        budgetRepo.save(newBudget);
//        return "Created budget successfully: "+ newBudget.toString();
//    }

//    @CrossOrigin(origins="http://localhost:3000")
//    @GetMapping("/getBudgets/{id}")
//    public Budget getBudgets(@PathVariable("id") Long id) {
//        Optional<List<Budget>> budg = budgetRepo.findAllById(
//        id);
//        List<Budget> budgets = budg.get();
//        return budget;
//    }

}
