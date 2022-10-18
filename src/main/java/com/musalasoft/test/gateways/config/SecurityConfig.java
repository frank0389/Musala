package com.musalasoft.test.gateways.config;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.authentication.UserDetailsRepositoryReactiveAuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.core.userdetails.ReactiveUserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.header.ReferrerPolicyServerHttpHeadersWriter;
import org.springframework.security.web.server.util.matcher.NegatedServerWebExchangeMatcher;
import org.springframework.security.web.server.util.matcher.OrServerWebExchangeMatcher;
import static org.springframework.security.web.server.util.matcher.ServerWebExchangeMatchers.pathMatchers;

import com.musalasoft.test.gateways.security.JWTFilter;
import com.musalasoft.test.gateways.util.AuthoritiesConstants;
import com.musalasoft.test.gateways.util.TokenProvider;

@EnableWebFluxSecurity
@EnableReactiveMethodSecurity
public class SecurityConfig {

    private final ReactiveUserDetailsService userDetailsService;
    private final TokenProvider tokenProvider;

    public SecurityConfig(
            ReactiveUserDetailsService userDetailsService,
            TokenProvider tokenProvider) {
        this.userDetailsService = userDetailsService;
        this.tokenProvider = tokenProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public ReactiveAuthenticationManager reactiveAuthenticationManager() {
        UserDetailsRepositoryReactiveAuthenticationManager authenticationManager = new UserDetailsRepositoryReactiveAuthenticationManager(
                userDetailsService);
        authenticationManager.setPasswordEncoder(passwordEncoder());
        return authenticationManager;
    }

    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {

        http
                .securityMatcher(new NegatedServerWebExchangeMatcher(new OrServerWebExchangeMatcher(
                        pathMatchers("/app/**", "/i18n/**"),
                        pathMatchers(HttpMethod.OPTIONS, "/**"))))
                .csrf()
                .disable()
                .addFilterAt(new JWTFilter(tokenProvider), SecurityWebFiltersOrder.HTTP_BASIC)
                .authenticationManager(reactiveAuthenticationManager())
                .exceptionHandling()
                .and()
                .headers()
                .contentSecurityPolicy("img-src 'self' data: http://localhost:8080/ ; ")
                .and()
                .referrerPolicy(ReferrerPolicyServerHttpHeadersWriter.ReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN)
                .and()
                .frameOptions().disable()
                .and()
                .authorizeExchange()
                .pathMatchers("/").permitAll()
                .pathMatchers("/static/**").permitAll()
                .pathMatchers("/*.*").permitAll()
                .pathMatchers("/api/account").permitAll()
                .pathMatchers("/api/authenticate").permitAll()
                .pathMatchers("/api/admin/**").hasAuthority(AuthoritiesConstants.ADMIN)
                .pathMatchers("/api/**").authenticated();
        return http.build();
    }

}