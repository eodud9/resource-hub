package com.resourcehub.backend.domain.resource;

import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;

import java.util.Optional;

public interface ResourceRepository extends JpaRepository<Resource, Long> {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    Optional<Resource> findWithLockById(Long id);
}
