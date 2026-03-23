package com.swm.ml.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * Response DTO for health check endpoint.
 * 
 * @author SWM Team
 * @version 1.0.0
 */
public class HealthResponse implements Serializable {
    private static final long serialVersionUID = 1L;

    @JsonProperty("status")
    private String status;

    @JsonProperty("timestamp")
    private LocalDateTime timestamp;

    @JsonProperty("version")
    private String version;

    public HealthResponse() {
    }

    public HealthResponse(String status, LocalDateTime timestamp, String version) {
        this.status = status;
        this.timestamp = timestamp;
        this.version = version;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public static HealthResponseBuilder builder() {
        return new HealthResponseBuilder();
    }

    public static class HealthResponseBuilder {
        private String status;
        private LocalDateTime timestamp;
        private String version;

        public HealthResponseBuilder status(String status) {
            this.status = status;
            return this;
        }

        public HealthResponseBuilder timestamp(LocalDateTime timestamp) {
            this.timestamp = timestamp;
            return this;
        }

        public HealthResponseBuilder version(String version) {
            this.version = version;
            return this;
        }

        public HealthResponse build() {
            return new HealthResponse(status, timestamp, version);
        }
    }
}
