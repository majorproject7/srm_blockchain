const express = require('express');
const router = express.Router();
const StuModel = require('../models/StudentModel')

// Registration route
router.post('/login', async (req,res)=>{
console.log('checking for student in srms database');

try{

      console.log(req.body.rollno);
      console.log(req.body.dob);
      rollno = String(req.body.rollno);
      rollno = rollno.toUpperCase();
      const response = await StuModel.find({roll_no : rollno,
        dob:req.body.dob
});
      console.log(response);
      if(response.length > 0)
      {
        res.json({success : true , 
          message : 'Login Successful'})
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
}
);
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
    roll_no: req.body.roll_no,
    dob : req.body.dob,
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
