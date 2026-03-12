package com.sacs.sis.students.repository;

import com.sacs.sis.students.domain.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findBySchoolId(String schoolId);
}