package com.resourcehub.backend.domain.user.dto;

import com.resourcehub.backend.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class UserResponse {
    private Long id;
    private String email;
    private String name;
    private LocalDateTime createdAt;

    public UserResponse(User user){
        this.id = user.getId();
        this.email = user.getEmail();
        this.name = user.getName();
        this.createdAt = user.getCreatedAt();
    }
}
