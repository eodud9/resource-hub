package com.resourcehub.backend.domain.reservation;

import com.resourcehub.backend.domain.reservation.dto.ReservationCreateRequest;
import com.resourcehub.backend.domain.user.User;
import com.resourcehub.backend.domain.user.UserRepository;
import com.resourcehub.backend.exception.ReservationConflictException;
import com.resourcehub.backend.exception.UserNotFoundException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.atomic.AtomicInteger;

@SpringBootTest
public class ReservationConcurrencyTest {
    @Autowired
    private ReservationService reservationService;

    @Autowired
    private UserRepository userRepository;

    @Test
    public void testRaceCondition() throws Exception{
        User user = userRepository.findById(1L)
                .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));

        Authentication authentication = new UsernamePasswordAuthenticationToken(
                user,
                null,
                List.of(new SimpleGrantedAuthority("ROLE_USER"))
        );

        ExecutorService executor = Executors.newFixedThreadPool(10);
        CountDownLatch latch = new CountDownLatch(1);

        LocalDateTime startAt = LocalDateTime.parse("2026-09-29T20:00:00");
        LocalDateTime endAt = LocalDateTime.parse("2026-09-29T22:00:00");

        ReservationCreateRequest request = new ReservationCreateRequest(
                1L, startAt, endAt);

        List<Future<?>> futures = new ArrayList<>();

        AtomicInteger successCount = new AtomicInteger(0);
        AtomicInteger failCount = new AtomicInteger(0);

        for (int i = 0; i < 10; i++){
            futures.add(executor.submit(() -> {
                try{
                    latch.await();
                    SecurityContext context = SecurityContextHolder.createEmptyContext();
                    context.setAuthentication(authentication);
                    SecurityContextHolder.setContext(context);

                    reservationService.createReservation(request);
                    successCount.incrementAndGet();

                } catch (ReservationConflictException e){
                    failCount.incrementAndGet();
                }
                catch (InterruptedException e){
                    Thread.currentThread().interrupt();
                }
            }));
        }

        latch.countDown();

        for (Future<?> future : futures){
            future.get();
        }

        Assertions.assertEquals(1, successCount.get());
        Assertions.assertEquals(9, failCount.get());

        executor.shutdown();

    }
}
