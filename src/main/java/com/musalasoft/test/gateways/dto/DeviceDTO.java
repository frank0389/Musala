package com.musalasoft.test.gateways.dto;


import javax.validation.constraints.NotBlank;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.musalasoft.test.gateways.model.Device;

public class DeviceDTO {

    private Long id;

    @NotBlank
    private String vendor;

    @NotBlank
    @JsonFormat(pattern="yyyy-MM-dd")
    private String date;

    private Boolean status= false;

    private Long gateway;

    public DeviceDTO() {

    }

    public DeviceDTO(Device device) {
        this.id = device.getId();
        this.vendor = device.getVendor();
        this.date = device.getDate();
        this.status = device.getStatus();
        this.gateway = device.getGateway();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVendor() {
        return vendor;
    }

    public void setVendor(String vendor) {
        this.vendor = vendor;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public Long getGateway() {
        return gateway;
    }

    public void setGateway(Long gateway) {
        this.gateway = gateway;
    }

    @Override
    public String toString() {
        return "DeviceDTO{" +
                "id='" + id + '\'' +
                ", vendor='" + vendor + '\'' +
                ", status=" + status +
                ", date='" + date + '\'' +
                ", gateway=" + gateway +
                '}';
    }
}