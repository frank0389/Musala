package com.musalasoft.test.gateways.exeption;

public class UsernameAlreadyUsedException extends RuntimeException{
    private static final long serialVersionUID = 3L;

     public UsernameAlreadyUsedException(String message){
        super(message);
    }
}