package com.swm.ml.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.swm.ml.model.*;
import com.swm.ml.service.MlService;
import java.time.LocalDateTime;

/**
 * REST Controller for Machine Learning Service endpoints.
 * 
 * Provides API endpoints for:
 * - Health checks
 * - Waste predictions
 * - Model training
 * - Route optimization
 * 
 * @author SWM Team
 * @version 1.0.0
 */
@RestController
@RequestMapping("")
public class MlController {

    private static final Logger logger = LoggerFactory.getLogger(MlController.class);

    private final MlService mlService;

    /**
     * Constructor for MlController.
     * 
     * @param mlService the ML service
     */
    public MlController(MlService mlService) {
        this.mlService = mlService;
    }

    /**
     * Health check endpoint.
     * 
     * Returns the current status of the ML service.
     * 
     * @return ResponseEntity with HealthResponse
     */
    @GetMapping("/health")
    public ResponseEntity<HealthResponse> health() {
        logger.info("Health check requested");
        
        HealthResponse response = HealthResponse.builder()
            .status("healthy")
            .timestamp(LocalDateTime.now())
            .version("1.0.0")
            .build();
        
        return ResponseEntity.ok(response);
    }

    /**
     * Prediction endpoint.
     * 
     * Accepts a PredictionRequest with features and returns a waste
     * generation prediction.
     * 
     * @param request the prediction request
     * @return ResponseEntity with PredictionResponse
     */
    @PostMapping("/api/v1/predict")
    public ResponseEntity<PredictionResponse> predict(
            @RequestBody PredictionRequest request) {
        logger.info("Predict endpoint called for bin: {}", request.getBinId());
        
        try {
            PredictionResponse response = mlService.predict(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error in predict endpoint", e);
            throw e;
        }
    }

    /**
     * Training endpoint.
     * 
     * Accepts a TrainingRequest with training data and queues
     * a model training job.
     * 
     * @param request the training request
     * @return ResponseEntity with TrainingResponse
     */
    @PostMapping("/api/v1/train")
    public ResponseEntity<TrainingResponse> train(
            @RequestBody TrainingRequest request) {
        logger.info("Train endpoint called");
        
        try {
            TrainingResponse response = mlService.trainModel(request);
            return ResponseEntity.accepted().body(response);
        } catch (Exception e) {
            logger.error("Error in train endpoint", e);
            throw e;
        }
    }

    /**
     * Route optimization endpoint.
     * 
     * Accepts a RouteOptimizationRequest with waste bins and returns
     * an optimized collection route.
     * 
     * @param request the route optimization request
     * @return ResponseEntity with RouteOptimizationResponse
     */
    @PostMapping("/api/v1/optimize-routes")
    public ResponseEntity<RouteOptimizationResponse> optimizeRoutes(
            @RequestBody RouteOptimizationRequest request) {
        logger.info("Optimize routes endpoint called");
        
        try {
            RouteOptimizationResponse response = mlService.optimizeRoutes(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error in optimize routes endpoint", e);
            throw e;
        }
    }
}
