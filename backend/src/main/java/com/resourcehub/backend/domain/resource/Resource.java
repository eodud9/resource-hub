package com.resourcehub.backend.domain.resource;

import com.resourcehub.backend.common.BaseEntity;
import jakarta.persistence.*;
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

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ResourceStatus status;

    public Resource(String name, String description, ResourceType type){
        this.name = name;
        this.description = description;
        this.type = type;
        this.status = ResourceStatus.AVAILABLE;
    }

    public void update(String name, String description, ResourceType type){
        this.name = name;
        this.description = description;
        this.type = type;
    }
}
