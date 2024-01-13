import React from "react";
import StuCard from "./studentDataCard";
import SemSel from "./stuResultSel";
import { Link } from "react-router-dom";

const DashBoard = ()=>{
    console.log('StuDashboard component rendered');
    const studentInfo = new Map([
        ['Name', 'Rakesh'],
        ['Roll no', '123'],
        ['Branch', 'Computer Science'],
        ['Year', '2023'],
        // Add more information as needed
      ]);
   

    return (

       
        <div >
<div align="center">
<div className=" h-[80px] flex justify-center mix-blend-darken bg-yellow-400 rounded-[30px] shadow" >
<div className=" h-[50px] text-black text-[32px] font-semibold font-['Khand'] flex justify-center ">
    keshav memorial Institute of technology</div></div></div>

    <div align="center" className="border p-5  grid  bg-slate-600 justify-center ">
        
      <div>  {StuCard(studentInfo)}</div>
      <div> {SemSel()}</div>
 
        </div>
   


    </div>






);
 
}

export default DashBoard;