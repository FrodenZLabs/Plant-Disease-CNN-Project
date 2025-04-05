from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from PIL import Image
import io
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend interaction

# Define class labels
CLASS_NAMES = [
    'Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy',
    'Blueberry___healthy', 'Cherry_(including_sour)___Powdery_mildew', 'Cherry_(including_sour)___healthy',
    'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot', 'Corn_(maize)___Common_rust_',
    'Corn_(maize)___Northern_Leaf_Blight', 'Corn_(maize)___healthy', 'Grape___Black_rot',
    'Grape___Esca_(Black_Measles)', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 'Grape___healthy',
    'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot', 'Peach___healthy',
    'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy', 'Potato___Early_blight',
    'Potato___Late_blight', 'Potato___healthy', 'Raspberry___healthy', 'Soybean___healthy',
    'Squash___Powdery_mildew', 'Strawberry___Leaf_scorch', 'Strawberry___healthy', 'Tomato___Bacterial_spot',
    'Tomato___Early_blight', 'Tomato___Late_blight', 'Tomato___Leaf_Mold', 'Tomato___Septoria_leaf_spot',
    'Tomato___Spider_mites Two-spotted_spider_mite', 'Tomato___Target_Spot',
    'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Tomato_mosaic_virus', 'Tomato___healthy'
]

#Tensorflow Model Prediction
def model_prediction(file_image):
    model  = tf.keras.models.load_model('plant_model.h5')

    # Convert the file to a readable format
    image = Image.open(io.BytesIO(file_image.read()))

    # Convert grayscale images to RGB
    if image.mode != "RGB":
        image = image.convert("RGB")

    image = image.resize((128, 128))  # Resize to match the model input size

    input_arr = tf.keras.preprocessing.image.img_to_array(image)
    input_arr = np.array([input_arr]) #Convert single image to a batch
    prediction = model.predict(input_arr)
    confidence = np.max(prediction)
    result_index = np.argmax(prediction)

    # Set a threshold to determine whether the image is valid (e.g., 50% confidence)
    if confidence < 0.5:
        return None, confidence

    return result_index, confidence

@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files["file"]
    result_index, confidence = model_prediction(file)
    if result_index is None:
        return jsonify({"error": "The uploaded image does not match any known plant disease.", "confidence": confidence}), 400
    
    predicted_label = CLASS_NAMES[result_index]
    
    return jsonify({"prediction": predicted_label, "confidence": float(confidence)})

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
