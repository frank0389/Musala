package com.musalasoft.test.gateways.model;

import java.util.HashSet;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("em_gateway")
public class Gateway {

    @Id
    private Long id;

    @Column("serial_number")
    private String serialNumber;

    @Column("human_readable_name")
    private String hrName;

    @Column("ip_v4")
    private String ipV4;

    @Transient
    private Set<Device> devices = new HashSet<>();

    public Gateway(){

    }

    public Gateway(Long id, String serialNumber, String hrName,String ipV4, Set<Device> devices){
        this.id=id;
        this.serialNumber=serialNumber;
        this.hrName=hrName;
        this.ipV4=ipV4;
        this.devices=devices;
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

    public Set<Device> getDevices() {
        return devices;
    }

    public void setDevices(Set<Device> devices) {
        this.devices = devices;
    }

    public static String columnName(String property){
        if(property.equalsIgnoreCase("ipV4"))
            return "ip_v4";
        if(property.equalsIgnoreCase("hrName"))
            return "human_readable_name";
        if(property.equalsIgnoreCase("serialNumber"))
            return "serial_number";
        return property;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Gateway)) {
            return false;
        }
        return id != null && id.equals(((Gateway) o).id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    @Override
    public String toString() {
        return "Gateway{" +
                "id="+id+ '\'' +
                "serialNumber='" + serialNumber + '\'' +
                "humandName='" + hrName + '\'' +
                "ipV4='" + ipV4 + '\'' +
                "devices='" + devices + '\'' +
                "}";
    }


}