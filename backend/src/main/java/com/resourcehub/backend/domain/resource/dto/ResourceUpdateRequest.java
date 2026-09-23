package com.resourcehub.backend.domain.resource.dto;

import com.resourcehub.backend.domain.resource.ResourceType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ResourceUpdateRequest {

    @NotBlank
    private String name;

    @NotBlank
    private String description;

    @NotNull
    private ResourceType type;

    @NotNull
    @Min(1)
    private Integer quantity;
}


