package com.resourcehub.backend.domain.user;

import com.resourcehub.backend.common.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "users")
@NoArgsConstructor
public class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;
    private String name;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    public User(String email, String password, String name){
        this.email = email;
        this.password = password;
        this.name = name;
        this.role = UserRole.USER;
    }
}
