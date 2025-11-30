import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    studentName: '',
    rollNo: '',
    semester: '',
    subjects: [{ name: '', mse: '', ese: '' }]
  });
  
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubjectChange = (index, field, value) => {
    const newSubjects = [...formData.subjects];
    newSubjects[index][field] = value;
    setFormData({ ...formData, subjects: newSubjects });
  };

  const addSubject = () => {
    setFormData({
      ...formData,
      subjects: [...formData.subjects, { name: '', mse: '', ese: '' }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:8080/api/results', formData);
      setResult(response.data);
    } catch (error) {
      alert('Error: ' + (error.response?.data?.message || 'Could not connect to backend'));
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container">
      <h1>Semester Marks Management</h1>
      
      <form onSubmit={handleSubmit} className="marks-form">
        <div className="form-group">
          <label>Student Name:</label>
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Roll Number:</label>
          <input
            type="text"
            name="rollNo"
            value={formData.rollNo}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Semester:</label>
          <select
            name="semester"
            value={formData.semester}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Semester</option>
            {[1, 2, 3, 4, 5, 6].map(sem => (
              <option key={sem} value={sem}>Semester {sem}</option>
            ))}
          </select>
        </div>

        <h3>Subject Marks (MSE: 30, ESE: 70)</h3>
        {formData.subjects.map((subject, index) => (
          <div key={index} className="subject-entry">
            <input
              type="text"
              placeholder="Subject Name"
              value={subject.name}
              onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="MSE (0-30)"
              min="0"
              max="30"
              value={subject.mse}
              onChange={(e) => handleSubjectChange(index, 'mse', e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="ESE (0-70)"
              min="0"
              max="70"
              value={subject.ese}
              onChange={(e) => handleSubjectChange(index, 'ese', e.target.value)}
              required
            />
          </div>
        ))}

        <button type="button" onClick={addSubject} className="add-btn">
          + Add Subject
        </button>
        <button type="submit" disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate Result'}
        </button>
      </form>

      {result && (
        <div className="result-card">
          <h2>Result Summary</h2>
          <div className="result-item">
            <strong>Student Name:</strong>
            <span>{result.studentName}</span>
          </div>
          <div className="result-item">
            <strong>Roll Number:</strong>
            <span>{result.rollNo}</span>
          </div>
          <div className="result-item">
            <strong>Semester:</strong>
            <span>Semester {result.semester}</span>
          </div>
          
          {result.subjects.map((subject, index) => (
            <div key={index} className="result-item">
              <strong>{subject.name}:</strong>
              <span className={subject.total >= 40 ? 'pass' : 'fail'}>
                {subject.total}/100 (MSE: {subject.mse}, ESE: {subject.ese})
              </span>
            </div>
          ))}
          
          <div className="result-item">
            <strong>Total Marks:</strong>
            <span>{result.totalMarks}/{result.subjects.length * 100}</span>
          </div>
          <div className="result-item">
            <strong>Percentage:</strong>
            <span>{result.percentage.toFixed(2)}%</span>
          </div>
          
          <div className="grade">
            Grade: {result.grade} - <span className={result.status === 'PASS' ? 'pass' : 'fail'}>
              {result.status}
            </span>
          </div>
          
          <div className="action-buttons">
            <button onClick={handlePrint}>Print Result</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
