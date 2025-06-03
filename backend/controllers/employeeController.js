const { validationResult } = require('express-validator');
const Employee = require('../models/Employee');

const createEmployee = async (req, res) => {
  try {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const {
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_gender,
      f_Course
    } = req.body;

    const f_Image = req.file ? req.file.filename : null;

    // Convert to array if needed
    let courses = f_Course;
    if (typeof courses === 'string') {
      courses = [courses];
    }

    // Check for duplicate email
    const existing = await Employee.findOne({ f_Email });
    if (existing) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newEmployee = new Employee({
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_gender,
      f_Course: courses,
      f_Image,
      f_Createdate: new Date()
    });

    await newEmployee.save();

    res.status(201).json({
      message: 'Employee created successfully',
      employee: newEmployee
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createEmployee
};