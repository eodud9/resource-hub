package com.resourcehub.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class ResourcehubApplication {

	public static void main(String[] args) {
		SpringApplication.run(ResourcehubApplication.class, args);
	}

}
