package com.musalasoft.test.gateways.repository;

import com.musalasoft.test.gateways.model.Role;
import com.musalasoft.test.gateways.model.User;

import org.springframework.data.domain.Sort;
import org.springframework.data.r2dbc.convert.R2dbcConverter;
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.r2dbc.core.DatabaseClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import org.springframework.data.domain.Pageable;
import static org.springframework.data.relational.core.query.Criteria.where;
import static org.springframework.data.relational.core.query.Query.query;
import reactor.util.function.Tuple2;
import reactor.util.function.Tuples;
import java.util.List;
import java.util.Optional;

public class UserRepositoryInternalImpl implements UserRepositoryInternal {

    private final DatabaseClient db;
    private final R2dbcEntityTemplate r2dbcEntityTemplate;
    private final R2dbcConverter r2dbcConverter;

    public UserRepositoryInternalImpl(DatabaseClient db, R2dbcEntityTemplate r2dbcEntityTemplate,
            R2dbcConverter r2dbcConverter) {
        this.db = db;
        this.r2dbcEntityTemplate = r2dbcEntityTemplate;
        this.r2dbcConverter = r2dbcConverter;
    }

    @Override
    public Mono<User> findOneWithRolesByUserName(String userName) {
        return findOneWithRolesBy("user_name", userName);
    }

    @Override
    public Mono<Long> countAllBy(String fieldName, String fieldValue) {
        return db
                .sql("SELECT\n" + "COUNT(*) as count\n" + "FROM\n" + "\tum_user u\n" + "WHERE\n" + "\tLOWER("
                        + fieldName + ") LIKE CONCAT('%',LOWER(:fieldValue),'%')")
                .bind("fieldValue", fieldValue).fetch().first().map(r -> (Long) r.get("count"));
    }

    @Override
    public Flux<User> findAllWithRolesBy(String fieldName, Object fieldValue, Pageable pageable) {
        return findUsers(fieldName, fieldValue, pageable).flatMap(u -> updateUserRole(u));
    }

    @Override
    public Flux<User> findAllWithRoles(Pageable pageable) {
        return findUsers(pageable).flatMap(u -> updateUserRole(u));

    }

    public Flux<User> findUsers(Pageable pageable) {
        String property = pageable.getSort().stream().map(Sort.Order::getProperty).findFirst().get();
        String direction = String.valueOf(pageable.getSort().stream().map(Sort.Order::getDirection).findFirst().get());
        long page = pageable.getPageNumber();
        long size = pageable.getPageSize();
        return db.sql("SELECT\n" +
                "	u. ID,\n" +
                "	u.user_name,\n" +
                "	u.password_hash,\n" +
                "	u.first_name , \n" +
                "  u.last_name, \n" +
                "  u.lang_key \n" +
                " FROM\n" +
                "	um_user u \n" +
                " ORDER BY " + property + " " + direction + " LIMIT :limit OFFSET :offset")
                .bind("limit", size)
                .bind("offset", page)
                .map((row, metadata) -> {
                    User user = r2dbcConverter.read(User.class, row, metadata);
                    return user;
                }).all();

    }

    public Flux<User> findUsers(String fieldName, Object fieldValue, Pageable pageable) {
        String property = pageable.getSort().stream().map(Sort.Order::getProperty).findFirst().get();
        String direction = String.valueOf(pageable.getSort().stream().map(Sort.Order::getDirection).findFirst().get());
        long page = pageable.getPageNumber();
        long size = pageable.getPageSize();
        return db.sql("SELECT\n" +
                "	u. ID,\n" +
                "	u.user_name,\n" +
                "	u.password_hash,\n" +
                "	u.first_name , \n" +
                "  u.last_name,\n" +
                "  u.lang_key \n" +
                "FROM\n" +
                "	um_user u \n" +
                "WHERE\n" +
                "	LOWER (" + fieldName + ") LIKE CONCAT('%',LOWER(:fieldValue),'%') ORDER BY " + property + " "
                + direction + " LIMIT :limit OFFSET :offset").bind("fieldValue", fieldValue)
                .bind("limit", size)
                .bind("offset", page)
                .map((row, metadata) -> {
                    User user = r2dbcConverter.read(User.class, row, metadata);
                    return user;
                }).all();

    }

    public Mono<User> updateUserRole(User user) {
        return db.sql("SELECT \n" +
                "r.ID, \n" +
                "r.name FROM um_role r\n" +
                " INNER JOIN um_user_role ur ON r.ID = ur.role_id WHERE ur.user_id = :userId")
                .bind("userId", user.getId())
                .map((row, metadata) -> {
                    Role role = r2dbcConverter.read(Role.class, row, metadata);
                    return role;

                }).all()
                .collectList().filter(l -> {
                    return !l.isEmpty();
                }).map(l -> updateUserWithRoles(user, l));
    }

    @Override
    public Mono<Void> delete(User user) {
        return db.sql("DELETE FROM um_user_role WHERE user_id = :userId").bind("userId", user.getId()).then().then(
                r2dbcEntityTemplate.delete(User.class).matching(query(where("id").is(user.getId()))).all().then());
    }

    private Mono<User> findOneWithRolesBy(String fieldName, Object fieldValue) {
        return db
                .sql("SELECT\n" + "\tu.id,\n" + "\tu.user_name,\n" + "\tu.password_hash,\n" + "\tu.first_name,\n"
                        + "\tu.last_name,\n"
                        + "\tu.lang_key,\n"
                        + "\tr.name AS role_name,\n" + "\tr.id AS role_id\n" + "FROM\n" + "\tum_user u\n"
                        + "INNER JOIN um_user_role ur ON u. ID = ur.user_id\n"
                        + "INNER JOIN um_role r ON ur.role_id = r.id \n" + "WHERE u." + fieldName + " = :" + fieldName)
                .bind(fieldName, fieldValue).map((row, metadata) -> {
                    Long id = row.get("role_id", Long.class);
                    String name = row.get("role_name", String.class);
                    Role role = new Role(id, name);
                    return Tuples.of(r2dbcConverter.read(User.class, row, metadata), Optional.ofNullable(role));
                }).all().collectList().filter(l -> {
                    return !l.isEmpty();
                }).map(l -> updateUserWithRoles(l));
    }

    private User updateUserWithRoles(User user, List<Role> roles) {
        int size = roles.size();
        for (int i = 0; i < size; i++) {
            user.getRoles().add(roles.get(i));
        }
        return user;
    }

    private User updateUserWithRoles(List<Tuple2<User, Optional<Role>>> tuples) {

        User user = tuples.get(0).getT1();
        int size = tuples.size();

        for (int i = 0; i < size; i++) {
            Tuple2<User, Optional<Role>> tuple = tuples.get(i);
            user.getRoles().add(tuple.getT2().get());
        }
        return user;
    }

}