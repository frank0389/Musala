package com.musalasoft.test.gateways.security;

import java.security.Key;
import java.util.Collections;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.mock.http.server.reactive.MockServerHttpRequest;
import org.springframework.mock.web.server.MockServerWebExchange;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.server.WebFilterChain;
import static org.assertj.core.api.Assertions.assertThat;
import com.musalasoft.test.gateways.util.AuthoritiesConstants;
import com.musalasoft.test.gateways.util.TokenProvider;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

public class JWTFilterUnitTest {
   
    private TokenProvider tokenProvider;

    private JWTFilter jwtFilter;

    @BeforeEach
    public void setup() {
        tokenProvider = new TokenProvider();
        String base64Secret = "fd54a45s65fds737b9aafcb3412e07ed99b267f33413274720ddbb7f6c5e64e9f14075f2d7ed041592f0b7657baf8";
        Key key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(base64Secret));
        ReflectionTestUtils.setField(tokenProvider, "key",key );
        ReflectionTestUtils.setField(tokenProvider, "tokenValidityInMilliseconds", 3600000 );  //1 hour
        ReflectionTestUtils.setField(tokenProvider, "tokenValidityInMillisecondsForRememberMe",86400000); //24 hour 1 day
        ReflectionTestUtils.setField(tokenProvider, "jwtParser",Jwts.parserBuilder().setSigningKey(key).build());
        jwtFilter = new JWTFilter(tokenProvider);
    }

    @Test
    void testJWTFilter() {
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
            "test-user",
            "test-password",
            Collections.singletonList(new SimpleGrantedAuthority(AuthoritiesConstants.USER))
        );
        String jwt = tokenProvider.createToken(authentication, false);
        MockServerHttpRequest.BaseBuilder<?> request = MockServerHttpRequest
            .get("/api/test")
            .header(JWTFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);
        MockServerWebExchange exchange = MockServerWebExchange.from(request);
        WebFilterChain filterChain = filterExchange -> {
                return ReactiveSecurityContextHolder.getContext().map(ctx -> ctx.getAuthentication())
                    .doOnSuccess(auth -> assertThat(auth.getName()).isEqualTo("test-user"))
                    .doOnSuccess(auth -> assertThat(auth.getCredentials().toString()).hasToString(jwt))
                    .then();
        };
        jwtFilter
            .filter(
                exchange,
                 filterChain
            )
            .block();
    }

    @Test
    void testJWTFilterInvalidToken() {
        String jwt = "wrong_jwt";
        MockServerHttpRequest.BaseBuilder<?> request = MockServerHttpRequest
            .get("/api/test")
            .header(JWTFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);
        MockServerWebExchange exchange = MockServerWebExchange.from(request);
        WebFilterChain filterChain = filterExchange -> {
            return ReactiveSecurityContextHolder.getContext().map(ctx -> ctx.getAuthentication())
                .doOnSuccess(auth -> assertThat(auth).isNull())
                .then();
        };
        jwtFilter
            .filter(
                exchange,
                filterChain
            )
            .block();
    }

    @Test
    void testJWTFilterMissingAuthorization() {
        MockServerHttpRequest.BaseBuilder<?> request = MockServerHttpRequest.get("/api/test");
        MockServerWebExchange exchange = MockServerWebExchange.from(request);
        WebFilterChain filterChain = filterExchange -> {
            return ReactiveSecurityContextHolder.getContext().map(ctx -> ctx.getAuthentication())
                .doOnSuccess(auth -> assertThat(auth).isNull())
                .then();
        };
        
        jwtFilter
            .filter(
                exchange,
                filterChain
            )
            .block();
    }

    @Test
    void testJWTFilterMissingToken() {
        MockServerHttpRequest.BaseBuilder<?> request = MockServerHttpRequest
            .get("/api/test")
            .header(JWTFilter.AUTHORIZATION_HEADER, "Bearer ");
        MockServerWebExchange exchange = MockServerWebExchange.from(request);
        WebFilterChain filterChain = filterExchange -> {
            return ReactiveSecurityContextHolder.getContext().map(ctx -> ctx.getAuthentication())
                .doOnSuccess(auth -> assertThat(auth).isNull())
                .then();
        };
        jwtFilter
            .filter(
                exchange,
                filterChain
            )
            .block();
    }
}