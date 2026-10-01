package com.resourcehub.backend.kafka.consumer;

import com.resourcehub.backend.kafka.ReservationCreatedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class NotificationConsumer {

    private final StringRedisTemplate stringRedisTemplate;

    @KafkaListener(topics = "reservation-events", groupId = "notification-group")
    public void consume(ReservationCreatedEvent event){

        String key = "processed:notification:" + event.reservationId();

        Boolean firstProcess = stringRedisTemplate.opsForValue().setIfAbsent(
                key, event.reservationId().toString()
        );

        if(Boolean.TRUE.equals(firstProcess)){
            log.info("Reservation notification processed. reservationId={}", event.reservationId());
        }
    }
}
