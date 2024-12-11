{
 "cells": [
  {
   "cell_type": "code",
   "execution_count": 2,
   "metadata": {},
   "outputs": [
    {
     "name": "stderr",
     "output_type": "stream",
     "text": [
      "WARNING:absl:Compiled the loaded model, but the compiled metrics have yet to be built. `model.compile_metrics` will be empty until you train or evaluate the model.\n"
     ]
    },
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "Model loaded and compiled successfully.\n",
      " * Serving Flask app '__main__'\n",
      " * Debug mode: on\n"
     ]
    },
    {
     "name": "stderr",
     "output_type": "stream",
     "text": [
      "INFO:werkzeug:\u001b[31m\u001b[1mWARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.\u001b[0m\n",
      " * Running on http://127.0.0.1:5000\n",
      "INFO:werkzeug:\u001b[33mPress CTRL+C to quit\u001b[0m\n",
      "INFO:werkzeug: * Restarting with watchdog (windowsapi)\n"
     ]
    },
    {
     "ename": "SystemExit",
     "evalue": "1",
     "output_type": "error",
     "traceback": [
      "An exception has occurred, use %tb to see the full traceback.\n",
      "\u001b[1;31mSystemExit\u001b[0m\u001b[1;31m:\u001b[0m 1\n"
     ]
    },
    {
     "name": "stderr",
     "output_type": "stream",
     "text": [
      "C:\\Users\\Asus\\AppData\\Local\\Packages\\PythonSoftwareFoundation.Python.3.11_qbz5n2kfra8p0\\LocalCache\\local-packages\\Python311\\site-packages\\IPython\\core\\interactiveshell.py:3585: UserWarning: To exit: use 'exit', 'quit', or Ctrl-D.\n",
      "  warn(\"To exit: use 'exit', 'quit', or Ctrl-D.\", stacklevel=1)\n"
     ]
    }
   ],
   "source": [
    "\n",
    "\n",
    "\n",
    "from flask import Flask, request, render_template, redirect, url_for\n",
    "from tensorflow.keras.models import load_model\n",
    "from tensorflow.keras import optimizers\n",
    "import numpy as np\n",
    "import cv2\n",
    "import os\n",
    "\n",
    "# Load the trained model and recompile it\n",
    "try: \n",
    "    model = load_model(r'C:\\FYP\\chest_disease_prediction_model.h5')\n",
    "    model.compile(loss='categorical_crossentropy', optimizer=optimizers.RMSprop(learning_rate=1e-4), metrics=['accuracy'])\n",
    "    print(\"Model loaded and compiled successfully.\")\n",
    "except Exception as e:\n",
    "    print(f\"Error loading model: {e}\")\n",
    "\n",
    "# Define the app, specifying the templates folder\n",
    "app = Flask(__name__, template_folder=r'C:\\FYP\\templates')\n",
    "\n",
    "# Map the predicted class to a label\n",
    "label_names = {0: 'Covid-19', 1: 'Normal', 2: 'Viral Pneumonia', 3: 'Bacterial Pneumonia'}\n",
    "\n",
    "# Ensure the uploads directory exists\n",
    "if not os.path.exists('uploads'):\n",
    "    os.makedirs('uploads')\n",
    "\n",
    "# Home route that will display the file upload form\n",
    "@app.route('/')\n",
    "def index():\n",
    "    print(\"Template directory:\", app.template_folder)  # Debug print\n",
    "    return render_template('Pic_upload.html')  # Template file in templates folder\n",
    "\n",
    "# Route to handle the uploaded image and make predictions\n",
    "@app.route('/predict', methods=['POST'])\n",
    "def predict():\n",
    "    try:\n",
    "        if 'file' not in request.files:\n",
    "            return redirect(request.url)\n",
    "\n",
    "        file = request.files['file']\n",
    "        if file.filename == '':\n",
    "            return redirect(request.url)\n",
    "\n",
    "        if file:\n",
    "            # Save the uploaded image to a temporary location\n",
    "            img_path = os.path.join('uploads', file.filename)\n",
    "            file.save(img_path)\n",
    "\n",
    "            # Preprocess the image\n",
    "            img = cv2.imread(img_path)\n",
    "            if img is None:\n",
    "                return f\"Error reading image: {img_path}\"  # Debugging error\n",
    "            print(f\"Original image shape: {img.shape}\")\n",
    "            img = cv2.resize(img, (256, 256))\n",
    "            print(f\"Resized image shape: {img.shape}\")\n",
    "            img = img / 255.0  # Normalize image\n",
    "            img = img.reshape(1, 256, 256, 3)  # Reshape for model input\n",
    "\n",
    "            # Make prediction\n",
    "            predictions = model.predict(img)\n",
    "            predicted_class = np.argmax(predictions, axis=1)\n",
    "\n",
    "            # Get predicted label\n",
    "            predicted_label = label_names[predicted_class[0]]\n",
    "\n",
    "            # Return the result to the user\n",
    "            return render_template('result.html', prediction=predicted_label, image_path=img_path)  # Template file in templates folder\n",
    "    except Exception as e:\n",
    "        print(f\"Error during prediction: {e}\")\n",
    "        return \"An error occurred during the prediction process.\"\n",
    "\n",
    "# Run the app\n",
    "if __name__ == '__main__':\n",
    "    app.run(debug=True)"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 3,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      " * Serving Flask app '__main__'\n",
      " * Debug mode: on\n"
     ]
    },
    {
     "name": "stderr",
     "output_type": "stream",
     "text": [
      "INFO:werkzeug:\u001b[31m\u001b[1mWARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.\u001b[0m\n",
      " * Running on http://127.0.0.1:5002\n",
      "INFO:werkzeug:\u001b[33mPress CTRL+C to quit\u001b[0m\n",
      "INFO:werkzeug: * Restarting with watchdog (windowsapi)\n"
     ]
    },
    {
     "ename": "SystemExit",
     "evalue": "1",
     "output_type": "error",
     "traceback": [
      "An exception has occurred, use %tb to see the full traceback.\n",
      "\u001b[1;31mSystemExit\u001b[0m\u001b[1;31m:\u001b[0m 1\n"
     ]
    }
   ],
   "source": [
    "from flask import Flask\n",
    "\n",
    "app = Flask(__name__)\n",
    "\n",
    "@app.route('/')\n",
    "def hello_world():\n",
    "    return 'Hello, World!'\n",
    "\n",
    "if __name__ == '__main__':\n",
    "    try:\n",
    "        app.run(debug=True, port=5002)  # Use port 5002 to avoid conflicts\n",
    "    except Exception as e:\n",
    "        print(f\"Error starting Flask server: {e}\")\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": []
  }
 ],
 "metadata": {
  "kernelspec": {
   "display_name": "Python 3",
   "language": "python",
   "name": "python3"
  },
  "language_info": {
   "codemirror_mode": {
    "name": "ipython",
    "version": 3
   },
   "file_extension": ".py",
   "mimetype": "text/x-python",
   "name": "python",
   "nbconvert_exporter": "python",
   "pygments_lexer": "ipython3",
   "version": "3.11.9"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 2
}
