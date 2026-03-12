package com.sacs.sis.auth.config;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.sql.Alias;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix="app.auth")
public class AuthProperties {
    private String allowedDomain;
    private Alias alias = new Alias();

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
