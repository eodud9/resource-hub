package com.resourcehub.backend.kafka;

import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Component;

import java.util.concurrent.CompletableFuture;

@Component
@RequiredArgsConstructor
public class KafkaProducer {

    private final KafkaTemplate<String, ReservationCreatedEvent> kafkaTemplate;

    public CompletableFuture<SendResult<String, ReservationCreatedEvent>> send(ReservationCreatedEvent event){

       return kafkaTemplate.send("reservation-events",
                event.reservationId().toString(),
                event);
    }

}
