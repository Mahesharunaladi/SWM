package com.swm.ml.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.io.Serializable;

/**
 * DTO representing a waste bin in the collection system.
 * 
 * @author SWM Team
 * @version 1.0.0
 */
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

    public WasteBin() {
    }

    public WasteBin(String binId, String locationName, Double latitude, Double longitude, Double fillLevel, Double capacity, String binType) {
        this.binId = binId;
        this.locationName = locationName;
        this.latitude = latitude;
        this.longitude = longitude;
        this.fillLevel = fillLevel;
        this.capacity = capacity;
        this.binType = binType;
    }

    public String getBinId() {
        return binId;
    }

    public void setBinId(String binId) {
        this.binId = binId;
    }

    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Double getFillLevel() {
        return fillLevel;
    }

    public void setFillLevel(Double fillLevel) {
        this.fillLevel = fillLevel;
    }

    public Double getCapacity() {
        return capacity;
    }

    public void setCapacity(Double capacity) {
        this.capacity = capacity;
    }

    public String getBinType() {
        return binType;
    }

    public void setBinType(String binType) {
        this.binType = binType;
    }

    public static WasteBinBuilder builder() {
        return new WasteBinBuilder();
    }

    public static class WasteBinBuilder {
        private String binId;
        private String locationName;
        private Double latitude;
        private Double longitude;
        private Double fillLevel;
        private Double capacity;
        private String binType;

        public WasteBinBuilder binId(String binId) {
            this.binId = binId;
            return this;
        }

        public WasteBinBuilder locationName(String locationName) {
            this.locationName = locationName;
            return this;
        }

        public WasteBinBuilder latitude(Double latitude) {
            this.latitude = latitude;
            return this;
        }

        public WasteBinBuilder longitude(Double longitude) {
            this.longitude = longitude;
            return this;
        }

        public WasteBinBuilder fillLevel(Double fillLevel) {
            this.fillLevel = fillLevel;
            return this;
        }

        public WasteBinBuilder capacity(Double capacity) {
            this.capacity = capacity;
            return this;
        }

        public WasteBinBuilder binType(String binType) {
            this.binType = binType;
            return this;
        }

        public WasteBin build() {
            return new WasteBin(binId, locationName, latitude, longitude, fillLevel, capacity, binType);
        }
    }
}
