const express = require('express');
const router = express.Router();
const StuModel = require('../models/StudentModel');
const ResultModel = require('../models/ResultModel');
const { getresult, AddResult, getAllResult } = require('C:/GANESH/srms/blockchain/hello.js');
const crypto = require('crypto-js');
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
       res.json(StudentDataResponse);
     } catch (err) {
       console.error('Error fetching Faculty details:', err);
       res.status(500).json({ message: 'Error fetching admin details' });
     }


});



router.post('/simple',async (req,res)=>{
   
  console.log("get hash from  Block chain");
  try
  {
     const semesternum = req.body.semnum;
  
  const roll_no = req.body.roll_no;
  console.log(roll_no+"--"+semesternum+"--");
    //const response = await getresult(roll_no,semesternum);
    const response2 = await getAllResult(roll_no);
   //console.log("single sme hash ",response);
    console.log("all results hash ",response2);

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

   // console.log(response);
    
  }
  catch(error)
  {
    console.log(error);
     res.json(error);

  }
});
router.post('/getResultHash',async(req,res)=>
{
    console.log("getting student Result hash");
    
    console.log("roll no-",req.body.roll_no,"-",req.body.semnum);
    try {
      const aggregationPipeline = [
        { $match: { roll_no:req.body.roll_no, 'Result.Semester': req.body.semnum } },
        { $unwind: '$Result' },
        { $match: { 'Result.Semester': req.body.semnum } },
        { $sort: { 'Result.PublishingDate': -1 } },
        {
          $group: {
            _id: '$_id',
            roll_no: { $first: '$roll_no' },
            Department_Name: { $first: '$Department_Name' },
            Result: { $push: '$Result' }
          }
        }
      ];
  
      const sortedResults = await ResultModel.aggregate(aggregationPipeline);
     //console.log("sroted results ",sortedResults);
      const RData = sortedResults[0];
     // console.log("RDATA from hash result :",RData);
        var HashData = "";
        const todaydate= new Date(RData.Result[0].PublishingDate);
     
    //console.log("today ",todaydate.toISOString());
     HashData += RData.roll_no + "--" + todaydate.toISOString() + "--" + RData.Result[0].Semester + "--";
     HashData += RData.Result[0].SGPA.toFixed(2)+ "--" + RData.Result[0].ExamStatus + "--";
     const gradelist = RData.Result[0].GradesList;
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

     const response = await ResultModel.distinct("Result.Semester",{roll_no:rollno},{"Result.Semester":1});
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

    const results = await ResultModel.aggregate([
      { $match: { roll_no: req.body.roll_no, "Result.Semester": req.body.sem} },
      { $unwind: "$Result" },
      { $match: { "Result.Semester": req.body.sem } },
      { $group: {
          _id: { roll_no: "$roll_no", Semester: "$Result.Semester" },
          lastResult: { $last: "$Result" }
      } },
      { $project: {
          _id: 0,
          GradesList: "$lastResult.GradesList",
          SGPA: "$lastResult.SGPA",
          ExamStatus :"$lastResult.ExamStatus",
      } }
    ]);
   // console.log("results grade list ",results)
    res.json({success:true,data : results[0]});

  }
  catch(error)
  {
    console.log("error occured");
    res.json({success:false});
  }
});
module.exports = router;
