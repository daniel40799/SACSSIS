CREATE TABLE user_accounts (
                               id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                               email VARCHAR(255) NOT NULL,
                               google_sub VARCHAR(255) NOT NULL,
                               display_name VARCHAR(255) NOT NULL,
                               avatar_url VARCHAR(500) NULL,
                               auth_provider VARCHAR(50) NOT NULL,
                               is_active TINYINT(1) NOT NULL DEFAULT 1,
                               student_id BIGINT UNSIGNED NULL,
                               faculty_id BIGINT UNSIGNED NULL,
                               last_login_at DATETIME NULL,
                               created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                               updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                               CONSTRAINT pk_user_accounts PRIMARY KEY (id),
                               CONSTRAINT uq_user_accounts_email UNIQUE (email),
                               CONSTRAINT uq_user_accounts_google_sub UNIQUE (google_sub)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_user_accounts_student_id
    ON user_accounts (student_id);

CREATE INDEX idx_user_accounts_faculty_id
    ON user_accounts (faculty_id);

CREATE TABLE roles (
                       id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                       code VARCHAR(50) NOT NULL,
                       name VARCHAR(100) NOT NULL,
                       created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                       updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                       CONSTRAINT pk_roles PRIMARY KEY (id),
                       CONSTRAINT uq_roles_code UNIQUE (code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE user_account_roles (
                                    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                                    user_account_id BIGINT UNSIGNED NOT NULL,
                                    role_id BIGINT UNSIGNED NOT NULL,
                                    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                    CONSTRAINT pk_user_account_roles PRIMARY KEY (id),
                                    CONSTRAINT uq_user_account_roles_user_role UNIQUE (user_account_id, role_id),
                                    CONSTRAINT fk_user_account_roles_user_account
                                        FOREIGN KEY (user_account_id) REFERENCES user_accounts (id)
                                            ON DELETE CASCADE
                                            ON UPDATE RESTRICT,
                                    CONSTRAINT fk_user_account_roles_role
                                        FOREIGN KEY (role_id) REFERENCES roles (id)
                                            ON DELETE RESTRICT
                                            ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_user_account_roles_role_id
    ON user_account_roles (role_id);