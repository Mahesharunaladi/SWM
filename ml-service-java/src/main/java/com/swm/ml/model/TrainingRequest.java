package com.swm.ml.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * Request DTO for training endpoint.
 * 
 * @author SWM Team
 * @version 1.0.0
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TrainingRequest implements Serializable {
    private static final long serialVersionUID = 1L;

    @JsonProperty("training_data")
    private List<Map<String, Object>> trainingData;

    @JsonProperty("epochs")
    private Integer epochs;

    @JsonProperty("batch_size")
    private Integer batchSize;
}
