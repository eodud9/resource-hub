package com.resourcehub.backend.domain.resource.dto;

import com.resourcehub.backend.domain.resource.ResourceType;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ResourceUpdateRequest {
    private String name;
    private String description;
    private Integer quantity;
    private ResourceType type;
}


