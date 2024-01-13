import React from "react";
import { Link } from "react-router-dom";
const SemSel=() => {
    console.log('Stu result component rendered');
    return(
    <div>
    <div className="w-[600px] bg-white rounded-[30px] border-2 border-green-600"> 
    <div className="gird grid-cols-1 justify-center">
    <div className="mx-2 my-2 grid grid-cols-2 w-[900] h-11 justify-items-center bg-green-400 rounded-[15px]" >
    <div >Semester</div>
    <div >Grade</div>
    </div>
    
    <div className=" mx-2 my-2 grid grid-cols-2 w-[900] h-10 justify-items-center  bg-green-200 rounded-[15px]" >
    <div className="vertical-align:middle;">sem 1 </div>
    <Link to="/result">Go to Result</Link>
    </div>

    <div className=" mx-2 my-2 grid grid-cols-2 w-[900] h-11 justify-items-center bg-green-200 rounded-[15px]" >
    <div >sem 2 </div>
    <div >10</div>
    </div>
    <div className=" mx-2 my-2 grid grid-cols-2 w-[900] h-11 justify-items-center bg-green-200 rounded-[15px]" >
    <div >sem 3 </div>
    <div >10</div>
    </div>
    <div className=" mx-2 my-2 grid grid-cols-2 w-[900] h-11 justify-items-center bg-green-200 rounded-[15px]" >
    <div >sem 4 </div>
    <div >10</div>
    </div>

    <div className=" mx-2 my-2 grid grid-cols-2 w-[900] h-11 justify-items-center bg-green-200 rounded-[15px]" >
    <div >sem 5 </div>
    <div >10</div>
    </div>



    </div>
    
    </div> 
    </div>
    );
    }
export default SemSel;
    