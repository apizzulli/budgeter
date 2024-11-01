package com.budgeter.server;
import com.budgeter.server.Entities.Budget;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

//LOMBOK
@RestController
public class BudgetController {

    private final BudgetRepository budgetRepo;

    public BudgetController(BudgetRepository budgetRepository){
        this.budgetRepo = budgetRepository;
    }

    @CrossOrigin(origins="http://localhost:3000")
    @PostMapping(value="/createBudget", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public String createBudget(@RequestBody Budget newBudget) {
        budgetRepo.save(newBudget);
        return "Created budget successfully: "+ newBudget.toString();
    }

    @CrossOrigin(origins="http://localhost:3000")
    @GetMapping("/getBudget")
    public Budget getBudget(@RequestBody Long id) {
        return budgetRepo.getReferenceById(id);
    }

}
