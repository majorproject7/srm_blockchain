/* this card will be shown in student data in card */
import React from "react";
//import photo from 'C:/GANESH/srms/frontend/src/photo.jpeg';
const StuCard =(stuCardData)=>{
    const StudentInfo = stuCardData;
return(

    <div>
        <div align="center"  className=" grid grid-cols-1 justify-items-center">
    <div className=" w-[200px] h-[200px] text-lg bg-blue-300 rounded-[15px]  " > <img src="/photo.jpeg" alt="gadfg"></img> </div>
    
    <div align="center" className=" p-3 flex flex-col justify-items-start">
        
        <div className=" flex flex-col-2 justify-center">
        <div className="w-[150px] h-10 text-lg gap-2 bg-blue-300 rounded-[15px] flex justify-center items-center" >Name   </div>
        <div className="w-[150px] h-10 text-lg bg-green-300 rounded-[15px] flex justify-center items-center" >{StudentInfo.name}   </div>
        </div>
        <div className=" flex flex-col-2 justify-center">
        <div className="w-[150px] h-10 text-lg gap-2 bg-blue-300 rounded-[15px] flex justify-center items-center" >Academic Year   </div>
        <div className="w-[150px] h-10 text-lg bg-green-300 rounded-[15px] flex justify-center items-center" >{StudentInfo.Ayear}   </div>
        </div>
        <div className=" flex flex-col-2 justify-center">
        <div className="w-[150px] h-10 text-lg gap-2 bg-blue-300 rounded-[15px] flex justify-center items-center" >Roll No/ ID   </div>
        <div className="w-[150px] h-10 text-lg bg-green-300 rounded-[15px] flex justify-center items-center" >{StudentInfo.roll_no}   </div>
        </div>
        <div className=" flex flex-col-2 justify-center">
        <div className="w-[150px] h-10 text-lg gap-2 bg-blue-300 rounded-[15px] flex justify-center items-center" >Branch   </div>
        <div className="w-[150px] h-10 text-lg bg-green-300 rounded-[15px] flex justify-center items-center" >{StudentInfo.branch}   </div>
        </div>
        <div className=" flex flex-col-2 justify-center">
        <div className="w-[150px] h-10 text-lg gap-2 bg-blue-300 rounded-[15px] flex justify-center items-center" >Email   </div>
        <div className=" p-2 h-10 text-lg bg-green-300 rounded-[15px] flex justify-center items-center" >{StudentInfo.email}   </div>
        </div>

    </div>
    </div>
    </div>
);


}

export default StuCard;