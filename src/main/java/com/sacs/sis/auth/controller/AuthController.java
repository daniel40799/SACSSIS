package com.sacs.sis.auth.controller;

import com.sacs.sis.auth.domain.RoleCode;
import com.sacs.sis.auth.domain.UserAccount;
import com.sacs.sis.auth.repository.RoleRepository;
import com.sacs.sis.auth.repository.UserAccountRepository;
import com.sacs.sis.auth.repository.UserAccountRoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.LinkedHashMap;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final UserAccountRepository userAccountRepository;
    private final UserAccountRoleRepository userAccountRoleRepository;
    private final RoleRepository roleRepository;

    /**
     * Lightweight session check.
     * Returns 200 if authenticated, 401 if not.
     * Frontend uses this to guard already-loaded pages.
     * Login is started by navigating directly to /oauth2/authorization/google.
     */
    @GetMapping("/api/authorize")
    public ResponseEntity<Map<String, Object>> sessionCheck(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("authenticated", false));
        }
        return ResponseEntity.ok(Map.of("authenticated", true));
    }

    /**
     * Returns the current logged-in user's identity and primary role.
     * Called by the frontend /auth/callback page to decide which dashboard to open.
     *
     * Response shape:
     * {
     *   "authenticated": true,
     *   "email": "daniel@sacs.edu.ph",
     *   "name": "Daniel Dalaota",
     *   "roleCode": "STUDENT"
     * }
     */
    @GetMapping("/api/auth/me")
    public ResponseEntity<Map<String, Object>> currentUser(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("authenticated", false));
        }

        String email = extractEmail(principal)
                .map(value -> value.toLowerCase(Locale.ROOT))
                .orElseGet(principal::getName);

        Optional<UserAccount> maybeUser = userAccountRepository.findByEmail(email);
        if (maybeUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("authenticated", false));
        }

        UserAccount userAccount = maybeUser.get();
        String roleCode = resolvePrimaryRoleCode(userAccount);

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("authenticated", true);
        body.put("email", userAccount.getEmail());
        body.put("name", userAccount.getDisplayName());
        body.put("avatarUrl", userAccount.getAvatarUrl());
        body.put("studentId", userAccount.getStudentId());
        body.put("facultyId", userAccount.getFacultyId());
        body.put("roleCode", roleCode);

        return ResponseEntity.ok(body);
    }

    private Optional<String> extractEmail(Principal principal) {
        if (principal instanceof OAuth2AuthenticationToken authToken) {
            OAuth2User oauth2User = authToken.getPrincipal();
            return Optional.ofNullable(oauth2User.getAttribute("email"));
        }
        return Optional.ofNullable(principal.getName());
    }

    private String resolvePrimaryRoleCode(UserAccount userAccount) {
        return userAccountRoleRepository.findAll().stream()
                .filter(uar -> userAccount.getId().equals(uar.getUserAccountId()))
                .map(uar -> roleRepository.findById(uar.getRoleId()).orElse(null))
                .filter(java.util.Objects::nonNull)
                .map(role -> role.getCode())
                .map(RoleCode::name)
                .findFirst()
                .orElse(null);
    }
}
