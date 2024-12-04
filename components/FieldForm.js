"use client"

import { useState, useEffect } from 'react';

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
        {/* <div>
          <label className="block text-gray-700">Field Width (ft):</label>
          <input
            type="number"
            name="fieldWidth"
            value={formData.fieldWidth}
            onChange={handleChange}
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div> */}
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
    </div>
  );
}


//For 

// {
//   "name": "server",
//   "version": "1.0.0",
//   "description": "",
//   "main": "server.js",
//   "scripts": {
//     "test": "echo \"Error: no test specified\" && exit 1",
//     "start": "node server.js"
//   },
//   "keywords": [],
//   "author": "",
//   "license": "ISC"
// }