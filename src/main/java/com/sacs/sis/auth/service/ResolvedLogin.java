package com.sacs.sis.auth.service;

import com.sacs.sis.auth.domain.RoleCode;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ResolvedLogin {
    private RoleCode roleCode;
    private String schoolId;
    private Long studentId;
    private Long facultyId;
}