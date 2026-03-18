package com.swm.ml.service;

import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.swm.ml.exception.ModelNotFoundException;
import com.swm.ml.exception.PredictionException;
import com.swm.ml.model.*;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Machine Learning Service for waste management predictions and optimizations.
 * 
 * This service handles:
 * - Waste generation prediction
 * - Model training
 * - Route optimization
 * - Model management
 * 
 * @author SWM Team
 * @version 1.0.0
 */
@Service
public class MlService {

    private static final Logger logger = LoggerFactory.getLogger(MlService.class);

    private static final String[] FEATURE_NAMES = {
        "feature_1", "feature_2", "feature_3", "feature_4", "feature_5"
    };

    private final ModelManager modelManager;

    /**
     * Constructor for MlService.
     * 
     * @param modelManager the model manager service
     */
    public MlService(ModelManager modelManager) {
        this.modelManager = modelManager;
    }

    /**
     * Predict waste generation based on input features.
     * 
     * Uses the trained ML model to predict waste levels based on various
     * features such as time, location, weather, etc.
     * 
     * @param request the prediction request containing features
     * @return PredictionResponse with prediction and confidence score
     * @throws ModelNotFoundException if the model is not loaded
     * @throws PredictionException if prediction computation fails
     */
    public PredictionResponse predict(PredictionRequest request) {
        try {
            logger.info("Processing prediction request for bin: {}", request.getBinId());

            // Validate input
            if (!modelManager.isModelLoaded()) {
                logger.warn("Model not loaded for prediction");
                throw new ModelNotFoundException("ML model is not loaded or available");
            }

            // Validate features
            if (request.getFeatures() == null || request.getFeatures().isEmpty()) {
                throw new IllegalArgumentException("Features are required for prediction");
            }

            if (request.getFeatures().size() != FEATURE_NAMES.length) {
                throw new IllegalArgumentException(
                    String.format("Expected %d features, but got %d", 
                        FEATURE_NAMES.length, 
                        request.getFeatures().size())
                );
            }

            // Normalize features
            double[] normalizedFeatures = normalizeFeatures(request.getFeatures());

            // Make prediction
            double prediction = modelManager.predict(normalizedFeatures);
            double confidence = calculateConfidence(normalizedFeatures, prediction);

            logger.info("Prediction completed for bin {}: prediction={}, confidence={}", 
                request.getBinId(), prediction, confidence);

            return PredictionResponse.builder()
                .prediction(prediction)
                .confidence(confidence)
                .timestamp(LocalDateTime.now())
                .status("success")
                .message("Prediction computed successfully")
                .build();

        } catch (Exception e) {
            logger.error("Error during prediction", e);
            throw new PredictionException("Failed to compute prediction: " + e.getMessage(), e);
        }
    }

    /**
     * Train the ML model with new data.
     * 
     * Queues a model training job to be processed asynchronously.
     * 
     * @param request the training request containing training data
     * @return TrainingResponse with job status
     * @throws IllegalArgumentException if training data is invalid
     */
    public TrainingResponse trainModel(TrainingRequest request) {
        try {
            logger.info("Training job initiated");

            // Validate training data
            if (request.getTrainingData() == null || request.getTrainingData().isEmpty()) {
                throw new IllegalArgumentException("Training data cannot be empty");
            }

            // Generate job ID
            String jobId = UUID.randomUUID().toString();

            // In a real application, this would queue the job asynchronously
            // For now, we simulate it with a simple response
            logger.info("Training job queued with ID: {}", jobId);

            return TrainingResponse.builder()
                .status("training_queued")
                .message("Model training has been queued for processing")
                .jobId(jobId)
                .timestamp(LocalDateTime.now())
                .build();

        } catch (Exception e) {
            logger.error("Error queueing training job", e);
            throw new PredictionException("Failed to queue training job: " + e.getMessage(), e);
        }
    }

    /**
     * Optimize waste collection routes.
     * 
     * Uses an optimization algorithm to determine the most efficient route
     * for waste collection based on bin fill levels and locations.
     * 
     * @param request the route optimization request containing bins
     * @return RouteOptimizationResponse with optimized route
     * @throws IllegalArgumentException if bins data is invalid
     */
    public RouteOptimizationResponse optimizeRoutes(RouteOptimizationRequest request) {
        try {
            logger.info("Processing route optimization for {} bins", request.getBins().size());

            // Validate input
            if (request.getBins() == null || request.getBins().isEmpty()) {
                throw new IllegalArgumentException("Bins data is required for route optimization");
            }

            // Original route
            List<WasteBin> originalRoute = new ArrayList<>(request.getBins());

            // Sort bins by fill level (highest first) for optimization
            List<WasteBin> optimizedRoute = request.getBins().stream()
                .sorted(Comparator.comparingDouble(WasteBin::getFillLevel).reversed())
                .collect(Collectors.toList());

            // Calculate metrics
            double efficiencyGain = calculateEfficiencyGain(originalRoute, optimizedRoute);
            int timeSavedMinutes = (int) (efficiencyGain * 3); // Rough estimate

            logger.info("Route optimization completed: efficiency_gain={}, time_saved={}min", 
                efficiencyGain, timeSavedMinutes);

            return RouteOptimizationResponse.builder()
                .originalRoute(originalRoute)
                .optimizedRoute(optimizedRoute)
                .efficiencyGain(efficiencyGain)
                .estimatedTimeSavedMinutes(timeSavedMinutes)
                .timestamp(LocalDateTime.now())
                .status("success")
                .build();

        } catch (Exception e) {
            logger.error("Error optimizing routes", e);
            throw new PredictionException("Failed to optimize routes: " + e.getMessage(), e);
        }
    }

