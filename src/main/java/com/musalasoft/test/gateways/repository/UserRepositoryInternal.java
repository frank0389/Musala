package com.musalasoft.test.gateways.repository;

import org.springframework.data.domain.Pageable;
import com.musalasoft.test.gateways.model.User;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface UserRepositoryInternal extends DeleteExtended<User> {
    
    public Mono<User> findOneWithRolesByUserName(String userName);

    public Flux<User> findAllWithRoles(Pageable pageable);

    public Flux<User> findAllWithRolesBy(String fieldName, Object fieldValue, Pageable pageable);

    public Mono<Long> countAllBy(String fieldName, String filedValue);
}