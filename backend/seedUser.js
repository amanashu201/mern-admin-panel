const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Login = require('./models/Login'); // Make sure path is correct
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const hashedPwd = await bcrypt.hash('admin123', 10);
    await Login.create({ f_userName: 'admin', f_Pwd: hashedPwd });
    console.log('✅ Test user created!');
    process.exit();
  })
  .catch(err => console.error('❌ Error:', err));
