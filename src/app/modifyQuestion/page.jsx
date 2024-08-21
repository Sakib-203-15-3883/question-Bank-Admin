"use client";
import React, { useEffect, useState } from 'react';
import './QuestionsList.css'; // Optional: Create a CSS file for styling

const QuestionsList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [editing, setEditing] = useState(null); // Track the question being edited
  const [formData, setFormData] = useState({
    courseCode: '',
    courseTitle: '',
    department: '',
    pdfLink: ''
  });

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost:5000/all-questions');
        const data = await response.json();
        setQuestions(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleEdit = (question) => {
    setEditing(question._id);
    setFormData({
      courseCode: question.courseCode,
      courseTitle: question.courseTitle,
      department: question.department,
      pdfLink: question.pdfLink
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (id) => {
    setMessage('Updating...');

    try {
      const response = await fetch(`http://localhost:5000/question/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedQuestion = await response.json();
        setQuestions(questions.map(q => (q._id === id ? { ...q, ...formData } : q)));
        setEditing(null);
        setMessage('Question updated successfully!');
      } else {
        setMessage('Failed to update question. Please try again.');
      }
    } catch (error) {
      console.error("Error updating question:", error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="questions-container">
      <h1>All Questions</h1>
      {message && <p className="message">{message}</p>}
      <ul>
        {questions.map((question, index) => (
          <li key={index} className="question-item">
            {editing === question._id ? (
              <form onSubmit={(e) => { e.preventDefault(); handleUpdate(question._id); }}>
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
                <button type="submit" className="update-button">Update</button>
                <button onClick={() => setEditing(null)} className="cancel-button">Cancel</button>
              </form>
            ) : (
              <>
                <div className="question-details">
                  <strong>Course Code:</strong> {question.courseCode} <br />
                  <strong>Course Title:</strong> {question.courseTitle} <br />
                  <strong>Department:</strong> {question.department} <br />
                  <strong>PDF Link:</strong> <a href={question.pdfLink} target="_blank" rel="noopener noreferrer">View PDF</a>
                </div>
                <button className="edit-button" onClick={() => handleEdit(question)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionsList;
