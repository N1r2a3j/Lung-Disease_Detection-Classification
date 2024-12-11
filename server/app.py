from flask import Flask, request, jsonify
import requests
import os

app = Flask(__name__)

# URL of the Node.js server that serves the TensorFlow.js model
NODE_SERVER_URL = "http://localhost:5001/api/classify"

# Endpoint for image classification
@app.route("/classify", methods=["POST"])
def classify_image():
    if "image" not in request.files:
        return jsonify({"error": "No image file found."}), 400

    image = request.files["image"]
    files = {"image": image.stream}

    # Send the image to the Node.js server for classification
    response = requests.post(NODE_SERVER_URL, files=files)

    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({"error": "Error in classification."}), 500

# Run Flask server
if __name__ == "__main__":
    app.run(debug=True, port=5000)
