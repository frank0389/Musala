package com.musalasoft.test.gateways.api.resources;

import javax.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.musalasoft.test.gateways.dto.UserDTO;
import com.musalasoft.test.gateways.exeption.AccountResourceException;
import com.musalasoft.test.gateways.services.UserService;

import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api")
public class AccountResource {

    private final UserService userService;

    public AccountResource( UserService userService) {
        this.userService = userService;
    }

  
    @GetMapping("/account")
    public Mono<UserDTO> getAccount() {
        return userService.getUserWithRoles().switchIfEmpty(
                Mono.error(new AccountResourceException("User not found")));
    }

    @PostMapping("/account")
    public Mono<Void> updateAccount(@Valid @RequestBody UserDTO userDTO) {
        return userService.updateUser(userDTO.getFirstName(), userDTO.getLastName(),
                         userDTO.getLangKey());
    }


}