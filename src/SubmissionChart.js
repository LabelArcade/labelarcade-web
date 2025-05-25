import React, { useEffect, useState, useRef } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LabelList
} from 'recharts';
import ExportChart from './ExportChart';

function SubmissionChart() {
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState('default');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const chartRef = useRef(null);

  const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8080';

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.warn("❌ authToken not found.");
      setError("Please log in to view submissions.");
      setLoading(false);
      return;
    }

    fetch(`${API_BASE}/api/submissions`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        return res.json();
      })
      .then(rawData => {
        console.log("✅ Raw Submission Data:", rawData);
        const filtered = rawData.filter(s => s.timeTakenInSeconds != null);
        console.log("✅ Filtered for Chart:", filtered);

        const chartData = filtered.map((s, index) => ({
          name: `#${index + 1}`,
          seconds: s.timeTakenInSeconds
        }));

        setData(chartData);
        setError('');
      })
      .catch(err => {
        console.error("❌ SubmissionChart error:", err);
        setError("Failed to load chart data.");
      })
      .finally(() => setLoading(false));
  }, [API_BASE]);

  const sortedData = [...data];
  if (sortOrder === 'asc') {
    sortedData.sort((a, b) => a.seconds - b.seconds);
  } else if (sortOrder === 'desc') {
    sortedData.sort((a, b) => b.seconds - a.seconds);
  }

  const slowest = [...data]
    .sort((a, b) => b.seconds - a.seconds)
    .slice(0, 3)
    .map(item => item.name);

  const toggleSort = () => {
    setSortOrder(prev =>
      prev === 'default' ? 'desc' : prev === 'desc' ? 'asc' : 'default'
    );
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>⏱️ Time Taken Per Submission (in seconds)</h3>

      <ExportChart chartRef={chartRef} />

      <button onClick={toggleSort} style={{ marginBottom: '1rem' }}>
        🔄 Sort: {sortOrder === 'default' ? 'None' : sortOrder === 'asc' ? 'Fastest First' : 'Slowest First'}
      </button>

      {loading ? (
        <p>Loading chart...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : data.length === 0 ? (
        <p>No submission data available. Submit a few tasks to see the chart.</p>
      ) : (
        <div ref={chartRef} style={{ background: 'white', padding: '1rem' }}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sortedData}>
              <XAxis dataKey="name" />
              <YAxis label={{ value: 'Seconds', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="seconds"
                isAnimationActive={false}
                shape={(props) => {
                  const { x, y, width, height, payload } = props;
                  const color = slowest.includes(payload.name) ? 'tomato' : 'dodgerblue';
                  return <rect x={x} y={y} width={width} height={height} fill={color} />;
                }}
              >
                <LabelList dataKey="seconds" position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default SubmissionChart;
