const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/authController');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Login route
router.post('/login', loginUser);

// Register route
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'All fields required' });

  const exists = await User.findOne({ email });
  if (exists)
    return res.status(400).json({ message: 'Email already registered' });

  const hashedPwd = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPwd });
  await user.save();
  res.json({ message: 'Registration successful' });
});

module.exports = router; // ✅ REQUIRED
