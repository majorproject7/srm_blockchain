
const express = require('express');
const router = express.Router();
const Faculty = require('../models/TeacherModel');
const SubjectModel = require('../models/SubjectModel');
const ResultModel = require('../models/ResultModel');
const { getresult, AddResult, getAllResult } = require('C:/GANESH/srms/blockchain/hello.js');

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

router.post('/getSubjects', async(req,res)=>{
  console.log('getting subjects');
  try{
         const branch = req.body.branch;
         
         const semesterNum = req.body.semnum; 
    const response  = await SubjectModel.find(
      { Department: branch,  "Subjects.Semester": semesterNum},
       { "Subjects.Subject.$": 1, _id: 0 });

         console.log(response[0].Subjects[0]);
        if(response)
        {
          res.json({subjectlist : response[0].Subjects[0].Subject});
        }
  }
  catch(error){
  
    console.log(error)
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
    console.log("geting Faculty details");
   
    try {
     const FacultyDataResponse  = await Faculty.find({});
   
    // Replace with your query criteria if needed
      res.json(FacultyDataResponse[0]);
    } catch (err) {
      console.error('Error fetching Faculty details:', err);
      res.status(500).json({ message: 'Error fetching admin details' });
    }
   

});

router.get('/Uploadresult',async (req,res)=> {

  console.log("uplodaing result");
  
  try{
    
    // Find the student's record
    let studentRecord = await ResultModel.findOne({ roll_no: rollNo });

    if (!studentRecord) {
      // If the student's record doesn't exist, create a new one
      studentRecord = new ResultModel({
        roll_no: rollNo,
        Department_ID: newResult.Department_ID,
        Department_Name: newResult.Department_Name,
        Result: []
      });
    }

    // Add or update the new result in the Result array
    // const index = studentRecord.Result.findIndex(result => 
    //   result.AYear === newResult.AYear && result.Semester === newResult.Semester);

    // if (index !== -1) {
    //   // If result for the same year and semester exists, update it
    //   studentRecord.Result[index] = newResult;
    // } else {
      // If not, add the new result
     await studentRecord.Result.push(newResult);
    

    await studentRecord.save();
    
    console.log('Result updated successfully');
  } catch (error) {
    console.error('Error updating result:', error);
  }

});

router.post('/secure',async (req,res)=>{
   
  console.log("inside the secure page in teacher route");
  try
  {
     const semesternum = req.body.semnum;
   const resultHash = req.body.hash;
  const roll_no = req.body.roll_no;
  console.log(roll_no+"--"+semesternum+"--"+resultHash);
    const response = await AddResult(roll_no,semesternum,resultHash);
    res.json({success:true,message:response})

    const stuout = await getAllResult(roll_no);
    console.log(stuout);
  }
  catch(error)
  {
    console.log(error);
     res.json(error);

  }
});
module.exports = router;
