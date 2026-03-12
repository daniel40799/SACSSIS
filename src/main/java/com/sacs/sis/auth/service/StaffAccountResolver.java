package com.sacs.sis.auth.service;

import com.sacs.sis.auth.config.AuthProperties;
import com.sacs.sis.auth.domain.RoleCode;
import com.sacs.sis.faculty.domain.Faculty;
import com.sacs.sis.faculty.repository.FacultyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Locale;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StaffAccountResolver {

    private final AuthProperties authProperties;
    private final FacultyRepository facultyRepository;

    public Optional<ResolvedLogin> resolve(String email) {
        String localPart = extractLocalPart(email).toLowerCase(Locale.ROOT);
        String[] parts = localPart.split("\\.");

        if (localPart.equalsIgnoreCase(authProperties.getAlias().getBusinessOffice())) {
            return Optional.of(ResolvedLogin.builder()
                    .roleCode(RoleCode.BUSINESS_OFFICE)
                    .schoolId(localPart)
                    .build());
        }

        if (localPart.equalsIgnoreCase(authProperties.getAlias().getRegistrar())) {
            return Optional.of(ResolvedLogin.builder()
                    .roleCode(RoleCode.REGISTRAR)
                    .schoolId(localPart)
                    .build());
        }

        if (localPart.equalsIgnoreCase(authProperties.getAlias().getSuperAdmin())) {
            return Optional.of(ResolvedLogin.builder()
                    .roleCode(RoleCode.ADMIN)
                    .schoolId(localPart)
                    .build());
        }

        if (localPart.equalsIgnoreCase(authProperties.getAlias().getAccountingStaff())) {
            return Optional.of(ResolvedLogin.builder()
                    .roleCode(RoleCode.ACCOUNTING_STAFF)
                    .schoolId(localPart)
                    .build());
        }

        if (localPart.equalsIgnoreCase(authProperties.getAlias().getHsGuidance())
                || localPart.equalsIgnoreCase(authProperties.getAlias().getGsGuidance())
                || localPart.equalsIgnoreCase(authProperties.getAlias().getTestHsGuidance())
                || localPart.equalsIgnoreCase(authProperties.getAlias().getTestGsGuidance())) {
            return Optional.of(ResolvedLogin.builder()
                    .roleCode(RoleCode.GUIDANCE)
                    .schoolId(localPart)
                    .build());
        }

        if (parts.length == 2 && parts[1].equalsIgnoreCase(authProperties.getAlias().getFormator())) {
            if ("hs".equalsIgnoreCase(parts[0])) {
                return Optional.of(ResolvedLogin.builder()
                        .roleCode(RoleCode.HS_FORMATOR)
                        .schoolId(parts[0] + parts[1])
                        .build());
            }
            if ("gs".equalsIgnoreCase(parts[0])) {
                return Optional.of(ResolvedLogin.builder()
                        .roleCode(RoleCode.GS_FORMATOR)
                        .schoolId(parts[0] + parts[1])
                        .build());
            }
        }

        Optional<Faculty> facultyOpt = facultyRepository.findByEmail(email);
        if (facultyOpt.isPresent()) {
            Faculty faculty = facultyOpt.get();
            return Optional.of(ResolvedLogin.builder()
                    .roleCode(RoleCode.FACULTY)
                    .schoolId("faculty" + faculty.getId())
                    .facultyId(faculty.getId())
                    .build());
        }

        return Optional.empty();
    }

    private String extractLocalPart(String email) {
        int atIndex = email.indexOf('@');
        return atIndex >= 0 ? email.substring(0, atIndex) : email;
    }
}