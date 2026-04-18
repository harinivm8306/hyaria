import streamlit as st
import numpy as np
import cv2
from keras.models import load_model
import pickle
from PIL import Image

# Load the model
model = load_model('plant_disease_model.h5')

# Load the class names
with open('class_names.pkl', 'rb') as f:
    class_names = pickle.load(f)


# Function to preprocess the image
def preprocess_image(image):
    image = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
    image = cv2.resize(image, (224, 224))
    image = image.reshape((1, 224, 224, 3))
    return image


# Function to predict the class of the image
def predict(image):
    processed_image = preprocess_image(image)
    predicted_probabilities = model.predict(processed_image)
    predicted_class = class_names[np.argmax(predicted_probabilities)]
    return predicted_class


# Streamlit app
st.title("Plant Disease Classification")
st.write("Upload an image of a plant leaf to classify its disease.")

uploaded_file = st.file_uploader("Choose an image...", type=["jpg", "jpeg", "png", "webp"])

if uploaded_file is not None:
    image = Image.open(uploaded_file)
    st.image(image, caption='Uploaded Image', use_column_width=True)
    st.write("")
    st.write("Classifying...")

    predicted_class = predict(image)

    st.write(f"Predicted Class: {predicted_class}")
