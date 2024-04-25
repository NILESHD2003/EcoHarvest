from flask import Flask, request, jsonify
from torchvision import models, transforms
from PIL import Image
import torch
import base64
import gzip
import joblib
import pickle
import io

app = Flask(__name__)
###################################### PLANT DISEASE DETECTION PKL  ################################## 
# Load the model
with gzip.open('model.pkl.gz', 'rb') as f:
    model_plant_disease = pickle.load(f)
###################################### PLANT DISEASE DETECTION API  ################################## 
# Define a function to preprocess the base64-encoded image data
def preprocess_image_from_base64(image_data):
    # Decode base64 image
    image_data = base64.b64decode(image_data)
    # Open image using PIL
    image = Image.open(io.BytesIO(image_data))
    # Apply transformations
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])
    image_tensor = transform(image).unsqueeze(0)
    return image_tensor

# Define a function to preprocess the image data from JSON
def preprocess_image(image_file):
    # Open image using PIL
    image = Image.open(image_file)
    # Apply transformations
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])
    image_tensor = transform(image).unsqueeze(0)
    return image_tensor

# Define a function to make predictions
def predict_disease(image_file):
    image_tensor = preprocess_image(image_file)
    model_plant_disease.eval()
    with torch.no_grad():
        outputs = model_plant_disease(image_tensor)
    _, predicted = torch.max(outputs, 1)
    class_names = ['Bacteria', 'Fungi', 'Nematodes', 'Normal', 'Virus']
    predicted_class = class_names[predicted.item()]
    return predicted_class

@app.route('/detect/plantdisease', methods=['POST'])
def predict():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400
        image_file = request.files['image']
        predicted_disease = predict_disease(image_file)
        return jsonify({'predicted_disease': predicted_disease})
    except Exception as e:
        return jsonify({'error': 'An error occurred while processing the request'}), 500

    
###################################### PLANT DISEASE DETECTION API  ##################################  


###################################### FERTILIZER  PREDICTION  jOBLIB  ################################## 
with open('trained_model.joblib','rb') as f1:
    model_fertilizer=joblib.load(f1)

###################################### FERTILIZER  PREDICTION  API  ##################################
@app.route('/predict/fertilizer',methods=['POST'])
def predict_fertilizer():
    data = request.get_json()

    temperature = data['Temperature']
    humidity = data['Humidity']
    moisture = data['Moisture']
    soil_type = data['Soil Type']
    crop_type = data['Crop Type']
    nitrogen = data['Nitrogen']
    potassium = data['Potassium']
    phosphorous = data['Phosphorous']

    encoded_soil_type = encoded_categories['Soil Type'].get(soil_type, None)
    encoded_crop_type = encoded_categories['Crop Type'].get(crop_type, None)

    if encoded_soil_type is None:
        return jsonify({'error': f"'{soil_type}' not found in encoded categories for Soil Type."}), 400
    if encoded_crop_type is None:
        return jsonify({'error': f"'{crop_type}' not found in encoded categories for Crop Type."}), 400

    prediction = model_fertilizer.predict([[temperature, humidity, moisture, encoded_soil_type, encoded_crop_type, nitrogen, potassium, phosphorous]])

    predicted_fertilizer_name = prediction[0]

    return jsonify({'predicted_fertilizer_name': predicted_fertilizer_name})

###################################### FERTILIZER  PREDICTION  API  ##################################

if __name__ == '__main__':
    app.run(debug=True)
