package com.swm.ml.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * Response DTO for prediction endpoint.
 * 
 * @author SWM Team
 * @version 1.0.0
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
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
}
