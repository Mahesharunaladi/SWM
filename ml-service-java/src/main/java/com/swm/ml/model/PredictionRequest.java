package com.swm.ml.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import java.io.Serializable;
import java.util.List;

/**
 * Request DTO for prediction endpoint.
 * 
 * @author SWM Team
 * @version 1.0.0
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PredictionRequest implements Serializable {
    private static final long serialVersionUID = 1L;

    @JsonProperty("bin_id")
    private String binId;

    @JsonProperty("features")
    private List<Double> features;
}
