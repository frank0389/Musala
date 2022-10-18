package com.musalasoft.test.gateways.api;

import javax.validation.Valid;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.musalasoft.test.gateways.dto.JWTTokenDTO;
import com.musalasoft.test.gateways.dto.LoginDTO;
import com.musalasoft.test.gateways.security.JWTFilter;
import com.musalasoft.test.gateways.util.TokenProvider;

import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api")
public class JWTController {

    private final TokenProvider tokenProvider;

    private final ReactiveAuthenticationManager authenticationManager;

    public JWTController(TokenProvider tokenProvider, ReactiveAuthenticationManager authenticationManager) {
        this.tokenProvider = tokenProvider;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/authenticate")
    public Mono<ResponseEntity<JWTTokenDTO>> authorize(@Valid @RequestBody Mono<LoginDTO> loginVM) {
        return loginVM
                .flatMap(
                        login -> authenticationManager
                                .authenticate(new UsernamePasswordAuthenticationToken(login.getUsername(),
                                        login.getPassword()))
                                .flatMap(auth -> Mono
                                        .fromCallable(() -> tokenProvider.createToken(auth, login.isRememberMe()))))
                .map(
                        jwt -> {
                            HttpHeaders httpHeaders = new HttpHeaders();
                            httpHeaders.add(JWTFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);
                            return new ResponseEntity<>(new JWTTokenDTO(jwt), httpHeaders, HttpStatus.OK);
                        });
    }

}
