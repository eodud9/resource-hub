package com.resourcehub.backend.domain.resource;

import com.resourcehub.backend.domain.resource.dto.ResourceCreateRequest;
import com.resourcehub.backend.domain.resource.dto.ResourceResponse;
import com.resourcehub.backend.domain.resource.dto.ResourceUpdateRequest;
import com.resourcehub.backend.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ResourceService {
    private final ResourceRepository resourceRepository;

    public List<ResourceResponse> getResources(){
        return resourceRepository.findAll().stream().map(ResourceResponse::new).toList();
    }

    public ResourceResponse getResource(Long id){
        Resource resource = resourceRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Resource Not Found"));

        return new ResourceResponse(resource);
    }

    @Transactional
    public Resource createResource(ResourceCreateRequest request){

        Resource resource = new Resource(request.getName(), request.getDescription(),
                request.getType(), request.getQuantity());

        return resourceRepository.save(resource);
    }

    @Transactional
    public ResourceResponse updateResource(Long id, ResourceUpdateRequest request){
        Resource resource = resourceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resource Not Found"));

        resource.update(request);

        return new ResourceResponse(resource);
    }

    @Transactional
    public void deleteResource(Long id){
        Resource resource = resourceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resource Not Found"));

        resourceRepository.delete(resource);
    }
}
