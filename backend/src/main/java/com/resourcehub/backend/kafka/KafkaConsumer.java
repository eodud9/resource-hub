package com.resourcehub.backend.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class KafkaConsumer {
    @KafkaListener(
            topics = "test-topic",
            groupId = "resourcehub-group"
    )
    public void consume(ReservationCreatedEvent event){
        System.out.println("ReservationId: " + event.reservationId());
        System.out.println("ResourceId: " + event.resourceId());
        System.out.println("UserId: " + event.userId());
    }
}
