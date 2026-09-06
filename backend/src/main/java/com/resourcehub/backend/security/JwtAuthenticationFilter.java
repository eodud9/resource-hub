package com.resourcehub.backend.security;

import com.resourcehub.backend.domain.user.User;
import com.resourcehub.backend.domain.user.UserRepository;
import com.resourcehub.backend.exception.UserNotFoundException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String authorization = request.getHeader("Authorization");

        if (authorization == null || !authorization.startsWith("Bearer ")){
            filterChain.doFilter(request, response);
            return;
        }

        String token = authorization.substring(7);

        if(jwtTokenProvider.validateToken(token)){
            String email = jwtTokenProvider.getSubject(token);
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));

            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(user,
                    null,
                            Collections.singleton(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()))
                    );

            SecurityContext context = SecurityContextHolder.createEmptyContext();
            context.setAuthentication(authenticationToken);
            SecurityContextHolder.setContext(context);

        }

        System.out.println("Authentication = "
                + SecurityContextHolder.getContext().getAuthentication());

        System.out.println("Authorities = "
                + SecurityContextHolder.getContext()
                .getAuthentication()
                .getAuthorities());

        filterChain.doFilter(request, response);

    }
}
