package com.musalasoft.test.gateways.util;

import org.apache.commons.lang3.RandomStringUtils;

public final class RandomUtil {

    private static final int DEF_COUNT = 20;

    private RandomUtil() {
    }

    public static String generatePassword() {
        return RandomStringUtils.randomAlphanumeric(DEF_COUNT);
    }

    public static String generateUser() {
        return RandomStringUtils.randomAlphabetic(DEF_COUNT);
    }

    public static String generateString() {
        return RandomStringUtils.randomAlphanumeric(DEF_COUNT);
    }
}
