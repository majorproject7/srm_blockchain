const express = require('express');
const router = express.Router();
const Login = require('../models/LoginModel');

// Registration route

// Login route
router.post('/login', async (req, res) => {

  console.log("request came to login Backend for admin login");
  try {
    const { AdminName, passwd } = req.body;

    
    console.log("PassWord  "+passwd+"---"+AdminName);
    const admin = await Login.find({name : "Rakesh" });
    console.log("response got  "+admin.length);
    if (admin) {
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
