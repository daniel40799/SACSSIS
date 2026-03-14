package com.sacs.sis.shared.exception;

/**
 * Stable error codes for authentication/provisioning failures.
 * These are safe to expose in redirect URLs and frontend messages.
 * Never put raw exception messages in URLs — use these codes instead.
 */
public enum AuthErrorCode {

    /** Email domain does not match the configured allowed domain. */
    UNAUTHORIZED_DOMAIN,

    /** Email format matches a student ID but no matching student record was found. */
    ACCOUNT_NOT_FOUND,

    /** Student record exists but the account is not in ACTIVE status. */
    ACCOUNT_INACTIVE,

    /** Email does not match any known student or staff pattern. */
    UNAUTHORIZED_USER,

    /** A known user/role was found but a server-side provisioning step failed. */
    PROVISIONING_FAILED,

    /** Catch-all for unexpected failures during login. */
    LOGIN_ERROR
}

