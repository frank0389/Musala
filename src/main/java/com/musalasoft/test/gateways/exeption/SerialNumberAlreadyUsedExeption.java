package com.musalasoft.test.gateways.exeption;

public class SerialNumberAlreadyUsedExeption extends RuntimeException{
    private static final long serialVersionUID = 4L;

    public SerialNumberAlreadyUsedExeption(String message){
       super(message);
   }
}
