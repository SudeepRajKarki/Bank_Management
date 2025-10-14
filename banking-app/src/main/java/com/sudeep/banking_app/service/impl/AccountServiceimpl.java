package com.sudeep.banking_app.service.impl;

import com.sudeep.banking_app.dto.Accountdto;
import com.sudeep.banking_app.entity.Account;
import com.sudeep.banking_app.mapper.AccountMapper;
import com.sudeep.banking_app.repository.AccountRepository;
import com.sudeep.banking_app.service.AccountService;
import org.springframework.stereotype.Service;

@Service
public class AccountServiceimpl implements AccountService {


    private AccountRepository accountRepository;

    public AccountServiceimpl(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public Accountdto createAccount(Accountdto accountdto) {
        Account account = AccountMapper.mapToAccount(accountdto);
        Account savedAccount = accountRepository.save(account);
        return AccountMapper.mapToAccountdto(savedAccount);
    }
    @Override
    public Accountdto GetAccountById(Long id){
        Account account = accountRepository
                .findById(id)
                .orElseThrow(()-> new RuntimeException("No Such Account Exist"));
        return AccountMapper.mapToAccountdto(account);
    }
    @Override
    public Accountdto deposit(Long id, double amount){
        Account account = accountRepository
                .findById(id)
                .orElseThrow(()-> new RuntimeException("No Such Account Exist"));
       double total = account.getBalance() + amount;
       account.setBalance(total);
       Account savedAccount =  accountRepository.save(account);
       return AccountMapper.mapToAccountdto(savedAccount);
    }
}
