const Login = require('../models/Login');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const loginUser = async (req, res) => {
  const { f_userName, f_Pwd } = req.body;

  if (!f_userName || !f_Pwd) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const user = await Login.findOne({ f_userName });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(f_Pwd, user.f_Pwd);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user._id, username: user.f_userName }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });

    res.json({ message: 'Login successful', token, username: user.f_userName });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }



  
};


module.exports = { loginUser };
