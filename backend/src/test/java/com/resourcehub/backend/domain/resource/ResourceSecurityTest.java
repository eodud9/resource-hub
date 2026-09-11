package com.resourcehub.backend.domain.resource;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest(properties = {"JWT_SECRET=test-resource-creation-cannot-user-create-resource"})
@AutoConfigureMockMvc
@Transactional
public class ResourceSecurityTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @WithMockUser(username = "emily", roles = "USER")
    void userCannotCreateResource() throws Exception{

        mockMvc.perform(
                post("/api/resources")
        ).andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(username = "admin", roles = "ADMIN")
    void adminCanAccessCreateResource() throws Exception {

        mockMvc.perform(
                post("/api/resources")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\n" +
                                "  \"name\": \"회의실 A\",\n" +
                                "  \"description\": \"테스트 회의실\",\n" +
                                "  \"type\": \"ROOM\",\n" +
                                "  \"quantity\": 1\n" +
                                "}")
        ).andExpect(status().isCreated());

    }
}
