package com.musalasoft.test.gateways.exeption.handler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import com.musalasoft.test.gateways.dto.ErrorMessageDTO;
import com.musalasoft.test.gateways.exeption.AccountResourceException;
import com.musalasoft.test.gateways.exeption.InvalidPasswordException;
import com.musalasoft.test.gateways.exeption.SerialNumberAlreadyUsedExeption;
import com.musalasoft.test.gateways.exeption.UsernameAlreadyUsedException;

@ControllerAdvice
public class ExceptionHandling {

    private final Logger log = LoggerFactory.getLogger(ExceptionHandling.class);

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<?> handleExeption(BadCredentialsException ex) {
        log.error("BadCredentialsException was throw with message {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ErrorMessageDTO("Bad Request", "Invalid user or password", ex.getMessage()));

    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<?> handleExeption(UsernameNotFoundException ex) {
        log.error("UsernameNotFoundException was throw with message {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ErrorMessageDTO("Bad Request", "Invalid user or password", ex.getMessage()));
    }

    @ExceptionHandler(InvalidPasswordException.class)
    public ResponseEntity<?> handleExeption(InvalidPasswordException ex) {
        log.error("InvalidPasswordException was throw with message {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ErrorMessageDTO("Bad Request", "Invalid password", ex.getMessage()));
    }

    @ExceptionHandler(UsernameAlreadyUsedException.class)
    public ResponseEntity<?> handleExeption(UsernameAlreadyUsedException ex) {
        log.error("UsernameAlreadyUsedException was throw with message {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ErrorMessageDTO("Invalid userName", ex.getMessage(), ex.getMessage()));
    }


    @ExceptionHandler(SerialNumberAlreadyUsedExeption.class)
    public ResponseEntity<?> handleExeption(SerialNumberAlreadyUsedExeption ex) {
        log.error("SerialNumberAlreadyUsedExeption was throw with message {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ErrorMessageDTO("Invalid serial number", ex.getMessage(), ex.getMessage()));
    }

    @ExceptionHandler(AccountResourceException.class)
    public ResponseEntity<?> handleExeption(AccountResourceException ex) {
        log.error("AccountResourceException was throw with message {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ErrorMessageDTO("User not found", ex.getMessage(), ex.getMessage()));
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<?> handleExeption(RuntimeException ex) {
        log.error("RuntimeException was throw with message {}", ex.getMessage());
        ex.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorMessageDTO("Internal server error", ex.getMessage(), ex.getMessage()));
    }

}