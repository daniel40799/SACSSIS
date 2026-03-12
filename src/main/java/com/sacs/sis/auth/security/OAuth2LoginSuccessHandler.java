package com.sacs.sis.auth.security;

import com.sacs.sis.auth.domain.RoleCode;
import com.sacs.sis.auth.service.AuthProvisioningService;
import com.sacs.sis.auth.service.ProvisionedUserResult;
import com.sacs.sis.shared.exception.AccessDeniedException;
import com.sacs.sis.shared.exception.UserProvisioningException;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final AuthProvisioningService authProvisioningService;

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException, ServletException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        String googleSub = oAuth2User.getAttribute("sub");
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String picture = oAuth2User.getAttribute("picture");

        ProvisionedUserResult result = authProvisioningService.handleGoogleLogin(googleSub, email, name, picture);
        try {
            if (result.getRoleCode() == RoleCode.STUDENT) {
                response.sendRedirect("/portal-dashboard");
            } else {
                response.sendRedirect("/admin-dashboard");
            }
        }catch(AccessDeniedException | UserProvisioningException ex) {
            String message = URLEncoder.encode(ex.getMessage(), StandardCharsets.UTF_8);
            response.sendRedirect("/login?error=" + message);
        }
    }
}