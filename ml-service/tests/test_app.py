import pytest
import json
from src.app import app


@pytest.fixture
def client():
    """Create a test client"""
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client


def test_health_endpoint(client):
    """Test health check endpoint"""
    response = client.get('/health')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['status'] == 'OK'
    assert 'timestamp' in data
    assert data['service'] == 'ml-service'


def test_predict_no_data(client):
    """Test predict endpoint without data"""
    response = client.post('/api/v1/predict', json={})
    assert response.status_code == 400


def test_optimize_routes_no_data(client):
    """Test optimize routes endpoint without data"""
    response = client.post('/api/v1/optimize-routes', json={})
    assert response.status_code == 400


def test_404_not_found(client):
    """Test 404 handler"""
    response = client.get('/api/v1/undefined')
    assert response.status_code == 404
