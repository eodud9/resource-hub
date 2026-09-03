package com.resourcehub.backend.exception;

public class ReservationInvalidException extends RuntimeException {
    public ReservationInvalidException(String message) {
        super(message);
    }
}
