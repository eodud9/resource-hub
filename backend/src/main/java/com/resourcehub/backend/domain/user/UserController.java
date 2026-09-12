package com.resourcehub.backend.domain.user;

import com.resourcehub.backend.domain.user.dto.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<UserResponse> createUser(@Valid @RequestBody UserCreateRequest request){
        UserResponse response = userService.createUser(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request){
        return userService.login(request);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(){
        userService.logout();
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/refresh")
    public LoginResponse refresh(@Valid @RequestBody RefreshTokenRequest request){
        return userService.refresh(request);
    }
}
