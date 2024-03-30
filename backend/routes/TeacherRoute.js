const express = require("express");
const router = express.Router();
const Faculty = require("../models/TeacherModel");
const SubjectModel = require("../models/SubjectModel");
const ResultModel = require("../models/ResultModel");
const { AddResult } = require("../../blockchain/Result_Block_Chain.js");

router.post("/login", async (req, res) => {
  console.log("checking for Teacher in srms database");

  try {
    fac_id = req.body.faculty_id;
    passwd = req.body.fc_pass;
    const response = await Faculty.find({
      faculty_id: fac_id,
      login_pwd: passwd,
    });
    console.log("Teacher Details obtained");
    if (response.length > 0) {
      res.json({
        success: true,
        message: "Login Successful",
        facultydata: response[0],
      });
    } else {
      res.json({
        success: false,
        message: "Please check your credentials",
      });
    }
  } catch (error) {
    console.log("error occured while logging in");
    res.status(500).json({
      success: false,
      message: " Error occured while authenticate. please contact DB admin",
    });
  }
});

router.post("/getSubjects", async (req, res) => {
  console.log("getting subjects");
  try {
    const branch = req.body.branch;

    const semesterNum = req.body.semnum;
    const response = await SubjectModel.find(
      { Department: branch, "Subjects.Semester": semesterNum },
      { "Subjects.Subject.$": 1, _id: 0 }
    );

    if (response) {
      res.json({ subjectlist: response[0].Subjects[0].Subject });
      console.log("Subject data Obtained and sent ");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: " Error occured while authenticate. please contact DB admin",
    });
  }
});

router.post("/addfaculty", async (req, res) => {
  console.log("adding faculty data in srms database");

  try {
    const response = await Faculty.insertMany({
      name: req.body.name,
      faculty_id: req.body.faculty_id,
      login_pwd: req.body.passwd,
      contact: req.body.contact,
      email: req.body.email,
      dob: req.body.dob,
      department_id: req.body.department_id,
      qualification: req.body.qualification,
      image: req.body.image,
    });

    if (response) {
      res.json({ success: true, message: "Faculty data  added successfully" });
    } else {
      res.json({
        success: false,
        message: "failed to add faculty data",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: " Error occured while adding data. please check the data",
    });
  }
});

router.get("/getFacultyDetails", async (req, res) => {
  console.log("geting Faculty details");

  try {
    const FacultyDataResponse = await Faculty.find(
      {},
      { name: 1, faculty_id: 1,department_id : 1 }
    );

    res.json({ FacData: FacultyDataResponse });
    console.log("Faculty Data obtained");
  } catch (err) {
    console.error("Error fetching Faculty details:", err);
    res.status(500).json({ message: "Error fetching admin details" });
  }
});

router.post("/addresult", async (req, res) => {
  console.log("uplodaing result");

  try {
    const dateo = new Date(req.body.PublishingDate);

    var Rescount = await ResultModel.countDocuments({
      roll_no: req.body.roll_no,
    });
    Rescount += 1;
    const studentRecord = await ResultModel.insertMany({
      roll_no: req.body.roll_no,
      Department_Name: req.body.Department_Name,
      AYear: req.body.Ayear,
      Semester: req.body.Semester,
      SGPA: req.body.SGPA,
      ExamStatus: req.body.ExamStatus,
      PublishingDate: dateo,
      GradesList: req.body.GradesList,
      Published: req.body.Published,
      Released: false,
      ResNo: Rescount,
    });

    res.json({ success: true, message: "Result Stored in DB Successfully" });
    console.log("Result updated successfully");
  } catch (error) {
    res.json({ success: false, message: "error in DB" });
    console.error("Error updating result:", error);
  }
});

router.post("/secure", async (req, res) => {
  try {
    const semesternum = req.body.semnum;
    const resultHash = req.body.hash;
    const roll_no = req.body.roll_no;
    console.log(roll_no + "--" + semesternum + "--" + resultHash);
    const response = await AddResult(roll_no, semesternum, resultHash);
    console.log("code ", response.code);
    if (response.code !== undefined) {
      res.json({ success: false, message: "Block chain not working Properly" });
    } else {
      res.json({
        success: true,
        message: "Successfully Added Data to Block chain",
      });
    }
    console.log("response from blockchain ", response);
  } catch (error) {
    res.json({
      success: false,
      message: "Error with storing Data on Block chain.",
    });
  }
});

router.post("/removeFaculty", async (req, res) => {
  console.log("deleting Faculty details");

  try {
    const AdminDelResponse = await Faculty.deleteMany({
      faculty_id: req.body.id,
    });
    console.log("Faculty to be deleted ", req.body);
    console.log("deleted response", AdminDelResponse);

    res.json({
      success: true,
      AdminData: AdminDelResponse,
      message: "Faculty Deleted successfully.Please Refresh",
    });
  } catch (err) {
    console.error("Error fetching Faculty details:", err);
    res.status(500).json({ message: "Error fetching Faculty details" });
  }
});

router.post("/getUserForm", async (req, res) => {
  console.log("request came to Faculty Backend for Faculty form ");
  try {
    console.log(req.body.faculty_id);
    const response = await Faculty.find(
      { faculty_id: req.body.faculty_id },
      { image: 0, _id: 0 }
    );
    if (response) {
      console.log("successful");
      console.log(response);
      res.json({
        success: true,
        message: "Faculty data fetched successfully!",
        facdata: response[0],
      });
    } else {
      console.log("Unsuccessful");
      res.json({ success: false, message: "Failed to fetch admin data." });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "An error occurred while adding student data.",
      });
  }
});

