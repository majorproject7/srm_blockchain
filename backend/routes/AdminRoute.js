const express = require('express');
const router = express.Router();
const Admin = require('../models/AdminModel');

// Registration route

// Login route
router.post('/login', async (req, res) => {

  console.log("request came to login Backend for admin login");
  try {
    console.log(req.body.admin_id+" "+req.body.passwd);
    const admin = await Admin.find({admin_id : req.body.admin_id,passwd : req.body.passwd});
    console.log("response got  "+admin.length);
    if (admin.length > 0) {
      res.json({ success: true ,message:"login Successful"});
    } else {
      res.json({ success: false, message :" check your credentials" });
    }
  } catch (error) {
    console.error('Error processing login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
  
});


router.post('/add', async (req, res) => {

  console.log("request came to Admin Backend for admin addition");
    try {
     
  
      const response = await Admin.insertMany({
      name : req.body.name,
      email : req.body.email,
      contact : req.body.contact,
      admin_id : req.body.admin_id,
      dob : req.body.dob,
      passwd: req.body.passwd,
      });
      if (response) {
        // Student data added successfully
        res.json({ success: true, message: 'Admin data added successfully!' });
      } else {
        // Failed to add student data
        res.json({ success: false, message: 'Failed to add Admin data.' });
      }
  
    } catch (error) {
    //console.error('Error processing login:', error);
      res.status(500).json({ success: false, message: 'An error occurred while adding student data.' });
   
    }
    
  });

router.get('/getAdminDetails',async (req,res)=>
{
    console.log("geting amdin details");
   
    try {
     const AdminDataResponse  = await Admin.find({});
   
    // Replace with your query criteria if needed
      res.json(AdminDataResponse);
    } catch (err) {
      console.error('Error fetching admin details:', err);
      res.status(500).json({ message: 'Error fetching admin details' });
    }
   

});
module.exports = router;
