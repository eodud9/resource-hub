package com.resourcehub.backend.kafka;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class KafkaController {

    public final KafkaProducer kafkaProducer;

    @PostMapping("/kafka")
    public void send(){
        kafkaProducer.send();
    }

}
