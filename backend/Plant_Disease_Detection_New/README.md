![image](https://github.com/user-attachments/assets/b8fb80f6-35ca-4f88-8f41-81a2cf9efeb5)


# Plant Disease Classification

This repository contains a machine learning project for classifying plant diseases using images of plant leaves. The project includes a Convolutional Neural Network (CNN) model trained on the PlantVillage dataset and a Streamlit web application for user interaction. The trained model achieves an accuracy of approximately 90% on the validation set.

## Table of Contents

- [Project Overview](#project-overview)
- [Dataset](#dataset)
- [Model Architecture](#model-architecture)
- [Training the Model](#training-the-model)
- [Saving the Model](#saving-the-model)
- [Streamlit Application](#streamlit-application)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The goal of this project is to develop a system that can identify various plant diseases from images of plant leaves. The project involves training a Convolutional Neural Network (CNN) on the PlantVillage dataset and deploying the trained model in a Streamlit web application. Users can upload images of plant leaves through the web app, and the model will predict the disease affecting the plant. The trained model achieves an accuracy of approximately 98% on the validation set.

## Dataset

The dataset used in this project is the PlantVillage dataset, which is publicly available on [Kaggle](https://www.kaggle.com/emmarex/plantdisease). It contains labeled images of healthy and diseased plant leaves from different plant species.

To download the dataset:

1. **Create a Kaggle account**:
   If you don't already have one, create an account on [Kaggle](https://www.kaggle.com/).

2. **Generate API credentials**:
   - Go to your Kaggle account settings.
   - Scroll down to the API section and click on "Create New API Token". This will download a `kaggle.json` file containing your API credentials.

3. **Set up Kaggle API on your local machine**:
   - Move the downloaded `kaggle.json` file to the `~/.kaggle/` directory (create the directory if it doesn't exist).
   - Set file permissions to ensure privacy:
     ```bash
     mkdir -p ~/.kaggle
     mv /path/to/kaggle.json ~/.kaggle/
     chmod 600 ~/.kaggle/kaggle.json
     ```

4. **Download the dataset**:
   Use the Kaggle API to download the dataset:
   ```bash
   kaggle datasets download -d emmarex/plantdisease
   ```

5. **Extract the dataset**:
   Unzip the downloaded dataset:
   ```bash
   unzip plantdisease.zip -d plantvillage
   ```

## Model Architecture

The Convolutional Neural Network (CNN) used in this project has the following structure:

- **Input Layer**: Takes input images of shape (224, 224, 3).
- **Convolutional Layers**: 
  - First Conv layer with 32 filters of size (3x3) and ReLU activation.
  - Batch Normalization and MaxPooling (2x2).
  - Second Conv layer with 64 filters of size (3x3) and ReLU activation.
  - Batch Normalization and MaxPooling (2x2).
  - Third Conv layer with 128 filters of size (3x3) and ReLU activation.
  - Batch Normalization and MaxPooling (2x2).
- **Flatten Layer**: Flattens the output from the convolutional layers to a 1D array.
- **Fully Connected Layers**: 
  - Dense layer with 128 units and ReLU activation.
  - Dropout layer with 20% dropout rate to prevent overfitting.
  - Dense layer with 64 units and ReLU activation.
  - Output Dense layer with 15 units (one for each class) and softmax activation.

This architecture is designed to effectively extract features from images and classify them into one of the 15 plant disease categories.

## Training the Model

The model is trained on the PlantVillage dataset, which is divided into training and validation sets. The images are resized to 224x224 pixels, and data augmentation techniques are applied to improve the model's generalization. The model is compiled with an Adam optimizer and a sparse categorical cross-entropy loss function. Training is conducted over several epochs, with performance evaluated on the validation set.

## Saving the Model

After training, the model is saved in HDF5 format for later use. Additionally, the class names corresponding to the plant diseases are saved using Pickle. These files are necessary for loading the model and making predictions in the Streamlit application.

## Streamlit Application

A Streamlit web application is developed to provide an interactive interface for users. The app allows users to upload an image of a plant leaf, which is then processed and fed into the trained CNN model. The model predicts the disease class, and the result is displayed to the user.

## Usage

To use this project, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/plant-disease-classification.git
   cd plant-disease-classification
   ```

2. **Install the dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Download the dataset** (if not already downloaded):
   Follow the steps in the [Dataset](#dataset) section to download and extract the dataset.

4. **Train the model** (optional if using pre-trained model):
   Run the training script to train the model on the PlantVillage dataset and save the trained model and class names.

5. **Start the Streamlit application**:
   ```bash
   streamlit run app.py
   ```
   This will launch the web application in your default web browser.

6. **Upload an image**:
   Use the web app to upload an image of a plant leaf and get the predicted disease class.

## Dependencies

- Python 3.7+
- TensorFlow
- Keras
- Streamlit
- OpenCV
- Pillow

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug fixes, please open an issue or submit a pull request.
