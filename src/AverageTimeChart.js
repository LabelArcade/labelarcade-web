import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function AverageTimeChart() {
  const [submissions, setSubmissions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [range, setRange] = useState('all');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE || 'http://localhost:8080'}/api/submissions`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    })
      .then((res) => res.json())
      .then((data) => setSubmissions(data));
  }, []);

  useEffect(() => {
    if (!submissions.length) return;

    const now = new Date();
    let cutoff = 0;
    if (range !== 'all') {
      cutoff = now.setDate(now.getDate() - parseInt(range, 10));
    }

    const grouped = {};
    submissions
      .filter(s => range === 'all' || new Date(s.createdAt).getTime() >= cutoff)
      .forEach(s => {
        const dateKey = new Date(s.createdAt).toISOString().split('T')[0];
        if (!grouped[dateKey]) grouped[dateKey] = [];
        grouped[dateKey].push(s.timeTakenInSeconds);
      });

    const chartData = Object.entries(grouped).map(([date, times]) => ({
      date,
      average: parseFloat((times.reduce((a, b) => a + b, 0) / times.length).toFixed(2))
    }));

    setFilteredData(chartData);
  }, [submissions, range]);

  const exportChart = () => {
    const input = document.getElementById('avg-time-chart');
    html2canvas(input).then((canvas) => {
      const img = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(img, 'PNG', 10, 10, 190, 100);
      pdf.save('average-time-chart.pdf');
    });
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>📊 Average Time Per Submission</h2>
      <select value={range} onChange={(e) => setRange(e.target.value)} style={{ marginBottom: '1rem' }}>
        <option value="all">All Time</option>
        <option value="7">Last 7 Days</option>
        <option value="30">Last 30 Days</option>
      </select>

      <div id="avg-time-chart" style={{ background: '#fff', padding: '1rem' }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={filteredData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis label={{ value: 'Seconds', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Line type="monotone" dataKey="average" stroke="#007BFF" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <button onClick={exportChart} style={{ marginTop: '1rem' }}>Export Chart</button>
    </div>
  );
}

export default AverageTimeChart;
