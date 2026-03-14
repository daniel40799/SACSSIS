package com.sacs.sis.auth.security;

import com.sacs.sis.auth.config.AuthProperties;
import com.sacs.sis.auth.service.AuthProvisioningService;
import com.sacs.sis.shared.exception.AccessDeniedException;
import com.sacs.sis.shared.exception.AuthErrorCode;
import com.sacs.sis.shared.exception.UserProvisioningException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final AuthProvisioningService authProvisioningService;
    private final AuthProperties authProperties;

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        String googleSub = oAuth2User.getAttribute("sub");
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String picture = oAuth2User.getAttribute("picture");
        try {
            authProvisioningService.handleGoogleLogin(googleSub, email, name, picture);
            response.sendRedirect(authProperties.buildCallbackUrl());
        } catch (AccessDeniedException ex) {
            AuthErrorCode code = ex.getErrorCode() != null ? ex.getErrorCode() : AuthErrorCode.LOGIN_ERROR;
            response.sendRedirect(authProperties.buildLoginUrl() + "?error=" + code.name());
        } catch (UserProvisioningException ex) {
            AuthErrorCode code = ex.getErrorCode() != null ? ex.getErrorCode() : AuthErrorCode.PROVISIONING_FAILED;
            response.sendRedirect(authProperties.buildLoginUrl() + "?error=" + code.name());
        }
    }
}