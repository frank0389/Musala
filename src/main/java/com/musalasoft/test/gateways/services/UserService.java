package com.musalasoft.test.gateways.services;

import java.util.HashSet;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.musalasoft.test.gateways.dto.UserDTO;
import com.musalasoft.test.gateways.exeption.AccountResourceException;
import com.musalasoft.test.gateways.exeption.BadRequestAlertException;
import com.musalasoft.test.gateways.exeption.InvalidPasswordException;
import com.musalasoft.test.gateways.exeption.UserNotFoundExeption;
import com.musalasoft.test.gateways.exeption.UsernameAlreadyUsedException;
import com.musalasoft.test.gateways.model.Role;
import com.musalasoft.test.gateways.model.User;
import com.musalasoft.test.gateways.repository.RoleRepository;
import com.musalasoft.test.gateways.repository.UserRepository;
import com.musalasoft.test.gateways.util.Constants;
import com.musalasoft.test.gateways.util.SecurityUtils;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@Service
public class UserService {
    private final Logger log = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder,
            RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
    }

    @Transactional
    private Mono<User> saveUser(User user) {
        log.debug("Saving user:  {}", user.toString());

        return userRepository.save(user)
                .flatMap(savedUser -> Flux.fromIterable(user.getRoles())
                        .flatMap(role -> userRepository.saveUserRole(role.getId(), savedUser.getId()))
                        .then(Mono.just(savedUser)));
    }

    @Transactional
    public Mono<UserDTO> createUser(UserDTO userDTO) {

        if (userDTO.getId() != null) {
            throw new BadRequestAlertException("Invalid request");
        }

        return userRepository
                .findOneByUserName(userDTO.getUserName().toLowerCase())
                .hasElement()
                .flatMap(
                        userNameExiste -> {
                            if (Boolean.TRUE.equals(userNameExiste)) {
                                return Mono.error(new UsernameAlreadyUsedException("UserName already exists"));
                            }

                            User user = new User();
                            user.setUserName(userDTO.getUserName().toLowerCase());
                            user.setFirstName(userDTO.getFirstName());
                            user.setLastName(userDTO.getLastName());
                            user.setLangKey(userDTO.getLangKey());

                            return Flux.fromIterable(userDTO.getRoles() != null ? userDTO.getRoles() : new HashSet<>())
                                    .flatMap(roleRepository::findRoleByName).doOnNext(role -> user.getRoles().add(role))
                                    .then(Mono.just(user)).publishOn(Schedulers.boundedElastic()).map(newUser -> {
                                        String encryptedPassword = passwordEncoder
                                                .encode(Constants.DEFAULT_USER_PASS);// set default password
                                        newUser.setPassword(encryptedPassword);
                                        return newUser;
                                    }).flatMap(this::saveUser)
                                    .doOnNext(user1 -> log.debug("Created Information for User: {}", user1))
                                    .map(UserDTO::new);
                        });
    }

    @Transactional
    public Mono<UserDTO> updateUser(UserDTO userDTO) {
        return userRepository.findById(userDTO.getId()).flatMap(user -> {
            user.setUserName(userDTO.getUserName().toLowerCase());
            user.setFirstName(userDTO.getFirstName());
            user.setLastName(userDTO.getLastName());
            user.setLangKey(userDTO.getLangKey());
            Set<Role> roles = user.getRoles(); // Para no inicializar el set
            roles.clear();
            return userRepository.deleteUserRoles(user.getId()).thenMany(Flux.fromIterable(userDTO.getRoles()))
                    .flatMap(roleRepository::findRoleByName).map(roles::add).then(Mono.just(user));
        }).flatMap(this::saveUser).doOnNext(user -> log.debug("Changed Information for User: {}", user))
                .map(UserDTO::new);
    }

    @Transactional
    public Mono<Void> updateUser(String firstName, String lastName, String langKey) {
        return SecurityUtils.getCurrentUserName().
            switchIfEmpty(Mono.error( new AccountResourceException("Current user login not found")))
            .flatMap(userRepository::findOneByUserName)
            .switchIfEmpty(Mono.error( new UserNotFoundExeption("Current user login not found")))
            .flatMap(user -> {
            user.setFirstName(firstName);
            user.setLastName(lastName);
            user.setLangKey(langKey);
            return saveUser(user);
        }).doOnNext(user -> log.debug("Changed Information for User: {}", user)).then();
    }

    @Transactional
    public Mono<Void> deleteUser(String userName) {
        return userRepository.findOneByUserName(userName).flatMap(user -> userRepository.delete(user).thenReturn(user))
                .doOnNext(user -> log.debug("Deleted User: {}", user)).then();
    }

    @Transactional
    public Mono<Void> changePassword(String currentClearTextPassword, String newPassword) {

        return SecurityUtils.getCurrentUserName().flatMap(userRepository::findOneByUserName)
                .publishOn(Schedulers.boundedElastic()).map(user -> {
                    String currentEncryptedPassword = user.getPassword();
                    if (!passwordEncoder.matches(currentClearTextPassword, currentEncryptedPassword)) {
                        throw new InvalidPasswordException("Invalid passord");
                    }
                    String encryptedPassword = passwordEncoder.encode(newPassword);
                    user.setPassword(encryptedPassword);
                    return user;
                }).flatMap(this::saveUser).doOnNext(user -> log.debug("Changed password for User: {}", user)).then();
    }

    @Transactional(readOnly = true)
    public Flux<UserDTO> getAllManagedUsers(Pageable pageable) {
        return userRepository.findAllWithRoles(pageable).map(UserDTO::new);
    }

    @Transactional(readOnly = true)
    public Flux<UserDTO> getAllUsersBy(String fieldName, Object fieldValue, Pageable pageable) {
        return userRepository.findAllWithRolesBy(User.columnName(fieldName), fieldValue, pageable).map(UserDTO::new);
    }

    @Transactional(readOnly = true)
    public Mono<Long> countAllUsersBy(String fieldName, String filedValue) {
        return userRepository.countAllBy(User.columnName(fieldName), filedValue);
    }

    @Transactional(readOnly = true)
    public Mono<Long> countManagedUsers() {
        return userRepository.count();
    }

    @Transactional(readOnly = true)
    public Mono<UserDTO> getUserWithRolesByUserName(String userName) {
        return userRepository.findOneWithRolesByUserName(userName).map(UserDTO::new);
    }

    @Transactional(readOnly = true)
    public Mono<UserDTO> getUserWithRoles() {
        return SecurityUtils.getCurrentUserName().flatMap(userRepository::findOneWithRolesByUserName).map(UserDTO::new);
    }

}