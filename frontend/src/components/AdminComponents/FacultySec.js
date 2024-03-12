import { Link } from "react-router-dom";
import Kmithead from "../DashBoard/KmitHeader";
import {useEffect, useState} from 'react';
import axios from 'axios';
function FacultyManage() {

  return (
    <>
      <Kmithead></Kmithead>
      <div className=" h-10 m-1 text-lg bg-cyan-100 rounded-sm flex justify-center items-center">
        <h1 className="text-xl font-semibold"> Faculty Section</h1>
      </div>


      <div className="p-5 mx-10 h-screen flex flex-row justify-evenly">
        <div>{Branchcomponent()}</div>
        <div>{buttonPanel()} </div>
      </div>
      
    
    </>
  );
};
function buttonPanel()
{
      return (
        <div className="h-[150px] flex flex-col justify-evenly">
          <div className="w-[300px] h-8 text-lg bg-red-200 rounded-[15px] flex justify-center ">
           <Link to="/FacultyUpdate"><h2 className=" font-semibold text-xl">EDIT Professor</h2>
           </Link>  </div>
          <div className="w-[300px] h-8 text-lg bg-red-200 rounded-[15px] flex justify-center ">
            <Link to="/FacultyActions">
              <h2 className=" font-semibold text-xl">ADD Professor</h2>
            </Link>
          </div>
          <div className="w-[300px] h-8 text-lg bg-red-200 rounded-[15px] flex justify-center ">
            <Link to="/FacultyRemove">
              {" "}
              <h2 className=" font-semibold text-xl">REMOVE Professor</h2>
            </Link>{" "}
          </div>
        </div>
      );
};

function Branchcomponent()
{   
    const [deptval, setDept]= useState(null);
    const [faclist ,setFacultyData]= useState(null);
    const handleClick=(deptname)=>{
          setDept(deptname);

    }

    useEffect(()=>{
      
      if(deptval!==null)
      {
          const getfaculty= async()=>{
              const response = await axios.post("http://localhost:5000/api/TeacherRoute/getBranchFaculty",{ dept : deptval});
              console.log("faculty list : ", response.data.facdata);
              setFacultyData(response.data.facdata);
          };
getfaculty();
      }

    },[deptval]);

    return(
      <div>
<div className="w-[350px] h-[250px] flex flex-col justify-evenly">
          <div className="w-[300px] h-8 text-lg bg-blue-200 rounded-[15px] flex justify-center ">
            <h2 className=" font-semibold text-xl">Branch</h2>
            </div>
          <div className="w-[300px] h-8 text-lg bg-blue-100 rounded-[15px] flex justify-center ">
          <button onClick={()=>{handleClick("CSE")}} ><h2 className=" font-semibold text-xl">CSE</h2></button>
          </div>
          <div className="w-[300px] h-8 text-lg bg-blue-100 rounded-[15px] flex justify-center ">
           <button onClick={()=>{handleClick("CSM")}} > <h2 className=" font-semibold text-xl">CSM</h2></button>
          </div>
          <div className="w-[300px] h-8 text-lg bg-blue-100 rounded-[15px] flex justify-center ">
           <button onClick={()=>{handleClick("CSD")}}><h2 className=" font-semibold text-xl">CSD</h2>
           </button> </div>
          <div className="w-[300px] h-8 text-lg bg-blue-100 rounded-[15px] flex justify-center ">
          <button onClick={()=>{handleClick("IT")}}>  <h2 className=" font-semibold text-xl">IT</h2>
          </button></div>

        </div>

          <div>
            {
              faclist !== null && faclist.length !==0 ?
               (
                faclist.map((faculty) => (
      <div className="flex flex-col m-1 rounded-lg text-center bg-gray-200 p-4 hover:bg-gray-300 justify-center items-center">

        <div className="font-bold text-xl m-2">{faculty.name}</div>
  
          {/* Admin ID */}
          <div className="flex flex-row justify-center items-center">
            <div className="text-base font-medium">Faculty ID : </div>
            <div className="text-sm">{faculty.faculty_id}</div>
          </div>
  
          {/* Contact */}
          <div className="flex flex-row justify-center items-center">
            <span className="text-base font-medium">Contact : </span>
            <span className="text-sm">{faculty. contact}</span>
          </div>
  
          {/* Email */}
          <div className="flex flex-row justify-center items-center">
            <span className="text-base font-medium">Email : </span>
            <span className="text-sm overflow-hidden truncate">{faculty.email}</span>
          </div>
        
      </div>)) 
      
               ):(<div></div>)  }
       </div>

        </div>
      
    )
};


export default FacultyManage;
