import React, { useState,useEffect } from 'react';
import axios from 'axios';

const ImageClassifier = () => {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert('Please upload an image.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('image', image);

    try {
      // Send image to Flask API for classification
      console.log("huiiiiiiiii",formData);
      const response = await axios.post('http://localhost:5001/api/classify', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("huiiiiiiiiiii",response)

      // Assuming the API returns a JSON with a 'probabilities' object
      setPrediction(response.data.probabilities);
    } catch (error) {
      console.error('Error during classification', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col justify-center items-center py-10">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Image Classifier</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center">
            <label className="mb-2 text-xl font-medium text-gray-700">Upload your image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full py-3 px-6 bg-gray-100 text-gray-700 rounded-lg border-2 border-gray-300 cursor-pointer hover:bg-gray-200 focus:outline-none"
            />
            {image && (
              <div className="mt-4">
                <img src={URL.createObjectURL(image)} alt="Preview" className="w-48 h-48 object-cover rounded-lg shadow-lg" />
              </div>
            )}
          </div>

          <button
            type="submit"
            className={`w-full py-3 px-6 rounded-lg text-white font-bold bg-indigo-600 hover:bg-indigo-700 focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Classifying...' : 'Classify Image'}
          </button>
        </form>

        {prediction && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Classification Result</h2>
            <ul className="space-y-3">
              {Object.entries(prediction).map(([key, value]) => (
                <li key={key} className="flex justify-between items-center text-gray-700 text-lg">
                  <span>Class {key}</span>
                  <span className="font-semibold">{Math.round(value * 100)}%</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageClassifier;
