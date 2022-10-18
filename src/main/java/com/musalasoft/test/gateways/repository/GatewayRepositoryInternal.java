package com.musalasoft.test.gateways.repository;


import org.springframework.data.domain.Pageable;
import com.musalasoft.test.gateways.model.Gateway;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface  GatewayRepositoryInternal extends DeleteExtended<Gateway> {

    public Mono<Gateway> findOneWithDevicesById(Long id);

    public Mono<Gateway> findOneWithDevicesBySerialNumber(String serialNumber);

    public Flux<Gateway> findAllWithDevices(Pageable pageable);

    public Flux<Gateway> findAllWithDevicesBy(String fieldName, String fieldValue, Pageable pageable);
   
    public Mono<Long> countAllBy(String fieldName, String filedValue);
    
}