const express = require('express');
const router = express.Router();
const LoginModel = require('../models/Login');

// Registration route

// Login route
router.post('/login', async (req, res) => {

  console.log("request came to login pbackend");
  try {
    const { rollno, dob } = req.body;

    // Find student by email
    console.log("rollno "+rollno);
    const student = await LoginModel.findOne({name : "rakesh"});
    console.log("response got ");
    if (student) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error('Error processing login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
  
});

module.exports = router;
