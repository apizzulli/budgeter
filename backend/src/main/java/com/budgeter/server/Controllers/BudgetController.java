package com.budgeter.server.Controllers;
import com.budgeter.server.Entities.Budget;
import com.budgeter.server.Entities.User;
import com.budgeter.server.Services.BudgetService;
import com.budgeter.server.Repositories.BudgetRepository;
import com.budgeter.server.Repositories.UserRepository;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static org.springframework.http.ResponseEntity.badRequest;

@RestController
@RequestMapping("/budgets")
public class BudgetController {

    //private final BudgetService budgetService;
    private final BudgetRepository budgetRepo;
    private final UserRepository userRepo;

    public BudgetController(BudgetRepository budgetRepo, UserRepository userRepo){
        this.budgetRepo = budgetRepo;
        this.userRepo = userRepo;
    }

    @CrossOrigin(origins="http://localhost:3000")
    @PostMapping(value="/create/{id}")
    public ResponseEntity<Budget> createBudget(@RequestBody Budget newBudget, @PathVariable(value="id") Long userId) {
        Optional<User> userOp = userRepo.findById(userId);
        User user = userOp.get();
        User.addBudget(user,newBudget);
        userRepo.save(user);
        //budgetRepo.save(newBudget);
        return new ResponseEntity<>(newBudget, HttpStatus.CREATED);
    }

    @CrossOrigin(origins="http://localhost:3000")
    @GetMapping(value="/getBudgets/{userId}")
    public List<Budget> getBudgets(@PathVariable(value="userId") Long userId) {
        Optional<User> userOp = userRepo.findById(userId);
        User user = userOp.get();
        return user.getBudgets();
    }

    @CrossOrigin(origins="http://localhost:3000")
    @PatchMapping(value="/update/name/{budgetId}")
    public ResponseEntity<?> updateName(@PathVariable(value="budgetId") Long budgetId, @RequestBody String newName) {
        Optional<Budget> budg = budgetRepo.findById(budgetId);
        Budget budget = budg.get();
        budget.setName(newName);
        budgetRepo.save(budget);
        return ResponseEntity.ok("Budget updated with new name \"" + newName + "\"");
    }

    @CrossOrigin(origins="http://localhost:3000")
    @GetMapping(value="/update/total/{budgetId}")
    public ResponseEntity<Budget> updateTotal(@PathVariable(value="budgetId") Long budgetId, @RequestBody double newTotal) {
        Optional<Budget> budg = budgetRepo.findById(budgetId);
        Budget budget = budg.get();
        budget.setTotal(newTotal);
        budgetRepo.save(budget);
        return ResponseEntity.ok(budget);
    }

}
