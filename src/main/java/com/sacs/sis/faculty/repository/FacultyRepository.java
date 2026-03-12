package com.sacs.sis.faculty.repository;

import com.sacs.sis.faculty.domain.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FacultyRepository extends JpaRepository<Faculty, Long> {
    Optional<Faculty> findByEmail(String email);
}