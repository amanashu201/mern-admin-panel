import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';



const EditEmployee = () => {
  const { email } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    f_Name: '',
    f_Email: '',
    f_Mobile: '',
    f_Designation: '',
    f_gender: '',
    f_Course: [],
  });
  const [f_Image, setF_Image] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch employee data by email when component mounts
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/employees`);
        // Find employee with matching email (email param may be encoded)
        const emp = res.data.employees.find(e => e.f_Email === decodeURIComponent(email));
        if (!emp) {
          setError('Employee not found');
          setLoading(false);
          return;
        }
        setFormData({
          f_Name: emp.f_Name,
          f_Email: emp.f_Email,
          f_Mobile: emp.f_Mobile,
          f_Designation: emp.f_Designation,
          f_gender: emp.f_gender,
          f_Course: emp.f_Course || [],
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch employee data');
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [email]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'f_Course') {
      // Handle multi-select or checkbox courses
      let updatedCourses = [...formData.f_Course];
      if (checked) {
        updatedCourses.push(value);
      } else {
        updatedCourses = updatedCourses.filter(c => c !== value);
      }
      setFormData(prev => ({ ...prev, f_Course: updatedCourses }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setF_Image(e.target.files[0]);
  };

  // Submit updated employee data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      // Append form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(v => data.append(key, v));
        } else {
          data.append(key, value);
        }
      });

      // Append image file if selected
      if (f_Image) {
        data.append('f_Image', f_Image);
      }

      // PUT request to update employee by email
      await axios.put(`http://localhost:5000/api/employees/${encodeURIComponent(email)}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('Employee updated successfully');
      navigate('/employee-list');
    } catch (err) {
      alert('Failed to update employee');
      console.error(err);
    }
  };

  if (loading) return <p>Loading employee data...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem', background: '#f3f4f6', borderRadius: '8px' }}>
      <h2 style={{ color: '#2563eb', marginBottom: '1rem' }}>Edit Employee</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>Name:</label><br />
        <input
          type="text"
          name="f_Name"
          value={formData.f_Name}
          onChange={handleChange}
          required
        /><br /><br />

        <label>Email (cannot edit):</label><br />
        <input
          type="email"
          name="f_Email"
          value={formData.f_Email}
          readOnly
        /><br /><br />

        <label>Mobile:</label><br />
        <input
          type="text"
          name="f_Mobile"
          value={formData.f_Mobile}
          onChange={handleChange}
          required
        /><br /><br />

        <label>Designation:</label><br />
        <input
          type="text"
          name="f_Designation"
          value={formData.f_Designation}
          onChange={handleChange}
          required
        /><br /><br />

        <label>Gender:</label><br />
        <select name="f_gender" value={formData.f_gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select><br /><br />

       <label>Courses:</label><br />
{['BCA', 'MCA', 'BSc'].map(course => (
  <label key={course} style={{ marginRight: '10px' }}>
    <input
      type="checkbox"
      name="f_Course"
      value={course}
      checked={formData.f_Course.includes(course)}
      onChange={handleChange}
    /> {course}
  </label>
))}<br /><br />

        <label>Profile Image:</label><br />
        <input
          type="file"
          name="f_Image"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
        /><br /><br />

        <button type="submit" style={{
          backgroundColor: '#2563eb',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Update Employee
        </button>
      </form>
    </div>
  );
};

export default EditEmployee;
