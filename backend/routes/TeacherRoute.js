const express = require('express');
const router = express.Router();
const Faculty = require('../models/TeacherModel');

router.post('/login', async(req,res)=>{
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

});

module.exports = router;
