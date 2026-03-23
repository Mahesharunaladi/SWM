package com.swm.ml.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * Request DTO for training endpoint.
 * 
 * @author SWM Team
 * @version 1.0.0
 */
public class TrainingRequest implements Serializable {
    private static final long serialVersionUID = 1L;

    @JsonProperty("training_data")
    private List<Map<String, Object>> trainingData;

    @JsonProperty("epochs")
    private Integer epochs;

    @JsonProperty("batch_size")
    private Integer batchSize;

    public TrainingRequest() {
    }

    public TrainingRequest(List<Map<String, Object>> trainingData, Integer epochs, Integer batchSize) {
        this.trainingData = trainingData;
        this.epochs = epochs;
        this.batchSize = batchSize;
    }

    public List<Map<String, Object>> getTrainingData() {
        return trainingData;
    }

    public void setTrainingData(List<Map<String, Object>> trainingData) {
        this.trainingData = trainingData;
    }

    public Integer getEpochs() {
        return epochs;
    }

    public void setEpochs(Integer epochs) {
        this.epochs = epochs;
    }

    public Integer getBatchSize() {
        return batchSize;
    }

    public void setBatchSize(Integer batchSize) {
        this.batchSize = batchSize;
    }

    public static TrainingRequestBuilder builder() {
        return new TrainingRequestBuilder();
    }

    public static class TrainingRequestBuilder {
        private List<Map<String, Object>> trainingData;
        private Integer epochs;
        private Integer batchSize;

        public TrainingRequestBuilder trainingData(List<Map<String, Object>> trainingData) {
            this.trainingData = trainingData;
            return this;
        }

        public TrainingRequestBuilder epochs(Integer epochs) {
            this.epochs = epochs;
            return this;
        }

        public TrainingRequestBuilder batchSize(Integer batchSize) {
            this.batchSize = batchSize;
            return this;
        }

        public TrainingRequest build() {
            return new TrainingRequest(trainingData, epochs, batchSize);
        }
    }
}
