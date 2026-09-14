package com.resourcehub.backend.kafka.consumer;

import com.resourcehub.backend.kafka.ReservationCreatedEvent;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class StatisticsConsumer {

    @KafkaListener(topics = "reservation-events", groupId = "statistics-group")
    public void consume(ReservationCreatedEvent event){
        System.out.println("[통계] 예약 ID: " + event.reservationId());
    }
}
