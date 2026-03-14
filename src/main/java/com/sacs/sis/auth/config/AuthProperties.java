package com.sacs.sis.auth.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix="app.auth")
public class AuthProperties {
    private String allowedDomain;
    private String frontendBaseUrl = "http://localhost:5173";
    private String loginPath = "/login";
    private String callbackPath = "/auth/callback";
    private Alias alias = new Alias();

    public String buildFrontendUrl(String path) {
        String base = frontendBaseUrl == null ? "" : frontendBaseUrl.trim();
        String normalizedPath = (path == null || path.isBlank()) ? "/" : path.trim();
        if (!normalizedPath.startsWith("/")) {
            normalizedPath = "/" + normalizedPath;
        }
        if (base.endsWith("/")) {
            base = base.substring(0, base.length() - 1);
        }
        return base + normalizedPath;
    }

    public String buildLoginUrl() {
        return buildFrontendUrl(loginPath);
    }

    public String buildCallbackUrl() {
        return buildFrontendUrl(callbackPath);
    }

    @Getter
    @Setter
    public static class Alias {
        private String businessOffice;
        private String registrar;
        private String superAdmin;
        private String accountingStaff;
        private String formator;
        private String hsGuidance;
        private String gsGuidance;
        private String testHsGuidance;
        private String testGsGuidance;

    }
}
