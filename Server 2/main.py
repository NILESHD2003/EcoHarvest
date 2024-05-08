from flask import Flask, request, jsonify
from torchvision import models, transforms
from PIL import Image
import pandas as pd
from flask_cors import CORS
import json
import torch
import base64
import gzip
import joblib
import pickle
import io

app = Flask(__name__)
CORS(app)
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
def predict_plantdisease():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400
        image_file = request.files['image']
        predicted_disease = predict_disease(image_file)
        return jsonify({'predicted_disease': predicted_disease})
    except Exception as e:
        return jsonify({'error': 'An error occurred while processing the request'}), 500

    
###################################### PLANT DISEASE DETECTION API  ##################################  


###################################### FERTILIZER  PREDICTION  pickle  ################################## 
#Load the trained model
with open('fertilizer_prediction.pkl','rb') as f1:
    model_fertilizer_predict=pickle.load(f1)

###################################### FERTILIZER  PREDICTION  API  ##################################
# Load the encoded categories
with open('encoded_categories.json', 'r') as f_category:
    encoded_categories = json.load(f_category)

@app.route('/predict/fertilizer', methods=['POST'])
def predict_fertilizer():
    data = request.get_json()

    temperature = data['Temperature']
    humidity = data['Humidity']
    moisture = data['Moisture']
    soil_type = data['Soil_Type']
    crop_type = data['Crop_Type']
    nitrogen = data['Nitrogen']
    potassium = data['Potassium']
    phosphorous = data['Phosphorous']

    encoded_soil_type = encoded_categories['Soil Type'].get(soil_type, None)
    encoded_crop_type = encoded_categories['Crop Type'].get(crop_type, None)

    if encoded_soil_type is None:
        return jsonify({'error': f"'{soil_type}' not found in encoded categories for Soil Type."}), 400
    if encoded_crop_type is None:
        return jsonify({'error': f"'{crop_type}' not found in encoded categories for Crop Type."}), 400

    prediction = model_fertilizer_predict.predict([[temperature, humidity, moisture, encoded_soil_type, encoded_crop_type, nitrogen, potassium, phosphorous]])

    predicted_fertilizer_name = prediction[0]

    return jsonify({'predicted_fertilizer_name': predicted_fertilizer_name})



###################################### FERTILIZER  PREDICTION  API  ##################################

###################################### CROP  PREDICTION  pickle  ################################## 
#Load the trained model
with open('crop_prediction.pkl','rb') as f2:
    model_crop_predict=pickle.load(f2)
###################################### CROP  PREDICTION  API  ##################################    
@app.route('/predict/crop', methods=['POST'])
def predict_crop():
    data = request.get_json()
    input_data = pd.DataFrame(data, index=[0])
    prediction = model_crop_predict.predict(input_data)
    response = {'prediction': prediction[0]}

    return jsonify(response)



###################################### CROP  PREDICTION  API  ##################################    


###################################### YIELD  PREDICTION  pickle  ################################## 
with open('yield_predict.pkl', 'rb') as f3:
    model_yield_predict = pickle.load(f3)

###################################### YIELD  PREDICTION  API  ##################################  
@app.route('/predict/yield', methods=['POST'])
def yield_predict():
    try:
        data = request.json
        yield_encoded_values = {
            "crop": {"Arecanut": 0, "Arhar/Tur": 1, "Bajra": 2, "Banana": 3, "Barley": 4, "Black pepper": 5, "Cardamom": 6, "Cashewnut": 7, "Castor seed": 8, "Coconut ": 9, "Coriander": 10, "Cotton(lint)": 11, "Cowpea(Lobia)": 12, "Dry chillies": 13, "Garlic": 14, "Ginger": 15, "Gram": 16, "Groundnut": 17, "Guar seed": 18, "Horse-gram": 19, "Jowar": 20, "Jute": 21, "Khesari": 22, "Linseed": 23, "Maize": 24, "Masoor": 25, "Mesta": 26, "Moong(Green Gram)": 27, "Moth": 28, "Niger seed": 29, "Oilseeds total": 30, "Onion": 31, "Other  Rabi pulses": 32, "Other Cereals": 33, "Other Kharif pulses": 34, "Other Summer Pulses": 35, "Peas & beans (Pulses)": 36, "Potato": 37, "Ragi": 38, "Rapeseed &Mustard": 39, "Rice": 40, "Safflower": 41, "Sannhamp": 42, "Sesamum": 43, "Small millets": 44, "Soyabean": 45, "Sugarcane": 46, "Sunflower": 47, "Sweet potato": 48, "Tapioca": 49, "Tobacco": 50, "Turmeric": 51, "Urad": 52, "Wheat": 53, "other oilseeds": 54},
            "season": {"Autumn": 0, "Kharif": 1, "Rabi": 2, "Summer": 3, "Whole Year": 4, "Winter": 5},
            "state": {"Andhra Pradesh": 0, "Arunachal Pradesh": 1, "Assam": 2, "Bihar": 3, "Chhattisgarh": 4, "Delhi": 5, "Goa": 6, "Gujarat": 7, "Haryana": 8, "Himachal Pradesh": 9, "Jammu and Kashmir": 10, "Jharkhand": 11, "Karnataka": 12, "Kerala": 13, "Madhya Pradesh": 14, "Maharashtra": 15, "Manipur": 16, "Meghalaya": 17, "Mizoram": 18, "Nagaland": 19, "Odisha": 20, "Puducherry": 21, "Punjab": 22, "Sikkim": 23, "Tamil Nadu": 24, "Telangana": 25, "Tripura": 26, "Uttar Pradesh": 27, "Uttarakhand": 28, "West Bengal": 29}
        }
        encoded_data = {}
        for key, value in data.items():
            if key in yield_encoded_values:
                encoded_data[key] = yield_encoded_values[key][value]
            else:
                encoded_data[key] = value
        prediction = model_yield_predict.predict([list(encoded_data.values())])
        return jsonify({'yield_prediction': prediction[0]})
    except Exception as e:
        return jsonify({'error': str(e)})  # Corrected syntax here



###################################### YIELD  PREDICTION  API  ################################## 



if __name__ == '__main__':
    app.run(debug=True)
