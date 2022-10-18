package com.musalasoft.test.gateways.exeption;

public class BadRequestAlertException extends RuntimeException{
    private static final long serialVersionUID = 2L;

     public BadRequestAlertException(String message){
        super(message);
    }
}
