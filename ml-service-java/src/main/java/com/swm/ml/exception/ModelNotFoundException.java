package com.swm.ml.exception;

/**
 * Custom exception for model loading failures.
 * 
 * Thrown when the ML model cannot be loaded or is unavailable.
 * 
 * @author SWM Team
 * @version 1.0.0
 */
public class ModelNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public ModelNotFoundException(String message) {
        super(message);
    }

    public ModelNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
