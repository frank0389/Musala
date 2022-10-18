package com.musalasoft.test.gateways.repository;

import java.util.Objects;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.musalasoft.test.gateways.IntegrationTest;
import com.musalasoft.test.gateways.model.Role;
import com.musalasoft.test.gateways.model.User;

@IntegrationTest
public class UserRepositoryIntTest {

	private final Logger log = LoggerFactory.getLogger(UserRepositoryIntTest.class);

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;
	@Autowired
	PasswordEncoder encoder;

	@BeforeEach
	public void init() {

		log.info("password {} ", encoder.encode("Gateway*2022"));
		User user = userRepository.findOneByUserName("test").block();
		if (Objects.isNull(user)) {
			user = new User();
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
			log.info("Created User {} ", user.toString());
		}
	}

	@Test
	public void testReturnUserByUserName() {
		User user = userRepository.findOneByUserName("test").block();
		log.info("Find User {}  by userName:test in DB", user.toString());
		assertThat(user.getFirstName()).isEqualTo("Frank Enrique");

	}

	@Test
	public void testReturnOneUserWithRolesByUserName() {
		User user = userRepository.findOneWithRolesByUserName("test").block();
		log.info("Find User {}  by userName:test in DB", user.toString());
		assertThat(user.getFirstName()).isEqualTo("Frank Enrique");
	}

}
