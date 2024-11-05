package com.budgeter.server.Controllers;
import com.budgeter.server.Entities.Budget;
import com.budgeter.server.Repositories.BudgetRepository;
import org.springframework.web.bind.annotation.*;

@RestController
public class BudgetController {

    private final BudgetRepository budgetRepo;

    public BudgetController(BudgetRepository budgetRepo){
        this.budgetRepo = budgetRepo;
    }

    @CrossOrigin(origins="http://localhost:3000")
    @PostMapping(value="/createBudget")
    public String createBudget(@RequestBody Budget newBudget) {
        budgetRepo.save(newBudget);
        return "Created budget successfully: "+ newBudget.toString();
    }

//    @CrossOrigin(origins="http://localhost:3000")
//    @GetMapping("/getBudgets/{id}")
//    public Budget getBudgets(@PathVariable("id") Long id) {
//        Optional<Budget> budg = budgetRepo.findAll(id);
//        Budget budget = budg.get();
//        return budget;
//    }

}
