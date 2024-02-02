const express = require('express');
const router = express.Router();
const StuModel = require('../models/student')

// Registration route

// Login route
router.post('/add', async (req, res) => {

console.log("request came to login backend");
  try {
   

    // Find student by email
    //console.log(req.body.roll_no);
    const response = await StuModel.insertMany({year:req.body.year,
    Ayear : req.body.Ayear,
    name : req.body.name,
    email : req.body.email,
    branch : req.body.branch,
    section : req.body.section,
    roll_no: req.body.roll_no
    });
    if (response) {
      // Student data added successfully
      res.json({ success: true, message: 'Student data added successfully!' });
    } else {
      // Failed to add student data
      res.json({ success: false, message: 'Failed to add student data.' });
    }

  } catch (error) {
   console.error('Error processing login:', error);
    res.status(500).json({ success: false, message: 'An error occurred while adding student data.' });
 
  }
  
});

module.exports = router;
