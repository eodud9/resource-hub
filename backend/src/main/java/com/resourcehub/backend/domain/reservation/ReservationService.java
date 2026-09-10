package com.resourcehub.backend.domain.reservation;

import com.resourcehub.backend.domain.reservation.dto.ReservationCreateRequest;
import com.resourcehub.backend.domain.reservation.dto.ReservationResponse;
import com.resourcehub.backend.domain.resource.Resource;
import com.resourcehub.backend.domain.resource.ResourceRepository;
import com.resourcehub.backend.domain.user.User;
import com.resourcehub.backend.domain.user.UserRepository;
import com.resourcehub.backend.exception.*;
import lombok.RequiredArgsConstructor;
import org.springframework.cglib.core.Local;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final ResourceRepository resourceRepository;

    public List<ReservationResponse> getReservations(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();

        List<Reservation> reservations = reservationRepository.findByUserId(user.getId());

        return reservations.stream()
                .map(ReservationResponse::new)
                .toList();
    }

    public ReservationResponse getReservation(Long id){
        Reservation reservation = reservationRepository.findById(id).orElseThrow(() -> new ReservationNotFoundException("해당 예약이 존재하지 않습니다."));

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();

        if(!(reservation.getUser().getId().equals(user.getId()))){
            throw new UserConflictException("유효하지 않은 사용자입니다.");
        }

        return new ReservationResponse(reservation);
    }

    @Transactional
    public ReservationResponse createReservation(ReservationCreateRequest request){
        Resource resource = resourceRepository.findWithLockById(request.getResourceId())
                .orElseThrow(() -> new ResourceNotFoundException("Resource Not Found"));

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User user = (User) authentication.getPrincipal();

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

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User user = (User) authentication.getPrincipal();

        if(!reservation.getUser().getId().equals(user.getId())){
            throw new UserConflictException("유효하지 않은 사용자의 정보입니다.");
        }

        reservation.cancel();
    }


}