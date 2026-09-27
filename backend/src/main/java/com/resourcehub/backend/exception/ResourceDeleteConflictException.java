package com.resourcehub.backend.exception;

public class ResourceDeleteConflictException extends RuntimeException {
    public ResourceDeleteConflictException(String message) {
        super(message);
    }
}
