package com.resourcehub.backend.domain.reservation;

import com.resourcehub.backend.domain.resource.Resource;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    boolean existsByResourceAndStartAtLessThanAndEndAtGreaterThanAndReservationStatus(Resource resource, LocalDateTime endAt, LocalDateTime startAt, ReservationStatus status);
    List<Reservation> findByUserId(Long userId);
}
