const express = require('express');
const router = express.Router();
const StuModel = require('../models/StudentModel');
const ResultModel = require('../models/ResultModel');
const { getresult, AddResult, getAllResult } = require('../../blockchain/Result_Block_Chain.js');
const crypto = require('crypto-js');
const { parse } = require('json2csv');
const fs = require('fs');

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
          message : 'Login Successful. Click Ok to continue.',StudentData : response[0]})
      }
      else
      {
        res.json({
          success:false,
          message : 'Student Data Not Found. Please Check Credentials',
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
    image : req.body.image
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

router.post('/getStudentDetails',async(req,res)=>
{
    console.log("getting student details of a section");
    dep = req.body.dept;
    sec =req.body.section;
    Acadyear= req.body.year;
    console.log(dep+" -- "+Acadyear+"--"+sec);
    try {
      const StudentDataResponse  = await StuModel.find({branch : dep,section:sec,Ayear:Acadyear},{name:1,_id:0,roll_no:1});
    
       console.log(StudentDataResponse);
       res.json({StudentList : StudentDataResponse,});
     } catch (err) {
       console.error('Error fetching Faculty details:', err);
       res.status(500).json({ message: 'Error fetching admin details' });
     }


});



router.post('/BlockchainHash',async (req,res)=>{
   
  console.log("get hash from  Block chain");
  try
  {
     const semesternum = req.body.semnum;
  
  const roll_no = req.body.roll_no;
  console.log(roll_no+"--"+semesternum+"--");
    //const response = await getresult(roll_no,semesternum);
    const response2 = await  getAllResult(roll_no);
    console.log("single sme hash ",response2);

    const csvData = parse()
    //console.log("all results hash ",response2);

    //go through every result and and find the result which is latest
    var resultweneed = "";
      //console.log((response2[0].semester)+"--"+BigInt(semesternum));
      for(let i =0;i< response2.length;i++)
      {     
            if(response2[i].semester === BigInt(semesternum))
            {
              resultweneed = response2[i].resHash;
            }
      }
      //console.log("result ",resultweneed);
      if(resultweneed === "")
      {
        resultweneed = "No Data found on Block chain";
      }
    res.json({success:true,data:resultweneed});
    
  }
  catch(error)
  {
   // console.log(error);
     res.json(error);

  }
});
router.post('/getResultHash',async(req,res)=>
{
    console.log("getting student Result hash");
    
    console.log("roll no-",req.body.roll_no,"-",req.body.semnum);
    try {
      
  
      const sortedResults = await ResultModel.find({Semester : req.body.semnum,roll_no : req.body.roll_no}).sort( {PublishingDate : -1});
    

      
     //console.log("sroted results ",sortedResults);
      const RData = sortedResults[0];
      console.log("RDATA from hash result :",RData);
        var HashData = "";
        const todaydate= new Date(RData.PublishingDate);
     
    //console.log("today ",todaydate.toISOString());
     HashData += RData.roll_no + "--" + todaydate.toISOString() + "--" + RData.Semester + "--";
     HashData += RData.SGPA.toFixed(2)+ "--" + RData.ExamStatus + "--";
     const gradelist = RData.GradesList;
     for (let i = 0;i< gradelist.length ;i++) {
      HashData += gradelist[i].SubjectCode + "-" + gradelist[i].grade + "--";
     }

     console.log("data to be hashed:", HashData);
     const hashval = crypto.SHA256(HashData).toString();
     console.log(hashval);
     res.json({success:true,message:hashval});
      
     } catch (err) {
       console.error('Error fetching Faculty details:', err);
       res.status(500).json({ message: 'Error fetching admin details' });
     }


});

router.post('/getsemlist',async(req,res)=>{

  console.log("getting list of semster");
  try{
     const rollno = req.body.roll_no;

     const response = await ResultModel.find({roll_no : req.body.roll_no,Published : true},{Semester : 1,ResNo:1});
      console.log(response);
     res.json({success:true,data:response});

  }
  catch(error)
  {
    res.json(error);
    console.log(error);
  }
});

router.post('/getResults',async(req,res)=>{

  console.log("getting result for ",req.body.roll_no,"sem",req.body.sem);
  try
  {

    const results = await ResultModel.find({roll_no : req.body.roll_no , Semester : req.body.sem });
   console.log("results grade list ",results)
    res.json({success:true,data : results[0]});

  }
  catch(error)
  {
    console.log("error occured");
    res.json({success:false});
  }
});


router.post('/removeStudent',async (req,res)=>
{
    console.log("deleting Student details");
   
    try {
     const StudentDelResponse  = await StuModel.deleteMany({roll_no:req.body.id});
    console.log("Student to be deleted ",req.body)
     console.log("deleted response",StudentDelResponse)
    //Replace with your query criteria if needed
    res.json({success : true ,message : "Student Deleted successfully.Please Refresh" });
    
    } catch (err) {
      console.error('Error fetching admin details:', err);
      res.status(500).json({ message: 'Error fetching admin details' });
    }
   

});


router.post('/getUserForm', async (req, res) => {

  console.log("request came to Student Backend for Student form ");
    try {
      console.log(req.body.roll_no);
      const response = await StuModel.find({roll_no:req.body.roll_no},{image:0,_id:0});
      if (response) {
        console.log("successful");
        console.log(response);
        // Student data added successfully
        res.json({ success: true, message: 'admin data fetched successfully!',StudentData : response[0] });
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

  router.post('/UpdateStudent', async (req, res) => {

    console.log("request came to Admin  for admin details updation");
      try {
        console.log("new data ",req.body);
       // console.log("image data ",req.body.image);
        const response = await StuModel.updateMany({roll_no:req.body.roll_no},{
          $set:{
            Ayear : req.body.Ayear,
    name : req.body.name,
    email : req.body.email,
    branch : req.body.branch,
    section : req.body.section,
    roll_no: req.body.roll_no,
    dob : req.body.dob,
            
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


module.exports = router;
