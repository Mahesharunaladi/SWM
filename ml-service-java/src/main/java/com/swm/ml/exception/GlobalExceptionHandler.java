package com.swm.ml.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.resource.NoResourceFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.swm.ml.model.ErrorResponse;
import java.time.LocalDateTime;
import jakarta.servlet.http.HttpServletRequest;

/**
 * Global exception handler for the ML Service.
 * 
 * Handles all exceptions thrown by the application and returns
 * appropriately formatted error responses.
 * 
 * @author SWM Team
 * @version 1.0.0
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    /**
     * Handle InvalidInputException.
     * 
     * @param exception the InvalidInputException
     * @param request the HTTP request
     * @return ResponseEntity with error details and 400 status
     */
    @ExceptionHandler(InvalidInputException.class)
    public ResponseEntity<ErrorResponse> handleInvalidInputException(
            InvalidInputException exception,
            HttpServletRequest request) {
        
        logger.warn("Invalid input error: {}", exception.getMessage());
        
        ErrorResponse errorResponse = ErrorResponse.builder()
            .error("Invalid Input")
            .message(exception.getMessage())
            .status(400)
            .timestamp(LocalDateTime.now().toString())
            .build();
        
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    /**
     * Handle ModelNotFoundException.
     * 
     * @param exception the ModelNotFoundException
     * @param request the HTTP request
     * @return ResponseEntity with error details and 503 status
     */
    @ExceptionHandler(ModelNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleModelNotFoundException(
            ModelNotFoundException exception,
            HttpServletRequest request) {
        
        logger.error("Model not found: {}", exception.getMessage());
        
        ErrorResponse errorResponse = ErrorResponse.builder()
            .error("Service Unavailable")
            .message(exception.getMessage())
            .status(503)
            .timestamp(LocalDateTime.now().toString())
            .build();
        
        return new ResponseEntity<>(errorResponse, HttpStatus.SERVICE_UNAVAILABLE);
    }

    /**
     * Handle PredictionException.
     * 
     * @param exception the PredictionException
     * @param request the HTTP request
     * @return ResponseEntity with error details and 500 status
     */
    @ExceptionHandler(PredictionException.class)
    public ResponseEntity<ErrorResponse> handlePredictionException(
            PredictionException exception,
            HttpServletRequest request) {
        
        logger.error("Prediction error: {}", exception.getMessage(), exception);
        
        ErrorResponse errorResponse = ErrorResponse.builder()
            .error("Prediction Error")
            .message(exception.getMessage())
            .status(500)
            .timestamp(LocalDateTime.now().toString())
            .build();
        
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /**
     * Handle MethodArgumentNotValidException for validation errors.
     * 
     * @param exception the MethodArgumentNotValidException
     * @param request the HTTP request
     * @return ResponseEntity with error details and 400 status
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(
            MethodArgumentNotValidException exception,
            HttpServletRequest request) {
        
        logger.warn("Validation error: {}", exception.getMessage());
        
        String message = exception.getBindingResult().getFieldErrors().stream()
            .map(error -> error.getField() + ": " + error.getDefaultMessage())
            .findFirst()
            .orElse("Validation failed");
        
        ErrorResponse errorResponse = ErrorResponse.builder()
            .error("Bad Request")
            .message(message)
            .status(400)
            .timestamp(LocalDateTime.now().toString())
            .build();
        
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    /**
     * Handle NoResourceFoundException for 404 responses.
     * 
     * @param exception the NoResourceFoundException
     * @param request the HTTP request
     * @return ResponseEntity with error details and 404 status
     */
    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ErrorResponse> handleNoResourceFoundException(
            NoResourceFoundException exception,
            HttpServletRequest request) {
        
        logger.warn("Resource not found: {}", exception.getMessage());
        
        ErrorResponse errorResponse = ErrorResponse.builder()
            .error("Not Found")
            .message("The requested resource was not found")
            .status(404)
            .timestamp(LocalDateTime.now().toString())
            .build();
        
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    /**
     * Handle all other exceptions.
     * 
     * @param exception the generic Exception
     * @param request the HTTP request
     * @return ResponseEntity with error details and 500 status
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGlobalException(
            Exception exception,
            HttpServletRequest request) {
        
        logger.error("Unhandled exception occurred", exception);
        
        ErrorResponse errorResponse = ErrorResponse.builder()
            .error("Internal Server Error")
            .message(exception.getMessage() != null ? exception.getMessage() : "An unexpected error occurred")
            .status(500)
            .timestamp(LocalDateTime.now().toString())
            .build();
        
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
