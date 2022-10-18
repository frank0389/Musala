package com.musalasoft.test.gateways.api.resources;

import java.util.List;
import java.util.Objects;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.reactive.server.WebTestClient;

import com.musalasoft.test.gateways.IntegrationTest;
import com.musalasoft.test.gateways.dto.DeviceDTO;
import com.musalasoft.test.gateways.dto.GatewayDTO;
import com.musalasoft.test.gateways.model.Device;
import com.musalasoft.test.gateways.model.Gateway;
import com.musalasoft.test.gateways.repository.DeviceRepository;
import com.musalasoft.test.gateways.repository.GatewayRepository;
import com.musalasoft.test.gateways.util.RandomUtil;

import static org.assertj.core.api.Assertions.assertThat;

import reactor.core.publisher.Mono;

@AutoConfigureWebTestClient
@WithMockUser(username = "admin", authorities = { "admin", "user" })
@IntegrationTest
public class GatewayResourcesIntTest {

    private final Logger log = LoggerFactory.getLogger(GatewayResourcesIntTest.class);

    @Autowired
    private WebTestClient webTestClient;

    @Autowired
    private GatewayRepository gatewayRepository;

    @Autowired
    private DeviceRepository deviceRepository;

    @BeforeEach
    public void init() {

        Gateway gateway = gatewayRepository.findOneBySerialNumber("190389").block();
        if (Objects.isNull(gateway)) {

            gateway = new Gateway();
            gateway.setHrName("Central Gateway");
            gateway.setIpV4("172.11.1.254");
            gateway.setSerialNumber("190389");

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

        webTestClient.post().uri("/api/admin/gateways")
                .body(Mono.just(gatewayDTO), GatewayDTO.class)
                .exchange()
                .expectStatus().isCreated(); // 400
    }

    @Test
    public void testCreateGatewayWithExistenSerialNumber() {
        GatewayDTO gatewayDTO = new GatewayDTO();
        gatewayDTO.setHrName("Gateway test 1");
        gatewayDTO.setIpV4("10.12.29.5");
        gatewayDTO.setSerialNumber("190389");

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

        webTestClient.post().uri("/api/admin/gateways")
                .body(Mono.just(gatewayDTO), GatewayDTO.class)
                .exchange()
                .expectStatus().isBadRequest(); // 400
    }

    @Test
    public void testReturnAllGateway() {

        String fieldName = "";
        String fieldValue = "";
        int page = 0;
        int size = 10;

        List<GatewayDTO> gateways = webTestClient.get()
                .uri("/api/admin/gateways?fieldName=" + fieldName + "&fieldValue=" + fieldValue + "&page=" + page
                        + "&size=" + size + "&sort=id,DESC")
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .expectStatus()
                .isOk()
                .expectHeader()
                .contentType(MediaType.APPLICATION_JSON)
                .returnResult(GatewayDTO.class)
                .getResponseBody()
                .collectList().block();
                int length = gateways.size();

                for (int i = 0; i < length; i++) {
                    log.info(gateways.get(i).toString());
                }
        
                assertThat(gateways.size()).isBetween(0, size);
    }

    @Test
    public void testDeleteGateway() {
        Gateway gateway = gatewayRepository.findOneBySerialNumber("190389").block();

        if(!Objects.isNull(gateway)){
         webTestClient
                .delete()
                .uri("/api/admin/gateways/{id}", gateway.getId())
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .expectStatus()
                .isNoContent();
        }
        
    }

}