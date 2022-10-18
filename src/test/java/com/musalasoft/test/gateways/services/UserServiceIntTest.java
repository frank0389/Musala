package com.musalasoft.test.gateways.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;

import static org.assertj.core.api.Assertions.assertThat;
import com.musalasoft.test.gateways.IntegrationTest;
import com.musalasoft.test.gateways.dto.UserDTO;
import com.musalasoft.test.gateways.model.Role;
import com.musalasoft.test.gateways.model.User;
import com.musalasoft.test.gateways.repository.RoleRepository;
import com.musalasoft.test.gateways.repository.UserRepository;
import com.musalasoft.test.gateways.util.RandomUtil;

@IntegrationTest
public class UserServiceIntTest {

    private final Logger log = LoggerFactory.getLogger(UserServiceIntTest.class);

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @BeforeEach
    public void init() {

        User test = userRepository.findOneByUserName("test").block();
        if (Objects.isNull(test)) {

            User user = new User();
            user.setUserName("test");
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
        userDTO.setFirstName("Enrique");
        userDTO.setLastName("Nicolau Gonzalez");
        userDTO.setLangKey("es");
        userDTO.getRoles().add("test");
        UserDTO createdUser = userService.createUser(userDTO).block();
        log.info("Create new user,  result: {}", createdUser);
        assertThat(createdUser.getUserName()).isEqualTo(newUserName.toLowerCase());
    }

    @Test
    public void testUpdateUser() {
        UserDTO user = userService.getUserWithRolesByUserName("test").block();

        if (!Objects.isNull(user)) {
            UserDTO userDTO = new UserDTO();
            userDTO.setUserName("test");
            userDTO.setFirstName("Dylan");
            userDTO.setLastName("Nicolau Moya");
            userDTO.setLangKey("en");
            userDTO.getRoles().add("test");
            userDTO.getRoles().add("admin");
            userDTO.setId(user.getId());
            UserDTO updateUser = userService.updateUser(userDTO).block();
            log.info("Update user with username = test, Result: {}", updateUser);
            assertThat(updateUser.getFirstName()).isEqualTo("Dylan");
        }

    }

    @Test
    public void testDeleteUser() {

        userService.deleteUser("test").block();
        UserDTO user = userService.getUserWithRolesByUserName("test").block();
        assertThat(user).isNull();

    }

    @Test
    public void testReurnAllUsersWithRoles() {

        List<Sort.Order> orders = new ArrayList<Order>();
        orders.add(new Order(Sort.Direction.ASC, "ID"));
        Pageable pag = PageRequest.of(0, 10, Sort.by(orders));

        List<UserDTO> users = userService.getAllManagedUsers(pag).collectList().block();
        int size = users.size();

        for (int i = 0; i < size; i++) {
            log.info(users.get(i).toString());
        }

        assertThat(users.size()).isBetween(0, 10);

    }

}
