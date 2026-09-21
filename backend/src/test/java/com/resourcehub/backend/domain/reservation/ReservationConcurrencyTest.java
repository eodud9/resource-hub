package com.resourcehub.backend.domain.reservation;

import com.resourcehub.backend.domain.reservation.dto.ReservationCreateRequest;
import com.resourcehub.backend.domain.resource.Resource;
import com.resourcehub.backend.domain.resource.ResourceRepository;
import com.resourcehub.backend.domain.resource.ResourceType;
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

    @Autowired
    private ResourceRepository resourceRepository;

    @Test
    public void testRaceCondition() throws Exception{
        User user = new User("test@test.com",
                "testPassword",
                "testUser");

        userRepository.save(user);

        Authentication authentication = new UsernamePasswordAuthenticationToken(
                user,
                null,
                List.of(new SimpleGrantedAuthority("ROLE_USER"))
        );

        ExecutorService executor = Executors.newFixedThreadPool(10);
        CountDownLatch latch = new CountDownLatch(1);

        LocalDateTime startAt = LocalDateTime.parse("2026-09-29T20:00:00");
        LocalDateTime endAt = LocalDateTime.parse("2026-09-29T22:00:00");

        Resource resource = new Resource(
                "Test resource",
                "This is test resource",
                ResourceType.ROOM,
                1
        );

        resourceRepository.save(resource);

        ReservationCreateRequest request = new ReservationCreateRequest(
                resource.getId(), startAt, endAt);

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
