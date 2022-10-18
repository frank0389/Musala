package com.musalasoft.test.gateways.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.web.reactive.ResourceHandlerRegistrationCustomizer;
import org.springframework.util.CollectionUtils;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import org.springframework.web.reactive.config.WebFluxConfigurer;


@Configuration
public class WebConfigurer implements WebFluxConfigurer {

    private final Logger log = LoggerFactory.getLogger(WebConfigurer.class);


    public WebConfigurer() {
    }

    @Bean
    public CorsWebFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config =  new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        config.setAllowedHeaders(Arrays.asList("*"));
        config.setAllowedMethods(Arrays.asList("*"));
        config.setExposedHeaders(Arrays.asList("Authorization,Link,X-Total-Count")); // Exposed Headers

        if (!CollectionUtils.isEmpty(config.getAllowedOrigins())) {
            log.debug("Registering CORS filter");
            log.debug("Origins"+config.getAllowedOrigins());
            log.debug("Headers"+config.getAllowedHeaders());
            log.debug("Methods"+config.getAllowedMethods());
            source.registerCorsConfiguration("/api/**", config);
        }
        return new CorsWebFilter(source);
    }
    
    @Bean
    ResourceHandlerRegistrationCustomizer registrationCustomizer() {
        return registration -> registration.setCacheControl(null);
    }
}