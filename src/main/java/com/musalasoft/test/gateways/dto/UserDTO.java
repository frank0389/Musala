package com.musalasoft.test.gateways.dto;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import com.musalasoft.test.gateways.model.Role;
import com.musalasoft.test.gateways.model.User;
import com.musalasoft.test.gateways.util.Constants;

public class UserDTO {
    private Long id;

    @NotBlank
    @Pattern(regexp = Constants.USERNAME_REG)
    @Size(min = 1, max = 50)
    private String userName;

    @Size(max = 50)
    private String firstName;

    @Size(max = 50)
    private String lastName;

    @Size(min = 2, max = 10)
    private String langKey;


    private Set<String> roles = new HashSet<>();

    public UserDTO() {

    }

    public UserDTO(User user) {
        this.id = user.getId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.userName = user.getUserName();
        this.langKey= user.getLangKey();
        List<Role> rolesList = new ArrayList<Role>();
        rolesList.addAll(user.getRoles());
        int size = rolesList.size();

        for (int i = 0; i < size; i++) {
            Role r = rolesList.get(i);
            this.roles.add(r.getName());
        }
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
        this.userName = userName;
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

    public Set<String> getRoles() {
        return roles;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }

    @Override
    public String toString() {
        return "UserDTO{" +
                "username='" + userName + '\'' +
                ", firstName=" + firstName + '\'' +
                ", lastName=" + lastName + '\'' +
                ", langKey=" + langKey + '\'' +
                ", roles=" + roles + '\'' +
                '}';
    }

   

}