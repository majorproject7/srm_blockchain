import React from "react";
import StuCard from "./studentDataCard";
import SemSel from "./stuResultSel";
import { Link } from "react-router-dom";
import {useLocation} from 'react-router-dom';
import Kmithead from "../DashBoard/KmitHeader";
const DashBoard = ()=>{
  const location = useLocation();
  const studentData = location.state.StudentLogin;
  console.log(studentData);
    console.log('StuDashboard component rendered');

    return (
      <>
          <Kmithead></Kmithead>
          <div className="flex flex-col  justify-center items-center">
            <div className=" m-2"> {StuCard(studentData)}</div>
            <div className="  m-2"> {SemSel(studentData.roll_no, studentData.branch)}</div>
          </div>
       
      </>
    );
 
}

export default DashBoard;