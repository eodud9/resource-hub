package com.resourcehub.backend.domain.reservation;

import com.resourcehub.backend.domain.reservation.dto.ReservationCreateRequest;
import com.resourcehub.backend.domain.reservation.dto.ReservationResponse;
import com.resourcehub.backend.domain.resource.Resource;
import com.resourcehub.backend.domain.resource.ResourceRepository;
import com.resourcehub.backend.domain.user.User;
import com.resourcehub.backend.domain.user.UserRepository;
import com.resourcehub.backend.exception.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final ResourceRepository resourceRepository;
    private final UserRepository userRepository;

    public List<ReservationResponse> getReservations(){
        List<Reservation> reservations = reservationRepository.findAll();

        return reservations.stream()
                .map(ReservationResponse::new)
                .toList();
    }

    public ReservationResponse getReservation(Long id){
        Reservation reservation = reservationRepository.findById(id).orElseThrow(() -> new ReservationNotFoundException("해당 예약이 존재하지 않습니다."));
        return new ReservationResponse(reservation);
    }

    @Transactional
    public ReservationResponse createReservation(ReservationCreateRequest request){
        Resource resource = resourceRepository.findById(request.getResourceId())
                .orElseThrow(() -> new ResourceNotFoundException("Resource Not Found"));

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));

        if(!request.getStartAt().isBefore(request.getEndAt())){
            throw new ReservationInvalidException("예약 시간이 유효하지 않습니다.");
        }

        if(reservationRepository.existsByResourceAndStartAtLessThanAndEndAtGreaterThanAndReservationStatus(resource, request.getEndAt(), request.getStartAt(), ReservationStatus.RESERVED)){
            throw new ReservationConflictException("해당 시간에 예약이 존재합니다.");
        }

        Reservation reservation = new Reservation(resource, request.getStartAt(), request.getEndAt(), user);

        return new ReservationResponse(reservationRepository.save(reservation));
    }

    @Transactional
    public void cancelReservation(Long id){
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(()-> new ReservationNotFoundException("해당 예약이 존재하지 않습니다."));

        reservation.cancel();
    }
}
