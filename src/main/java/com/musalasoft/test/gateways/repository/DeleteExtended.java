package com.musalasoft.test.gateways.repository;

import reactor.core.publisher.Mono;

public interface DeleteExtended<T> {
    public  Mono<Void> delete(T obj);
}