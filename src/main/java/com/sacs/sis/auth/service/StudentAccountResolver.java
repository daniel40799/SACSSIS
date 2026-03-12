package com.sacs.sis.auth.service;

import com.sacs.sis.auth.domain.RoleCode;
import com.sacs.sis.students.domain.Student;
import com.sacs.sis.students.repository.StudentRepository;
import com.sacs.sis.shared.exception.AccessDeniedException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Locale;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StudentAccountResolver {

    private final StudentRepository studentRepository;

    public Optional<ResolvedLogin> resolve(String email) {
        String localPart = extractLocalPart(email).toLowerCase(Locale.ROOT);

        if (!localPart.matches("\\d+")) {
            return Optional.empty();
        }

        Student student = studentRepository.findBySchoolId(localPart)
                .orElseThrow(() -> new AccessDeniedException(
                        "This account does not exist in the list of students."
                ));

        if (!"ACTIVE".equalsIgnoreCase(student.getStatus())) {
            throw new AccessDeniedException(
                    "This account is not active. You may have dropped or graduated."
            );
        }

        return Optional.of(ResolvedLogin.builder()
                .roleCode(RoleCode.STUDENT)
                .schoolId(student.getSchoolId())
                .studentId(student.getId())
                .build());
    }

    private String extractLocalPart(String email) {
        int atIndex = email.indexOf('@');
        return atIndex >= 0 ? email.substring(0, atIndex) : email;
    }
}