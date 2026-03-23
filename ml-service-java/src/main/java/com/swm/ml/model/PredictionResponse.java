package com.swm.ml.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * Response DTO for prediction endpoint.
 * 
 * @author SWM Team
 * @version 1.0.0
 */
public class PredictionResponse implements Serializable {
    private static final long serialVersionUID = 1L;

    @JsonProperty("prediction")
    private Double prediction;

    @JsonProperty("confidence")
    private Double confidence;

    @JsonProperty("timestamp")
    private LocalDateTime timestamp;

    @JsonProperty("status")
    private String status;

    @JsonProperty("message")
    private String message;

    public PredictionResponse() {
    }

    public PredictionResponse(Double prediction, Double confidence, LocalDateTime timestamp, String status, String message) {
        this.prediction = prediction;
        this.confidence = confidence;
        this.timestamp = timestamp;
        this.status = status;
        this.message = message;
    }

    public Double getPrediction() {
        return prediction;
    }

    public void setPrediction(Double prediction) {
        this.prediction = prediction;
    }

    public Double getConfidence() {
        return confidence;
    }

    public void setConfidence(Double confidence) {
        this.confidence = confidence;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public static PredictionResponseBuilder builder() {
        return new PredictionResponseBuilder();
    }

    public static class PredictionResponseBuilder {
        private Double prediction;
        private Double confidence;
        private LocalDateTime timestamp;
        private String status;
        private String message;

        public PredictionResponseBuilder prediction(Double prediction) {
            this.prediction = prediction;
            return this;
        }

        public PredictionResponseBuilder confidence(Double confidence) {
            this.confidence = confidence;
            return this;
        }

        public PredictionResponseBuilder timestamp(LocalDateTime timestamp) {
            this.timestamp = timestamp;
            return this;
        }

        public PredictionResponseBuilder status(String status) {
            this.status = status;
            return this;
        }

        public PredictionResponseBuilder message(String message) {
            this.message = message;
            return this;
        }

        public PredictionResponse build() {
            return new PredictionResponse(prediction, confidence, timestamp, status, message);
        }
    }
}
