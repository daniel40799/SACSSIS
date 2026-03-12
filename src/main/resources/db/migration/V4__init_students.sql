CREATE TABLE students (
                          id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                          school_id VARCHAR(50) NOT NULL,
                          status VARCHAR(30) NOT NULL,
                          created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                          updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                          PRIMARY KEY (id),
                          CONSTRAINT uq_students_school_id UNIQUE (school_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;