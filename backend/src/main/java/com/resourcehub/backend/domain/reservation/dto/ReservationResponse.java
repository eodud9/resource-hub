package com.resourcehub.backend.domain.reservation.dto;

import com.resourcehub.backend.domain.reservation.Reservation;
import com.resourcehub.backend.domain.reservation.ReservationStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class ReservationResponse {
    private Long reservationId;
    private Long resourceId;
    private String resourceName;
    private LocalDateTime startAt;
    private LocalDateTime endAt;
    private ReservationStatus reservationStatus;

    public ReservationResponse(Reservation reservation){
        this.reservationId = reservation.getId();
        this.resourceId = reservation.getResource().getId();
        this.resourceName = reservation.getResource().getName();
        this.startAt = reservation.getStartAt();
        this.endAt = reservation.getEndAt();
        this.reservationStatus = reservation.getReservationStatus();
    }
}
