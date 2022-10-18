package com.musalasoft.test.gateways.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.musalasoft.test.gateways.IntegrationTest;
import com.musalasoft.test.gateways.model.Device;
import com.musalasoft.test.gateways.model.Gateway;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;

@IntegrationTest
public class GatewayRepositoryIntTest {

    private final Logger log = LoggerFactory.getLogger(GatewayRepositoryIntTest.class);

    @Autowired
    private GatewayRepository gatewayRepository;

    @Autowired
    private DeviceRepository deviceRepository;

    @BeforeEach
    public void init() {

        Gateway gateway = gatewayRepository.findOneBySerialNumber("12345678").block();
        if (Objects.isNull(gateway)) {

            gateway = new Gateway();
            gateway.setHrName("Central Gateway");
            gateway.setIpV4("172.11.1.254");
            gateway.setSerialNumber("12345678");

            Gateway savedGateway = gatewayRepository.save(gateway).block();

            Device dev1 = new Device();
            dev1.setDate("2022-10-16");
            dev1.setVendor("Central alarma");
            dev1.setStatus(true);
            dev1.setGateway(savedGateway.getId());

            Device dev2 = new Device();
            dev2.setDate("2022-10-16");
            dev2.setVendor("Raspberry PI 1");
            dev2.setStatus(true);
            dev2.setGateway(savedGateway.getId());

            Device savedDevice = deviceRepository.save(dev1).block();
            Device savedDevice1 = deviceRepository.save(dev2).block();

            gateway.getDevices().add(savedDevice);
            gateway.getDevices().add(savedDevice1);

            log.info("Created gateway {} ", gateway);
        }

        Gateway gateway2 = gatewayRepository.findOneBySerialNumber("987654321").block();
        if (Objects.isNull(gateway2)) {

            gateway2 = new Gateway();
            gateway2.setHrName("Rigth Gateway");
            gateway2.setIpV4("172.11.2.254");
            gateway2.setSerialNumber("987654321");

            Gateway savedGateway = gatewayRepository.save(gateway2).block();

            Device dev1 = new Device();
            dev1.setDate("2022-10-16");
            dev1.setVendor("Central alarma");
            dev1.setStatus(true);
            dev1.setGateway(savedGateway.getId());

            Device dev2 = new Device();
            dev2.setDate("2022-10-16");
            dev2.setVendor("Raspberry PI 2");
            dev2.setStatus(true);
            dev2.setGateway(savedGateway.getId());

            Device savedDevice = deviceRepository.save(dev1).block();
            Device savedDevice1 = deviceRepository.save(dev2).block();

            gateway2.getDevices().add(savedDevice);
            gateway2.getDevices().add(savedDevice1);

            log.info("Created gateway {} ", gateway2);
        }

    }

    @Test
    public void testReturnOneGatewayWithDevicesBySerialNumber() {
        Gateway gateway = gatewayRepository.findOneWithDevicesBySerialNumber("12345678").block();
        log.info("Find gateway {}  by serialNumber:12345678 in DB", gateway.toString());
        assertThat(gateway).isNotNull();
    }

    @Test
    public void testReturnAllGatewaysWithDevices() {

        List<Sort.Order> orders = new ArrayList<Order>();
        orders.add(new Order(Sort.Direction.ASC, "ID"));

        Pageable pageable = PageRequest.of(0, 10, Sort.by(orders));
        List<Gateway> gateways = gatewayRepository.findAllWithDevices(pageable).collectList().block();

        int size = gateways.size();
        for (int i = 0; i < size; i++) {
            log.info(gateways.get(i).toString());
        }
        assertThat(gateways.size()).isGreaterThan(0);
    }

}