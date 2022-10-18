package com.musalasoft.test.gateways.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class JWTTokenDTO {

    @JsonProperty("id_token")
    private String idToken;

    public JWTTokenDTO(String idToken) {
        this.idToken = idToken;
    }

    public String getIdToken() {
        return idToken;
    }

    public void setIdToken(String idToken) {
        this.idToken = idToken;
    }

    @Override
    public String toString() {
        return "JWTTokenDTO{" +
                "idToken='" + idToken + '\'' +
                '}';
    }

}