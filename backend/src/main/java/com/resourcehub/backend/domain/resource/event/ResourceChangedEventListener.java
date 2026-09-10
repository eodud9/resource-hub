package com.resourcehub.backend.domain.resource.event;

import com.resourcehub.backend.domain.resource.dto.ResourceResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
public class ResourceChangedEventListener {

    private final RedisTemplate<String, ResourceResponse> redisTemplate;

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handleResourceChanged(ResourceChangedEvent event){
        redisTemplate.delete("resource:" + event.resourceId());
    }

}
