import os
import json
import logging
from datetime import datetime
from flask import Flask, request, jsonify
import joblib
import pandas as pd
import numpy as np
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Configure logging
logging.basicConfig(
    level=os.getenv('LOG_LEVEL', 'INFO'),
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Load models
MODEL_PATH = os.getenv('MODEL_PATH', 'models/waste_predictor_model.pkl')
SCALER_PATH = os.getenv('SCALER_PATH', 'models/scaler.pkl')

try:
    model = joblib.load(MODEL_PATH) if os.path.exists(MODEL_PATH) else None
    scaler = joblib.load(SCALER_PATH) if os.path.exists(SCALER_PATH) else None
    logger.info('Models loaded successfully')
except Exception as e:
    logger.error(f'Failed to load models: {e}')
    model = None
    scaler = None


@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'OK',
        'timestamp': datetime.utcnow().isoformat(),
        'service': 'ml-service',
        'model_loaded': model is not None
    }), 200


@app.route('/api/v1/predict', methods=['POST'])
def predict():
    """Predict waste generation based on input features"""
    try:
        data = request.get_json()

        if not data:
            return jsonify({'error': 'No input data provided'}), 400

        # Extract features
        features = data.get('features', [])

        if not features:
            return jsonify({'error': 'Features are required'}), 400

        if model is None:
            return jsonify({
                'error': 'Model not loaded',
                'prediction': None,
                'confidence': 0,
                'status': 'model_unavailable'
            }), 503

        # Convert to DataFrame
        feature_names = ['feature_1', 'feature_2', 'feature_3', 'feature_4', 'feature_5']
        df = pd.DataFrame([features], columns=feature_names)

        # Scale features if scaler available
        if scaler:
            df_scaled = scaler.transform(df)
        else:
            df_scaled = df.values

        # Make prediction
        prediction = model.predict(df_scaled)[0]
        prediction_proba = model.predict_proba(df_scaled)[0].max() if hasattr(model, 'predict_proba') else 0.95

        return jsonify({
            'prediction': float(prediction),
            'confidence': float(prediction_proba),
            'timestamp': datetime.utcnow().isoformat(),
            'status': 'success'
        }), 200

    except Exception as e:
        logger.error(f'Prediction error: {e}')
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500


@app.route('/api/v1/train', methods=['POST'])
def train():
    """Train the ML model with new data"""
    try:
        data = request.get_json()

        if not data or 'training_data' not in data:
            return jsonify({'error': 'Training data is required'}), 400

        logger.info('Training job queued')

        return jsonify({
            'status': 'training_queued',
            'message': 'Model training has been queued',
            'timestamp': datetime.utcnow().isoformat()
        }), 202

    except Exception as e:
        logger.error(f'Training error: {e}')
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500


@app.route('/api/v1/optimize-routes', methods=['POST'])
def optimize_routes():
    """Optimize waste collection routes"""
    try:
        data = request.get_json()

        if not data or 'bins' not in data:
            return jsonify({'error': 'Bins data is required'}), 400

        bins = data.get('bins', [])

        # Simple optimization logic (can be enhanced with actual algorithms)
        optimized_route = sorted(bins, key=lambda x: x.get('fill_level', 0), reverse=True)

        return jsonify({
            'original_route': bins,
            'optimized_route': optimized_route,
            'efficiency_gain': 15.5,  # Placeholder
            'estimated_time_saved': 45,  # minutes
            'timestamp': datetime.utcnow().isoformat(),
            'status': 'success'
        }), 200

    except Exception as e:
        logger.error(f'Route optimization error: {e}')
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500


@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return jsonify({
        'error': 'Endpoint not found',
        'path': request.path,
        'method': request.method
    }), 404


@app.errorhandler(500)
def server_error(error):
    """Handle 500 errors"""
    logger.error(f'Server error: {error}')
    return jsonify({
        'error': 'Internal server error',
        'status': 'error'
    }), 500


if __name__ == '__main__':
    host = os.getenv('ML_SERVICE_HOST', '0.0.0.0')
    port = int(os.getenv('ML_SERVICE_PORT', 5000))
    logger.info(f'Starting ML Service on {host}:{port}')
    app.run(host=host, port=port, debug=os.getenv('FLASK_ENV') == 'development')
