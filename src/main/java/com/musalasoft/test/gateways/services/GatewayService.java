package com.musalasoft.test.gateways.services;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.musalasoft.test.gateways.dto.DeviceDTO;
import com.musalasoft.test.gateways.dto.GatewayDTO;
import com.musalasoft.test.gateways.exeption.BadRequestAlertException;
import com.musalasoft.test.gateways.exeption.SerialNumberAlreadyUsedExeption;
import com.musalasoft.test.gateways.model.Device;
import com.musalasoft.test.gateways.model.Gateway;
import com.musalasoft.test.gateways.repository.DeviceRepository;
import com.musalasoft.test.gateways.repository.GatewayRepository;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class GatewayService {

    private final Logger log = LoggerFactory.getLogger(GatewayService.class);

    private final GatewayRepository gatewayRepository;
    private final DeviceRepository deviceRepository;

    public GatewayService(GatewayRepository gatewayRepository, DeviceRepository deviceRepository) {
        this.gatewayRepository = gatewayRepository;
        this.deviceRepository = deviceRepository;
    }

    @Transactional
    private Mono<Gateway> saveGateway(Gateway gateway) {
        log.debug("Saving Gateway:  {}", gateway);

        return gatewayRepository.save(gateway)
                .flatMap(savedGateway -> Flux.fromIterable(gateway.getDevices())
                        .flatMap(device -> {
                            device.setGateway(savedGateway.getId());
                            return deviceRepository.save(device);
                        })
                        .then(Mono.just(savedGateway)));
    }

    @Transactional
    public Mono<GatewayDTO> createGateway(GatewayDTO gatewayDTO) {

        if (gatewayDTO.getId() != null) {
            throw new BadRequestAlertException("Invalid request");
        }

        return gatewayRepository
                .findOneBySerialNumber(gatewayDTO.getSerialNumber())
                .hasElement()
                .flatMap(
                        serialNumberExiste -> {
                            if (Boolean.TRUE.equals(serialNumberExiste)) {
                                return Mono.error(new SerialNumberAlreadyUsedExeption("Serial number already exists"));
                            }

                            Gateway gateway = new Gateway();
                            gateway.setSerialNumber(gatewayDTO.getSerialNumber());
                            gateway.setHrName(gatewayDTO.getHrName());
                            gateway.setIpV4(gatewayDTO.getIpV4());

                            List<DeviceDTO> deviceList = new ArrayList<DeviceDTO>();
                            deviceList.addAll(gatewayDTO.getDevices());
                            int size = deviceList.size();
                            for (int i = 0; i < size; i++) {
                                DeviceDTO pvt = deviceList.get(i);
                                Device device = new Device();
                                device.setDate(pvt.getDate());
                                device.setStatus(pvt.getStatus());
                                device.setVendor(pvt.getVendor());
                                device.setGateway(pvt.getGateway());
                                gateway.getDevices().add(device);
                            }

                            return saveGateway(gateway).map(GatewayDTO::new);
                        });
    }

    @Transactional
    public Mono<GatewayDTO> updateGateway(GatewayDTO gatewayDTO) {
        return gatewayRepository.findById(gatewayDTO.getId()).flatMap(gateway -> {
            gateway.setHrName(gatewayDTO.getHrName());
            gateway.setIpV4(gatewayDTO.getIpV4());
            gateway.setSerialNumber(gatewayDTO.getSerialNumber());

            List<DeviceDTO> deviceList = new ArrayList<DeviceDTO>();
            deviceList.addAll(gatewayDTO.getDevices());
            int size = deviceList.size();
            gateway.getDevices().clear();

            for (int i = 0; i < size; i++) {
                DeviceDTO pvt = deviceList.get(i);
                Device device = new Device();
                device.setDate(pvt.getDate());
                device.setStatus(pvt.getStatus());
                device.setVendor(pvt.getVendor());
                device.setGateway(pvt.getGateway());
                gateway.getDevices().add(device);
            }

            return deviceRepository.deleteDeviceByGatewayId(gateway.getId())
                    .then(Mono.just(gateway));
        }).flatMap(this::saveGateway).doOnNext(gateway -> log.debug("Changed Information for gateay: {}", gateway))
                .map(GatewayDTO::new);
    }

    @Transactional
    public Mono<Void> deleteGateway(Long id) {
        return gatewayRepository.findOneById(id)
                .flatMap(gateway -> deviceRepository.deleteDeviceByGatewayId(gateway.getId()).thenReturn(gateway))
                .flatMap(gateway -> gatewayRepository.delete(gateway).thenReturn(gateway))
                .doOnNext(gateway -> log.debug("Deleted Gateway: {}", gateway)).then();
    }

    @Transactional(readOnly = true)
    public Flux<GatewayDTO> getAllGateways(Pageable pageable) {
        return gatewayRepository.findAllWithDevices(pageable).map(GatewayDTO::new);
    }

    @Transactional(readOnly = true)
    public Flux<GatewayDTO> getAllGatewayWithDevicesBy(String fieldName, String fieldValue, Pageable pageable) {
        return gatewayRepository.findAllWithDevicesBy(Gateway.columnName(fieldName), fieldValue, pageable)
                .map(GatewayDTO::new);
    }

    @Transactional(readOnly = true)
    public Mono<Long> countAllBy(String fieldName, String filedValue) {
        return gatewayRepository.countAllBy(Gateway.columnName(fieldName), filedValue);
    }

    @Transactional(readOnly = true)
    public Mono<Long> countAll() {
        return gatewayRepository.count();
    }

    @Transactional(readOnly = true)
    public Mono<GatewayDTO> getOneWithDevicesById(Long id) {
        return gatewayRepository.findOneWithDevicesById(id).map(GatewayDTO::new);
    }

    @Transactional(readOnly = true)
    public Mono<GatewayDTO> getOneWithDevicesBySerialNumber(String serialNumber) {
        return gatewayRepository.findOneWithDevicesBySerialNumber(serialNumber).map(GatewayDTO::new);
    }

}