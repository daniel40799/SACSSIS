package com.sacs.sis.auth.security;

import com.sacs.sis.auth.config.AuthProperties;
import com.sacs.sis.shared.exception.AuthErrorCode;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class OAuth2LoginFailureHandler implements AuthenticationFailureHandler {

    private final AuthProperties authProperties;

    public OAuth2LoginFailureHandler(AuthProperties authProperties) {
        this.authProperties = authProperties;
    }

    @Override
    public void onAuthenticationFailure(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException exception
    ) throws IOException {

        response.sendRedirect(authProperties.buildLoginUrl() + "?error=" + AuthErrorCode.LOGIN_ERROR.name());
    }
}