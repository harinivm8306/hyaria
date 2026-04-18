import kagglehub
import os

path = kagglehub.dataset_download("mgmitesh/plant-disease-detection-dataset")
print("Path to dataset files:", path)

for root, dirs, files in os.walk(path):
    print(f"Directory: {root}")
    print(f"Subdirectories: {dirs}")
    break
