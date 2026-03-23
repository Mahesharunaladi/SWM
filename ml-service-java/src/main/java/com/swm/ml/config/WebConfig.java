package com.swm.ml.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.HandlerInterceptor;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.UUID;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

/**
 * Web configuration for the ML Service.
 * 
 * Registers interceptors for request logging and tracing.
 * 
 * @author SWM Team
 * @version 1.0.0
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    private static final Logger logger = LoggerFactory.getLogger(WebConfig.class);

    /**
     * Add custom interceptors to the application.
     * 
     * @param registry the InterceptorRegistry to register interceptors
     */
    @Override
    public void addInterceptors(@NonNull InterceptorRegistry registry) {
        registry.addInterceptor(loggingInterceptor());
    }

    /**
     * Create a logging interceptor bean.
     * 
     * Logs all incoming requests with unique request IDs for tracing.
     * 
     * @return HandlerInterceptor for request logging
     */
    @Bean
    @NonNull
    public HandlerInterceptor loggingInterceptor() {
        return new HandlerInterceptor() {
            @Override
            public boolean preHandle(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, 
                                   @NonNull Object handler) throws Exception {
                String requestId = UUID.randomUUID().toString();
                request.setAttribute("requestId", requestId);
                
                long startTime = System.currentTimeMillis();
                request.setAttribute("startTime", startTime);
                
                logger.info("[{}] {} {}", requestId, request.getMethod(), request.getRequestURI());
                return true;
            }

            @Override
            public void afterCompletion(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response,
                                      @NonNull Object handler, @Nullable Exception ex) throws Exception {
                String requestId = (String) request.getAttribute("requestId");
                Long startTime = (Long) request.getAttribute("startTime");
                long duration = System.currentTimeMillis() - startTime;
                
                logger.info("[{}] {} {} - Status: {} - Duration: {}ms", 
                    requestId, 
                    request.getMethod(), 
                    request.getRequestURI(),
                    response.getStatus(),
                    duration);
            }
        };
    }
}
