package com.musalasoft.test.gateways.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;

import com.musalasoft.test.gateways.IntegrationTest;
import com.musalasoft.test.gateways.dto.DeviceDTO;
import com.musalasoft.test.gateways.dto.GatewayDTO;
import com.musalasoft.test.gateways.model.Device;
import com.musalasoft.test.gateways.model.Gateway;
import com.musalasoft.test.gateways.repository.DeviceRepository;
import com.musalasoft.test.gateways.repository.GatewayRepository;
import com.musalasoft.test.gateways.util.RandomUtil;

import static org.assertj.core.api.Assertions.assertThat;

@IntegrationTest
public class GatewayServiceIntTest {

    private final Logger log = LoggerFactory.getLogger(GatewayServiceIntTest.class);

    @Autowired
    private GatewayRepository gatewayRepository;

    @Autowired
    private DeviceRepository deviceRepository;

    @Autowired
    private GatewayService gatewayService;

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
    }

    @Test
    public void testCreateGateway() {
        GatewayDTO gatewayDTO = new GatewayDTO();
        gatewayDTO.setHrName("Gateway test 1");
        gatewayDTO.setIpV4("10.12.29.5");
        gatewayDTO.setSerialNumber(RandomUtil.generateString());

        DeviceDTO dev1 = new DeviceDTO();
        dev1.setDate("2022-10-16");
        dev1.setVendor("Central alarma");
        dev1.setStatus(true);

        DeviceDTO dev2 = new DeviceDTO();
        dev2.setDate("2022-10-16");
        dev2.setVendor("Central alarma");
        dev2.setStatus(true);

        gatewayDTO.getDevices().add(dev1);
        gatewayDTO.getDevices().add(dev2);

        GatewayDTO savedGateway = gatewayService.createGateway(gatewayDTO).block();
        log.info("Created Gateway {} ", savedGateway);

        assertThat(savedGateway).isNotNull();

    }

    @Test
    public void testUpdateGateway() {

        GatewayDTO gateway = gatewayService.getOneWithDevicesBySerialNumber("12345678").block();
        log.info("Try to update Gateway {} ", gateway);

        if (!Objects.isNull(gateway)) {
            gateway.setHrName("Set Humand readable name");
            gateway.setIpV4("192.18.10.254");

            DeviceDTO dev1 = new DeviceDTO();
            dev1.setDate("2022-10-16");
            dev1.setId(gateway.getId());
            dev1.setVendor("Central alarma 2");
            dev1.setStatus(true);

            DeviceDTO dev2 = new DeviceDTO();
            dev2.setDate("2022-10-16");
            dev2.setId(gateway.getId());
            dev2.setVendor("Central alarma 3");
            dev2.setStatus(false);

            gateway.getDevices().clear();
            gateway.getDevices().add(dev1);
            gateway.getDevices().add(dev2);

            GatewayDTO updatedGateway = gatewayService.updateGateway(gateway).block();
            log.info("Update Gateway {} ", updatedGateway);
            assertThat(updatedGateway).isNotNull();
        }

    }

    @Test
    public void testDeleteGateway() {
        GatewayDTO gateway = gatewayService.getOneWithDevicesBySerialNumber("12345678").block();
        log.info("Try to delete gateway {}", gateway);
        if (!Objects.isNull(gateway)) {
            gatewayService.deleteGateway(gateway.getId()).block();
            GatewayDTO gwt = gatewayService.getOneWithDevicesBySerialNumber("12345678").block();
            assertThat(gwt).isNull();
        }

    }

    @Test
    public void testReturnAllGateway() {
        List<Sort.Order> orders = new ArrayList<Order>();
        orders.add(new Order(Sort.Direction.ASC, "ID"));

        Pageable pageable = PageRequest.of(0, 10, Sort.by(orders));
        List<GatewayDTO> gateways = gatewayService.getAllGateways(pageable).collectList().block();

        int size = gateways.size();
        for (int i = 0; i < size; i++) {
            log.info(gateways.get(i).toString());
        }

        assertThat(gateways.size()).isGreaterThan(0);
    }

}
