"use client"

import { useState, useEffect } from 'react';

function GraphDisplay({ folderPath }) {
  const [graphFiles, setGraphFiles] = useState([]);

  useEffect(() => {
    const fetchGraphFiles = async () => {
      // Replace this with actual API calls or file reading logic
      const simulatedGraphFiles = [
        'graph1.png',
        'graph2.png',
        'graph3.png'
      ];
      setGraphFiles(simulatedGraphFiles);
    };

    fetchGraphFiles();
  }, [folderPath]);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Generated Graphs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {graphFiles.map((file, index) => (
          <div key={index} className="border rounded-md overflow-hidden shadow-md">
            <img src={`${folderPath}/${file}`} alt={`Graph ${index + 1}`} className="w-full h-auto" />
            <p className="text-center text-gray-700 mt-2">{file}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FieldForm() {
  const [formData, setFormData] = useState({
    fieldLength: '',
    fieldWidth: '',
    plottingInterval: ''
  });

  useEffect(() => {
    // Check if there's saved data in localStorage and load it
    const savedData = localStorage.getItem('roverConfig');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const jsonData = JSON.stringify(formData, null, 2);
    
    // Save JSON result to localStorage
    localStorage.setItem('roverConfig', jsonData);
    
    // You could display a success message here if needed
    alert('Configuration saved successfully!');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Rover Monitoring Configuration</h1>
      <p className="text-sm text-gray-600 mb-6">Configure the field dimensions and plotting interval for accurate rover monitoring.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Field Length (ft):</label>
          <input
            type="number"
            name="fieldLength"
            value={formData.fieldLength}
            onChange={handleChange}
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700">Field Width (ft):</label>
          <input
            type="number"
            name="fieldWidth"
            value={formData.fieldWidth}
            onChange={handleChange}
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700">Plotting Interval (ft):</label>
          <input
            type="number"
            name="plottingInterval"
            value={formData.plottingInterval}
            onChange={handleChange}
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Enter
        </button>
      </form>
      {showGraphs && <GraphDisplay folderPath="/path/to/generated/graphs" />} 
    </div>
  );
}
