const Employee = require('../models/Employee');

const createEmployee = async (req, res) => {
  try {
    console.log("Body:", req.body);
    console.log("File:", req.file);

    const { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } = req.body;

    if (!f_Name || !f_Email || !f_Mobile || !f_Designation || !f_gender || !f_Course) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for duplicate email
    const existing = await Employee.findOne({ f_Email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const employee = new Employee({
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_gender,
      f_Course: Array.isArray(f_Course) ? f_Course : JSON.parse(f_Course),
      f_Image: req.file ? req.file.filename : null,
      f_Createdate: new Date()
    });

    await employee.save();
    res.status(201).json({ message: 'Employee created successfully' });
  } catch (err) {
    console.error("❌ Server Error:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

module.exports = { createEmployee };
