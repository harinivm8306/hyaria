from sklearn.ensemble import RandomForestRegressor
import pickle
import os
from .utils import load_data, get_features_and_scaler

def train_nutrient_model(csv_path):
    df = load_data(csv_path)
    X_scaled, scaler = get_features_and_scaler(df)
    y = df['nutrient_dose']
    
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_scaled, y)
    
    save_path = os.path.join(os.path.dirname(__file__), 'nutrient_model.pkl')
    with open(save_path, 'wb') as f:
        pickle.dump({'model': model, 'scaler': scaler}, f)
    print(f"Nutrient model saved to {save_path}")

if __name__ == "__main__":
    csv_file = os.path.join(os.path.dirname(__file__), '..', 'hyaria_dataset.csv')
    train_nutrient_model(csv_file)
