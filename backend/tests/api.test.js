const request = require('supertest');
const app = require('../src/index');

describe('Health Check Endpoint', () => {
  it('should return health status', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);

    expect(response.body).toHaveProperty('status');
    expect(response.body.status).toBe('OK');
    expect(response.body).toHaveProperty('timestamp');
    expect(response.body).toHaveProperty('uptime');
  });
});

describe('Bins API', () => {
  it('should fetch all bins', async () => {
    const response = await request(app)
      .get('/api/v1/bins')
      .expect(200);

    expect(response.body).toHaveProperty('success');
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('should fetch a specific bin', async () => {
    const response = await request(app)
      .get('/api/v1/bins/1')
      .expect(200);

    expect(response.body).toHaveProperty('success');
    expect(response.body.data).toHaveProperty('id');
  });

  it('should create a new bin', async () => {
    const newBin = {
      location: 'Test Location',
      latitude: 40.7128,
      longitude: -74.0060,
      capacity: 150
    };

    const response = await request(app)
      .post('/api/v1/bins')
      .send(newBin)
      .expect(201);

    expect(response.body).toHaveProperty('success');
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.location).toBe(newBin.location);
  });

  it('should return 400 for invalid bin creation', async () => {
    const response = await request(app)
      .post('/api/v1/bins')
      .send({})
      .expect(400);

    expect(response.body).toHaveProperty('error');
  });

  it('should update a bin', async () => {
    const response = await request(app)
      .put('/api/v1/bins/1')
      .send({ location: 'Updated Location' })
      .expect(200);

    expect(response.body).toHaveProperty('success');
  });

  it('should delete a bin', async () => {
    const response = await request(app)
      .delete('/api/v1/bins/1')
      .expect(200);

    expect(response.body).toHaveProperty('success');
  });
});

describe('404 Handler', () => {
  it('should return 404 for undefined routes', async () => {
    const response = await request(app)
      .get('/api/v1/undefined-route')
      .expect(404);

    expect(response.body).toHaveProperty('error');
  });
});
