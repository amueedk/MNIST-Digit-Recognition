# MNIST Digit Recognition Web App

## Project Overview
This project is a **Flask-based web application** that allows users to draw a handwritten digit on a web interface, which is then processed by a **Convolutional Neural Network (CNN)** trained on the MNIST dataset to predict the digit with confidence scoring.

## Features
- **Web-based UI** for user-friendly interaction
- **Real-time digit recognition** using deep learning
- **Flask API** for backend processing
- **Confidence score output** for predictions

## Project Structure
```
MNIST-Digit-Recognition/
│-- static/               # Frontend assets (JavaScript, CSS)
│   ├── canvas.js         # Handles drawing functionality
│   ├── styles.css        # Styles for UI
│-- templates/            # HTML templates
│   ├── index.html        # Main webpage
│-- app.py                # Flask backend
│-- CNN_model.ipynb       # Jupyter Notebook for training the model
│-- mnist_cnn_model.h5    # Trained model file
```

## Setup Instructions
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/amueedk/MNIST-Digit-Recognition.git
cd MNIST-Digit-Recognition
```

### 2️⃣ Install Dependencies
```bash
pip install -r requirements.txt
```

### 3️⃣ Run the Flask App
```bash
python app.py
```
The app will be available at `http://127.0.0.1:5000/`.

## 📌 Authors
- **Abdul Mueed Khan (2022013)**
- **Muazzam Shah (2022312)**

