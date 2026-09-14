package com.resourcehub.backend.kafka.outboxEvent;

import com.resourcehub.backend.kafka.KafkaProducer;
import com.resourcehub.backend.kafka.ReservationCreatedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import tools.jackson.databind.ObjectMapper;

import java.util.List;

@Component
@RequiredArgsConstructor
public class OutboxPublisher {

    private final OutboxEventRepository outboxEventRepository;
    private final KafkaProducer kafkaProducer;
    private final ObjectMapper objectMapper;

    @Transactional
    @Scheduled(fixedDelay = 5000)
    public void publishPendingEvents(){

        List<OutboxEvent> events = outboxEventRepository.findByStatus(OutBoxEventStatus.PENDING);

        for (OutboxEvent outboxEvent : events){
            ReservationCreatedEvent event = objectMapper.readValue(
                    outboxEvent.getPayload(),
                    ReservationCreatedEvent.class
            );

            kafkaProducer.send(event).join();

            outboxEvent.markPublished();

        }

    }


}
