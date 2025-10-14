package com.sudeep.banking_app.mapper;

import com.sudeep.banking_app.dto.Accountdto;
import com.sudeep.banking_app.entity.Account;

public class AccountMapper {

    public static Account mapToAccount(Accountdto accountdto) {
        return new Account(
                accountdto.getId(),
                accountdto.getAccountHolderName(),
                accountdto.getBalance()
        );
    }

    public static Accountdto mapToAccountdto(Account account) {
        return new Accountdto(
                account.getId(),
                account.getAccountHolderName(),
                account.getBalance()
        );
    }
}
