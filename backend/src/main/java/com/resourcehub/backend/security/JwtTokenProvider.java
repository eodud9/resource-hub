package com.resourcehub.backend.security;

import com.resourcehub.backend.domain.user.User;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private final SecretKey key;

    public JwtTokenProvider(@Value("${jwt.secret}") String secretKey){
        this.key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    private Long accessTokenExpiration = 1000L * 60L * 60L;

    private Long refreshTokenExpiration = 1000L * 60L * 60L * 24L * 7L;

    public String generateAccessToken(User user){

        Date expirationTime = new Date(System.currentTimeMillis() + accessTokenExpiration);

        return Jwts.builder()
                .subject(user.getEmail())
                .expiration(expirationTime)
                .claim("type", "ACCESS")
                .signWith(key)
                .compact();
    }

    public String generateRefreshToken(User user){

        Date expirationTime = new Date(System.currentTimeMillis() + refreshTokenExpiration);

        return Jwts.builder()
                .subject(user.getEmail())
                .expiration(expirationTime)
                .claim("type", "REFRESH")
                .signWith(key)
                .compact();
    }

    public boolean validateToken(String token){
        try{
            Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (JwtException e){
            return false;
        }
    }

    public String getSubject(String token){
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public String getType(String token){
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .get("type", String.class);

    }
}
