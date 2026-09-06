package com.resourcehub.backend.exception;

public class PasswordInvalidException extends RuntimeException{
    public PasswordInvalidException(String message){
        super(message);
    }
}
