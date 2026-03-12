package com.sacs.sis.auth.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "user_account_roles",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uq_user_account_roles_user_role",
                        columnNames = {"user_account_id", "role_id"}
                )
        }
)
@Getter
@Setter
public class UserAccountRole {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_account_id", nullable = false)
    private Long userAccountId;

    @Column(name = "role_id", nullable = false)
    private Long roleId;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;
}