package com.musalasoft.test.gateways.repository;

import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.stereotype.Repository;

import com.musalasoft.test.gateways.model.Role;
import reactor.core.publisher.Mono;

@Repository
public interface RoleRepository extends R2dbcRepository<Role,Long> {
    public Mono<Role> findRoleByName(String name);
}