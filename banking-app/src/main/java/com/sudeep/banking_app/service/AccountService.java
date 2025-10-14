package com.sudeep.banking_app.service;

import com.sudeep.banking_app.dto.Accountdto;

import java.util.List;

public interface AccountService {


    Accountdto createAccount(Accountdto accountdto);

    Accountdto getAccountById(Long id);

    Accountdto deposit(Long id, double amount);

    Accountdto withdraw(Long id ,double amount);

    List<Accountdto> getAllAccounts();

    void deleteAccount (Long id);


}
