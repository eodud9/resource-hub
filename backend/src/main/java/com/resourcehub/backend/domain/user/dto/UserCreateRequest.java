package com.resourcehub.backend.domain.user.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;

@Getter
public class UserCreateRequest {
    @Email
    @NotBlank
    private String email;

    @NotBlank
    @Size(min = 8)
    private String password;

    @NotBlank
    private String name;
}
