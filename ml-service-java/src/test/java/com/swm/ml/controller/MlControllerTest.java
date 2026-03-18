package com.swm.ml.controller;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.http.MediaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.swm.ml.model.*;
import java.util.*;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.*;

/**
 * Integration tests for ML Controller.
 * 
 * Tests REST endpoints for health checks, predictions, training, and route optimization.
 * 
 * @author SWM Team
 * @version 1.0.0
 */
@SpringBootTest
@AutoConfigureMockMvc
public class MlControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    /**
     * Test health endpoint returns 200 status.
     */
    @Test
    public void testHealthEndpoint() throws Exception {
        mockMvc.perform(get("/health"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.status").value("healthy"))
            .andExpect(jsonPath("$.version").value("1.0.0"))
            .andExpect(jsonPath("$.timestamp").exists());
    }

    /**
     * Test prediction endpoint with valid request.
     */
    @Test
    public void testPredictWithValidRequest() throws Exception {
        PredictionRequest request = PredictionRequest.builder()
            .binId("bin-001")
            .features(Arrays.asList(1.0, 2.0, 3.0, 4.0, 5.0))
            .build();

        mockMvc.perform(post("/api/v1/predict")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.prediction").isNumber())
            .andExpect(jsonPath("$.confidence").isNumber())
            .andExpect(jsonPath("$.confidence", greaterThanOrEqualTo(0.0)))
            .andExpect(jsonPath("$.confidence", lessThanOrEqualTo(1.0)))
            .andExpect(jsonPath("$.status").value("success"))
            .andExpect(jsonPath("$.timestamp").exists());
    }

    /**
     * Test prediction endpoint with invalid feature count.
     */
    @Test
    public void testPredictWithInvalidFeatureCount() throws Exception {
        PredictionRequest request = PredictionRequest.builder()
            .binId("bin-001")
            .features(Arrays.asList(1.0, 2.0)) // Only 2 features instead of 5
            .build();

        mockMvc.perform(post("/api/v1/predict")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest());
    }

    /**
     * Test prediction endpoint with null features.
     */
    @Test
    public void testPredictWithNullFeatures() throws Exception {
        PredictionRequest request = PredictionRequest.builder()
            .binId("bin-001")
            .features(null)
            .build();

        mockMvc.perform(post("/api/v1/predict")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest());
    }

    /**
     * Test training endpoint.
     */
    @Test
    public void testTrainEndpoint() throws Exception {
        List<Map<String, Object>> trainingData = new ArrayList<>();
        Map<String, Object> dataPoint = new HashMap<>();
        dataPoint.put("features", Arrays.asList(1.0, 2.0, 3.0, 4.0, 5.0));
        dataPoint.put("label", 50.0);
        trainingData.add(dataPoint);

        TrainingRequest request = TrainingRequest.builder()
            .trainingData(trainingData)
            .epochs(10)
            .batchSize(32)
            .build();

        mockMvc.perform(post("/api/v1/train")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isAccepted())
            .andExpect(jsonPath("$.status").value("training_queued"))
            .andExpect(jsonPath("$.jobId").exists())
            .andExpect(jsonPath("$.timestamp").exists());
    }

    /**
     * Test training endpoint with empty data.
     */
    @Test
    public void testTrainWithEmptyData() throws Exception {
        TrainingRequest request = TrainingRequest.builder()
            .trainingData(new ArrayList<>())
            .build();

        mockMvc.perform(post("/api/v1/train")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest());
    }

    /**
     * Test route optimization endpoint.
     */
    @Test
    public void testOptimizeRoutesEndpoint() throws Exception {
        List<WasteBin> bins = new ArrayList<>();
        bins.add(WasteBin.builder()
            .binId("bin-001")
            .locationName("Location A")
            .latitude(40.7128)
            .longitude(-74.0060)
            .fillLevel(75.0)
            .capacity(100.0)
            .binType("general")
            .build());
        
        bins.add(WasteBin.builder()
            .binId("bin-002")
            .locationName("Location B")
            .latitude(40.7580)
            .longitude(-73.9855)
            .fillLevel(85.0)
            .capacity(100.0)
            .binType("general")
            .build());

        RouteOptimizationRequest request = RouteOptimizationRequest.builder()
            .bins(bins)
            .startLocation("Depot")
            .endLocation("Depot")
            .build();

        mockMvc.perform(post("/api/v1/optimize-routes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.originalRoute").isArray())
            .andExpect(jsonPath("$.optimizedRoute").isArray())
            .andExpect(jsonPath("$.efficiencyGain").isNumber())
            .andExpect(jsonPath("$.estimatedTimeSavedMinutes").isNumber())
            .andExpect(jsonPath("$.status").value("success"))
            .andExpect(jsonPath("$.timestamp").exists());
    }

    /**
     * Test route optimization with empty bins.
     */
    @Test
    public void testOptimizeRoutesWithEmptyBins() throws Exception {
        RouteOptimizationRequest request = RouteOptimizationRequest.builder()
            .bins(new ArrayList<>())
            .build();

        mockMvc.perform(post("/api/v1/optimize-routes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest());
    }

    /**
     * Test non-existent endpoint returns 404.
     */
    @Test
    public void testNonExistentEndpoint() throws Exception {
        mockMvc.perform(get("/api/v1/nonexistent"))
            .andExpect(status().isNotFound());
    }
}
