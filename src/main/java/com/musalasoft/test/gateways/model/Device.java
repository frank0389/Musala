package com.musalasoft.test.gateways.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("em_device")
public class Device {
    @Id
    private Long id;
 
    @Column("vendor")
    private String vendor;

    @Column("date")
    private String date;


    @Column("STATUS")
    private Boolean status;

    @Column("gateway_id")
    private Long gateway;

    public Device(){

    }

    public Device(Long id, String vendor, String date, Boolean status, Long gateway){
        this.id= id;
        this.vendor=vendor;
        this.date=date;
        this.status=status;
        this.gateway=gateway;
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
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Device)) {
            return false;
        }
        return id != null && id.equals(((Device) o).id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    @Override
    public String toString() {
        return "Device{" +
                "id="+id+ '\'' +
                "vendor='" + vendor + '\'' +
                "date='" + date + '\'' +
                "status='" + status + '\'' +
                "gateway='" + gateway + '\'' +
                "}";
    }


}