import React, { useEffect, useState, useRef } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LabelList
} from 'recharts';
import ExportChart from './ExportChart';

function SubmissionChart() {
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState('default');
  const chartRef = useRef(null); // ✅ using ref instead of id

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    fetch('http://localhost:8080/api/submissions', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(rawData => {
        const filtered = rawData.filter(s => s.timeTakenInSeconds != null);
        const chartData = filtered.map((s, index) => ({
          name: `#${index + 1}`,
          seconds: s.timeTakenInSeconds
        }));
        setData(chartData);
      });
  }, []);

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
    </div>
  );
}

export default SubmissionChart;
