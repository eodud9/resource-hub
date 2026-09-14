package com.resourcehub.backend.kafka.outboxEvent;

import com.resourcehub.backend.common.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "outbox_events")
public class OutboxEvent extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String eventType;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String payload;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OutBoxEventStatus status;

    public OutboxEvent(String eventType, String payload){
        this.eventType = eventType;
        this.payload = payload;
        this.status = OutBoxEventStatus.PENDING;
    }

    public void markPublished(){
        this.status = OutBoxEventStatus.PUBLISHED;
    }
}
