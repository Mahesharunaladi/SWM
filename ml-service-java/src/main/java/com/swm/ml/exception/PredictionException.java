package com.swm.ml.exception;

/**
 * Custom exception for prediction failures.
 * 
 * Thrown when a prediction cannot be computed.
 * 
 * @author SWM Team
 * @version 1.0.0
 */
public class PredictionException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public PredictionException(String message) {
        super(message);
    }

    public PredictionException(String message, Throwable cause) {
        super(message, cause);
    }
}
