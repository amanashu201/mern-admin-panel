const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  f_Name: { type: String, required: true },
  f_Email: { type: String, required: true },
  f_Mobile: { type: String, required: true },
  f_Designation: { type: String, required: true },
  f_gender: { type: String, enum: ['Male', 'Female'], required: true },
  f_Course: [{ type: String }]
});

module.exports = mongoose.model('Employee', EmployeeSchema);
