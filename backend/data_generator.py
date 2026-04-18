import pandas as pd
import numpy as np
import os

def generate_hyaria_dataset(num_rows=10000):
    print(f"Generating {num_rows} rows of HY-ARIA synthetic data for Leafy Greens...")
    
    np.random.seed(42)
    
    # Features
    temp = np.random.uniform(15, 35, num_rows)          # 15°C to 35°C
    humidity = np.random.uniform(40, 95, num_rows)      # 40% to 95%
    ph = np.random.uniform(5.0, 7.5, num_rows)          # 5.0 to 7.5
    n = np.random.uniform(50, 200, num_rows)            # Nitrogen
    p = np.random.uniform(30, 120, num_rows)            # Phosphorus
    k = np.random.uniform(40, 160, num_rows)            # Potassium
    light = np.random.uniform(10000, 60000, num_rows)   # Light Intensity (lux)
    days_planted = np.random.uniform(0, 45, num_rows)   # How many days since planting
    
    # Targets
    nutrient_dosing = np.clip(10 - (n/30 + p/20 + k/25) + np.random.normal(0, 0.5, num_rows), 0, 15)
    mist_interval = np.clip(10 - (temp/10) + (humidity/20) + np.random.normal(0, 1, num_rows), 1, 20)
    
    # Growth Prediction (Classification)
    is_optimal = ((ph >= 5.8) & (ph <= 6.5) & (temp >= 18) & (temp <= 28) & (humidity > 60)).astype(int)
    growth_status = np.where(is_optimal == 1, "Optimal", "Stressed")
    
    # Stage prediction
    stages = []
    for d in days_planted:
        if d < 10: stages.append("Seedling")
        elif d < 25: stages.append("Vegetative")
        else: stages.append("Mature")
    
    # Days until harvest (for lettuce, ~35-45 days total)
    harvest_prediction = np.clip(40 - days_planted + np.random.normal(0, 2, num_rows), 0, 45)
    
    df = pd.DataFrame({
        'temperature': temp,
        'humidity': humidity,
        'ph': ph,
        'nitrogen': n,
        'phosphorus': p,
        'potassium': k,
        'light_intensity': light,
        'days_planted': days_planted,
        'nutrient_dose': nutrient_dosing,
        'mist_interval': mist_interval,
        'growth_status': growth_status,
        'stage': stages,
        'days_to_harvest': harvest_prediction
    })
    
    output_path = os.path.join(os.path.dirname(__file__), 'hyaria_dataset.csv')
    df.to_csv(output_path, index=False)
    print(f"Dataset saved to {output_path}")
    return df

if __name__ == "__main__":
    generate_hyaria_dataset()
