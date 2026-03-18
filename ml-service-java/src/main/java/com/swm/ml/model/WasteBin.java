package com.swm.ml.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import java.io.Serializable;

/**
 * DTO representing a waste bin in the collection system.
 * 
 * @author SWM Team
 * @version 1.0.0
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WasteBin implements Serializable {
    private static final long serialVersionUID = 1L;

    @JsonProperty("bin_id")
    private String binId;

    @JsonProperty("location_name")
    private String locationName;

    @JsonProperty("latitude")
    private Double latitude;

    @JsonProperty("longitude")
    private Double longitude;

    @JsonProperty("fill_level")
    private Double fillLevel;

    @JsonProperty("capacity")
    private Double capacity;

    @JsonProperty("bin_type")
    private String binType;
}
