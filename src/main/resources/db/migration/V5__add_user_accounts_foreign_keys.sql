ALTER TABLE user_accounts
    ADD CONSTRAINT fk_user_accounts_student
        FOREIGN KEY (student_id) REFERENCES students (id)
            ON DELETE RESTRICT
            ON UPDATE RESTRICT;

ALTER TABLE user_accounts
    ADD CONSTRAINT fk_user_accounts_faculty
        FOREIGN KEY (faculty_id) REFERENCES faculties (id)
            ON DELETE RESTRICT
            ON UPDATE RESTRICT;