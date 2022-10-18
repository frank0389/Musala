package com.musalasoft.test.gateways.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Table;
import org.springframework.data.relational.core.mapping.Column;

import java.util.HashSet;
import java.util.Set;

@Table("um_user")
public class User  {

    @Id
    private Long id;

    @Column("user_name")
    private String userName;

    @Column("password_hash")
    private String password;

    @Column("first_name")
    private String firstName;

    @Column("last_name")
    private String lastName;

    @Column("lang_key")
    private String langKey;

    @Transient
    private Set<Role> roles = new HashSet<>();

    public User(){

    }

    public User(Long id,String userName,String password,String firstName,String lastName, String langKey,Set<Role> roles){
        this.userName=userName;
        this.password=password;
        this.firstName=firstName;
        this.lastName=lastName;
        this.langKey=langKey;
        this.roles=roles;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName =userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getLangKey() {
        return langKey;
    }

    public void setLangKey(String langKey) {
        this.langKey = langKey;
    }
   
    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof User)) {
            return false;
        }
        return id != null && id.equals(((User) o).id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    public static String columnName(String property){

            if(property.equalsIgnoreCase("userName"))
                return "user_name";
                if(property.equalsIgnoreCase("password"))
                return "password_hash";
                if(property.equalsIgnoreCase("firstName"))
                return "first_name";
                if(property.equalsIgnoreCase( "lastName"))
                return "last_name";
                return property;
    }

    // prettier-ignore

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", userName='" + userName + '\'' +
                ", password='" + password + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", roles=" + roles +
                '}';
    }   

}