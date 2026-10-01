package com.resourcehub.backend.domain.user.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;


@Getter
public class RefreshTokenRequest {

    @NotBlank
    private String refreshToken;
}
