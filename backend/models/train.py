import os
from .nutrient_model import train_nutrient_model
from .interval_model import train_interval_model
from .health_model import train_health_model
from .stage_model import train_stage_model
from .harvest_model import train_harvest_model

def train_all_models(csv_path):
    print("Initializing Multi-Model Training Pipeline for Leafy Greens...")
    train_nutrient_model(csv_path)
    train_interval_model(csv_path)
    train_health_model(csv_path)
    train_stage_model(csv_path)
    train_harvest_model(csv_path)
    print("Full AI Suite trained and modularized.")

if __name__ == "__main__":
    csv_file = os.path.join(os.path.dirname(__file__), '..', 'hyaria_dataset.csv')
    train_all_models(csv_file)
