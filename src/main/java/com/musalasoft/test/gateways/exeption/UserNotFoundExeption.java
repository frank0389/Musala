package com.musalasoft.test.gateways.exeption;

public class UserNotFoundExeption extends RuntimeException {
    private static final long serialVersionUID = 1L;

     public UserNotFoundExeption(String message){
        super(message);
    }
}