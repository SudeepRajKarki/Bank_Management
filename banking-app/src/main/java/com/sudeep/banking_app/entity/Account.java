package com.sudeep.banking_app.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Table(name = "accounts")

@Entity
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column (name = "Account_holder_name")
    private String AccountHolderName;
    @Column (name = "Account_holder_balance")
    private double Balance;
}
