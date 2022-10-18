package com.musalasoft.test.gateways.api.resources;

import java.util.List;
import java.util.Objects;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.http.MediaType;
import org.springframework.test.web.reactive.server.WebTestClient;
import com.musalasoft.test.gateways.IntegrationTest;
import com.musalasoft.test.gateways.dto.UserDTO;
import com.musalasoft.test.gateways.model.Role;
import com.musalasoft.test.gateways.model.User;
import com.musalasoft.test.gateways.repository.RoleRepository;
import com.musalasoft.test.gateways.repository.UserRepository;
import com.musalasoft.test.gateways.util.RandomUtil;
import org.springframework.security.test.context.support.WithMockUser;
import static org.assertj.core.api.Assertions.assertThat;
import reactor.core.publisher.Mono;

@AutoConfigureWebTestClient
@WithMockUser(username = "admin", authorities = { "admin", "user" })
@IntegrationTest
public class UserResourceIntTest {

    private final Logger log = LoggerFactory.getLogger(UserResourceIntTest.class);

    @Autowired
    private WebTestClient webTestClient;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @BeforeEach
    public void init() {

        User test = userRepository.findOneByUserName("testresource").block();
        if (Objects.isNull(test)) {

            User user = new User();
            user.setUserName("testresource");
            user.setFirstName("Frank Enrique");
            user.setLastName("Nicolau Gonzalez");
            user.setPassword("123456789");
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
    public void testCreateUser() {
        UserDTO userDTO = new UserDTO();
        String newUserName = RandomUtil.generateUser();
        userDTO.setUserName(newUserName);
        userDTO.setFirstName("Enrique wtc");
        userDTO.setLastName("Nicolau Gonzalez");
        userDTO.setLangKey("es");
        userDTO.getRoles().add("test");

        webTestClient.post().uri("/api/admin/users")
                .body(Mono.just(userDTO), UserDTO.class)
                .exchange()
                .expectStatus().isCreated(); // 201

    }

    @Test
    void testCreateUserWithExistingUserName() {

        UserDTO userDTO = new UserDTO();
        userDTO.setUserName("testresource");
        userDTO.setFirstName("Enrique wtc");
        userDTO.setLastName("Nicolau Gonzalez");
        userDTO.getRoles().add("test");
        userDTO.setLangKey("es");


        webTestClient.post().uri("/api/admin/users")
                .body(Mono.just(userDTO), UserDTO.class)
                .exchange()
                .expectStatus().isBadRequest(); // 400
    }

    @Test
    public void testReturnAllUsers() {
        String fieldName = "";
        String fieldValue = "";
        int page = 0;
        int size = 10;

        List<UserDTO> users = webTestClient.get()
                .uri("/api/admin/users?fieldName=" + fieldName + "&fieldValue=" + fieldValue + "&page=" + page
                        + "&size=" + size + "&sort=id,DESC")
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .expectStatus()
                .isOk()
                .expectHeader()
                .contentType(MediaType.APPLICATION_JSON)
                .returnResult(UserDTO.class)
                .getResponseBody()
                .collectList().block();

        int length = users.size();

        for (int i = 0; i < length; i++) {
            log.info(users.get(i).toString());
        }

        assertThat(users.size()).isBetween(0, size);

    }

    @Test
    public void testDeleteUser() {

        String userName = "testresource";
        webTestClient
                .delete()
                .uri("/api/admin/users/{login}", userName)
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .expectStatus()
                .isNoContent();
    }

}