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
 <div className="flex justify-center">
 <div className="w-[500px] h-8 my-1 text-lg bg-blue-200 rounded flex justify-center ">
          <h2 className=" font-semibold text-xl">Faculty Details</h2>
        </div>
        </div>
    <div className=" my-2 flex justify-center items-center ">
        <div>
          <img src={teacherData.image} alt="profile_image"></img>
        </div>
        <div className=' flex flex-col items-center'>
         

         <div className="flex ">
         <div className="w-[150px] h-8 my-1 m-1 bg-blue-100 rounded flex justify-center ">
          <h2 className=" font-semibold text-xl">Name</h2>
        </div>
        <div className="p-1 h-8 my-1 text-lg bg-blue-200 rounded flex justify-center items-center">
          <h2 className=" font-semibold text-xl">{teacherData.name}</h2>
        </div>
        </div>

        <div className="flex ">
         <div className="w-[150px] h-8 my-1 m-1 bg-blue-100 rounded flex justify-center ">
          <h2 className=" font-semibold text-xl">Faculty ID </h2>
        </div>
        <div className="w-[150px] h-8 my-1 text-lg bg-blue-200 rounded flex justify-center ">
          <h2 className=" font-semibold text-xl">{teacherData.faculty_id}</h2>
        </div>
        </div>

        <div className="w-[300px] flex flex-row ">
         <div className="w-[100px] px-5 h-8 my-1  bg-blue-100 rounded flex justify-center ">
          <h2 className=" font-semibold text-xl">Email</h2>
        </div>
        <div className=" h-8 my-1 mx-1 px-5 bg-blue-200 rounded flex justify-center ">
          <h2 className=" font-semibold text-lg">{teacherData.email}</h2>
        </div>
        </div>
        <div className="flex ">
         <div className="w-[150px] h-8 my-1 m-1 bg-blue-100 rounded flex justify-center ">
          <h2 className=" font-semibold text-xl">Department</h2>
        </div>
        <div className="w-[150px] h-8 my-1 text-lg bg-blue-200 rounded flex justify-center ">
          <h2 className=" font-semibold text-xl">{teacherData.department_id}</h2>
        </div>
        </div>

        <div className="flex ">
         <div className="w-[150px] h-8 my-1 m-1 bg-blue-100 rounded flex justify-center ">
          <h2 className=" font-semibold text-xl">Contact</h2>
        </div>
        <div className="w-[150px] h-8 my-1 text-lg bg-blue-200 rounded flex justify-center ">
          <h2 className=" font-semibold text-xl">{teacherData.contact}</h2>
        </div>
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

        <div className="w-[300px] h-8 text-lg bg-amber-300 shadow-lg rounded-sm flex justify-center ">
         <button onClick={()=>{ navigate('/AddResult',{state : { branch : deptname}})}} ><h2 className=" font-semibold text-xl">Manage Student Marks</h2>
         </button> </div>
       
        
      </div>
      );
}
};
export default TeacherDetailsContainer;
