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
public class TransactionController {

    private final TransactionRepository transRepo;

    public TransactionController(TransactionRepository transRepo) {
        this.transRepo = transRepo;
    }

    /*@PostMapping(value="/add")
    public String addTransaction(@RequestBody Transaction newTrans){
        transRepo.save(newTrans);
        return "Successfully saved new transaction";
    }*/

}
