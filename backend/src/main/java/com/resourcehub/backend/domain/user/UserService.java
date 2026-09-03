package com.resourcehub.backend.domain.user;

import com.resourcehub.backend.domain.user.dto.UserCreateRequest;
import com.resourcehub.backend.domain.user.dto.UserResponse;
import com.resourcehub.backend.exception.UserConflictException;
import com.resourcehub.backend.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

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
}
