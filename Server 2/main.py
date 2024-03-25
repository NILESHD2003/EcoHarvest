from flask import Flask, request, jsonify
from torchvision import models, transforms
from PIL import Image
import torch
import base64
import gzip
import pickle
import io

app = Flask(__name__)
###################################### PLANT DISEASE DETECTION PKL  ################################## 
# Load the model
with gzip.open('model.pkl.gz', 'rb') as f:
    model = pickle.load(f)
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
    model.eval()
    with torch.no_grad():
        outputs = model(image_tensor)
    _, predicted = torch.max(outputs, 1)
    class_names = ['Bacteria', 'Fungi', 'Nematodes', 'Normal', 'Virus']
    predicted_class = class_names[predicted.item()]
    return predicted_class

@app.route('/detect', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    image_file = request.files['image']
    predicted_disease = predict_disease(image_file)
    return jsonify({'predicted_disease': predicted_disease})

###################################### PLANT DISEASE DETECTION API  ##################################   
if __name__ == '__main__':
    app.run(debug=True)
