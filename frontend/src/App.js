
import React  from 'react';
import DashBoard from './components/StudentComponents/stuDashBoard.js';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StuGrade from './components/StudentComponents/studentGrade.js';
import HomePage from './components/DashBoard/DashBoard.js';
import AdminDash from './components/AdminComponents/AdminDashPage.js';
import FacultyManage from './components/AdminComponents/FacultySec.js';
import AdminManagePage from './components/AdminComponents/AdminSec.js';
import TDashBoard from './components/TeacherComponents/TeacherDashBoard.js';
const App = () => {
    return (
      
        
        <Router>
          <Routes>
          <Route path="/" element={<HomePage/>} />  
           <Route path="/TeacherDashBoard" element={<TDashBoard/>} /> 
          <Route path="/AdminManage" element={<AdminManagePage/>} />
          <Route path="/studashboard" element={<DashBoard/>} />
          <Route path="/result" element={<StuGrade/>}></Route>
          <Route path="/AdminDash" element={<AdminDash/>}></Route>
          <Route path="/facultyManage" element={<FacultyManage/>}></Route>
          </Routes>
        </Router>
       
    );
};

export default App;
