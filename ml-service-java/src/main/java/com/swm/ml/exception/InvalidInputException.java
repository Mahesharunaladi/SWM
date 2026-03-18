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

/**
 * Custom exception for model loading failures.
 * 
 * Thrown when the ML model cannot be loaded or is unavailable.
 * 
 * @author SWM Team
 * @version 1.0.0
 */
class ModelNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public ModelNotFoundException(String message) {
        super(message);
    }

    public ModelNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}

/**
 * Custom exception for prediction failures.
 * 
 * Thrown when a prediction cannot be computed.
 * 
 * @author SWM Team
 * @version 1.0.0
 */
class PredictionException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public PredictionException(String message) {
        super(message);
    }

    public PredictionException(String message, Throwable cause) {
        super(message, cause);
    }
}
