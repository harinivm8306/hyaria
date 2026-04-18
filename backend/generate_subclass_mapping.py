import os
import json

def generate_subclass_mapping():
    base_path = r"C:\Users\harin\.cache\kagglehub\datasets\mgmitesh\plant-disease-detection-dataset\versions\1\train"
    mapping = {}
    
    if not os.path.exists(base_path):
        print(f"Error: {base_path} not found")
        return

    plants = [d for d in os.listdir(base_path) if os.path.isdir(os.path.join(base_path, d))]
    
    for plant in plants:
        plant_path = os.path.join(base_path, plant)
        diseases = [d for d in os.listdir(plant_path) if os.path.isdir(os.path.join(plant_path, d))]
        mapping[plant] = diseases
        
    output_path = r"c:\Users\harin\Downloads\hyaria\backend\models\disease_subclasses.json"
    with open(output_path, 'w') as f:
        json.dump(mapping, f, indent=4)
    print(f"Mapping saved to {output_path}")

if __name__ == "__main__":
    generate_subclass_mapping()
