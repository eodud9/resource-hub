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
public class StatisticsConsumer {

    private final StringRedisTemplate redisTemplate;



    @KafkaListener(topics = "reservation-events", groupId = "statistics-group")
    public void consume(ReservationCreatedEvent event){

        String key = "processed:statistics:" + event.reservationId();

        boolean firstAccess = redisTemplate.opsForValue().setIfAbsent(key, event.reservationId().toString());

        if(Boolean.TRUE.equals(firstAccess)){
            log.info("Reservation statistics processed. reservationId={}", event.reservationId());
        }


    }
}
