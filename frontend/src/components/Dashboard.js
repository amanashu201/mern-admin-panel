import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Dashboard = ({ onLogout }) => {
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) onLogout();
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? 'orange' : '#2563eb',
    marginRight: '1rem',
    textDecoration: 'none',
    fontWeight: 'bold'
  });

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>
        <span style={{ fontWeight: 'bold', color: 'gold' }}>
          Welcome {username}
        </span>
      </h2>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
        <nav>
          <NavLink to="/Dashboard" style={navLinkStyle}>Home</NavLink>
          <NavLink to="/create-employee" style={navLinkStyle}>Create Employee</NavLink>
          <NavLink to="/employee-list" style={navLinkStyle}>Edit Employee</NavLink>
          <NavLink to="/employee-list" style={navLinkStyle}>Delete Employee</NavLink>
          <NavLink to="/employee-list" style={navLinkStyle}>Employee List</NavLink>
        </nav>
        <span style={{ marginLeft: '2rem', marginRight: '1rem', fontWeight: 'bold', color: 'gold' }}>{username}</span>
        <button onClick={handleLogout} style={{ cursor: 'pointer', fontWeight: 'bold' }}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;