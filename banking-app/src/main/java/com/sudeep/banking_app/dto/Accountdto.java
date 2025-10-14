package com.sudeep.banking_app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Accountdto {
    private long id;
    private String AccountHolderName;
    private double Balance;
}
