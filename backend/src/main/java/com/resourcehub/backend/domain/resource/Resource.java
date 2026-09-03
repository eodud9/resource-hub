package com.resourcehub.backend.domain.resource;

import com.resourcehub.backend.common.BaseEntity;
import com.resourcehub.backend.domain.resource.dto.ResourceUpdateRequest;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "resources")
@NoArgsConstructor
public class Resource extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private ResourceType type;

    @Column(nullable = false)
    private Integer quantity;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ResourceStatus status;

    public Resource(String name, String description, ResourceType type, Integer quantity){
        this.name = name;
        this.description = description;
        this.type = type;
        this.quantity = quantity;
        this.status = ResourceStatus.AVAILABLE;
    }

    public void update(ResourceUpdateRequest request){
        this.name = request.getName();
        this.description = request.getDescription();
        this.quantity = request.getQuantity();
        this.type = request.getType();
    }
}
