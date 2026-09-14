package com.resourcehub.backend.kafka.outboxEvent;

public enum OutBoxEventStatus {
    PENDING,
    PUBLISHED,
    FAILED
}
