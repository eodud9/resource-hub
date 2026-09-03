package com.resourcehub.backend.domain.resource;

import com.resourcehub.backend.domain.resource.dto.ResourceCreateRequest;
import com.resourcehub.backend.domain.resource.dto.ResourceResponse;
import com.resourcehub.backend.domain.resource.dto.ResourceUpdateRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/resources")
@RequiredArgsConstructor
public class ResourceController {
    private final ResourceService resourceService;

    @GetMapping
    public ResponseEntity<List<ResourceResponse>> getResources(){
        List<ResourceResponse> response =  resourceService.getResources();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResourceResponse> getResource(@PathVariable Long id){
        return ResponseEntity.ok(resourceService.getResource(id));
    }

    @PostMapping
    public ResponseEntity<Void> createResource(@Valid @RequestBody ResourceCreateRequest request){
        resourceService.createResource(request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResourceResponse> updateResource(@PathVariable Long id,
                                                           @RequestBody ResourceUpdateRequest request){
        ResourceResponse response = resourceService.updateResource(id, request);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResource(@PathVariable Long id){
        resourceService.deleteResource(id);
        return ResponseEntity.noContent().build();
    }
}
