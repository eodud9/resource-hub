package com.resourcehub.backend.kafka;

import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class KafkaProducer {

    private final KafkaTemplate<String, ReservationCreatedEvent> kafkaTemplate;

    public void send(){

        ReservationCreatedEvent event = new ReservationCreatedEvent(
                1L, 2L, 3L);

        kafkaTemplate.send("test-topic",
                event.reservationId().toString(),
                event);
    }

}
