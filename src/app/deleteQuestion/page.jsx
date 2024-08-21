"use client";
import React, { useEffect, useState } from 'react';
import './QuestionsList.css'; // Optional: Create a CSS file for styling

const QuestionsList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

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

  const handleDelete = async (id) => {
    setMessage('Deleting...');

    try {
      const response = await fetch(`http://localhost:5000/question/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setQuestions(questions.filter(question => question._id !== id));
        setMessage('Question deleted successfully!');
      } else {
        setMessage('Failed to delete question. Please try again.');
      }
    } catch (error) {
      console.error("Error deleting question:", error);
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
            <div className="question-details">
              <strong>Course Code:</strong> {question.courseCode} <br />
              <strong>Course Title:</strong> {question.courseTitle} <br />
              <strong>Department:</strong> {question.department} <br />
              <strong>PDF Link:</strong> <a href={question.pdfLink} target="_blank" rel="noopener noreferrer">View PDF</a>
            </div>
            <button className="delete-button" onClick={() => handleDelete(question._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionsList;
