package com.budgeter.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.budgeter.server.WebConfig;

@SpringBootApplication
public class BudgeterServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(BudgeterServerApplication.class, args);
	}

}
