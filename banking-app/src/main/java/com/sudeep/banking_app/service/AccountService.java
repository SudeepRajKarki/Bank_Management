package com.sudeep.banking_app.service;

import com.sudeep.banking_app.dto.Accountdto;

public interface AccountService {


    Accountdto createAccount(Accountdto accountdto);

    Accountdto GetAccountById(Long id);

    Accountdto deposit(Long id, double amount);

}
