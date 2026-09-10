package com.resourcehub.backend.domain.resource;

import com.resourcehub.backend.domain.resource.dto.ResourceCreateRequest;
import com.resourcehub.backend.domain.resource.dto.ResourceResponse;
import com.resourcehub.backend.domain.resource.dto.ResourceUpdateRequest;
import com.resourcehub.backend.domain.resource.event.ResourceChangedEvent;
import com.resourcehub.backend.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ResourceService {

    private final ResourceRepository resourceRepository;
    private final RedisTemplate<String, ResourceResponse> redisTemplate;
    private final ApplicationEventPublisher eventPublisher;

    public List<ResourceResponse> getResources(){
        return resourceRepository.findAll().stream().map(ResourceResponse::new).toList();
    }

    public ResourceResponse getResource(Long id){

        ResourceResponse resource = redisTemplate.opsForValue().get("resource:" + id);

        if(resource == null){
            Resource resourceInDB = resourceRepository.findById(id)
                    .orElseThrow(()-> new ResourceNotFoundException("Resource Not Found"));

            ResourceResponse response = new ResourceResponse(resourceInDB);

            redisTemplate.opsForValue().set("resource:"+id, response, Duration.ofMinutes(10));
            resource = response;
        }

        return resource;
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

        eventPublisher.publishEvent(new ResourceChangedEvent(id));

//        throw new RuntimeException("ROLLBACK 테스트");

        return new ResourceResponse(resource);
    }

    @Transactional
    public void deleteResource(Long id){
        Resource resource = resourceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resource Not Found"));

        resourceRepository.delete(resource);

        eventPublisher.publishEvent(new ResourceChangedEvent(id));
    }
}
