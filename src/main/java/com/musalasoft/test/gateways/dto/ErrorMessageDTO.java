package com.musalasoft.test.gateways.dto;

public class ErrorMessageDTO {

    private String title;
    private String message;
    private String description;

    public ErrorMessageDTO() {

    }

    public ErrorMessageDTO(String title, String message, String description) {
        this.title = title;
        this.message = message;
        this.description = description;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}