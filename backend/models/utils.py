import pandas as pd
import os
from sklearn.preprocessing import StandardScaler

FEATURE_COLUMNS = ['temperature', 'humidity', 'ph', 'nitrogen', 'phosphorus', 'potassium', 'light_intensity', 'days_planted']

def load_data(csv_path):
    if not os.path.exists(csv_path):
        raise FileNotFoundError(f"Dataset not found at {csv_path}")
    return pd.read_csv(csv_path)

def get_features_and_scaler(df):
    X = df[FEATURE_COLUMNS]
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    return X_scaled, scaler
