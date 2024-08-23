package com.budgeter.server;
import com.budgeter.server.Entities.Budget;
import org.springframework.web.bind.annotation.*;

@RestController
public class BudgetController {

    @CrossOrigin(origins="http://localhost:3000")
    @PostMapping("/createBudget")
    public String home(@RequestBody Budget newBudget) {
        System.out.println("Budget created successfully.\n"+newBudget.toString());
        return "Hello";
    }

}
