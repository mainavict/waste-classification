from flask import Flask, request, jsonify, render_template
import os
import numpy as np
from skimage.io import imread
from skimage.color import rgb2gray
from skimage.transform import resize
from sklearn.svm import SVC
import joblib

app = Flask(__name__)

# Load the trained model
model = joblib.load("svm_model.pkl")  # Save your trained model as svm_model.pkl

UPLOAD_FOLDER = "static/uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

categories = ['organic', 'recyclable']  # Define categories

def preprocess_image(image_path):
    image = imread(image_path).astype(np.float32)
    if len(image.shape) == 3:  # Convert to grayscale if RGB
        image = resize(image, (256, 256))
        image = rgb2gray(image)
    return image.flatten().reshape(1, -1)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'})
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'})
    
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(filepath)
    
    image_data = preprocess_image(filepath)
    prediction = model.predict(image_data)[0]
    category = categories[prediction]
    
    return jsonify({'category': category, 'image_url': filepath})

if __name__ == '__main__':
    app.run(debug=True)