package com.resourcehub.backend.domain.user;

import com.resourcehub.backend.domain.user.dto.*;
import com.resourcehub.backend.exception.PasswordInvalidException;
import com.resourcehub.backend.exception.RefreshTokenInvalidException;
import com.resourcehub.backend.exception.UserConflictException;
import com.resourcehub.backend.exception.UserNotFoundException;
import com.resourcehub.backend.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import redis.clients.authentication.core.TokenRequestException;

import java.time.Duration;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    private final StringRedisTemplate stringRedisTemplate;

    public List<UserResponse> getUsers(){
        return userRepository.findAll()
                .stream()
                .map(UserResponse::new)
                .toList();
    }

    public UserResponse getUser(Long id){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));

        return new UserResponse(user);
    }

    @Transactional
    public UserResponse createUser(UserCreateRequest request){

        if(userRepository.existsByEmail(request.getEmail())){
            throw new UserConflictException("이미 사용중인 이메일입니다.");
        }

        String encodedPassword = passwordEncoder.encode(request.getPassword());

        User user = new User(request.getEmail(), encodedPassword, request.getName());

        return new UserResponse(userRepository.save(user));
    }

    public LoginResponse login(LoginRequest request){
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));

        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())){
            throw new PasswordInvalidException("비밀번호가 올바르지 않습니다.");
        }

        String accessToken = jwtTokenProvider.generateAccessToken(user);
        String refreshToken = jwtTokenProvider.generateRefreshToken(user);

        stringRedisTemplate.opsForValue().set(
                "refresh:" + user.getEmail(),
                refreshToken,
                Duration.ofDays(7)
        );

        return new LoginResponse(accessToken, refreshToken);
    }

    public void logout(){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();

        if(user != null){
            stringRedisTemplate.delete("refresh:" + user.getEmail());
        }

    }

    public LoginResponse refresh(RefreshTokenRequest request){

        String refreshToken = request.getRefreshToken();

        if(!jwtTokenProvider.validateToken(refreshToken)){
            throw new RefreshTokenInvalidException("유효하지 않은 Refresh Token입니다. Validation Failed");
        }

        if(!"REFRESH".equals(jwtTokenProvider.getType(refreshToken))){
            throw new RefreshTokenInvalidException("유효하지 않은 Refresh Token입니다. Validation Failed");
        }

        String email = jwtTokenProvider.getSubject(refreshToken);
        String refreshTokenInRedis = stringRedisTemplate.opsForValue().get("refresh:" + email);

        if (refreshTokenInRedis == null || !refreshTokenInRedis.equals(refreshToken)){
            throw new RefreshTokenInvalidException("유효하지 않은 Refresh Token입니다.");
        }

        User user = userRepository.findByEmail(email).orElseThrow(
                        ()-> new UserNotFoundException("사용자를 찾을 수 없습니다.")
                );

        String newAccessToken = jwtTokenProvider.generateAccessToken(user);
        String newRefreshToken = jwtTokenProvider.generateRefreshToken(user);

        stringRedisTemplate.opsForValue().set(
                "refresh:" + user.getEmail(),
                newRefreshToken,
                Duration.ofDays(7)
        );

        return new LoginResponse(newAccessToken, newRefreshToken);
    }
}
