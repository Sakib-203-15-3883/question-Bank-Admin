"use client"
import React, { useEffect, useState } from 'react';

const QuestionsList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>All Questions</h1>
      <ul>
        {questions.map((question, index) => (
          <li key={index} style={{ marginBottom: '20px' }}>
            <strong>Course Code:</strong> {question.courseCode} <br />
            <strong>Course Title:</strong> {question.courseTitle} <br />
            <strong>Department:</strong> {question.department} <br />
            <strong>PDF Link:</strong> <a href={question.pdfLink} target="_blank" rel="noopener noreferrer">{question.pdfLink}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionsList;
