package com.swm.ml.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Request and Response DTOs for the ML Service.
 * 
 * These classes encapsulate the data structures for API communication.
 * 
 * @author SWM Team
 * @version 1.0.0
 */

/**
 * Health check response DTO.
 * 
 * Provides information about the service health status and model availability.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
class HealthResponse implements Serializable {
    private String status;
    private LocalDateTime timestamp;
    private String service;
    
    @JsonProperty("model_loaded")
    private boolean modelLoaded;
    
    private String version;
}

/**
 * Prediction request DTO.
 * 
 * Contains the input features for waste generation prediction.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
class PredictionRequest implements Serializable {
    
    @JsonProperty("bin_id")
    private Integer binId;
    
    private List<Double> features;
}

/**
 * Prediction response DTO.
 * 
 * Contains the prediction result and confidence score.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
class PredictionResponse implements Serializable {
    private Double prediction;
    private Double confidence;
    private LocalDateTime timestamp;
    private String status;
    private String message;
}

/**
 * Training request DTO.
 * 
 * Contains training data for model retraining.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
class TrainingRequest implements Serializable {
    
    @JsonProperty("training_data")
    private List<TrainingDataPoint> trainingData;
}

/**
 * Training data point DTO.
 * 
 * Represents a single data point in the training dataset.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
class TrainingDataPoint implements Serializable {
    private List<Double> features;
    private Double label;
}

/**
 * Training response DTO.
 * 
 * Indicates the status of a training job.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
class TrainingResponse implements Serializable {
    private String status;
    private String message;
    private LocalDateTime timestamp;
    
    @JsonProperty("job_id")
    private String jobId;
}

/**
 * Route optimization request DTO.
 * 
 * Contains waste bin information for route optimization.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
class RouteOptimizationRequest implements Serializable {
    private List<WasteBin> bins;
}

/**
 * Waste bin DTO for route optimization.
 * 
 * Represents a waste bin with location and fill level.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
class WasteBin implements Serializable {
    private Integer id;
    private String location;
    private Double latitude;
    private Double longitude;
    
    @JsonProperty("fill_level")
    private Double fillLevel;
    
    private String status;
}

/**
 * Route optimization response DTO.
 * 
 * Contains the optimized collection route and metrics.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
class RouteOptimizationResponse implements Serializable {
    
    @JsonProperty("original_route")
    private List<WasteBin> originalRoute;
    
    @JsonProperty("optimized_route")
    private List<WasteBin> optimizedRoute;
    
    @JsonProperty("efficiency_gain")
    private Double efficiencyGain;
    
    @JsonProperty("estimated_time_saved")
    private Integer estimatedTimeSavedMinutes;
    
    private LocalDateTime timestamp;
    private String status;
}

/**
 * Error response DTO.
 * 
 * Standard error response format for the API.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
class ErrorResponse implements Serializable {
    private String error;
    private String message;
    private Integer statusCode;
    private LocalDateTime timestamp;
    private String path;
}
