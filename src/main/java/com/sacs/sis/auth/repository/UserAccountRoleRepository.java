package com.sacs.sis.auth.repository;

import com.sacs.sis.auth.domain.UserAccountRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserAccountRoleRepository extends JpaRepository<UserAccountRole, Long> {
    Optional<UserAccountRole> findByUserAccountIdAndRoleId(Long userAccountId, Long roleId);
}