    /**
     * Normalize input features to prepare for model prediction.
     * 
     * Applies standardization/normalization techniques to ensure features
     * are on a consistent scale.
     * 
     * @param rawFeatures the raw input features
     * @return normalized feature array
     */
    private double[] normalizeFeatures(List<Double> rawFeatures) {
        double[] features = new double[rawFeatures.size()];
        for (int i = 0; i < rawFeatures.size(); i++) {
            features[i] = rawFeatures.get(i);
        }

        // Simple z-score normalization
        double mean = Arrays.stream(features).average().orElse(0.0);
        double stdDev = calculateStandardDeviation(features, mean);

        if (stdDev > 0) {
            for (int i = 0; i < features.length; i++) {
                features[i] = (features[i] - mean) / stdDev;
            }
        }

        return features;
    }

    /**
     * Calculate standard deviation of features.
     * 
     * @param features the feature array
     * @param mean the mean of the features
     * @return the standard deviation
     */
    private double calculateStandardDeviation(double[] features, double mean) {
        double variance = 0;
        for (double feature : features) {
            variance += Math.pow(feature - mean, 2);
        }
        variance /= features.length;
        return Math.sqrt(variance);
    }

    /**
     * Calculate confidence score for the prediction.
     * 
     * Confidence is based on the consistency of the features and
     * the model's internal confidence metrics.
     * 
     * @param features the normalized features
     * @param prediction the computed prediction
     * @return confidence score between 0 and 1
     */
    private double calculateConfidence(double[] features, double prediction) {
        // In a real ML system, this would come from the model's predict_proba or similar
        // For now, we calculate a basic confidence based on feature consistency
        double variance = calculateStandardDeviation(features, Arrays.stream(features).average().orElse(0.0));
        double confidence = Math.max(0, Math.min(1, 1.0 - (variance * 0.1)));
        
        return Math.round(confidence * 100.0) / 100.0; // Round to 2 decimal places
    }

    /**
     * Calculate efficiency gain from route optimization.
     * 
     * Compares the original route with the optimized route and calculates
     * the efficiency improvement percentage.
     * 
     * @param originalRoute the original route
     * @param optimizedRoute the optimized route
     * @return efficiency gain percentage
     */
    private double calculateEfficiencyGain(List<WasteBin> originalRoute, List<WasteBin> optimizedRoute) {
        // Calculate total distance for original route
        double originalDistance = calculateRouteDistance(originalRoute);
        
        // Calculate total distance for optimized route
        double optimizedDistance = calculateRouteDistance(optimizedRoute);
        
        // Calculate efficiency gain
        if (originalDistance > 0) {
            return ((originalDistance - optimizedDistance) / originalDistance) * 100;
        }
        
        return 0;
    }

    /**
     * Calculate total distance of a route.
     * 
     * Uses a simplified haversine distance calculation between consecutive bins.
     * 
     * @param route the list of waste bins representing the route
     * @return total distance in kilometers
     */
    private double calculateRouteDistance(List<WasteBin> route) {
        if (route.size() < 2) {
            return 0;
        }

        double totalDistance = 0;
        for (int i = 0; i < route.size() - 1; i++) {
            WasteBin current = route.get(i);
            WasteBin next = route.get(i + 1);
            totalDistance += haversineDistance(
                current.getLatitude(), 
                current.getLongitude(),
                next.getLatitude(), 
                next.getLongitude()
            );
        }

        return totalDistance;
    }

    /**
     * Calculate haversine distance between two geographic points.
     * 
     * @param lat1 latitude of first point
     * @param lon1 longitude of first point
     * @param lat2 latitude of second point
     * @param lon2 longitude of second point
     * @return distance in kilometers
     */
    private double haversineDistance(double lat1, double lon1, double lat2, double lon2) {
        final int EARTH_RADIUS_KM = 6371;

        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);

        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                   Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
                   Math.sin(dLon / 2) * Math.sin(dLon / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return EARTH_RADIUS_KM * c;
    }
}
