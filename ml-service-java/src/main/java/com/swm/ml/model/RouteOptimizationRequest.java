package com.swm.ml.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.io.Serializable;
import java.util.List;

/**
 * Request DTO for route optimization endpoint.
 * 
 * @author SWM Team
 * @version 1.0.0
 */
public class RouteOptimizationRequest implements Serializable {
    private static final long serialVersionUID = 1L;

    @JsonProperty("bins")
    private List<WasteBin> bins;

    @JsonProperty("start_location")
    private String startLocation;

    @JsonProperty("end_location")
    private String endLocation;

    public RouteOptimizationRequest() {
    }

    public RouteOptimizationRequest(List<WasteBin> bins, String startLocation, String endLocation) {
        this.bins = bins;
        this.startLocation = startLocation;
        this.endLocation = endLocation;
    }

    public List<WasteBin> getBins() {
        return bins;
    }

    public void setBins(List<WasteBin> bins) {
        this.bins = bins;
    }

    public String getStartLocation() {
        return startLocation;
    }

    public void setStartLocation(String startLocation) {
        this.startLocation = startLocation;
    }

    public String getEndLocation() {
        return endLocation;
    }

    public void setEndLocation(String endLocation) {
        this.endLocation = endLocation;
    }

    public static RouteOptimizationRequestBuilder builder() {
        return new RouteOptimizationRequestBuilder();
    }

    public static class RouteOptimizationRequestBuilder {
        private List<WasteBin> bins;
        private String startLocation;
        private String endLocation;

        public RouteOptimizationRequestBuilder bins(List<WasteBin> bins) {
            this.bins = bins;
            return this;
        }

        public RouteOptimizationRequestBuilder startLocation(String startLocation) {
            this.startLocation = startLocation;
            return this;
        }

        public RouteOptimizationRequestBuilder endLocation(String endLocation) {
            this.endLocation = endLocation;
            return this;
        }

        public RouteOptimizationRequest build() {
            return new RouteOptimizationRequest(bins, startLocation, endLocation);
        }
    }
}
