import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentResultPage = () => {
  
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [semesterSubjects, setSemesterSubjects] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({});
  useEffect(() => {
   
    const fetchAdmins = async () => {
      if (selectedSection){
        const reqdata = {
          dept : 'CSM',
          section : selectedSection,
          year: selectedYear};
      const response = await  axios.post('http://localhost:5000/api/StudentRoute/getStudentDetails',reqdata);// Replace with your API call
      setStudents(response.data);
      }
    };

    fetchAdmins();
  },[selectedSection] );

  useEffect(() => {
    const fetchSemesterSubjects = async () => {
      if (selectedStudent && selectedSemester) {
        const reqdata = {
          branch : 'CSM',
          semnum: selectedSemester // You may need to adjust this depending on how your API expects the request
        };
        const response = await axios.post('http://localhost:5000/api/TeacherRoute/getSubjects', reqdata);
        console.log(response.data.subjectlist);
        setSemesterSubjects(response.data.subjectlist);
      }
    };
    fetchSemesterSubjects();
  }, [selectedStudent, selectedSemester]);




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
    
  };

  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
   
   
  };

  const handleStudentChange = (e) => {
    setSelectedStudent(e.target.value);
    setFormData({});
    console.log('Selected student:', e.target.value);
  };
  const handleGradePointChange = (subjectId, gradePoint) => {
    setFormData(prevState => ({
      ...prevState,
      [subjectId]: gradePoint
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form submission
    console.log(formData);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Teacher Page</h1>
      <div className="mb-4">
        <label htmlFor="year" className="block font-semibold mb-1">Select Year:</label>
        <select id="year" className="px-4 py-2 border rounded" onChange={handleYearChange}>
          <option value="">Select Year</option>
          <option value="4">4</option>
          <option value="3">3</option>
          <option value="2">2</option>
          <option value="1">1</option>
        </select>
      </div>
      {selectedYear && (
        <div className="mb-4">
          <label htmlFor="semester" className="block font-semibold mb-1">Select Semester:</label>
          <select id="semester" className="px-4 py-2 border rounded" onChange={handleSemesterChange}>
            <option value="">Select Semester</option>
            {selectedYear === '4' && <option value="7">7</option>}
            {selectedYear === '4' && <option value="8">8</option>}
            {selectedYear === '3' && <option value="5">5</option>}
            {selectedYear === '3' && <option value="6">6</option>}
            {selectedYear === '2' && <option value="3">3</option>}
            {selectedYear === '2' && <option value="4">4</option>}
            {selectedYear === '1' && <option value="2">2</option>}
            {selectedYear === '1' && <option value="1">1</option>}
            
          </select>
        </div>
      )}
      {selectedSemester && (
        <div className="mb-4">
          <label htmlFor="section" className="block font-semibold mb-1">Select Section:</label>
          <select id="section" className="px-4 py-2 border rounded" onChange={handleSectionChange}>
            <option value="">Select Section</option>
            <option value="A">A</option>
            <option value="B">B</option>
            {/* Add options for other sections */}
          </select>
        </div>
      )}
      {selectedSection && students.length > 0 && (
        <div className="mb-4">
          <label htmlFor="student" className="block font-semibold mb-1">Select Student:</label>
          <select id="student" className="px-4 py-2 border rounded" onChange={handleStudentChange}>
            <option value="">Select Student</option>
            {students.map(student => (
              <option key={student.roll_no} value={student.roll_no}>{student.name}</option>
            ))}
          </select>
        </div>
      )}
       {selectedStudent && selectedSemester && semesterSubjects.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Enter Results:</h2>
          <form className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3" onSubmit={handleSubmit}>
            {semesterSubjects.map(subject => (
              <div key={subject.SubCode}>
                <label htmlFor={subject.SubCode} className="block font-semibold mb-1">{subject.Name}:</label>
                <select
                  id={subject.SubCode}
                  className="px-4 py-2 border rounded"
                  onChange={(e) => handleGradePointChange(subject.SubCode, e.target.value)}
                  value={formData[subject.SubCode] || ""}
                >
                  <option value="">Select Grade Point</option>
                  <option value="10">O</option>
                  <option value="9">A+</option>
                  <option value="8">A</option>
                </select>
              </div>
            ))}
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default StudentResultPage;