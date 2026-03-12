package com.sacs.sis.auth.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(
        name="user_accounts",
        uniqueConstraints = {
                @UniqueConstraint(name="uq_user_accounts_email", columnNames = "email"),
                @UniqueConstraint(name="uq_user_accounts_googl_sub", columnNames = "google_sub")
        },
        indexes={
                @Index(name="ifx_user_accounts_student_id", columnList = "student_id"),
                @Index(name="ifx_user_accounts_faculty_id", columnList = "faculty_id")
        }
)
@Getter
@Setter
public class UserAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email", nullable = false, length = 255)
    private String email;

    @Column(name = "google_sub", nullable = false, length = 255)
    private String googleSub;

    @Column(name = "display_name", nullable = false, length = 255)
    private String displayName;

    @Column(name = "avatar_url", length = 500)
    private String avatarUrl;

    @Column(name = "auth_provider", nullable = false, length = 50)
    private String authProvider;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @Column(name = "student_id")
    private Long studentId;

    @Column(name = "faculty_id")
    private Long facultyId;

    @Column(name = "last_login_at")
    private LocalDateTime lastLoginAt;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", insertable = false, updatable = false)
    private LocalDateTime updatedAt;
}
