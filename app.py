from flask import Flask, render_template, request, jsonify
import numpy as np
import tensorflow as tf
from PIL import Image, ImageOps
import io
import base64

# Load the saved model
model = tf.keras.models.load_model('mnist_Cnn_model.h5')

# Initialize Flask app
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json['image']
        
        image_data = base64.b64decode(data.split(',')[1])
        image = Image.open(io.BytesIO(image_data)).convert('L')

        image = ImageOps.invert(image)  
        image = image.resize((28, 28))
        image_array = np.array(image).reshape((1, 28, 28, 1)) / 255.0

        predictions = model.predict(image_array)
        predicted_class = np.argmax(predictions, axis=1)[0]
        confidence = np.max(predictions, axis=1)[0]

        return jsonify({
            'predicted_class': int(predicted_class),
            'confidence': float(confidence)
        })
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
