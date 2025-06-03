const express = require('express');
const router = express.Router();
const multer = require('multer');
const { body } = require('express-validator');
const { createEmployee } = require('../controllers/employeeController');
const Employee = require('../models/Employee');

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
  fileFilter: (req, file, cb) => {
    if (!['image/jpeg', 'image/png'].includes(file.mimetype)) {
      return cb(new Error('Only JPG and PNG files are allowed'), false);
    }
    cb(null, true);
  }
});

// Validation rules
const employeeValidation = [
  body('f_Name').notEmpty().withMessage('Name is required'),
  body('f_Email').isEmail().withMessage('Valid email is required'),
  body('f_Mobile').isNumeric().withMessage('Mobile must be numeric'),
  body('f_Designation').notEmpty().withMessage('Designation is required'),
  body('f_gender').isIn(['Male', 'Female']).withMessage('Gender must be Male or Female'),
  body('f_Course').custom(value => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      throw new Error('Select at least one course');
    }
    return true;
  })
];

// GET all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json({ employees });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Create employee route
router.post('/', upload.single('f_Image'), employeeValidation, createEmployee);

// PUT update employee by email
router.put('/:email', upload.single('f_Image'), async (req, res) => {
  try {
    const email = req.params.email;
    const {
      f_Name,
      f_Mobile,
      f_Designation,
      f_gender,
      f_Course
    } = req.body;

    let courses = f_Course;
    if (typeof courses === 'string') {
      courses = [courses];
    }

    const updatedData = {
      f_Name,
      f_Mobile,
      f_Designation,
      f_gender,
      f_Course: courses,
    };

    if (req.file) {
      updatedData.f_Image = req.file.filename;
    }

    const updatedEmployee = await Employee.findOneAndUpdate(
      { f_Email: email },
      updatedData,
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found with this email' });
    }

    res.json({ message: 'Employee updated successfully', employee: updatedEmployee });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE employee by email
router.delete('/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const employee = await Employee.findOneAndDelete({ f_Email: email });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found with this email' });
    }
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;