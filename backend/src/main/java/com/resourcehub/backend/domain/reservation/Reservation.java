package com.resourcehub.backend.domain.reservation;

import com.resourcehub.backend.domain.resource.Resource;
import com.resourcehub.backend.domain.user.User;
import com.resourcehub.backend.exception.ReservationInvalidException;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "reservations")
@NoArgsConstructor
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Resource resource;

    private LocalDateTime startAt;

    private LocalDateTime endAt;

    @Enumerated(EnumType.STRING)
    private ReservationStatus reservationStatus;

    @ManyToOne
    private User user;

    public Reservation (Resource resource, LocalDateTime startAt, LocalDateTime endAt, User user){
        this.resource = resource;
        this.startAt = startAt;
        this.endAt = endAt;
        this.reservationStatus = ReservationStatus.RESERVED;
        this.user = user;
    }

    public void cancel(){

        if(this.reservationStatus != ReservationStatus.RESERVED){
            throw new ReservationInvalidException("유효하지 않은 취소입니다.");
        }

        this.reservationStatus = ReservationStatus.CANCELED;
    }
}
