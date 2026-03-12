package com.sacs.sis.auth.service;

import com.sacs.sis.auth.config.AuthProperties;
import com.sacs.sis.auth.domain.Role;
import com.sacs.sis.auth.domain.UserAccount;
import com.sacs.sis.auth.domain.UserAccountRole;
import com.sacs.sis.auth.repository.RoleRepository;
import com.sacs.sis.auth.repository.UserAccountRepository;
import com.sacs.sis.auth.repository.UserAccountRoleRepository;
import com.sacs.sis.faculty.domain.Faculty;
import com.sacs.sis.faculty.repository.FacultyRepository;
import com.sacs.sis.shared.exception.AccessDeniedException;
import com.sacs.sis.shared.exception.UserProvisioningException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Locale;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthProvisioningService {

    private final AuthProperties authProperties;
    private final StudentAccountResolver studentAccountResolver;
    private final StaffAccountResolver staffAccountResolver;
    private final UserAccountRepository userAccountRepository;
    private final RoleRepository roleRepository;
    private final UserAccountRoleRepository userAccountRoleRepository;
    private final FacultyRepository facultyRepository;

    @Transactional
    public ProvisionedUserResult handleGoogleLogin(
            String googleSub,
            String email,
            String displayName,
            String avatarUrl
    ) {
        validateDomain(email);

        ResolvedLogin resolvedLogin = studentAccountResolver.resolve(email)
                .or(() -> staffAccountResolver.resolve(email))
                .orElseThrow(() -> new AccessDeniedException(
                        "This portal is exclusively for authorized SACS users only."
                ));

        UserAccount userAccount = userAccountRepository.findByEmail(email)
                .orElseGet(UserAccount::new);

        userAccount.setEmail(email);
        userAccount.setGoogleSub(googleSub);
        userAccount.setDisplayName(displayName);
        userAccount.setAvatarUrl(avatarUrl);
        userAccount.setAuthProvider("GOOGLE");
        userAccount.setIsActive(true);
        userAccount.setStudentId(resolvedLogin.getStudentId());
        userAccount.setFacultyId(resolvedLogin.getFacultyId());
        userAccount.setLastLoginAt(LocalDateTime.now());

        userAccount = userAccountRepository.save(userAccount);

        Role role = roleRepository.findByCode(resolvedLogin.getRoleCode())
                .orElseThrow(() -> new UserProvisioningException(
                        "Role not found: " + resolvedLogin.getRoleCode()
                ));

        UserAccount finalUserAccount = userAccount;
        userAccountRoleRepository.findByUserAccountIdAndRoleId(userAccount.getId(), role.getId())
                .orElseGet(() -> {
                    UserAccountRole userAccountRole = new UserAccountRole();
                    userAccountRole.setUserAccountId(finalUserAccount.getId());
                    userAccountRole.setRoleId(role.getId());
                    return userAccountRoleRepository.save(userAccountRole);
                });

        if (resolvedLogin.getFacultyId() != null) {
            syncFacultyUser(userAccount.getId(), resolvedLogin.getFacultyId());
        }

        return new ProvisionedUserResult(userAccount, resolvedLogin.getRoleCode());
    }

    private void validateDomain(String email) {
        String allowedDomain = authProperties.getAllowedDomain();
        if (allowedDomain == null || allowedDomain.isBlank()) {
            return;
        }

        String normalizedEmail = email == null ? "" : email.toLowerCase(Locale.ROOT);
        String normalizedDomain = "@" + allowedDomain.toLowerCase(Locale.ROOT);

        if (!normalizedEmail.endsWith(normalizedDomain)) {
            throw new AccessDeniedException("Unauthorized email domain.");
        }
    }

    private void syncFacultyUser(Long userAccountId, Long facultyId) {
        Optional<Faculty> facultyOpt = facultyRepository.findById(facultyId);
        if (facultyOpt.isPresent()) {
            Faculty faculty = facultyOpt.get();
            if (faculty.getUserId() == null || !faculty.getUserId().equals(userAccountId)) {
                faculty.setUserId(userAccountId);
                facultyRepository.save(faculty);
            }
        }
    }
}