package com.musalasoft.test.gateways.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.r2dbc.repository.config.EnableR2dbcRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableR2dbcRepositories(basePackages = "com.musalasoft.test.gateways.repository")
@EnableTransactionManagement
public class DatabaseConfig {

}