package com.musalasoft.test.gateways.api;

import java.util.Objects;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.reactive.server.WebTestClient;

import com.musalasoft.test.gateways.IntegrationTest;
import com.musalasoft.test.gateways.dto.LoginDTO;
import com.musalasoft.test.gateways.model.Role;
import com.musalasoft.test.gateways.model.User;
import com.musalasoft.test.gateways.repository.RoleRepository;
import com.musalasoft.test.gateways.repository.UserRepository;

import reactor.core.publisher.Mono;

@AutoConfigureWebTestClient
@IntegrationTest
public class JWTControllerIntTest {


    private final Logger log = LoggerFactory.getLogger(JWTControllerIntTest.class);

    @Autowired
    private WebTestClient webTestClient;

    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
	PasswordEncoder encoder;

    @BeforeEach
    public void init() {

        User test = userRepository.findOneByUserName("login").block();
        if (Objects.isNull(test)) {

            User user = new User();
            user.setUserName("login");
            user.setFirstName("Frank Enrique");
            user.setLastName("Nicolau Gonzalez");
            user.setPassword(encoder.encode("123456789"));
            user.setLangKey("es");

            User savedUser = userRepository.save(user).block();

            Role role = roleRepository.findRoleByName("test").block();
            if (Objects.isNull(role)) {
                role = new Role();
                role.setName("test");
                role = roleRepository.save(role).block();
            }

            userRepository.saveUserRole(role.getId(), savedUser.getId()).block();

            user.getRoles().add(role);
            log.info("Created User {} ", user);
        }
    }

    @Test
    public void testlogin() {
       LoginDTO login = new LoginDTO();
       login.setUsername("login");
       login.setPassword("123456789");
       login.setRememberMe(false);
       
       webTestClient.post().uri("/api/authenticate")
       .body(Mono.just(login), LoginDTO.class)
       .exchange()
       .expectStatus()
       .isOk(); // 200

    }
}
