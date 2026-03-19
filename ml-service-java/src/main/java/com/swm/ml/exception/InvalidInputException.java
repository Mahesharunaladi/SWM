package com.swm.ml.exception;

/**
 * Custom exception for missing required input data.
 * 
 * Thrown when API requests lack necessary parameters or data.
 * 
 * @author SWM Team
 * @version 1.0.0
 */
public class InvalidInputException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public InvalidInputException(String message) {
        super(message);
    }

    public InvalidInputException(String message, Throwable cause) {
        super(message, cause);
    }
}

