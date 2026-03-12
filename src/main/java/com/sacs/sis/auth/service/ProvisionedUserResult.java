package com.sacs.sis.auth.service;

import com.sacs.sis.auth.domain.RoleCode;
import com.sacs.sis.auth.domain.UserAccount;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProvisionedUserResult {
    private UserAccount userAccount;
    private RoleCode roleCode;
}