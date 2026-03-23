package com.swm.ml.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.io.Serializable;
import java.util.List;
import jakarta.validation.constraints.*;

/**
 * Request DTO for prediction endpoint.
 * 
 * @author SWM Team
 * @version 1.0.0
 */
public class PredictionRequest implements Serializable {
    private static final long serialVersionUID = 1L;

    @JsonProperty("bin_id")
    @NotNull(message = "Bin ID is required")
    private String binId;

    @JsonProperty("features")
    @NotNull(message = "Features are required")
    @Size(min = 5, max = 5, message = "Exactly 5 features required")
    private List<Double> features;

    public PredictionRequest() {
    }

    public PredictionRequest(String binId, List<Double> features) {
        this.binId = binId;
        this.features = features;
    }

    public String getBinId() {
        return binId;
    }

    public void setBinId(String binId) {
        this.binId = binId;
    }

    public List<Double> getFeatures() {
        return features;
    }

    public void setFeatures(List<Double> features) {
        this.features = features;
    }

    public static PredictionRequestBuilder builder() {
        return new PredictionRequestBuilder();
    }

    public static class PredictionRequestBuilder {
        private String binId;
        private List<Double> features;

        public PredictionRequestBuilder binId(String binId) {
            this.binId = binId;
            return this;
        }

        public PredictionRequestBuilder features(List<Double> features) {
            this.features = features;
            return this;
        }

        public PredictionRequest build() {
            return new PredictionRequest(binId, features);
        }
    }
}
