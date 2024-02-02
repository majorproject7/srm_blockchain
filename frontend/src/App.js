
import React  from 'react';
import DashBoard from './components/StudentComponents/stuDashBoard.js';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StuGrade from './components/StudentComponents/studentGrade.js';
import HomePage from './components/DashBoard/DashBoard.js';
import AdminDash from './components/AdminComponents/AdminDashPage.js';
import FacultyManage from './components/AdminComponents/FacultySec.js';
import AdminManagePage from './components/AdminComponents/AdminSec.js';
import TDashBoard from './components/TeacherComponents/TeacherDashBoard.js';
import SMP from './components/AdminComponents/StudentSec.js';
const App = () => {
    return (
      
        
        <Router>
          <Routes>
          <Route path="/" element={<HomePage/>} />  
          <Route path="/AdminDash" element={<AdminDash/>}></Route>
           <Route path="/TeacherDashBoard" element={<TDashBoard/>} /> 
           <Route path="/studashboard" element={<DashBoard/>} />
         
          <Route path="/AdminManage" element={<AdminManagePage/>} />
          <Route path="/facultyManage" element={<FacultyManage/>}></Route>
          <Route path="/StudentManagePage" element={<SMP/>}></Route>
          
          <Route path="/result" element={<StuGrade/>}></Route>

           </Routes>
        </Router>
       
    );
};

export default App;
