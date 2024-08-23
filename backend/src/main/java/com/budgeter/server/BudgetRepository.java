package com.budgeter.server;

import com.budgeter.server.Entities.Budget;
import jakarta.persistence.Id;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BudgetRepository extends JpaRepository<Budget, Long> {
}
