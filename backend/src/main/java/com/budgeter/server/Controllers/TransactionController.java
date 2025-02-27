package com.budgeter.server.Controllers;

import com.budgeter.server.Entities.Budget;
import com.budgeter.server.Entities.Transaction;
import com.budgeter.server.Entities.User;
import com.budgeter.server.Repositories.BudgetRepository;
import com.budgeter.server.Repositories.TransactionRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
@RestController
@RequestMapping("/transactions")
public class TransactionController {

    private final TransactionRepository transRepo;
    private final BudgetRepository budgetRepo;

    public TransactionController(TransactionRepository transRepo, BudgetRepository budgetRepo) {
        this.transRepo = transRepo;
        this.budgetRepo = budgetRepo;
    }

    @CrossOrigin(origins="http://localhost:3000")
    @PostMapping(value="/add/{budgetId}")
    public String addTransaction(@PathVariable(value="budgetId") Long budgetId, @RequestBody Transaction newTrans){
        Budget budget = budgetRepo.findById(budgetId).get();
        budget.addTransaction(newTrans);
        transRepo.save(newTrans);
        return "Successfully saved new transaction";
    }

}
