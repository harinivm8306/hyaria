
---

# Plant Disease Classification with TensorFlow

## Overview

This project involves building a Convolutional Neural Network (CNN) for classifying plant diseases using TensorFlow and Keras. The dataset used is the Plant Village dataset, which contains images of various plant diseases.

## Dataset

The dataset is sourced from Kaggle and can be found [here](https://www.kaggle.com/datasets/arjuntejaswi/plant-village). It is named "Plant Village" and contains images categorized into 15 different classes of plant diseases.

## Dataset Details

- **Number of Images:** 20,638
- **Number of Classes:** 15
- **Image Size:** 256x256 pixels

## Model Architecture

The model is a Sequential CNN with the following layers:
1. **Resizing and Rescaling:** Images are resized to 256x256 pixels and rescaled.
2. **Convolutional Layers:** Multiple Conv2D layers with 32, 64 filters, and ReLU activation.
3. **Pooling Layers:** MaxPooling2D layers to reduce spatial dimensions.
4. **Flatten Layer:** Flatten the output from the convolutional layers.
5. **Dense Layers:** Fully connected layers for classification.

## Training Details

- **Optimizer:** Adam
- **Loss Function:** SparseCategoricalCrossentropy
- **Metrics:** Accuracy
- **Number of Epochs:** 15

## Data Augmentation

The training data is augmented using:
- Random horizontal and vertical flips
- Random rotation (0.2 radians)

## Data Splits

The dataset is divided into:
- **Training Set:** 80%
- **Validation Set:** 10%
- **Test Set:** 10%

## Results

- **Validation Accuracy:** 95.46%
- **Test Accuracy:** 94.71%

## Evaluation

Training and validation loss and accuracy were monitored throughout the training process. The final model was evaluated on the test set, achieving high accuracy.

## Inference

To predict the class of a new image, the model performs the following:
1. Preprocess the input image.
2. Run the image through the model.
3. Output the predicted class and confidence level.

## Visualization

The training and validation metrics are visualized using Matplotlib. Images from the test set along with their predictions are also displayed to show model performance.

---
