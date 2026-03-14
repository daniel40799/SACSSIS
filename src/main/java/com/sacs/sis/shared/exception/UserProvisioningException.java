package com.sacs.sis.shared.exception;

public class UserProvisioningException extends RuntimeException {

    private final AuthErrorCode errorCode;

    public UserProvisioningException(String message, AuthErrorCode errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

    public UserProvisioningException(String message) {
        super(message);
        this.errorCode = AuthErrorCode.PROVISIONING_FAILED;
    }

    public AuthErrorCode getErrorCode() {
        return errorCode;
    }
}