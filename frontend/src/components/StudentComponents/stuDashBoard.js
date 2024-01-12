import React from "react";
import StuCard from "./studentDataCard";

const DashBoard = ()=>{

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
<div className="w-[1082px] h-[80px] flex justify-center mix-blend-darken bg-yellow-400 rounded-[30px] shadow" >
<div className="w-[1032px] h-[50px] text-black text-[32px] font-semibold font-['Khand'] flex justify-center ">
    keshav memorial Institute of technology</div></div></div>

    <div align="center" className="border p-5  grid grid-cols-6 gap-2 bg-slate-600 justify-center ">
        
        {StuCard(studentInfo)}
 
        </div>



    </div>






);
 
}

export default DashBoard;