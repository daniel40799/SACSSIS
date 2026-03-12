package com.sacs.sis.students.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "students",
        uniqueConstraints = {
                @UniqueConstraint(name = "uq_students_school_id", columnNames = "school_id")
        }
)
@Getter
@Setter
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "school_id", nullable = false, length = 50)
    private String schoolId;

    @Column(name = "status", nullable = false, length = 30)
    private String status;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", insertable = false, updatable = false)
    private LocalDateTime updatedAt;
}