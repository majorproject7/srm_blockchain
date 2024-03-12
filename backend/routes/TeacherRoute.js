
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

         //console.log(response[0].Subjects[0]);
        if(response)
        {
          res.json({subjectlist : response[0].Subjects[0].Subject});
console.log("Subject data Obtained and sent");

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
  console.log('adding faculty data in srms database');

  try{
         //console.log(req.body);
        const response = await Faculty.insertMany({
          name : req.body.name,
          faculty_id : req.body.faculty_id,
          login_pwd : req.body.passwd,
          contact : req.body.contact,
          email : req.body.email,
          dob : req.body.dob,
          department_id : req.body.department_id,
          qualification : req.body.qualification,
          image : req.body.image,
          });
        //console.log("response", response);
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
  
    console.log(error);
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
     const FacultyDataResponse  = await Faculty.find({},{name:1,faculty_id:1});
   
    // Replace with your query criteria if needed
      res.json({FacData : FacultyDataResponse});
      console.log("Faculty Data obtained");
    } catch (err) {
      console.error('Error fetching Faculty details:', err);
      res.status(500).json({ message: 'Error fetching admin details' });
    }
   

});

router.post('/addresult',async (req,res)=> {

  console.log("uplodaing result");
  
  try{
  
    const dateo = new Date(req.body.Result.PublishingDate);
    
    const newResult = {
      AYear : req.body.Result.Ayear,
      Semester :  req.body.Result.Semester,
      SGPA : req.body.Result.SGPA,
      ExamStatus : req.body.Result.ExamStatus,
      PublishingDate :  dateo,
      GradesList : req.body.Result.GradesList,
  }
  //console.log("today date ",dateo);
  const studentRecord = await ResultModel.findOneAndUpdate({ roll_no: req.body.roll_no },{$push : {Result : newResult}},{ new: true });
  if (!studentRecord) {
    
    result = await ResultModel.create({
      roll_no: req.body.roll_no,
      Department_Name:req.body.Department_Name,
      Result: [newResult]
    });
  }


    //console.log(studentRecord);
    res.json({success:true,message:"done"});
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

    
    
  }
  catch(error)
  {
    console.log(error);
     res.json(error);

  }
});

router.post('/removeFaculty',async (req,res)=>
{
    console.log("deleting Faculty details");
   
    try {
     const AdminDelResponse  = await Faculty.deleteMany({faculty_id:req.body.id});
    console.log("Faculty to be deleted ",req.body)
     console.log("deleted response",AdminDelResponse)
    //Replace with your query criteria if needed
    res.json({success : true , AdminData : AdminDelResponse,message : "Faculty Deleted successfully.Please Refresh" });
    
    } catch (err) {
      console.error('Error fetching Faculty details:', err);
      res.status(500).json({ message: 'Error fetching Faculty details' });
    }
   

});


router.post('/getUserForm', async (req, res) => {

  console.log("request came to Faculty Backend for Faculty form ");
    try {
      console.log(req.body.faculty_id);
     // console.log("image data ",req.body.image);
      const response = await Faculty.find({faculty_id:req.body.faculty_id},{image:0,_id:0});
      if (response) {
        console.log("successful");
        console.log(response);
        // Student data added successfully
        res.json({ success: true, message: 'Faculty data fetched successfully!',facdata : response[0] });
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
 
  router.post('/UpdateFaculty', async (req, res) => {

    console.log("request came to Admin  for admin details updation");
      try {
        console.log("new data ",req.body);
       // console.log("image data ",req.body.image);
        const response = await Faculty.updateMany({faculty_id:req.body.faculty_id},{
          $set:{
            name : req.body.name,
            faculty_id : req.body.faculty_id,
            login_pwd : req.body.passwd,
            contact : req.body.contact,
            email : req.body.email,
            dob : req.body.dob,
            department_id : req.body.department_id,
            qualification : req.body.qualification,
            
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


    router.post('/getBranchFaculty', async (req, res) => {

      console.log("request came to Admin  for admin details updation");
        try {
          console.log("new data ",req.body);
         // console.log("image data ",req.body.image);
          const response = await Faculty.find({department_id : req.body.dept},{name : 1,faculty_id : 1, email : 1});
          if (response) {
            console.log("successful");
            console.log(response);
            // Student data added successfully
            res.json({ success: true, message: 'Admin data updated successfully!',facdata : response });
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
  

module.exports = router;
