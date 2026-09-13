package com.resourcehub.backend.domain.reservation;

import com.resourcehub.backend.domain.resource.Resource;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    boolean existsByResourceAndStartAtLessThanAndEndAtGreaterThanAndReservationStatus(Resource resource, LocalDateTime endAt, LocalDateTime startAt, ReservationStatus status);

    @Query("""
            select r
            from Reservation r
            join fetch r.resource
            where   r.user.id = :userId
            """)
    List<Reservation> findByUserIdWithResource(@Param("userId") Long userId);
}
