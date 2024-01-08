const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// Registration route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate data (e.g., check for required fields, email format)

    // Check for existing email
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    // Store password directly (NOT RECOMMENDED!)
    const newStudent = new Student({ name, email, password });
    await newStudent.save();

    res.status(201).json({ message: 'Student registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find student by email
    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Directly compare passwords (NOT RECOMMENDED!)
    if (password === student.password) {
      // Generate authentication token (example using jsonwebtoken)
      const token = jwt.sign({ userId: student._id }, 'your_jwt_secret', { expiresIn: '1h' });
      res.json({ token });
    } else {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;
