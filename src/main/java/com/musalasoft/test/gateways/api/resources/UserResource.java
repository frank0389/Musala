package com.musalasoft.test.gateways.api.resources;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.util.UriComponentsBuilder;

import com.musalasoft.test.gateways.dto.UserDTO;
import com.musalasoft.test.gateways.model.User;
import com.musalasoft.test.gateways.services.UserService;
import com.musalasoft.test.gateways.util.AuthoritiesConstants;
import com.musalasoft.test.gateways.util.Constants;
import com.musalasoft.test.gateways.util.PaginationUtil;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.Pattern;

@RestController
@RequestMapping("/api/admin")
public class UserResource {

    private static final List<String> ALLOWED_ORDERED_PROPERTIES = Collections.unmodifiableList(
            Arrays.asList("id", "user_name", "first_name", "last_name"));

    private final Logger log = LoggerFactory.getLogger(UserResource.class);

    private final UserService userService;

    @Value("${app.baseUrl}")
    private String baseUrl;

    public UserResource(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/users")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public Mono<ResponseEntity<UserDTO>> createUser(@Valid @RequestBody UserDTO userDTO) {
        log.debug("REST request to save User : {}", userDTO);

        return userService.createUser(userDTO)
                .map(
                        user -> {
                            try {
                                String uri = "/api/admin/users/" + user.getUserName();
                                return ResponseEntity
                                        .created(new URI(uri))
                                        .body(user);
                            } catch (URISyntaxException e) {
                                throw new RuntimeException(e);
                            }
                        });
    }

    @PutMapping("/users")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public Mono<ResponseEntity<UserDTO>> updateUser(@Valid @RequestBody UserDTO userDTO) {
        log.debug("REST request to update User : {}", userDTO);

        return userService.updateUser(userDTO).switchIfEmpty(
                Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND)))
                .map(
                        user -> ResponseEntity
                                .ok()
                                .body(user));
    }

    @GetMapping("/users")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public Mono<ResponseEntity<Flux<UserDTO>>> getAllUsers(
            @RequestParam(defaultValue = "") String fieldName,
            @RequestParam(defaultValue = "") String fieldValue,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id,desc") String[] sort) {

        log.debug("REST request to get users by " + fieldName + " contains " + fieldValue);

        List<Sort.Order> orders = new ArrayList<Order>();
        if (sort.length > 0) {
            orders.add(new Order(getSortDirection(sort[1]), User.columnName(sort[0])));
        } else {
            orders.add(new Order(getSortDirection("asc"), "id"));
        }

        Pageable pageable = PageRequest.of(page, size, Sort.by(orders));

        if (!onlyContainsAllowedProperties(pageable)) {
            return Mono.just(ResponseEntity.badRequest().build());
        }
        String uri = baseUrl + "/api/admin/users";

        if (fieldName.isEmpty()) {
            return userService
                    .countManagedUsers()
                    .map(total -> new PageImpl<>(new ArrayList<>(), pageable, total))
                    .map(data -> PaginationUtil.generatePaginationHttpHeaders(UriComponentsBuilder.fromUriString(uri),
                            data))
                    .map(headers -> ResponseEntity.ok().headers(headers)
                            .body(userService.getAllManagedUsers(pageable)));
        }
        return userService
                .countAllUsersBy(fieldName, fieldValue)
                .map(total -> new PageImpl<>(new ArrayList<>(), pageable, total))
                .map(data -> PaginationUtil.generatePaginationHttpHeaders(UriComponentsBuilder.fromUriString(uri),
                        data))
                .map(headers -> ResponseEntity.ok().headers(headers)
                        .body(userService.getAllUsersBy(fieldName, fieldValue, pageable)));
    }

    @GetMapping("/users/{userName}")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public Mono<UserDTO> getUser(@PathVariable String userName) {
        log.debug("REST request to get User : {}", userName);
        return userService
                .getUserWithRolesByUserName(userName)
                .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND)));
    }

    @DeleteMapping("/users/{userName}")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public Mono<ResponseEntity<Void>> deleteUser(@PathVariable @Pattern(regexp = Constants.USERNAME_REG) String userName) {
        log.debug("REST request to delete User: {}", userName);
        return userService
                .deleteUser(userName)
                .map(
                        it -> ResponseEntity.noContent().build()
                );
    }

    private Sort.Direction getSortDirection(String direction) {
        if (direction.equals("asc"))
            return Sort.Direction.ASC;
        return Sort.Direction.DESC;
    }

    private boolean onlyContainsAllowedProperties(Pageable pageable) {
        return pageable.getSort().stream().map(Sort.Order::getProperty).allMatch(ALLOWED_ORDERED_PROPERTIES::contains);
    }

}
