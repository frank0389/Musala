package com.musalasoft.test.gateways.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.ReactiveUserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.musalasoft.test.gateways.model.User;
import com.musalasoft.test.gateways.repository.UserRepository;

import reactor.core.publisher.Mono;

import java.util.List;

import java.util.Locale;
import java.util.stream.Collectors;

/**
 * Authenticate a user from the database.
 */
@Component("userDetailsService")
public class DomainUserDetailsService implements ReactiveUserDetailsService {

    private final Logger log = LoggerFactory.getLogger(DomainUserDetailsService.class);
    private final UserRepository userRepository;

    public DomainUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public Mono<UserDetails> findByUsername(final String userName) {
        log.debug("Authenticating {}", userName);

        String lowercaseUserName = userName.toLowerCase(Locale.ENGLISH);

        return userRepository
                .findOneWithRolesByUserName(lowercaseUserName)
                .switchIfEmpty(Mono.error(new UsernameNotFoundException("User not found")))
                .map(this::createSpringSecurityUser);
    }

    private org.springframework.security.core.userdetails.User createSpringSecurityUser(User user) {

        List<GrantedAuthority> grantedAuthorities = user
                .getRoles()
                .stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());
        return new org.springframework.security.core.userdetails.User(user.getUserName(), user.getPassword(),
                grantedAuthorities);
    }
}
