package com.swm.ml;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

/**
 * Main application entry point for the Smart Waste Management ML Service.
 * 
 * This Spring Boot application provides machine learning capabilities including:
 * - Waste generation prediction
 * - Collection route optimization
 * - Model training and management
 * 
 * @author SWM Team
 * @version 1.0.0
 */
@SpringBootApplication
@ComponentScan(basePackages = {"com.swm.ml"})
public class MlServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(MlServiceApplication.class, args);
    }
}
