package com.musalasoft.test.gateways.repository;


import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.stereotype.Repository;
import com.musalasoft.test.gateways.model.Device;

import reactor.core.publisher.Mono;

@Repository
public interface DeviceRepository extends  R2dbcRepository<Device,Long> {
    
    @Query("DELETE FROM em_device WHERE gateway_id = :gatewayId")
    public Mono<Void> deleteDeviceByGatewayId(Long gatewayId);

}