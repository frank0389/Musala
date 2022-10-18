package com.musalasoft.test.gateways.api.resources;

import java.util.Collections;
import java.util.List;

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

import com.musalasoft.test.gateways.dto.GatewayDTO;
import com.musalasoft.test.gateways.model.Gateway;
import com.musalasoft.test.gateways.services.GatewayService;
import com.musalasoft.test.gateways.util.AuthoritiesConstants;
import com.musalasoft.test.gateways.util.PaginationUtil;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Arrays;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/admin")
public class GatewayResource {
    private static final List<String> ALLOWED_ORDERED_PROPERTIES = Collections.unmodifiableList(
            Arrays.asList("id", "serialNumber", "hrName","ipV4"));

    private final Logger log = LoggerFactory.getLogger(GatewayResource.class);

    private final GatewayService gatewayService;

    @Value("${app.baseUrl}")
    private String baseUrl;

    public GatewayResource(GatewayService gatewayService) {
        this.gatewayService = gatewayService;
    }

    @PostMapping("/gateways")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public Mono<ResponseEntity<GatewayDTO>> createGateway(@Valid @RequestBody GatewayDTO gatewayDTO) {
        log.debug("REST request to save Gateway : {}", gatewayDTO);

        return gatewayService.createGateway(gatewayDTO)
                .map(
                        gateway -> {
                            try {
                                String uri = "/api/admin/users/" + gateway.getId();
                                return ResponseEntity
                                        .created(new URI(uri))
                                        .body(gateway);
                            } catch (URISyntaxException e) {
                                throw new RuntimeException(e);
                            }
                        });
    }

    @PutMapping("/gateways")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public Mono<ResponseEntity<GatewayDTO>> updateUser(@Valid @RequestBody GatewayDTO gatewayDTO) {
        log.debug("REST request to update Gateway : {}", gatewayDTO);

        return gatewayService.updateGateway(gatewayDTO).switchIfEmpty(
                Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND)))
                .map(
                        gateway -> ResponseEntity
                                .ok()
                                .body(gateway));
    }

    @GetMapping("/gateways")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")") 
    public Mono<ResponseEntity<Flux<GatewayDTO>>> getAllUsers(
            @RequestParam(defaultValue = "") String fieldName,
            @RequestParam(defaultValue = "") String fieldValue,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id,desc") String[] sort) {

        log.debug("REST request to get gateways by " + fieldName + " contains " + fieldValue);

        List<Sort.Order> orders = new ArrayList<Order>();
        if (sort.length > 0) {
            orders.add(new Order(getSortDirection(sort[1]), Gateway.columnName(sort[0])));
        } else {
            orders.add(new Order(getSortDirection("asc"), "id"));
        }

        Pageable pageable = PageRequest.of(page, size, Sort.by(orders));

        if (!onlyContainsAllowedProperties(pageable)) {
            return Mono.just(ResponseEntity.badRequest().build());
        }
        String uri = baseUrl + "/api/admin/users";

        if (fieldName.isEmpty()) {
            return gatewayService
                    .countAll()
                    .map(total -> new PageImpl<>(new ArrayList<>(), pageable, total))
                    .map(data -> PaginationUtil.generatePaginationHttpHeaders(UriComponentsBuilder.fromUriString(uri),
                            data))
                    .map(headers -> ResponseEntity.ok().headers(headers)
                            .body(gatewayService.getAllGateways(pageable)));
        }
        return gatewayService
                .countAllBy(fieldName, fieldValue)
                .map(total -> new PageImpl<>(new ArrayList<>(), pageable, total))
                .map(data -> PaginationUtil.generatePaginationHttpHeaders(UriComponentsBuilder.fromUriString(uri),
                        data))
                .map(headers -> ResponseEntity.ok().headers(headers)
                        .body(gatewayService.getAllGatewayWithDevicesBy(fieldName, fieldValue, pageable)));
    }

    @GetMapping("/gateways/{id}")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public Mono<GatewayDTO> getGateway(@PathVariable Long id) {
        log.debug("REST request to get gateway by id : {}", id);
        return gatewayService
                .getOneWithDevicesById(id)
                .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND)));
    }

    @DeleteMapping("/gateways/{id}")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public Mono<ResponseEntity<Void>> deleteGateway(
            @PathVariable  Long id) {
        log.debug("REST request to delete Gateway by id: {}", id);
        return gatewayService
                .deleteGateway(id)
                .map(
                        it -> ResponseEntity.noContent().build());
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