# Smart Waste Management System - API Documentation

## Base URL
```
https://api.swm.example.com/api/v1
```

## Authentication
All API endpoints (except `/health` and `/auth/login`) require Bearer token authentication.

```
Authorization: Bearer <jwt_token>
```

## Endpoints

### Health Check
**GET** `/health`

Check API health status.

**Response (200 OK):**
```json
{
  "status": "OK",
  "timestamp": "2024-03-18T10:00:00Z",
  "version": "1.0.0",
  "uptime": 12345.67
}
```

---

### Waste Bins

#### List All Bins
**GET** `/bins`

Retrieve all waste bins.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `status` (optional): Filter by status (active, inactive, maintenance)

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "location": "Downtown A",
      "latitude": 40.7128,
      "longitude": -74.0060,
      "capacity": 100,
      "current_level": 65,
      "status": "active",
      "last_emptied": "2024-03-15T10:00:00Z",
      "temperature": 22.5,
      "humidity": 65,
      "sensors": {
        "distance": "active",
        "weight": "active",
        "temperature": "active"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150
  }
}
```

#### Get Bin Details
**GET** `/bins/:id`

Retrieve details of a specific waste bin.

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "location": "Downtown A",
    "latitude": 40.7128,
    "longitude": -74.0060,
    "capacity": 100,
    "current_level": 65,
    "status": "active",
    "last_emptied": "2024-03-15T10:00:00Z",
    "temperature": 22.5,
    "humidity": 65,
    "sensors": {
      "distance": "active",
      "weight": "active",
      "temperature": "active"
    },
    "history": [
      {
        "timestamp": "2024-03-18T09:00:00Z",
        "level": 64,
        "temperature": 22.3
      }
    ]
  }
}
```

#### Create Bin
**POST** `/bins`

Create a new waste bin.

**Request Body:**
```json
{
  "location": "New Location",
  "latitude": 40.7200,
  "longitude": -74.0100,
  "capacity": 150
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": 151,
    "location": "New Location",
    "latitude": 40.7200,
    "longitude": -74.0100,
    "capacity": 150,
    "current_level": 0,
    "status": "active",
    "created_at": "2024-03-18T10:15:00Z"
  }
}
```

#### Update Bin
**PUT** `/bins/:id`

Update a waste bin.

**Request Body:**
```json
{
  "location": "Updated Location",
  "capacity": 200
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "location": "Updated Location",
    "capacity": 200,
    "updated_at": "2024-03-18T10:20:00Z"
  }
}
```

#### Delete Bin
**DELETE** `/bins/:id`

Delete a waste bin.

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Bin 1 deleted successfully"
}
```

---

### Collections

#### Get Collection Routes
**GET** `/collections`

Get all collection routes.

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "vehicle_id": "VEH-001",
      "driver": "John Doe",
      "status": "in_progress",
      "bins": [1, 2, 3, 4, 5],
      "start_time": "2024-03-18T08:00:00Z",
      "estimated_end_time": "2024-03-18T11:30:00Z",
      "distance_km": 25.5
    }
  ]
}
```

---

### Analytics

#### Get Waste Statistics
**GET** `/analytics/statistics`

Get waste management statistics.

**Query Parameters:**
- `start_date` (optional): Start date (ISO 8601)
- `end_date` (optional): End date (ISO 8601)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "total_waste_collected_kg": 5250,
    "average_fill_level": 62.3,
    "collection_efficiency": 85.5,
    "carbon_saved_kg": 125.6,
    "period": {
      "start": "2024-03-01T00:00:00Z",
      "end": "2024-03-18T23:59:59Z"
    }
  }
}
```

---

### ML Service

#### Predict Waste Generation
**POST** `/predict`

Predict waste generation for a bin.

**Request Body:**
```json
{
  "bin_id": 1,
  "features": [65, 22.5, 65, 0.8, 1.2]
}
```

**Response (200 OK):**
```json
{
  "prediction": 78.5,
  "confidence": 0.92,
  "timestamp": "2024-03-18T10:25:00Z",
  "status": "success"
}
```

#### Optimize Collection Routes
**POST** `/routes/optimize`

Optimize waste collection routes.

**Request Body:**
```json
{
  "bins": [
    {"id": 1, "fill_level": 65, "location": "Downtown A"},
    {"id": 2, "fill_level": 45, "location": "Downtown B"}
  ]
}
```

**Response (200 OK):**
```json
{
  "original_route": [...],
  "optimized_route": [...],
  "efficiency_gain": 15.5,
  "estimated_time_saved": 45,
  "status": "success"
}
```

---

## Error Handling

All endpoints return error responses in the following format:

**Response (4xx/5xx):**
```json
{
  "error": {
    "message": "Error description",
    "statusCode": 400,
    "timestamp": "2024-03-18T10:30:00Z"
  }
}
```

### Common Error Codes

| Code | Message |
|------|---------|
| 400 | Bad Request - Invalid input parameters |
| 401 | Unauthorized - Invalid or missing authentication |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource already exists |
| 500 | Internal Server Error - Server-side error |
| 503 | Service Unavailable - ML model not loaded |

---

## Rate Limiting

API requests are rate-limited to:
- **100 requests per minute** for authenticated users
- **10 requests per minute** for public endpoints

Rate limit information is included in response headers:
- `X-RateLimit-Limit`: Maximum requests allowed
- `X-RateLimit-Remaining`: Remaining requests
- `X-RateLimit-Reset`: Unix timestamp when limit resets

---

## Pagination

List endpoints support pagination with the following parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)

Response includes pagination metadata:
```json
{
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

---

## Webhooks

Subscribe to real-time events via webhooks.

**Supported Events:**
- `bin.level_high`: Bin reaches 80% capacity
- `bin.level_critical`: Bin reaches 95% capacity
- `collection.completed`: Collection route completed
- `alert.sensor_failure`: Sensor failure detected

**Subscribe to Webhook:**
**POST** `/webhooks/subscribe`

```json
{
  "event": "bin.level_high",
  "url": "https://your-domain.com/webhook-handler",
  "secret": "webhook-secret-key"
}
```

---

## Changelog

### Version 1.0.0 (2024-03-18)
- Initial release
- Waste bin management endpoints
- Collection route management
- Basic analytics
- ML prediction service integration
