package com.sacs.sis.faculty.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "faculties",
        uniqueConstraints = {
                @UniqueConstraint(name = "uq_faculties_email", columnNames = "email")
        },
        indexes = {
                @Index(name = "idx_faculties_user_id", columnList = "user_id")
        }
)
@Getter
@Setter
public class Faculty {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "email", nullable = false, length = 255)
    private String email;

    @Column(name = "first_name", length = 255)
    private String firstName;

    @Column(name = "middle_name", length = 255)
    private String middleName;

    @Column(name = "last_name", length = 255)
    private String lastName;

    @Column(name = "suffix", length = 255)
    private String suffix;

    @Column(name = "advisory", nullable = false)
    private Boolean advisory = false;

    @Column(name = "section", length = 255)
    private String section;

    @Column(name = "grade_level")
    private Integer gradeLevel;

    @Column(name = "department", length = 255)
    private String department;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", insertable = false, updatable = false)
    private LocalDateTime updatedAt;
}