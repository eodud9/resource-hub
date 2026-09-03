package com.resourcehub.backend.domain.resource.dto;

import com.resourcehub.backend.domain.resource.Resource;
import com.resourcehub.backend.domain.resource.ResourceStatus;
import com.resourcehub.backend.domain.resource.ResourceType;
import lombok.Getter;

@Getter
public class ResourceResponse {
    private Long id;
    private String name;
    private String description;
    private Integer quantity;
    private ResourceType type;
    private ResourceStatus status;

    public ResourceResponse(Resource resource) {
        this.id = resource.getId();
        this.name = resource.getName();
        this.description = resource.getDescription();
        this.quantity = resource.getQuantity();
        this.type = resource.getType();
        this.status = resource.getStatus();
    }
}
