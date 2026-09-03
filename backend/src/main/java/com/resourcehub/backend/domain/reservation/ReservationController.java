package com.resourcehub.backend.domain.reservation;

import com.resourcehub.backend.domain.reservation.dto.ReservationCreateRequest;
import com.resourcehub.backend.domain.reservation.dto.ReservationResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    @GetMapping
    public List<ReservationResponse> getReservations(){
        return reservationService.getReservations();
    }

    @GetMapping("/{id}")
    public ReservationResponse getReservation(@PathVariable Long id){
        return reservationService.getReservation(id);
    }

    @PostMapping
    public ReservationResponse createReservation(@Valid @RequestBody ReservationCreateRequest request){
        return reservationService.createReservation(request);
    }

    @PatchMapping("/{id}/cancel")
    public void cancelReservation(@PathVariable Long id){
        reservationService.cancelReservation(id);
    }
}
