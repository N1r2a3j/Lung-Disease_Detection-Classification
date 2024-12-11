
const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const tf = require("@tensorflow/tfjs-node");

const app = express();
const PORT = 5001;

// Set up Multer for file uploads
const upload = multer({ dest: "uploads/" });
const cors=require('cors');

app.use(cors(
    {
        origin: ["https://study-notion-eta.vercel.app","http://localhost:3000","www.studynotion.fun","studynotion.fun","https://studynotion.fun","https://www.studynotion.fun","http://127.0.0.1:3000"],
        credentials: true,
    }
));

// Serve the TensorFlow.js model files
app.use("/model_jsef", express.static(path.join(__dirname, "models/model_jsef")));
// app.use("/model_jsin", express.static(path.join(__dirname, "model_jsin")));
// app.use("/model_jsdl", express.static(path.join(__dirname, "models/model_jsdl")));



// Load the model asynchronously
let model;
(async () => {
  try {
    model = await tf.loadGraphModel(`file://${path.join(__dirname, "model_jsef/model.json")}`);
    // model = await tf.loadLayersModel(`file://${path.join(__dirname, "model_jsef/model.json")}`);


    // models["model1"] = await tf.loadGraphModel(`file://${path.join(__dirname, "models/model_js/model.json")}`);
    // models["model2"] = await tf.loadGraphModel(`file://${path.join(__dirname, "models/model_jsdl/model.json")}`);
    // models["model3"] = await tf.loadGraphModel(`file://${path.join(__dirname, "models/model_jsin/model.json")}`);

    console.log("Model loaded successfully.");
  } catch (err) {
    console.error("Error loading model:", err);
  }
})();

// API to classify an image
app.post("/api/classify", upload.single("image"), async (req, res) => {
  try {
    if (!model) {
      return res.status(500).send("Model is not loaded yet. Try again later.");
    }

    // Ensure image file exists
    if (!req.file) {
      return res.status(400).send("No image file uploaded.");
    }

    // Read and preprocess the uploaded image
    const imagePath = req.file.path;
    console.log("iiiiiiiiiiiiiiii",imagePath)
    const imageBuffer = fs.readFileSync(imagePath);

    // Preprocess the image (resize and normalize)
    const decodedImage = tf.node.decodeImage(imageBuffer, 3);  // Decode the image into a tensor (3 channels: RGB)
    const resizedImage = tf.image.resizeBilinear(decodedImage, [224, 224]); // Resize to 120x120
    const normalizedImage = resizedImage.expandDims(0);  // Normalize pixel values and add batch dimension

    // Perform prediction
    const predictions = model.predict(normalizedImage);
    const probabilities = predictions.dataSync();  // Get prediction results as array

    // Clean up tensors and remove uploaded file
    tf.dispose([decodedImage, resizedImage, normalizedImage, predictions]);
    fs.unlinkSync(imagePath);  // Delete the temporary uploaded image
    console.log({ probabilities })
    // Return the predictions
    res.json({ probabilities });
  } catch (err) {
    console.error("Error during prediction:", err);
    res.status(500).send("Error processing the image.");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});











