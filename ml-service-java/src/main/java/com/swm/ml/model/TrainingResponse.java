package com.swm.ml.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * Response DTO for training endpoint.
 * 
 * @author SWM Team
 * @version 1.0.0
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
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
}
