/* this card will be shown in student data in card */
import React from "react";
//import photo from 'C:/GANESH/srms/frontend/src/photo.jpeg';
const StuCard =(stuCardData)=>{
    const StudentInfo = stuCardData;
return(

    
        <div  className=" flex flex-col-1 justify-center items-center">
    <div className=" w-[200px] h-[200px] text-lg flex flex-col " > 
    <img src={stuCardData.image} alt="Profile image" className="rounded-[100px]" ></img>
     </div>
    
    <div  className="m-2 flex flex-col-2 justify-center items-stretch">
        
        <div className=" flex flex-col justify-center items-center">
        <div className="w-[150px] h-10 text-lg my-1 bg-blue-100 flex justify-center items-center" >Name   </div>
        <div className="w-[150px] h-10 text-lg  my-1 bg-blue-100  flex justify-center items-center" >Roll No/ ID   </div>
        <div className="w-[150px] h-10 text-lg my-1 bg-blue-100  flex justify-center items-center" >Branch   </div>
        <div className="w-[150px] h-10 text-lg  my-1 bg-blue-100 flex justify-center items-center" >Email   </div>
        <div className="w-[150px] h-10 text-lg  my-1 bg-blue-100 flex justify-center items-center" >Academic Year   </div>
        </div>
       
        <div className=" flex flex-col justify-center items-center">
        <div className="w-[150px] h-10 text-lg  bg-green-300 my-1 flex justify-center items-center" >{StudentInfo.name}   </div>
        <div className="w-[150px] h-10 text-lg  bg-green-300 my-1 flex justify-center items-center" >{StudentInfo.Ayear}   </div>
        <div className="w-[150px] h-10 text-lg  bg-green-300 my-1 flex justify-center items-center" >{StudentInfo.roll_no}   </div>
        <div className="w-[150px] h-10 text-lg  bg-green-300 my-1 flex justify-center items-center" >{StudentInfo.branch}   </div>
        <div className=" p-1 h-10 text-lg  bg-green-300 my-1 flex justify-center items-center" >{StudentInfo.email}   </div>
        </div>

    </div>
    </div>
    
);


}

export default StuCard;