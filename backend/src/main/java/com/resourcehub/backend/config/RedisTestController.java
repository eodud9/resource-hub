package com.resourcehub.backend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class RedisTestController {

    private final RedisTemplate redisTemplate;

    @GetMapping("/redis")
    public Object redisTest(){
        redisTemplate.opsForValue().set("name", "aiden");
        Object result = redisTemplate.opsForValue().get("name");
        return result;
    }
}