router.post("/UpdateFaculty", async (req, res) => {
  console.log("request came to Admin  for admin details updation");
  try {
    console.log("new data ", req.body);
    const response = await Faculty.updateMany(
      { faculty_id: req.body.faculty_id },
      {
        $set: {
          name: req.body.name,
          faculty_id: req.body.faculty_id,
          login_pwd: req.body.passwd,
          contact: req.body.contact,
          email: req.body.email,
          dob: req.body.dob,
          department_id: req.body.department_id,
          qualification: req.body.qualification,
        },
      }
    );
    if (response) {
      console.log("successful");
      console.log(response);
      res.json({
        success: true,
        message: "Admin data updated successfully!",
        admindata: response[0],
      });
    } else {
      console.log("Unsuccessful");
      res.json({ success: false, message: "Failed to fetch admin data." });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "An error occurred while adding student data.",
      });
  }
});

router.post("/getBranchFaculty", async (req, res) => {
  console.log("request came to Admin  for admin details updation");
  try {
    console.log("new data ", req.body);
    const response = await Faculty.find(
      { department_id: req.body.dept },
      { name: 1, faculty_id: 1, email: 1, contact: 1 }
    );
    if (response) {
      console.log("successful");
      console.log(response);
      res.json({
        success: true,
        message: "Admin data updated successfully!",
        facdata: response,
      });
    } else {
      console.log("Unsuccessful");
      res.json({ success: false, message: "Failed to fetch admin data." });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "An error occurred while adding student data.",
      });
  }
});

router.post("/getPreviousResult", async (req, res) => {
  console.log("request came for student repvious result");
  try {
    console.log("data for previous result ", req.body);

    const response = await ResultModel.find(
      { roll_no: req.body.roll_no, Semester: req.body.sem },
      { _id: 0 }
    );
    if (response) {
      console.log("successful");
      console.log(response);

      res.json({
        success: true,
        message: "Admin data updated successfully!",
        ResultData: response,
      });
    } else {
      console.log("Unsuccessful");

      res.json({ success: false, message: "Failed to fetch admin data." });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "An error occurred while adding student data.",
      });
  }
});

module.exports = router;
