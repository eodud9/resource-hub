package com.resourcehub.backend.exception;

public class ReservationConflictException extends RuntimeException{
    public ReservationConflictException(String message){
        super(message);
    }
}
