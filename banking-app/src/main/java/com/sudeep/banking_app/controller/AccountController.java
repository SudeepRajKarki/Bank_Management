package com.sudeep.banking_app.controller;

import com.sudeep.banking_app.dto.Accountdto;
import com.sudeep.banking_app.service.AccountService;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    private AccountService accountService;

    public AccountController(AccountService accountService){
        this.accountService = accountService;
    }

    //Adding add account rest api
    @PostMapping
    public ResponseEntity<Accountdto> addAccount( @RequestBody Accountdto accountdto){
        return new ResponseEntity<>(accountService.createAccount(accountdto), HttpStatus.CREATED);
    }
    //get account by id
    @GetMapping("/{id}")
    public ResponseEntity<Accountdto> getAccountById(@PathVariable Long id){
        Accountdto accountdto = accountService.getAccountById(id);
        return ResponseEntity.ok(accountdto);
    }
    //deposit the amount in the account
    @PutMapping("/{id}/deposit")
    public ResponseEntity<Accountdto> deposit(@PathVariable Long id,
                                              @RequestBody Map<String, Double> request) {
        double amount =request.get("amount");
        Accountdto accountdto = accountService.deposit(id,amount);
        return ResponseEntity.ok(accountdto);
    }
    //withdraw amount from the account balance
    @PutMapping("/{id}/withdraw")
    public ResponseEntity<Accountdto> withdraw(@PathVariable Long id,
                                              @RequestBody Map<String, Double> request) {
        double amount =request.get("amount");
        Accountdto accountdto = accountService.withdraw(id,amount);
        return ResponseEntity.ok(accountdto);
    }

    //Get details of all Accounts
    @GetMapping
    public ResponseEntity<List<Accountdto>> getAllAccount(){
        List<Accountdto> accounts=accountService.getAllAccounts();
        return ResponseEntity.ok(accounts);
    }
    //delete account REST api
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<String> deleteAccount(@PathVariable Long id){
        accountService.deleteAccount(id);
        return ResponseEntity.ok("Account deleted successfully");
    }

}
