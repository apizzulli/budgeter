package com.budgeter.server;
import com.budgeter.server.Entities.Budget;
import org.springframework.web.bind.annotation.*;

//LOMBOK
@RestController
public class BudgetController {

    private final BudgetRepository budgetRepo;

    public BudgetController(BudgetRepository budgetRepository){
        this.budgetRepo = budgetRepository;
    }

    @CrossOrigin(origins="http://localhost:3000")
    @PostMapping("/createBudget")
    public String home(@RequestBody Budget newBudget) {
        budgetRepo.save(newBudget);
        System.out.println("Budget created successfully.\n"+newBudget.toString());
        return "Hello";
    }

}
