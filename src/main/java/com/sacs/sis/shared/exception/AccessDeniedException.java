package com.sacs.sis.shared.exception;

public class AccessDeniedException extends RuntimeException {

    private final AuthErrorCode errorCode;

    public AccessDeniedException(String message, AuthErrorCode errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

    public AuthErrorCode getErrorCode() {
        return errorCode;
    }
}