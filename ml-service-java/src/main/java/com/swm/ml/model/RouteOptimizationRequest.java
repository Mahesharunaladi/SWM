package com.swm.ml.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import java.io.Serializable;
import java.util.List;

/**
 * Request DTO for route optimization endpoint.
 * 
 * @author SWM Team
 * @version 1.0.0
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RouteOptimizationRequest implements Serializable {
    private static final long serialVersionUID = 1L;

    @JsonProperty("bins")
    private List<WasteBin> bins;

    @JsonProperty("start_location")
    private String startLocation;

    @JsonProperty("end_location")
    private String endLocation;
}
