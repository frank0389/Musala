package com.musalasoft.test.gateways.repository;

import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.stereotype.Repository;

import com.musalasoft.test.gateways.model.User;
import reactor.core.publisher.Mono;

@Repository
public interface UserRepository extends  R2dbcRepository<User, Long>, UserRepositoryInternal {
    
    public Mono<User> findOneByUserName(String userName);

    @Query("INSERT INTO um_user_role(role_id, user_id) VALUES(:roleId, :userId)")
    public Mono<Void> saveUserRole(Long roleId, Long userId);

    @Query("DELETE FROM um_user_role WHERE user_id = :userId")
    public Mono<Void> deleteUserRoles(Long userId);
}
