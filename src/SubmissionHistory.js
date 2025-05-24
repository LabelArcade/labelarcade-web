import React, { useEffect, useState } from 'react';

function SubmissionHistory() {
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8080';
  const itemsPerPage = 5;

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      setError('No token found. Please log in first.');
      return;
    }

    fetch(`${API_BASE}/api/submissions`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => setSubmissions(data))
      .catch(err => setError(err.toString()));
  }, [API_BASE]); // ✅ Added API_BASE as dependency

  const filteredSubmissions = submissions.filter(s => {
    const created = new Date(s.createdAt);
    const matchesSearch =
      s.taskId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.answer.toLowerCase().includes(searchTerm.toLowerCase());

    const isAfterFrom = fromDate ? created >= new Date(fromDate) : true;
    const isBeforeTo = toDate ? created <= new Date(toDate + 'T23:59:59') : true;

    return matchesSearch && isAfterFrom && isBeforeTo;
  });

  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);
  const paginatedData = filteredSubmissions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const downloadCSV = () => {
    if (filteredSubmissions.length === 0) return;

    const headers = ['Task ID', 'Answer', 'Time Taken (s)', 'Submitted At'];
    const rows = filteredSubmissions.map(s => [
      s.taskId,
      s.answer,
      s.timeTakenInSeconds ?? '',
      new Date(s.createdAt).toLocaleString()
    ]);

    let csvContent = headers.join(',') + '\n';
    rows.forEach(row => {
      csvContent += row.map(item => `"${item}"`).join(',') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'submission_history.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStats = () => {
    if (filteredSubmissions.length === 0) return null;

    const total = filteredSubmissions.length;
    const answerCounts = {};

    filteredSubmissions.forEach(s => {
      const ans = s.answer.toLowerCase();
      answerCounts[ans] = (answerCounts[ans] || 0) + 1;
    });

    const mostCommonAnswer = Object.entries(answerCounts).reduce((a, b) =>
      a[1] > b[1] ? a : b
    )[0];

    return { total, mostCommonAnswer };
  };

  const stats = getStats();

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>🧾 Submission History</h2>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {submissions.length > 0 && (
        <>
          <input
            type="text"
            placeholder="Search by Task ID or Answer"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{
              padding: '0.5rem',
              marginBottom: '1rem',
              width: '100%',
              maxWidth: '400px',
              fontSize: '1rem'
            }}
          />
          <br />
          <label>From: </label>
          <input
            type="date"
            value={fromDate}
            onChange={e => setFromDate(e.target.value)}
            style={{ margin: '0.5rem' }}
          />
          <label>To: </label>
          <input
            type="date"
            value={toDate}
            onChange={e => setToDate(e.target.value)}
            style={{ margin: '0.5rem' }}
          />
          <br />
          <button
            onClick={downloadCSV}
            style={{
              marginTop: '1rem',
              marginBottom: '1rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            ⬇️ Download CSV
          </button>
        </>
      )}

      {stats && (
        <div
          style={{
            background: '#f9f9f9',
            padding: '1rem',
            marginBottom: '1rem',
            borderRadius: '8px',
            maxWidth: '400px'
          }}
        >
          <h4>📊 Stats</h4>
          <p><strong>Total Submissions:</strong> {stats.total}</p>
          <p><strong>Most Common Answer:</strong> {stats.mostCommonAnswer}</p>
        </div>
      )}

      {paginatedData.length === 0 ? (
        <p>No submissions match your filters.</p>
      ) : (
        <>
          <table border="1" cellPadding="8" cellSpacing="0">
            <thead>
              <tr>
                <th>#</th>
                <th>Task ID</th>
                <th>Answer</th>
                <th>⏱ Time Taken (s)</th>
                <th>Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((s, index) => (
                <tr key={s.id}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{s.taskId}</td>
                  <td>{s.answer}</td>
                  <td>{s.timeTakenInSeconds ?? '—'}</td>
                  <td>{new Date(s.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: '1rem' }}>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              style={{ marginRight: '1rem' }}
            >
              ⬅️ Prev
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              style={{ marginLeft: '1rem' }}
            >
              Next ➡️
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default SubmissionHistory;
