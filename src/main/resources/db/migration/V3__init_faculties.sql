CREATE TABLE faculties (
                           id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                           user_id BIGINT UNSIGNED NULL,
                           email VARCHAR(255) NOT NULL,
                           first_name VARCHAR(255) NULL,
                           middle_name VARCHAR(255) NULL,
                           last_name VARCHAR(255) NULL,
                           suffix VARCHAR(255) NULL,
                           advisory TINYINT(1) NOT NULL DEFAULT 0,
                           section VARCHAR(255) NULL,
                           grade_level INT NULL,
                           department VARCHAR(255) NULL,
                           created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                           updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                           PRIMARY KEY (id),
                           CONSTRAINT uq_faculties_email UNIQUE (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_faculties_user_id
    ON faculties (user_id);