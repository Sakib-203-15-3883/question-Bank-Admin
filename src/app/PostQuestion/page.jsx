"use client";
import React, { useState } from 'react';
import './UploadQuestion.css'; // Import CSS file for styling

const UploadQuestion = () => {
  const [formData, setFormData] = useState({
    courseCode: '',
    courseTitle: '',
    department: '',
    pdfLink: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Uploading...');

    try {
      const response = await fetch('http://localhost:5000/upload-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('Question uploaded successfully!');
        setFormData({
          courseCode: '',
          courseTitle: '',
          department: '',
          pdfLink: ''
        });
      } else {
        setMessage('Failed to upload question. Please try again.');
      }
    } catch (error) {
      console.error("Error uploading question:", error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="upload-container">
      <h1 className="upload-title">Upload New Question for first year</h1>
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label>Course Code:</label>
          <input
            type="text"
            name="courseCode"
            value={formData.courseCode}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Course Title:</label>
          <input
            type="text"
            name="courseTitle"
            value={formData.courseTitle}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Department:</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>PDF Link:</label>
          <input
            type="text"
            name="pdfLink"
            value={formData.pdfLink}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="upload-button">Upload Question</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default UploadQuestion;
