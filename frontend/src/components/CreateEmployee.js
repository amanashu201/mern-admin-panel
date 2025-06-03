import React, { useState } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';

const CreateEmployee = () => {
  const [formData, setFormData] = useState({
    f_Name: '',
    f_Email: '',
    f_Mobile: '',
    f_Designation: '',
    f_gender: '',
    f_Course: [],
    f_Image: null,
  });

  const [errors, setErrors] = useState({});
  const designations = ['HR', 'Manager', 'Sales'];
  const courses = ['MCA', 'BCA', 'BSC'];

  const validate = () => {
    const err = {};
    if (!formData.f_Name.trim()) err.f_Name = 'Name is required';
    if (!formData.f_Email) err.f_Email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.f_Email)) err.f_Email = 'Invalid email';
    if (!formData.f_Mobile || isNaN(formData.f_Mobile)) err.f_Mobile = 'Mobile number must be numeric';
    if (!formData.f_Designation) err.f_Designation = 'Designation is required';
    if (!formData.f_gender) err.f_gender = 'Gender is required';
    if (!formData.f_Course.length) err.f_Course = 'Select at least one course';
    if (!formData.f_Image) err.f_Image = 'Image is required';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      const updatedCourses = [...formData.f_Course];
      if (checked) updatedCourses.push(value);
      else updatedCourses.splice(updatedCourses.indexOf(value), 1);
      setFormData({ ...formData, f_Course: updatedCourses });
    } else if (type === 'file') {
      setFormData({ ...formData, f_Image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'f_Course') {
        value.forEach((course) => data.append('f_Course', course));
      } else {
        data.append(key, value);
      }
    });

    try {
      const res = await axios.post('http://localhost:5000/api/employees', data);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <>
      <Dashboard />
      <div style={{
        padding: '2rem',
        maxWidth: '500px',
        margin: '2rem auto',
        background: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
      }}>
        <h2 style={{ color: '#2563eb', textAlign: 'center', marginBottom: '1.5rem' }}>Create Employee</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#2563eb', fontWeight: 'bold' }}>Name:</label>
            <input
              type="text"
              name="f_Name"
              value={formData.f_Name}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            {errors.f_Name && <p style={{ color: 'red', margin: 0 }}>{errors.f_Name}</p>}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#2563eb', fontWeight: 'bold' }}>Email:</label>
            <input
              type="email"
              name="f_Email"
              value={formData.f_Email}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            {errors.f_Email && <p style={{ color: 'red', margin: 0 }}>{errors.f_Email}</p>}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#2563eb', fontWeight: 'bold' }}>Mobile:</label>
            <input
              type="text"
              name="f_Mobile"
              value={formData.f_Mobile}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            {errors.f_Mobile && <p style={{ color: 'red', margin: 0 }}>{errors.f_Mobile}</p>}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#2563eb', fontWeight: 'bold' }}>Designation:</label>
            <select
              name="f_Designation"
              value={formData.f_Designation}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="">Select</option>
              {designations.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            {errors.f_Designation && <p style={{ color: 'red', margin: 0 }}>{errors.f_Designation}</p>}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#2563eb', fontWeight: 'bold' }}>Gender:</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="f_gender"
                  value="Male"
                  checked={formData.f_gender === "Male"}
                  onChange={handleChange}
                /> Male
              </label>
              <label style={{ marginLeft: '1rem' }}>
                <input
                  type="radio"
                  name="f_gender"
                  value="Female"
                  checked={formData.f_gender === "Female"}
                  onChange={handleChange}
                /> Female
              </label>
            </div>
            {errors.f_gender && <p style={{ color: 'red', margin: 0 }}>{errors.f_gender}</p>}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#2563eb', fontWeight: 'bold' }}>Course:</label>
            <div>
              {courses.map((c) => (
                <label key={c} style={{ marginRight: '1rem' }}>
                  <input
                    type="checkbox"
                    name="f_Course"
                    value={c}
                    checked={formData.f_Course.includes(c)}
                    onChange={handleChange}
                  /> {c}
                </label>
              ))}
            </div>
            {errors.f_Course && <p style={{ color: 'red', margin: 0 }}>{errors.f_Course}</p>}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#2563eb', fontWeight: 'bold' }}>Upload Image (JPG/PNG):</label>
            <input
              type="file"
              name="f_Image"
              accept="image/jpeg, image/png"
              onChange={handleChange}
              style={{ display: 'block', marginTop: '0.5rem' }}
            />
            {errors.f_Image && <p style={{ color: 'red', margin: 0 }}>{errors.f_Image}</p>}
          </div>

          <button
            type="submit"
            style={{
              background: '#2563eb',
              color: 'white',
              padding: '10px 24px',
              border: 'none',
              borderRadius: '4px',
              fontWeight: 'bold',
              cursor: 'pointer',
              width: '100%',
              marginTop: '1rem'
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateEmployee;