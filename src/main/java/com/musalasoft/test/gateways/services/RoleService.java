package com.musalasoft.test.gateways.services;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.musalasoft.test.gateways.dto.RoleDTO;
import com.musalasoft.test.gateways.repository.RoleRepository;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class RoleService {
    private final Logger log = LoggerFactory.getLogger(RoleService.class);
    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Transactional
    public Mono<RoleDTO> role(String name) {
        log.debug("Get role by name {} ", name);
        return this.roleRepository.findRoleByName(name).map(RoleDTO::new);
    }

    @Transactional
    public Flux<RoleDTO> roles() {
        log.debug("Get all roles");
        return this.roleRepository.findAll().map(RoleDTO::new);
    }
}