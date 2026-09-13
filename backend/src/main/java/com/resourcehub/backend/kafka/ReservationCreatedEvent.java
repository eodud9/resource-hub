package com.resourcehub.backend.kafka;

public record ReservationCreatedEvent(
        Long reservationId,
        Long userId,
        Long resourceId
) {
}
