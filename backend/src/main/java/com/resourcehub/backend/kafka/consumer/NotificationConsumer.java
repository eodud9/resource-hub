package com.resourcehub.backend.kafka.consumer;

import com.resourcehub.backend.kafka.ReservationCreatedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

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
            System.out.println("[알림] 예약 ID: " + event.reservationId());
        }
    }
}
