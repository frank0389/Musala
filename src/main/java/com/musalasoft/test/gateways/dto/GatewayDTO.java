package com.musalasoft.test.gateways.dto;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.validation.constraints.Pattern;

import org.springframework.lang.NonNull;

import com.musalasoft.test.gateways.model.Device;
import com.musalasoft.test.gateways.model.Gateway;
import com.musalasoft.test.gateways.util.Constants;

public class GatewayDTO {

    private Long id;

    @NonNull
    private String serialNumber;
    @NonNull
    private String hrName;

    @NonNull
    @Pattern(regexp = Constants.IPV4_REG)
    private String ipV4;

    private Set<DeviceDTO> devices = new HashSet<>();

    public GatewayDTO() {

    }

    public GatewayDTO(Gateway gateway) {

        this.id = gateway.getId();
        this.hrName = gateway.getHrName();
        this.ipV4 = gateway.getIpV4();
        this.serialNumber = gateway.getSerialNumber();
        List<Device> deviceList = new ArrayList<Device>();
        deviceList.addAll(gateway.getDevices());
        int size = deviceList.size();
        for (int i = 0; i < size; i++) {
            this.devices.add(new DeviceDTO(deviceList.get(i)));
        }

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public String getHrName() {
        return hrName;
    }

    public void setHrName(String hrName) {
        this.hrName = hrName;
    }

    public String getIpV4() {
        return ipV4;
    }

    public void setIpV4(String ipV4) {
        this.ipV4 = ipV4;
    }

    public Set<DeviceDTO> getDevices() {
        return devices;
    }

    public void setDevices(Set<DeviceDTO> devices) {
        this.devices = devices;
    }

    @Override
    public String toString() {
        return "GatewayDTO{" +
                "id=" + id +
                ", serialNumber='" + serialNumber + '\'' +
                ", hrName='" + hrName + '\'' +
                ", ipV4='" + ipV4 + '\'' +
                ", devices=" + devices +
                '}';
    }

}
