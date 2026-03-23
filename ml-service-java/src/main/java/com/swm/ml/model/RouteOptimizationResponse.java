package com.swm.ml.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Response DTO for route optimization endpoint.
 * 
 * @author SWM Team
 * @version 1.0.0
 */
public class RouteOptimizationResponse implements Serializable {
    private static final long serialVersionUID = 1L;

    @JsonProperty("original_route")
    private List<WasteBin> originalRoute;

    @JsonProperty("optimized_route")
    private List<WasteBin> optimizedRoute;

    @JsonProperty("efficiency_gain")
    private Double efficiencyGain;

    @JsonProperty("estimated_time_saved_minutes")
    private Integer estimatedTimeSavedMinutes;

    @JsonProperty("timestamp")
    private LocalDateTime timestamp;

    @JsonProperty("status")
    private String status;

    public RouteOptimizationResponse() {
    }

    public RouteOptimizationResponse(List<WasteBin> originalRoute, List<WasteBin> optimizedRoute, Double efficiencyGain, Integer estimatedTimeSavedMinutes, LocalDateTime timestamp, String status) {
        this.originalRoute = originalRoute;
        this.optimizedRoute = optimizedRoute;
        this.efficiencyGain = efficiencyGain;
        this.estimatedTimeSavedMinutes = estimatedTimeSavedMinutes;
        this.timestamp = timestamp;
        this.status = status;
    }

    public List<WasteBin> getOriginalRoute() {
        return originalRoute;
    }

    public void setOriginalRoute(List<WasteBin> originalRoute) {
        this.originalRoute = originalRoute;
    }

    public List<WasteBin> getOptimizedRoute() {
        return optimizedRoute;
    }

    public void setOptimizedRoute(List<WasteBin> optimizedRoute) {
        this.optimizedRoute = optimizedRoute;
    }

    public Double getEfficiencyGain() {
        return efficiencyGain;
    }

    public void setEfficiencyGain(Double efficiencyGain) {
        this.efficiencyGain = efficiencyGain;
    }

    public Integer getEstimatedTimeSavedMinutes() {
        return estimatedTimeSavedMinutes;
    }

    public void setEstimatedTimeSavedMinutes(Integer estimatedTimeSavedMinutes) {
        this.estimatedTimeSavedMinutes = estimatedTimeSavedMinutes;
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

    public static RouteOptimizationResponseBuilder builder() {
        return new RouteOptimizationResponseBuilder();
    }

    public static class RouteOptimizationResponseBuilder {
        private List<WasteBin> originalRoute;
        private List<WasteBin> optimizedRoute;
        private Double efficiencyGain;
        private Integer estimatedTimeSavedMinutes;
        private LocalDateTime timestamp;
        private String status;

        public RouteOptimizationResponseBuilder originalRoute(List<WasteBin> originalRoute) {
            this.originalRoute = originalRoute;
            return this;
        }

        public RouteOptimizationResponseBuilder optimizedRoute(List<WasteBin> optimizedRoute) {
            this.optimizedRoute = optimizedRoute;
            return this;
        }

        public RouteOptimizationResponseBuilder efficiencyGain(Double efficiencyGain) {
            this.efficiencyGain = efficiencyGain;
            return this;
        }

        public RouteOptimizationResponseBuilder estimatedTimeSavedMinutes(Integer estimatedTimeSavedMinutes) {
            this.estimatedTimeSavedMinutes = estimatedTimeSavedMinutes;
            return this;
        }

        public RouteOptimizationResponseBuilder timestamp(LocalDateTime timestamp) {
            this.timestamp = timestamp;
            return this;
        }

        public RouteOptimizationResponseBuilder status(String status) {
            this.status = status;
            return this;
        }

        public RouteOptimizationResponse build() {
            return new RouteOptimizationResponse(originalRoute, optimizedRoute, efficiencyGain, estimatedTimeSavedMinutes, timestamp, status);
        }
    }
}
