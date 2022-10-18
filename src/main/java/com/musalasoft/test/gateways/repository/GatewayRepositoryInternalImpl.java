package com.musalasoft.test.gateways.repository;

import com.musalasoft.test.gateways.model.Gateway;
import com.musalasoft.test.gateways.model.Device;

import org.springframework.data.domain.Sort;
import org.springframework.data.r2dbc.convert.R2dbcConverter;
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.r2dbc.core.DatabaseClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import org.springframework.data.domain.Pageable;
import static org.springframework.data.relational.core.query.Criteria.where;
import static org.springframework.data.relational.core.query.Query.query;

import java.util.List;

public class GatewayRepositoryInternalImpl implements GatewayRepositoryInternal {

    private final DatabaseClient db;
    private final R2dbcEntityTemplate r2dbcEntityTemplate;
    private final R2dbcConverter r2dbcConverter;

    public GatewayRepositoryInternalImpl(DatabaseClient db, R2dbcEntityTemplate r2dbcEntityTemplate,
            R2dbcConverter r2dbcConverter) {
        this.db = db;
        this.r2dbcEntityTemplate = r2dbcEntityTemplate;
        this.r2dbcConverter = r2dbcConverter;
    }

    @Override
    public Mono<Gateway> findOneWithDevicesById(Long id) {
        return findOneWithDevicesBy("id", String.valueOf(id));
    }

    @Override
    public Mono<Gateway> findOneWithDevicesBySerialNumber(String serialNumber) {
        return findOneWithDevicesBy("serial_number", serialNumber);
    }

    @Override
    public Mono<Long> countAllBy(String fieldName, String fieldValue) {
        return db
        .sql("SELECT\n" + "COUNT(*) as count\n" + "FROM\n" + "\tem_gateway g\n" + "WHERE\n" + "\tLOWER("
                + fieldName + ") LIKE CONCAT('%',LOWER(:fieldValue),'%')")
        .bind("fieldValue", fieldValue).fetch().first().map(r -> (Long) r.get("count"));
    }

    @Override
    public Flux<Gateway> findAllWithDevicesBy(String fieldName, String fieldValue, Pageable pageable) {
        return findGateways(fieldName, fieldValue, pageable).flatMap(u -> updateGatewayDevice(u));
    }

    @Override
    public Flux<Gateway> findAllWithDevices(Pageable pageable) {
        return findGateways(pageable).flatMap(g -> updateGatewayDevice(g));

    }

    public Flux<Gateway> findGateways(Pageable pageable) {
        String property = pageable.getSort().stream().map(Sort.Order::getProperty).findFirst().get();
        String direction = String.valueOf(pageable.getSort().stream().map(Sort.Order::getDirection).findFirst().get());
        long page = pageable.getPageNumber();
        long size = pageable.getPageSize();
        return db.sql("SELECT\n" +
                "	g.ID,\n" +
                "	g.serial_number,\n" +
                "	g.human_readable_name,\n" +
                "	g.ip_v4\n" +
                "FROM\n" +
                "	em_gateway g\n" +
                " ORDER BY " + property + " " + direction + " LIMIT :limit OFFSET :offset")
                .bind("limit", size)
                .bind("offset", page)
                .map((row, metadata) -> {
                    Gateway gateway = r2dbcConverter.read(Gateway.class, row, metadata);
                    return gateway;
                }).all();

    }

    public Flux<Gateway> findGateways(String fieldName, Object fieldValue, Pageable pageable) {
        String property = pageable.getSort().stream().map(Sort.Order::getProperty).findFirst().get();
        String direction = String.valueOf(pageable.getSort().stream().map(Sort.Order::getDirection).findFirst().get());
        long page = pageable.getPageNumber();
        long size = pageable.getPageSize();
        return db.sql("SELECT\n" +
                "	g.ID,\n" +
                "	g.serial_number,\n" +
                "	g.human_readable_name,\n" +
                "	g.ip_v4\n" +
                "FROM\n" +
                "	em_gateway g\n" +
                "WHERE \n" +
                "	LOWER (" + fieldName + ") LIKE CONCAT('%',LOWER(:fieldValue),'%') ORDER BY " + property + " "
                + direction + " LIMIT :limit OFFSET :offset").bind("fieldValue", fieldValue)
                .bind("limit", size)
                .bind("offset", page)
                .map((row, metadata) -> {
                    Gateway gateway = r2dbcConverter.read(Gateway.class, row, metadata);
                    return gateway;
                }).all();

    }

    public Mono<Gateway> updateGatewayDevice(Gateway gateway) {
        return db.sql("SELECT * FROM em_device WHERE gateway_id = :gatewayId")
                .bind("gatewayId", gateway.getId())
                .map((row, metadata) -> {
                    Long id = row.get("id", Long.class);
                    String vendor = row.get("vendor", String.class);
                    String date = row.get("date", String.class);
                    Boolean status = row.get("status", Boolean.class);
                    Long gatw_id = row.get("gateway_id", Long.class);
                    Device device = new Device(id, vendor, date, status, gatw_id);
                    return device;

                }).all()
                .collectList().map(l -> updateGatewayWithDevices(gateway, l));
    }

    @Override
    public Mono<Void> delete(Gateway gateway) {
        return db.sql("DELETE FROM em_device WHERE gateway_id = :gateway").bind("gateway", gateway.getId()).then().then(
                r2dbcEntityTemplate.delete(Gateway.class).matching(query(where("id").is(gateway.getId()))).all()
                        .then());
    }

    private Mono<Gateway> findOneWithDevicesBy(String fieldName, Object fieldValue) {
        return db
                .sql("SELECT\n" +
                        " 	g.ID,\n" +
                        " 	g.serial_number,\n" +
                        " 	g.human_readable_name,\n" +
                        "	g.ip_v4\n" +
                        "FROM\n" +
                        "   em_gateway g\n" +
                        " WHERE g." + fieldName + " = :" + fieldName)
                .bind(fieldName, fieldValue)
                .map((row, metadata) -> {
                    return r2dbcConverter.read(Gateway.class, row, metadata);
                }).first().flatMap(g -> updateGatewayDevice(g));
    }

    private Gateway updateGatewayWithDevices(Gateway gateway, List<Device> devices) {
        int size = devices.size();
        for (int i = 0; i < size; i++) {
            gateway.getDevices().add(devices.get(i));
        }
        return gateway;
    }
}
