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
    //console.log("admin details ",admin);
    //console.log("response got  "+admin.length);
    if (admin.length > 0) {
      res.json({ success: true ,message:"login Successful",AdminData : admin[0]});
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
      console.log(req.body.name);
     // console.log("image data ",req.body.image);
      const response = await Admin.insertMany({
      name : req.body.name,
      email : req.body.email,
      contact : req.body.contact,
      admin_id : req.body.admin_id,
      dob : req.body.dob,
      passwd: req.body.passwd,
      image: req.body.image,
      });
      if (response) {
        console.log("successful");
        // Student data added successfully
        res.json({ success: true, message: 'Admin data added successfully!' });
      } else {
        console.log("Unsuccessful");
        // Failed to add student data
        res.json({ success: false, message: 'Failed to add Admin data.' });
      }
  
    } catch (error) {
    //console.error('Error processing login:', error);
      res.status(500).json({ success: false, message: 'An error occurred while adding student data.' });
   
    }
    
  });

  router.post('/getUserForm', async (req, res) => {

    console.log("request came to Admin Backend for admin Updation");
      try {
        console.log(req.body.admin_id);
       // console.log("image data ",req.body.image);
        const response = await Admin.find({admin_id:req.body.admin_id},{image:0,_id:0});
        if (response) {
          console.log("successful");
          console.log(response);
          // Student data added successfully
          res.json({ success: true, message: 'Admin data fetched successfully!',admindata : response[0] });
        } else {
          console.log("Unsuccessful");
          // Failed to add student data
          res.json({ success: false, message: 'Failed to fetch admin data.' });
        }
    
      } catch (error) {
      //console.error('Error processing login:', error);
        res.status(500).json({ success: false, message: 'An error occurred while adding student data.' });
     
      }
      
    });
  
    router.post('/UpdateAdmin', async (req, res) => {

      console.log("request came to Admin  for admin details updation");
        try {
          console.log("new data ",req.body);
         // console.log("image data ",req.body.image);
          const response = await Admin.updateMany({admin_id:req.body.admin_id},{
            $set:{
              name : req.body.name,
      email : req.body.email,
      contact : req.body.contact,
      admin_id : req.body.admin_id,
      dob : req.body.dob,
      passwd: req.body.passwd,
            }
          });
          if (response) {
            console.log("successful");
            console.log(response);
            // Student data added successfully
            res.json({ success: true, message: 'Admin data updated successfully!',admindata : response[0] });
          } else {
            console.log("Unsuccessful");
            // Failed to add student data
            res.json({ success: false, message: 'Failed to fetch admin data.' });
          }
      
        } catch (error) {
        //console.error('Error processing login:', error);
          res.status(500).json({ success: false, message: 'An error occurred while adding student data.' });
       
        }
        
      });

  router.get('/getAdminDetailsForUpdate',async (req,res)=>
  {
      console.log("geting update admin details");
      
      try {
        
       const AdminDataResponse  = await Admin.find({},{image:0,_id:0});
       console.log("requested admin ",AdminDataResponse);
        
        res.json({AdminData : AdminDataResponse});
      } catch (err) {
        console.error('Error fetching admin details:', err);
        res.json({ message: 'Error fetching admin details' });
      }
     
  
  });
router.get('/getAllAdmin',async (req,res)=>
{
    console.log("geting admin details");
   
    try {
     const AdminDataResponse  = await Admin.find({});
      //console.log("admin list ",AdminDataResponse);
      console.log("fetched admin details");
      res.json({success : true , AdminData : AdminDataResponse,message : "Admin details retrieved successfully." });
    } catch (err) {
      console.error('Error fetching admin details:', err);
      res.status(500).json({ message: 'Error fetching admin details' });
    }
   

});
router.get('/getAdminListForRemoval',async (req,res)=>
{
    console.log("geting admin details");
   
    try {
     const AdminDataResponse = await Admin.find({},{name:1,admin_id:1});
      //console.log("admin list ",AdminDataResponse);
      console.log("fetched admin details");
      console.log("list of admin ",AdminDataResponse);
      res.json({success : true , AdminData : AdminDataResponse,message : "Admin details retrieved successfully." });
    } catch (err) {
      console.error('Error fetching admin details:', err);
      res.status(500).json({ message: 'Error fetching admin details' });
    }
   

});
router.post('/removeAdmin',async (req,res)=>
{
    console.log("deleting admin details");
   
    try {
     const AdminDelResponse  = await Admin.deleteMany({admin_id:req.body.id});
    console.log("admin to be deleted ",req.body)
     console.log("deleted response",AdminDelResponse)
    //Replace with your query criteria if needed
    res.json({success : true , AdminData : AdminDelResponse,message : "Admin Deleted successfully.Please Refresh" });
    
    } catch (err) {
      console.error('Error fetching admin details:', err);
      res.status(500).json({ message: 'Error fetching admin details' });
    }
   

});
module.exports = router;
