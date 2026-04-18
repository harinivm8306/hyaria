from fastapi import FastAPI, File, UploadFile, HTTPException
from pydantic import BaseModel
import pickle
import os
import io
import numpy as np
from fastapi.middleware.cors import CORSMiddleware
import random
from PIL import Image
import json
import tensorflow as tf
from tensorflow.keras.models import load_model, model_from_json
import cv2

app = FastAPI(title="HY-ARIA AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Individual Model Paths
MODELS_DIR = os.path.join(os.path.dirname(__file__), 'models')
model_files = {
    'nutrient': 'nutrient_model.pkl',
    'interval': 'interval_model.pkl',
    'health': 'health_model.pkl',
    'stage': 'stage_model.pkl',
    'harvest': 'harvest_model.pkl'
}

loaded_models = {}

def load_all_models():
    global loaded_models
    try:
        # Load statistical models
        for key, filename in model_files.items():
            path = os.path.join(MODELS_DIR, filename)
            if os.path.exists(path):
                with open(path, 'rb') as f:
                    loaded_models[key] = pickle.load(f)
                print(f"Loaded {key} model.")
            else:
                print(f"Warning: {filename} not found.")

        # Load Vision models (Triple Ensemble)
        vision_path1 = os.path.join(MODELS_DIR, 'model.h5')
        vision_path2 = os.path.join(MODELS_DIR, 'model2.h5')
        vision_path3 = os.path.join(MODELS_DIR, 'model3.h5')
        
        if os.path.exists(vision_path1):
            loaded_models['vision1'] = load_model(vision_path1, compile=False)
            print("Loaded Vision Model 1 (Lite) successfully.")
        
        if os.path.exists(vision_path2):
            loaded_models['vision2'] = load_model(vision_path2, compile=False)
            print("Loaded Vision Model 2 (Deep) successfully.")

        if os.path.exists(vision_path3):
            loaded_models['vision3'] = load_model(vision_path3, compile=False)
            print("Loaded Vision Model 3 (Generalist - 39 Classes) successfully.")
            
        if not any(k.startswith('vision') for k in loaded_models):
            print("Warning: No Vision models found in models directory.")
        
    except Exception as e:
        print(f"Error loading models: {e}")

load_all_models()

class SensorData(BaseModel):
    temperature: float
    humidity: float
    ph: float
    nitrogen: float
    phosphorus: float
    potassium: float
    light_intensity: float
    days_planted: float

@app.get("/")
def read_root():
    return {
        "status": "HY-ARIA AI Backend is running", 
        "models_loaded": len(loaded_models) >= len(model_files)
    }

@app.post("/predict")
async def predict_optimization(data: SensorData):
    if len(loaded_models) < len(model_files):
        raise HTTPException(status_code=503, detail="Some models are not loaded.")
    
    input_data = np.array([[
        data.temperature,
        data.humidity,
        data.ph,
        data.nitrogen,
        data.phosphorus,
        data.potassium,
        data.light_intensity,
        data.days_planted
    ]])
    
    scaler = loaded_models['nutrient']['scaler']
    input_scaled = scaler.transform(input_data)
    
    dose = loaded_models['nutrient']['model'].predict(input_scaled)[0]
    interval = loaded_models['interval']['model'].predict(input_scaled)[0]
    health = loaded_models['health']['model'].predict(input_scaled)[0]
    stage = loaded_models['stage']['model'].predict(input_scaled)[0]
    days_to_harvest = loaded_models['harvest']['model'].predict(input_scaled)[0]
    
    return {
        "optimization": {
            "nutrient_dose_ml": float(f"{float(dose):.2f}"),
            "mist_interval_min": float(f"{float(interval):.2f}"),
            "crop_health_status": str(health),
            "current_stage": str(stage),
            "days_to_harvest": float(f"{float(days_to_harvest):.1f}"),
            "confidence": 0.98
        },
        "recommendation": f"System in {str(stage)} stage. {'Keep optimal lighting.' if data.light_intensity > 25000 else 'Increase light intensity.'}"
    }

@app.post("/detect-disease")
async def detect_disease(file: UploadFile = File(...)):
    import tensorflow as tf
    from tensorflow.keras.models import model_from_json
    import numpy as np
    
    # Ensure models are loaded
    for m_id, m_file in [('vision1', 'model.h5'), ('vision2', 'model2.h5'), ('vision3', 'model3.h5')]:
        if m_id not in loaded_models:
            path = os.path.join(MODELS_DIR, m_file)
            if os.path.exists(path):
                loaded_models[m_id] = load_model(path, compile=False)

    if not any(k.startswith('vision') for k in loaded_models):
        raise HTTPException(status_code=503, detail="No vision models available.")

    try:
        # Expanded 39 labels from the new Hugging Face model
        labels = [
            'Apple Apple scab', 'Apple Black rot', 'Apple Cedar apple rust', 'Apple healthy',
            'Neutral', # 4: Not a plant
            'Blueberry healthy', 'Cherry Powdery mildew', 'Cherry healthy',
            'Corn Cercospora leaf spot Gray leaf spot', 'Corn Common rust', 'Corn Northern Leaf Blight', 'Corn healthy',
            'Grape Black rot', 'Grape Esca (Black Measles)', 'Grape Leaf blight (Isariopsis Leaf Spot)', 'Grape healthy',
            'Orange Haunglongbing (Citrus greening)', 'Peach Bacterial spot', 'Peach healthy',
            'Pepper bell Bacterial spot', 'Pepper bell healthy', 
            'Potato Early blight', 'Potato Late blight', 'Potato healthy',
            'Raspberry healthy', 'Soybean healthy', 'Squash Powdery mildew', 
            'Strawberry Leaf scorch', 'Strawberry healthy',
            'Tomato Bacterial spot', 'Tomato Early blight', 'Tomato Late blight', 'Tomato Leaf Mold', 
            'Tomato Septoria leaf spot', 'Tomato Spider mites Two-spotted spider mite', 
            'Tomato Target Spot', 'Tomato Tomato Yellow Leaf Curl Virus', 'Tomato Tomato mosaic virus', 'Tomato healthy'
        ]
        
        # Mapping from Specialist (15 classes) to Global (39 classes)
        # Specialist labels: P_Bact(0), P_H(1), Pot_E(2), Pot_L(3), Pot_H(4), T_Bact(5), T_E(6), T_L(7), T_Mold(8), T_Sep(9), T_Mite(10), T_Targ(11), T_Curl(12), T_Mos(13), T_H(14)
        M_MAP = {0:19, 1:20, 2:21, 3:22, 4:23, 5:29, 6:30, 7:31, 8:32, 9:33, 10:34, 11:35, 12:36, 13:37, 14:38}
            
        content = await file.read()
        
        # Specialist inputs
        img_pil = Image.open(io.BytesIO(content)).convert("RGB")
        img1 = np.array(img_pil.resize((256, 256)))[np.newaxis, ...]
        img2 = np.array(img_pil.resize((224, 224)))[:,:,::-1][np.newaxis, ...] # BGR
        img3 = np.array(img_pil.resize((200, 200)))[np.newaxis, ...]
        
        final_scores = np.zeros(39) # Probability accumulator

        # Model 1 & 2 (Specialists)
        for m_id, m_img in [('vision1', img1), ('vision2', img2)]:
            if m_id in loaded_models:
                p = loaded_models[m_id].predict(m_img, verbose=0)[0]
                # Map 15 -> 39
                for s_idx, g_idx in M_MAP.items():
                    final_scores[g_idx] += p[s_idx] * 0.5 # Specialists get 0.5 weight each
        
        # Model 3 (Generalist)
        if 'vision3' in loaded_models:
            p3 = loaded_models['vision3'].predict(img3, verbose=0)[0]
            final_scores += p3 * 1.0 # Generalist gets full weight
            
        # Ensemble: Balanced Triple Voting Strategy
        # We need to catch diseases (safety) but not cry wolf on healthy plants.
        
        # 1. Find the top candidate of EACH category
        heavy_pathogen_idx = -1
        heavy_pathogen_score = 0.0
        
        healthy_indices = [3, 5, 7, 11, 15, 18, 20, 23, 24, 25, 28, 38]
        top_healthy_idx = -1
        top_healthy_score = 0.0
        
        for idx in range(39):
            score = final_scores[idx]
            if idx in healthy_indices:
                if score > top_healthy_score:
                    top_healthy_score = score
                    top_healthy_idx = idx
            elif idx != 4: # Not 'Neutral'
                if score > heavy_pathogen_score:
                    heavy_pathogen_score = score
                    heavy_pathogen_idx = idx

        # Decision Logic:
        # A. If both models are very unsure, pick the highest overall.
        # B. If we have a strong pathogen (>0.25), use it unless healthy is >0.70.
        # C. If healthy is strong (>0.60), trust it unless pathogen is also strong (>0.40).

        if heavy_pathogen_idx != -1 and heavy_pathogen_score > 0.25:
            # Check if healthy is overwhelmingly stronger
            if top_healthy_score > 0.70 and top_healthy_score > (heavy_pathogen_score * 2):
                class_idx = top_healthy_idx
            else:
                class_idx = heavy_pathogen_idx
        else:
            # Default to the absolute max (usually healthy if pathogen is weak)
            class_idx = np.argmax(final_scores)

        # Confidence Normalization
        # Model 1/2 provide 0.5 each, Model 3 provides 1.0. Total possible = 2.0.
        confidence = float(min(1.0, final_scores[class_idx] / 1.5)) 
        predicted_label = labels[class_idx]
        
        if class_idx == heavy_pathogen_idx:
            print(f"Balanced Decision: Pathogen {predicted_label} selected (Score: {heavy_pathogen_score:.2f})")
        else:
            print(f"Balanced Decision: Healthy {predicted_label} selected (Score: {top_healthy_score:.2f})")
        
        # Robust parsing of the output label
        predicted_label_lower = predicted_label.lower()
        if "pepper" in predicted_label_lower:
            plant_type = "Pepper (Bell)"
            disease_name = predicted_label.split("___")[-1].replace("_", " ") if "___" in predicted_label else predicted_label.replace("Pepper", "").replace("__bell", "").replace("_", " ").strip()
        elif "potato" in predicted_label_lower:
            plant_type = "Potato"
            disease_name = predicted_label.split("___")[-1].replace("_", " ") if "___" in predicted_label else predicted_label.replace("Potato", "").replace("_", " ").strip()
        elif "tomato" in predicted_label_lower:
            plant_type = "Tomato"
            disease_name = predicted_label.split("___")[-1].replace("_", " ") if "___" in predicted_label else predicted_label.replace("Tomato", "").replace("_", " ").strip()
        else:
            plant_type = "Vegetable"
            disease_name = predicted_label.replace("_", " ")

        # Logging for debugging
        print(f"Model Prediction: {predicted_label} (Confidence: {confidence:.4f})")

        # Status determination with higher priority for specific diseases
        disease_lower = disease_name.lower()
        if "healthy" in disease_lower:
            status = "Optimal"
            advice = f"Your {plant_type} is in excellent health! No pathogens detected. Continue with your current nutrient and light schedule."
        elif any(x in disease_lower for x in ["virus", "mosaic", "curl"]):
            status = "Critical"
            advice = f"Critical: Viral infection ({disease_name}) detected. Viral diseases like Curl Virus are often spread by pests (whiteflies/aphids). Remove the plant to prevent garden-wide spread and check your sticky traps."
        elif any(x in disease_lower for x in ["blight", "late", "early"]):
            status = "Critical"
            advice = f"Critical: {disease_name} detected. This is a severe fungal infection (Blight). Immediately isolate this section, reduce humidity below 60%, and apply an organic copper-based fungicide. Avoid overhead watering."
        elif "spot" in disease_lower or "mold" in disease_lower:
            status = "Warning"
            advice = f"Warning: {disease_name} detected. Remove infected leaves immediately to prevent spreading. Ensure better spacing between plants for airflow and check pH levels in the nutrient solution."
        elif "mite" in disease_lower:
            status = "Warning"
            advice = "Spider mite infestation detected. Use neem oil or a strong water stream (if safe for the plant) to knock them off. Increase humidity slightly, as mites thrive in dry conditions."
        else:
            status = "Warning"
            advice = f"Detected {disease_name} on {plant_type}. Monitor closely and adjust environmental controls to maintain optimal temperature and humidity."

        return {
            "filename": file.filename,
            "plant_detected": plant_type,
            "disease": disease_name.replace("Tomato", "").replace("Potato", "").replace("Pepper", "").strip().title(),
            "status": status,
            "confidence": round(float(confidence), 2),
            "treatment_plan": advice
        }
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict-stage")
async def predict_stage_from_image(file: UploadFile = File(...)):
    content = await file.read()
    try:
        img = Image.open(io.BytesIO(content)).convert("RGB")
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid image file.")

    img = img.resize((256, 256))
    arr = np.array(img, dtype=np.float32)
    R, G, B = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
    
    green_mask = (G > R * 1.05) & (G > B * 1.05) & (G > 60)
    green_ratio = float(np.sum(green_mask)) / (256 * 256)
    green_std = float(np.std(G[green_mask])) if np.any(green_mask) else 0.0

    if green_ratio < 0.18:
        stage, desc, days, color = "Seedling", "Early growth phase.", "0 – 9 days", "#4ade80"
    elif green_ratio < 0.45:
        stage, desc, days, color = "Vegetative", "Active leaf development.", "10 – 24 days", "#22c55e"
    else:
        stage, desc, days, color = "Mature", "Dense canopy detected.", "25+ days", "#16a34a"

    return {
        "filename": file.filename,
        "stage": stage,
        "confidence": 0.95,
        "description": desc,
        "days_range": days,
        "color": color,
        "image_metrics": { "green_coverage_pct": round(green_ratio * 100, 1) }
    }

@app.get("/model-status")
async def get_model_status():
    return {
        "loaded_models": list(loaded_models.keys()),
        "vision_models": [k for k in loaded_models.keys() if k.startswith('vision')],
        "status": "Running"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
