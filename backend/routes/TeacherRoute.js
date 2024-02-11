const express = require('express');
const router = express.Router();
const Faculty = require('../models/TeacherModel');

router.post('/login', async(req,res)=>{
  console.log('checking for Teacher in srms database');

  try{
         fac_id = req.body.faculty_id;
         passwd = req.body.fc_pass;
        const response = await Faculty.find({faculty_id : fac_id,
          login_pwd : passwd,
          });
        console.log(response);
        if(response.length > 0)
        {
          res.json({success : true , 
            message : 'Login Successful',facultydata : response[0]})
        }
        else
        {
          res.json({
            success:false,
            message : 'Please check your credentials',
          })
        }
  
  }
  catch(error){
  
    console.log("error occured while logging in");
    res.status(500).json(
      {
        success : false,
        message:' Error occured while authenticate. please contact DB admin'
      }
    )
    }

});


router.post('/addfaculty', async(req,res)=>{
  console.log('checking for student in srms database');

  try{
         
        const response = await Faculty.insertMany({
          name : req.body.name,
          faculty_id : req.body.faculty_id,
          login_pwd : req.body.passwd,
          contact : req.body.contact,
          email : req.body.email,
          dob : req.body.dob,
          department_id : req.body.department_id,
          qualification : req.body.qualification,
          });
        console.log(response);
        if(response)
        {
          res.json({success : true , 
            message : 'Faculty data  added successfully'})
        }
        else
        {
          res.json({
            success:false,
            message : 'failed to add faculty data',
          })
        }
  
  }
  catch(error){
  
    console.log("error occured while logging in");
    res.status(500).json(
      {
        success : false,
        message:' Error occured while adding data. please check the data'
      }
    )
    }

});

router.get('/getFacultyDetails',async (req,res)=>
{
    console.log("geting amdin details");
   
    try {
     const FacultyDataResponse  = await Faculty.find({});
   
    // Replace with your query criteria if needed
      res.json(FacultyDataResponse[0]);
    } catch (err) {
      console.error('Error fetching admin details:', err);
      res.status(500).json({ message: 'Error fetching admin details' });
    }
   

});
module.exports = router;
