package com.swm.ml.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * Response DTO for training endpoint.
 * 
 * @author SWM Team
 * @version 1.0.0
 */
public class TrainingResponse implements Serializable {
    private static final long serialVersionUID = 1L;

    @JsonProperty("status")
    private String status;

    @JsonProperty("message")
    private String message;

    @JsonProperty("job_id")
    private String jobId;

    @JsonProperty("timestamp")
    private LocalDateTime timestamp;

    public TrainingResponse() {
    }

    public TrainingResponse(String status, String message, String jobId, LocalDateTime timestamp) {
        this.status = status;
        this.message = message;
        this.jobId = jobId;
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

    public String getJobId() {
        return jobId;
    }

    public void setJobId(String jobId) {
        this.jobId = jobId;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public static TrainingResponseBuilder builder() {
        return new TrainingResponseBuilder();
    }

    public static class TrainingResponseBuilder {
        private String status;
        private String message;
        private String jobId;
        private LocalDateTime timestamp;

        public TrainingResponseBuilder status(String status) {
            this.status = status;
            return this;
        }

        public TrainingResponseBuilder message(String message) {
            this.message = message;
            return this;
        }

        public TrainingResponseBuilder jobId(String jobId) {
            this.jobId = jobId;
            return this;
        }

        public TrainingResponseBuilder timestamp(LocalDateTime timestamp) {
            this.timestamp = timestamp;
            return this;
        }

        public TrainingResponse build() {
            return new TrainingResponse(status, message, jobId, timestamp);
        }
    }
}
