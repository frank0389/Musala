package com.musalasoft.test.gateways.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;


import java.util.Objects;

@Table("um_role")
public class Role {
    @Id
    private Long id;

    @Column("name")
    private String name;

    public Role() {
        
    }

    public Role(Long id,  String name) {
        this.id = id;
        this.name = name;
    }
   

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Role)) {
            return false;
        }
        return Objects.equals(name, ((Role) o).name);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(name);
    }

    @Override
    public String toString() {
        return "Role{" +
                "id="+id+ '\'' +
                "name='" + name + '\'' +
                "}";
    }

   
}