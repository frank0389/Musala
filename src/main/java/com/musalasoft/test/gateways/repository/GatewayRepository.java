package com.musalasoft.test.gateways.repository;

import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.stereotype.Repository;
import com.musalasoft.test.gateways.model.Gateway;
import reactor.core.publisher.Mono;

@Repository
public interface GatewayRepository extends  R2dbcRepository<Gateway, Long> , GatewayRepositoryInternal {
    public Mono<Gateway> findOneById(Long id);
    public Mono<Gateway> findOneBySerialNumber(String serialNumber);
}