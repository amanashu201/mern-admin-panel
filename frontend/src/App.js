import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import CreateEmployee from './components/CreateEmployee';
import EmployeeList from './pages/EmployeeList';
import EditEmployee from './components/EditEmployee';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login onLogin={setIsAuthenticated} />
            )
          }
        />
        {/* Register Route */}
        <Route path="/register" element={<Register />} />

        {/* Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Other Routes */}
        <Route
          path="/create-employee"
          element={isAuthenticated ? <CreateEmployee /> : <Navigate to="/login" />}
        />
        <Route
          path="/employee-list"
          element={isAuthenticated ? <EmployeeList /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit-employee/:email"
          element={isAuthenticated ? <EditEmployee /> : <Navigate to="/login" />}
        />

        {/* Default Route */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;