package com.musalasoft.test.gateways.api.resources;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.musalasoft.test.gateways.dto.RoleDTO;
import com.musalasoft.test.gateways.services.RoleService;
import com.musalasoft.test.gateways.util.AuthoritiesConstants;

import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class RoleResource {
    private final Logger log = LoggerFactory.getLogger(RoleResource.class);

    private final RoleService roleService;

    public RoleResource(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping("/roles/{name}")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public Mono<ResponseEntity<RoleDTO>> getRole(@PathVariable String name) {
        log.debug("REST request to get role by name : {}", name);
        return roleService.role(name)
                .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND))).map(roleDTO -> {
                    return ResponseEntity.ok()
                            .body(roleDTO);
                });
    }

    @GetMapping("/roles")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public Mono<ResponseEntity<List<RoleDTO>>> role() {
        log.debug("REST request to get all roles");
        return roleService.roles().collectList().map(list -> {
            return ResponseEntity.ok()
                    .body(list);
        });
    }
}