import requests
import os

url = "http://127.0.0.1:8000/detect-disease"
file_path = r"c:\Users\harin\Downloads\hyaria\myenv\Lib\site-packages\scipy\ndimage\tests\dots.png"

with open(file_path, "rb") as f:
    files = {"file": f}
    try:
        response = requests.post(url, files=files)
        print(f"Status: {response.status_code}")
        print(f"Response: {response.text}")
    except Exception as e:
        print(f"Error: {e}")
