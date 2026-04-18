import os
import tensorflow as tf
from tensorflow.keras import layers, models
import kagglehub

def build_and_train_disease_model():
    print("Fetching dataset...")
    base_path = kagglehub.dataset_download("mgmitesh/plant-disease-detection-dataset")
    train_dir = os.path.join(base_path, "train")
    valid_dir = os.path.join(base_path, "valid")
    
    print(f"Dataset path: {base_path}")
    
    # Parameters
    batch_size = 32
    img_height = 128
    img_width = 128
    epochs = 4 # Kept low for speed for prototype
    
    # Load data using tf.keras.utils.image_dataset_from_directory
    print("Loading training data...")
    train_ds = tf.keras.utils.image_dataset_from_directory(
        train_dir,
        seed=123,
        image_size=(img_height, img_width),
        batch_size=batch_size
    )
    
    print("Loading validation data...")
    val_ds = tf.keras.utils.image_dataset_from_directory(
        valid_dir,
        seed=123,
        image_size=(img_height, img_width),
        batch_size=batch_size
    )
    
    class_names = train_ds.class_names
    print(f"Found classes: {class_names}")
    
    # Cache and prefetch for performance
    AUTOTUNE = tf.data.AUTOTUNE
    train_ds = train_ds.cache().shuffle(1000).prefetch(buffer_size=AUTOTUNE)
    val_ds = val_ds.cache().prefetch(buffer_size=AUTOTUNE)
    
    num_classes = len(class_names)
    
    print("Building model...")
    model = models.Sequential([
        layers.Rescaling(1./255, input_shape=(img_height, img_width, 3)),
        layers.Conv2D(16, 3, padding='same', activation='relu'),
        layers.MaxPooling2D(),
        layers.Conv2D(32, 3, padding='same', activation='relu'),
        layers.MaxPooling2D(),
        layers.Conv2D(64, 3, padding='same', activation='relu'),
        layers.MaxPooling2D(),
        layers.Flatten(),
        layers.Dense(128, activation='relu'),
        layers.Dense(num_classes, activation='softmax')
    ])
    
    model.compile(optimizer='adam',
                  loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=False),
                  metrics=['accuracy'])
    
    print("Starting training...")
    history = model.fit(
        train_ds,
        validation_data=val_ds,
        epochs=epochs
    )
    
    # Save the model and the class names
    save_dir = os.path.join(os.path.dirname(__file__), 'models')
    os.makedirs(save_dir, exist_ok=True)
    
    model_path = os.path.join(save_dir, 'disease_vision_model.keras')
    model.save(model_path)
    
    # Save class names for inference
    import json
    with open(os.path.join(save_dir, 'disease_classes.json'), 'w') as f:
        json.dump(class_names, f)
        
    print(f"Model saved to {model_path}")
    print("Training complete!")

if __name__ == "__main__":
    build_and_train_disease_model()
