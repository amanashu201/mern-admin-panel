import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dashboard from '../components/Dashboard';
<Dashboard/>







const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/employees');
      setEmployees(res.data.employees);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching employees:', err);
      setError('Failed to fetch employee data');
      setLoading(false);
    }
  };

  const handleDelete = async (email) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/employees/${encodeURIComponent(email)}`);
      alert('Employee deleted successfully');
      fetchEmployees(); // refresh list
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete employee');
    }
  };

  const filtered = employees.filter(emp =>
    emp.f_Name.toLowerCase().includes(search.toLowerCase()) ||
    emp.f_Email.toLowerCase().includes(search.toLowerCase())
  );

  const thStyle = {
    padding: '10px',
    borderBottom: '2px solid #2563eb',
    color: '#2563eb',
    fontWeight: 'bold',
    textAlign: 'left'
  };

  const tdStyle = {
    padding: '8px',
    borderBottom: '1px solid #eee'
  };

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '1100px',
      margin: '2rem auto',
      background: '#f9f9f9',
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
    }}>
      <h2 style={{ color: '#2563eb', textAlign: 'center', marginBottom: '1.5rem' }}>Employee List</h2>
      <p style={{ color: '#2563eb', fontWeight: 'bold' }}>Total Count: {filtered.length}</p>

      <input
        type="text"
        placeholder="Enter Search Keyword"
        style={{
          padding: '8px',
          border: '1px solid #2563eb',
          borderRadius: '4px',
          marginBottom: '1rem',
          width: '100%',
          maxWidth: '300px',
          color: '#2563eb'
        }}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p style={{ color: '#2563eb' }}>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white' }}>
          <thead>
            <tr style={{ background: '#e5e7eb' }}>
              <th style={thStyle}>#</th>
              <th style={thStyle}>Image</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Mobile</th>
              <th style={thStyle}>Designation</th>
              <th style={thStyle}>Gender</th>
              <th style={thStyle}>Course</th>
              <th style={thStyle}>Created Date</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((emp, index) => (
              <tr key={emp._id} style={{ borderTop: '1px solid #eee' }}>
                <td style={tdStyle}>{index + 1}</td>
                <td style={tdStyle}>
                  {emp.f_Image && (
                    <img src={`http://localhost:5000/uploads/${emp.f_Image}`} alt="img" width="50" />
                  )}
                </td>
                <td style={tdStyle}>{emp.f_Name}</td>
                <td style={tdStyle}>
                  <a href={`mailto:${emp.f_Email}`} style={{ color: '#2563eb', textDecoration: 'underline' }}>{emp.f_Email}</a>
                </td>
                <td style={tdStyle}>{emp.f_Mobile}</td>
                <td style={tdStyle}>{emp.f_Designation}</td>
                <td style={tdStyle}>{emp.f_gender}</td>
                <td style={tdStyle}>{emp.f_Course?.join(', ')}</td>
                <td style={tdStyle}>{emp.f_Createdate ? new Date(emp.f_Createdate).toLocaleDateString() : 'N/A'}</td>
                <td style={tdStyle}>
                  <button
                    onClick={() => window.location.href = `/edit-employee/${encodeURIComponent(emp.f_Email)}`}
                    style={{ marginRight: '8px', padding: '5px 10px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px' }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(emp.f_Email)}
                    style={{ padding: '5px 10px', background: 'red', color: 'white', border: 'none', borderRadius: '4px' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
