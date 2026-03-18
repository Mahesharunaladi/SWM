const express = require('express');
const router = express.Router();

/**
 * GET /api/v1/bins
 * Fetch all waste bins
 */
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    data: [
      {
        id: 1,
        location: 'Downtown A',
        latitude: 40.7128,
        longitude: -74.0060,
        capacity: 100,
        current_level: 65,
        status: 'active',
        last_emptied: '2024-03-15T10:00:00Z'
      },
      {
        id: 2,
        location: 'Downtown B',
        latitude: 40.7180,
        longitude: -73.9960,
        capacity: 100,
        current_level: 45,
        status: 'active',
        last_emptied: '2024-03-14T14:30:00Z'
      }
    ]
  });
});

/**
 * GET /api/v1/bins/:id
 * Fetch specific waste bin
 */
router.get('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      id: req.params.id,
      location: 'Downtown A',
      latitude: 40.7128,
      longitude: -74.0060,
      capacity: 100,
      current_level: 65,
      status: 'active',
      last_emptied: '2024-03-15T10:00:00Z',
      temperature: 22.5,
      humidity: 65,
      sensors: {
        distance: 'active',
        weight: 'active',
        temperature: 'active'
      }
    }
  });
});

/**
 * POST /api/v1/bins
 * Create a new waste bin
 */
router.post('/', (req, res) => {
  const { location, latitude, longitude, capacity } = req.body;

  if (!location || !latitude || !longitude || !capacity) {
    return res.status(400).json({
      error: 'Missing required fields'
    });
  }

  res.status(201).json({
    success: true,
    data: {
      id: Math.floor(Math.random() * 1000),
      location,
      latitude,
      longitude,
      capacity,
      current_level: 0,
      status: 'active',
      created_at: new Date().toISOString()
    }
  });
});

/**
 * PUT /api/v1/bins/:id
 * Update a waste bin
 */
router.put('/:id', (req, res) => {
  const { location, capacity } = req.body;

  res.status(200).json({
    success: true,
    data: {
      id: req.params.id,
      location: location || 'Downtown A',
      capacity: capacity || 100,
      updated_at: new Date().toISOString()
    }
  });
});

/**
 * DELETE /api/v1/bins/:id
 * Delete a waste bin
 */
router.delete('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    message: `Bin ${req.params.id} deleted successfully`
  });
});

module.exports = router;
