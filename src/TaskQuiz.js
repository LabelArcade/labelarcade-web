import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

function TaskQuiz() {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [numericAnswer, setNumericAnswer] = useState('');
  const [confidence, setConfidence] = useState(null);
  const [startTime, setStartTime] = useState(null);

  const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8080';

  const getAuthToken = () => {
    const token = localStorage.getItem("authToken");
    if (!token) console.warn("JWT Token not found in local storage.");
    return token;
  };

  const fetchTask = useCallback(() => {
    setLoading(true);
    const token = getAuthToken();

    if (!token) {
      setError("Unauthorized: No JWT Token found.");
      setLoading(false);
      return;
    }

    fetch(`${API_BASE}/api/tasks/next`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token}`,
        "x-api-key": "kt6ZgJC-DnuFaGNvsw3xUSk9D1NA9hFm",
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        return res.json();
      })
      .then((json) => {
        const payload = Array.isArray(json) ? json[0] : json;
        setTask(payload);
        setNumericAnswer('');
        setError(null);
        setConfidence(null);
        setStartTime(Date.now());
      })
      .catch((err) => {
        console.error("Fetch Task Error:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [API_BASE]);

  useEffect(() => {
    fetchTask();
  }, [fetchTask]);

  const handleChoice = (choiceKey, taskId) => {
    const token = getAuthToken();
    if (!task?.track_id) return;

    const timeTakenInSeconds = startTime ? Math.floor((Date.now() - startTime) / 1000) : null;
    setSubmitting(true);

    fetch(`${API_BASE}/api/tasks/${task.track_id}/submit`, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${token}`,
        "x-api-key": "kt6ZgJC-DnuFaGNvsw3xUSk9D1NA9hFm",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        answer: choiceKey,
        taskId:task.id,
        timeTakenInSeconds
      })
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        return res.json();
      })
      .then((data) => {
        setConfidence(data.confidence || null);
        setTimeout(fetchTask, 1500);
      })
      .catch((err) => {
        console.error("Submit Failed:", err);
        setError(err.message);
      })
      .finally(() => setSubmitting(false));
  };

  if (loading) {
    return (
      <div className="App">
        <h2>Loading task...</h2>
        <div className="spinner" />
      </div>
    );
  }

  if (error) return <div className="App">❌ Error: {error}</div>;
  if (!task) return <div className="App">🎉 No more tasks!</div>;

  const questionText = task?.task?.text || "No question text";
  const questionType = task?.type;
  const imageUrl = task?.content?.image?.url;
  const choices = task?.task?.choices;

  return (
    <div className="App" style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>LabelArcade Quiz</h1>

      {imageUrl && (
        <img src={imageUrl} alt="Task Visual" style={{ maxWidth: '100%', borderRadius: 8, marginBottom: '1rem' }} />
      )}

      <p><strong>Question:</strong> {questionText}</p>

      {confidence !== null && (() => {
        let color = 'black';
        let emoji = '';
        let message = '';

        if (confidence >= 0.9) {
          color = 'green';
          emoji = '✅';
          message = 'High Confidence';
        } else if (confidence >= 0.5) {
          color = 'orange';
          emoji = '⚠️';
          message = 'Medium Confidence';
        } else {
          color = 'red';
          emoji = '❌';
          message = 'Low Confidence';
        }

        return (
          <p style={{ color, fontWeight: 'bold' }}>
            {emoji} {message} ({confidence.toFixed(2)})
          </p>
        );
      })()}

      {questionType === "mcq" && choices?.map((choice) => (
        <button
          key={choice.key}
          disabled={submitting}
          onClick={() => handleChoice(choice.key, task.id)}
          style={{ display: 'block', margin: '0.5rem 0', padding: '0.5rem 1rem' }}
        >
          {choice.value}
        </button>
      ))}

      {questionType === "numeric" && (
        <div>
          <input
            type="number"
            value={numericAnswer}
            placeholder="Enter your answer"
            onChange={(e) => setNumericAnswer(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleChoice(numericAnswer, task.id);
            }}
            style={{ padding: '0.5rem', marginTop: '1rem' }}
          />
          <br />
          <button
            disabled={submitting || numericAnswer === ''}
            onClick={() => handleChoice(numericAnswer, task.id)}
            style={{ marginTop: '0.5rem', padding: '0.5rem 1rem' }}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default TaskQuiz;
