import React from "react";
import StuCard from "./studentDataCard";
import SemSel from "./stuResultSel";
import { Link } from "react-router-dom";
import {useLocation} from 'react-router-dom';
const DashBoard = ()=>{
  const location = useLocation();
  const studentData = location.state.StudentLogin;
  console.log(studentData);
    console.log('StuDashboard component rendered');

    return (

       
        <div >
<div align="center">
<div className=" h-[80px] flex justify-center mix-blend-darken bg-yellow-400 rounded-[30px] shadow" >
<div className=" h-[50px] text-black text-[32px] font-semibold font-['Khand'] flex justify-center ">
    keshav memorial Institute of technology</div></div></div>

    <div align="center" className="border p-5  grid  bg-slate-600 justify-center ">
        
      <div>  {StuCard(studentData)}</div>
      <div> {SemSel(studentData.roll_no,studentData.branch)}</div>
 
        </div>
   


    </div>






);
 
}

export default DashBoard;