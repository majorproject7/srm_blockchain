import React, { useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import { CircularProgress } from '@mui/material'; // Assuming you are using Material UI for the progress indicator
import axios from 'axios'; // Assuming you are using Axios for making HTTP requests
import Kmithead from '../DashBoard/KmitHeader';
import {Link} from 'react-router-dom';
const TeacherDetailsContainer = () => {
 const location = useLocation();
 const navigate = useNavigate();
  
  const teacherData = location.state.faculty;
  
  console.log('teacherdata on login ',teacherData)
  return (
    <div>
 <Kmithead></Kmithead>

    <div className="flex justify-center items-center ">
      
        <div className='h-[300px] flex flex-col items-center'>
          <div className="w-[300px] h-8 my-1 text-lg bg-red-200 rounded-[15px] flex justify-center ">
          <h2 className=" font-semibold text-xl">Faculty Details</h2>
        </div>
        <div className="w-[300px] h-8 my-1 text-lg bg-red-200 rounded-[15px] flex justify-center ">
          <h2 className=" font-semibold text-xl">{teacherData.name}</h2>
        </div>
        <div className="w-[300px] h-8 my-1 text-lg bg-red-200 rounded-[15px] flex justify-center ">
          <h2 className=" font-semibold text-xl">{teacherData.department_id}</h2>
        </div>
        <div className="w-[300px] h-8 my-1 text-lg bg-red-200 rounded-[15px] flex justify-center ">
          <h2 className=" font-semibold text-xl">{teacherData.faculty_id}</h2>
        </div>
        <div className="w-[300px] h-8 my-1 text-lg bg-red-200 rounded-[15px] flex justify-center ">
          <h2 className=" font-semibold text-xl">{teacherData.contact}</h2>
        </div>
        <div className="w-[300px] h-8 my-1 text-lg bg-red-200 rounded-[15px] flex justify-center ">
          <h2 className=" font-semibold text-xl">{teacherData.email}</h2>
        </div>
        <div className="w-[300px] h-8 my-1 text-lg bg-red-200 rounded-[15px] flex justify-center ">
          <h2 className=" font-semibold text-xl">{teacherData.qualification}</h2>
        </div>

          </div>
    
    </div>
      <div className="flex justify-center">
    {buttonPanel(teacherData.department_id,teacherData)}
    </div>
    </div>
  );




function buttonPanel(deptname,teacherData)
{  console.log("deptanme ",deptname)
      return (
        <div className="h-[150px] flex flex-col justify-evenly">

        <div className="w-[300px] h-8 text-lg bg-blue-200 rounded-[15px] flex justify-center ">
         <button onClick={()=>{ navigate('/AddResult',{state : { branch : deptname}})}} ><h2 className=" font-semibold text-xl">ADD STUDENT MARKS</h2>
         </button> </div>
        <div className="w-[300px] h-8 text-lg bg-blue-200 rounded-[15px] flex justify-center ">
          <h2 className=" font-semibold text-xl">EDIT STUDENT MARKS</h2>
        </div>
        <div className="w-[300px] h-8 text-lg bg-blue-200 rounded-[15px] flex justify-center ">
          <h2 className=" font-semibold text-xl">SUBMIT MARKS</h2>
        </div>
      </div>
      );
}
};
export default TeacherDetailsContainer;
