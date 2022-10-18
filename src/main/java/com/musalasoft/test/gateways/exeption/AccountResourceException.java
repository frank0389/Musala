package com.musalasoft.test.gateways.exeption;

public class AccountResourceException extends RuntimeException{
    private static final long serialVersionUID = 2L;

     public AccountResourceException(String message){
        super(message);
    } 
    
}