package com.musalasoft.test.gateways.util;

public final class Constants {

    // Regex for acceptable userName
    public static final String USERNAME_REG = "^(?>[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*)|(?>[_.@A-Za-z0-9-]+)$";
   
    // Regex for acceptable ip
    public static final String IPV4_REG = "^(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(\\.(?!$)|$)){4}$";

    public static final String DEFAULT_USER_PASS = "Pasword*2022";
    private Constants() {}
}