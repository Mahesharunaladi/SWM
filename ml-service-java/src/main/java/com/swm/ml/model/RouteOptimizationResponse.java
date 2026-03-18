package com.swm.ml.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Response DTO for route optimization endpoint.
 * 
 * @author SWM Team
 * @version 1.0.0
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
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
}
