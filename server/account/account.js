
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const router = express.Router();
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
require('dotenv').config();

const cors = require('cors');



router.use(cors());



// Define User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otp: { type: String }
});

const User = mongoose.model('User', userSchema);

// Create nodemailer transporter
const transporter = nodemailer.createTransport({
  
  service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
}
});
 
// Generate OTP
function generateRandomSixDigit() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}


// Send OTP via email
 const sendOTP = async (email, otp) => {
  console.log(email);
  console.log(otp);
  console.log(process.env.EMAIL_USER);
  console.log(process.env.EMAIL_PASSWORD);
  const info = await transporter.sendMail({
        from: process.env.EMAIL_USER, // sender address
        to:email, // list of receivers
        subject: "Hello ✔", // Subject line
        subject: 'Email Verification OTP',
        text: `Your OTP for email verification is: ${otp}`
      });
    }



// Registration endpoint
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateRandomSixDigit();

    const result = await User.create({
      email,
      password: hashedPassword,
      username,
      otp
    });

    sendOTP(email, otp);
    const token = jwt.sign({ email: result.email, id: result.id }, process.env.SECRET_KEY);
    return res.status(201).json({ user: result, token: token });

  } catch (error) {
    console.log(error);
    return res.status(500).send("Error registering user");
  }
});








router.post('/verify', async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not registered!' });
    }

    // If OTP verification fails, delete the user
    if (otp !== user.otp) {
      await User.findByIdAndDelete(user._id);
      return res.status(400).json({ message: 'OTP verification failed. User deleted.' });
    }

    if (otp === user.otp) {
      user.verified = true;
      user.otp = undefined; // Remove OTP after verification
      await user.save();
      return res.status(200).json({ message: 'OTP verification successful!' });
    } else {
      return res.status(400).json({ message: 'Invalid OTP!' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});






// Login endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    const token = jwt.sign({ email: existingUser.email, id: existingUser.id }, process.env.SECRET_KEY);
    res.status(201).json({ user: existingUser, token: token });

  } catch (error) {
    console.log(error);
    res.status(500).send("Error registering user");
  }
});

module.exports = router;
