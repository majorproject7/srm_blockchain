import React, { useState, useEffect } from "react";
import axios from "axios";
import crypto from "crypto-js";
import { useLocation } from "react-router-dom";
import Kmithead from "../DashBoard/KmitHeader";
const StudentResultPage = () => {
  const location = useLocation();
  const deptname = location.state.branch;

  const [ResultData,setResultData] = useState(null);

  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [semesterSubjects, setSemesterSubjects] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState([]);
  const [totalCredits, setTotalCredits] = useState(0);
  const [averageGrade, setAverageGrade] = useState(0);
  const [examstatus, setExamStatus] = useState("PASS");
  useEffect(() => {
    const fetchAdmins = async () => {
      if (selectedSection) {
        const reqdata = {
          dept: deptname,
          section: selectedSection,
          year: selectedYear,
        };
        const response = await axios.post(
          "http://localhost:5000/api/StudentRoute/getStudentDetails",
          reqdata
        ); 
        setStudents(response.data.StudentList);
      }
    };

    fetchAdmins();
  }, [selectedSection]);

  useEffect(() => {
    const fetchSemesterSubjects = async () => {
      if (selectedStudent && selectedSemester) {
        const reqdata = {
          branch: deptname,
          semnum: selectedSemester,  
        };
        const response = await axios.post(
          "http://localhost:5000/api/TeacherRoute/getSubjects",
          reqdata
        );
        
        setSemesterSubjects(response.data.subjectlist);
      }
    };
    fetchSemesterSubjects();
  }, [selectedStudent, selectedSemester]);
  
  useEffect(()=>{
      
    if(selectedStudent !== null )
    {
    const getAllResult= async ()=>{
        const Response = await axios.post("http://localhost:5000/api/TeacherRoute/getPreviousResult",{roll_no : selectedStudent,sem : selectedSemester});
        console.log("Result ",Response.data.ResultData);
        if(Response.data.ResultData !== null && Response.data.ResultData.length !== 0)
        {
          console.log("list not empty");
          console.log(Response.data.ResultData[0].SGPA);
        setResultData(Response.data.ResultData);
    }
    else
    {setResultData(null);}
  }
    getAllResult();
  }
  },[selectedStudent]);

  const handleGradePointChange = (subCode, gradePoint) => {
    const updatedFormData = { ...formData, [subCode]: parseInt(gradePoint) };

    setFormData(updatedFormData);
 
    const credits = semesterSubjects.find(
      (subject) => subject.SubCode === subCode
    ).credits;
  
    setTotalCredits((prevTotalCredits) => prevTotalCredits + credits);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setSelectedSemester(null);
    setSelectedSection(null);
    setSelectedStudent(null);
    setStudents([]);
    setFormData({});
    setSemesterSubjects([]);
  };

  const handleSemesterChange = (e) => {
    setSelectedSemester(e.target.value);
    setAverageGrade(0);
    setSelectedSection(null);
    setSelectedStudent(null);
    setStudents([]);
    setFormData({});
    setSemesterSubjects([]);
  };

  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
    setStudents([]);

  };

  const handleStudentChange = (e) => {
    setSelectedStudent(e.target.value);
    setFormData({});
    setAverageGrade(0);
    console.log("Selected student:", e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setExamStatus("PASS");
  
    let weightedSum = 0;
    let totalcreditpoints = 0;
    for (const subCode in formData) {
      const gradePoint = formData[subCode];
      if (gradePoint === 3) {
        console.log("failed");
        setExamStatus("FAIL");
      }
      const credits = semesterSubjects.find(
        (subject) => subject.SubCode === subCode
      ).credits;
      weightedSum += gradePoint * credits;
      totalcreditpoints += 10 * credits;
    }

    console.log("total ", totalcreditpoints);
    const average = weightedSum / totalcreditpoints;
    console.log("average res :", average);
    setAverageGrade(average * 10);
    console.log(formData);
  };
  const getResultHash = async () => {
    console.log("deptname ", deptname);
    var HashData = "";
    const dat = new Date();
    const today = dat.toISOString();
     
    HashData += selectedStudent + "--" + today + "--" + selectedSemester + "--";
    HashData += averageGrade.toFixed(2) + "--" + examstatus + "--";
    const gradelist = [];
    for (var item in formData) {
      HashData += item + "-" + formData[item] + "--";
      gradelist.push({ SubjectCode : item,grade: formData[item]});
    }

    console.log("data to be hashed:", HashData);
    const hashval = crypto.SHA256(HashData).toString();
    console.log(hashval);
    const resultrecord = { 
      roll_no : selectedStudent,
      Department_Name : deptname,
      Ayear : selectedYear,
      Semester : selectedSemester,
      SGPA : averageGrade.toFixed(2),
      ExamStatus : examstatus,
      PublishingDate : today,
      GradesList : gradelist,
      Published : false,
    }
    alert("please confirm the details : "+JSON.stringify(resultrecord, null, 2));
   
    const postdata = {
      roll_no: selectedStudent,
      semnum: selectedSemester,
      hash: hashval,
    };
    
    try{
   const bchain = await axios.post('http://localhost:5000/api/TeacherRoute/secure', postdata)
    alert(bchain.data.message);
   const db  = await axios.post('http://localhost:5000/api/TeacherRoute/addresult', resultrecord);
    alert(db.data.message);
    }
    catch(error){
   
      console.error("An error occurred:", error);
    }

}
 

  return (
    <>
    <Kmithead></Kmithead>
    <div className="h-8 flex justify-center items-center m-1 bg-green-200">
        <h1 className="text-xl font-semibold ">Result Page</h1>
      </div>
    <div className="ml-2 mr-2 flex bg-green-100 justify-center">
      
      <div className="m-2">
        <label htmlFor="year" className="block font-semibold mb-1">
          Select Year:
        </label>
        <select
          id="year"
          className="px-4 py-2 border rounded"
          onChange={handleYearChange}
        >
          <option value="">Select Year</option>
          <option value="4">4</option>
          <option value="3">3</option>
          <option value="2">2</option>
          <option value="1">1</option>
        </select>
      </div>
      <div className="m-2">
      {selectedYear && (
        <div className="mb-4">
          <label htmlFor="semester" className="block font-semibold mb-1">
            Select Semester:
          </label>
          <select
            id="semester"
            className="px-4 py-2 border rounded"
            onChange={handleSemesterChange}
          >
            <option value="">Select Semester</option>
            {selectedYear === "4" && <option value="7">7</option>}
            {selectedYear === "4" && <option value="8">8</option>}
            {selectedYear === "3" && <option value="5">5</option>}
            {selectedYear === "3" && <option value="6">6</option>}
            {selectedYear === "2" && <option value="3">3</option>}
            {selectedYear === "2" && <option value="4">4</option>}
            {selectedYear === "1" && <option value="2">2</option>}
            {selectedYear === "1" && <option value="1">1</option>}
          </select>
        </div>
      )}
      </div>
      <div className="m-2">
      {selectedSemester && (
        <div className="mb-4 ">
          <label htmlFor="section" className="block font-semibold mb-1">
            Select Section:
          </label>
          <select
            id="section"
            className="px-4 py-2 border rounded"
            onChange={handleSectionChange}
          >
            <option value="">Select Section</option>
            <option value="A">A</option>
            <option value="B">B</option>
            {/* Add options for other sections */}
          </select>
        </div>
      )}
      </div>
      <div className="m-2">
      {selectedSection && students.length > 0 && (
        <div className="mb-4">
          <label htmlFor="student" className="block font-semibold mb-1">
            Select Student:
          </label>
          <select
            id="student"
            className="px-4 py-2 border rounded"
            onChange={handleStudentChange}
          >
            <option value="">Select Student</option>
            {students.map((student) => (
              <option key={student.roll_no} value={student.roll_no}>
                {student.roll_no}
              </option>
            ))}
          </select>
        </div>
        
      )}</div>
      </div>
      <div>
      {selectedStudent && selectedSemester && semesterSubjects.length > 0 && (
        <div className="flex flex-row-2 justify-center  ">
          <div className="m-1 bg-amber-100 p-2">
            <h2 className="text-lg font-semibold mb-2">Enter Results:</h2>
            <form
              className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
              onSubmit={handleSubmit}
            >
              {semesterSubjects.map((subject) => (
                <div key={subject.SubCode}>
                  <label
                    htmlFor={subject.SubCode}
                    className="block font-semibold mb-1"
                  >
                    {subject.Name}:
                  </label>
                  <select
                    id={subject.SubCode}
                    className="px-4 py-2 border rounded"
                    onChange={(e) =>
                      handleGradePointChange(subject.SubCode, e.target.value)
                    }
                    value={formData[subject.SubCode] || ""}
                    required
                  >
                    <option value="">Select Grade Point</option>
                    <option value="10">O</option>
                    <option value="9">A+</option>
                    <option value="8">A</option>
                    <option value="7">B+</option>
                    <option value="6">B</option>
                    <option value="5">C</option>
                    <option value="4">D</option>
                    <option value="3">F- Fail</option>
                  </select>
                </div>
              ))}
              <button
                type="submit"
                className="px-4 py-2 bg-amber-300 font-semibold rounded"
              >
                Calculate GPA
              </button>
            </form>
          </div>
          <div className="flex flex-col justify-center items-center bg-amber-100 p-2 m-1">
            <div className=" mx-5  p-2 ">
              {averageGrade !== 0 ? (
                <div className="flex flex-col">
                  <div className="h-10 px-2 rounded-lg bg-green-100 flex justify-center items-center">
                    <p className="font-semibold">
                      SGPA (Grade) : {averageGrade.toFixed(2)}
                    </p>
                  </div>
                  {examstatus === "PASS" && (
                    <div className="h-10 px-2 my-1 rounded-lg bg-green-300 flex justify-center items-center">
                      <p className="font-semibold">
                        Exam Status : {examstatus}
                      </p>
                    </div>
                  )}
                  {examstatus === "FAIL" && (
                    <div className="h-10 px-2 my-1 rounded-lg bg-red-300 flex justify-center items-center">
                      <p className="font-semibold ">
                        Exam Status : {examstatus}
                      </p>
                    </div>
                  )}
                  <div className="flex justify-center ">
                    <div>
                    <button
                      className="bg-blue-300 p-2 rounded-lg"
                      onClick={() => getResultHash("datax")}
                    >
                      
                      <h1>Secure</h1>
                    </button>
                    </div>
                  </div>
                </div>
              ):(<div> <h1> Score will be displayed here</h1></div>)}
            </div>
          </div>
          
        </div>
      )}
      
    </div>
    <div>
         
                    
        <div className="flex flex-col justify-center items-center "> 
        <div><h1 className="text-lg"> Previous Result of Student</h1></div>
{   ResultData !==null && ResultData.length !== 0 ? ( <div className="flex flex-row justify-center m-2"> 
 
  {ResultData.map((result, index) => (
            
           <div className="m-2 bg-amber-100 rounded-md p-1">
            <p className="m-1 p-1 bg-amber-50 text-lg">Semester : {result.Semester}</p>
            <p className="m-1 p-1 bg-amber-50 text-lg">SGPA : {result.SGPA}</p>
            <p className="m-1 p-1 bg-amber-50 text-lg">Status : {result.ExamStatus}</p>
            </div>
            
          
        ))}
</div>):(<div> </div>)

          }</div>            

      </div>
    </>
  );
};

export default StudentResultPage;
