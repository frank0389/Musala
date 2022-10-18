package com.musalasoft.test.gateways.exeption;

public class InvalidPasswordException extends RuntimeException {

    private static final long serialVersionUID = 1L;

     public InvalidPasswordException(String message){
        super(message);
    }

}