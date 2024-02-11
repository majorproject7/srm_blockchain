import { Link } from "react-router-dom";
import Kmithead from "../DashBoard/KmitHeader";

function FacultyManage() {

  return (
    <>
      <Kmithead></Kmithead>
      <div className=" h-8 text-lg bg-cyan-100 rounded-[15px] flex justify-center ">
        <h1 className="text-lg font-semibold"> Faculty section</h1>
      </div>


      <div className="p-5 mx-10 h-screen flex flex-row justify-evenly">
        <div>{yearcomponent()}</div>
        <div>{yearsemcomponent()}</div>
        <div>{facultycomponent()}</div>
        <div>{buttonPanel()} </div>
      </div>
      
    
    </>
  );
}
function buttonPanel()
{
      return (
        <div className="h-[150px] flex flex-col justify-evenly">

        <div className="w-[300px] h-8 text-lg bg-red-200 rounded-[15px] flex justify-center ">
          <h2 className=" font-semibold text-xl">EDIT Professor</h2>
        </div>
        <div className="w-[300px] h-8 text-lg bg-red-200 rounded-[15px] flex justify-center ">
         <Link to="/FacultyActions"><h2 className=" font-semibold text-xl">ADD Professor</h2></Link> 
        </div>
        <div className="w-[300px] h-8 text-lg bg-red-200 rounded-[15px] flex justify-center ">
          <h2 className=" font-semibold text-xl">REMOVE Professor</h2>
        </div>
      </div>
      );
}
function facultycomponent()
{
    return(
<div className="w-[400px] h-[250px] flex flex-col justify-evenly">
          <div className="w-[300px] h-8 text-lg bg-purple-200 rounded-[15px] flex justify-center ">
            <h2 className=" font-semibold text-xl">Faculty 4-2</h2>
          </div>
          <div className="w-[300px] h-8 text-lg bg-purple-200 rounded-[15px] flex justify-center ">
            <h2 className=" font-semibold text-xl">Name - sub</h2>
          </div>
          <div className="w-[300px] h-8 text-lg bg-purple-100 rounded-[15px] flex justify-center ">
            <h2 className=" font-semibold text-xl">Dev  - MS</h2>
          </div>
          <div className="w-[300px] h-8 text-lg bg-purple-100 rounded-[15px] flex justify-center ">
            <h2 className=" font-semibold text-xl">Ram  - PPL</h2>
          </div>
          <div className="w-[300px] h-8 text-lg bg-purple-100 rounded-[15px] flex justify-center ">
            <h2 className=" font-semibold text-xl">Krishna - KRR</h2>
          </div>
          <div className="w-[300px] h-8 text-lg bg-purple-100 rounded-[15px] flex justify-center ">
            <h2 className=" font-semibold text-xl">Sanjev - Project II</h2>
          </div>

        </div>
      
    )
}

function yearcomponent()
{
    return(
      <>
<div className=" w-[350px] h-[250px] flex flex-col justify-evenly">
          <div className="w-[300px] h-8 text-lg bg-green-200 rounded-[15px] flex justify-center ">
            <h2 className=" font-semibold text-xl">year</h2>
          </div>
          <div className="w-[300px] h-8 text-lg bg-green-100 rounded-[15px] flex justify-center ">
            <h2 className=" font-semibold text-xl">2024</h2>
          </div>
          <div className="w-[300px] h-8 text-lg bg-green-100 rounded-[15px] flex justify-center ">
            <h2 className=" font-semibold text-xl">2023</h2>
          </div>
          <div className="w-[300px] h-8 text-lg bg-green-100 rounded-[15px] flex justify-center ">
            <h2 className=" font-semibold text-xl">2022</h2>
          </div>
          <div className="w-[300px] h-8 text-lg bg-green-100 rounded-[15px] flex justify-center ">
            <h2 className=" font-semibold text-xl">2021</h2>
          </div>
          
        </div>
       <div>{Branchcomponent()}</div>
      </>
    )
}

function yearsemcomponent()
{
    return(
<div className="w-[350px] h-[510px] flex flex-col justify-evenly">
          <div className="w-[300px] h-8 text-lg bg-green-200 rounded-[15px] flex justify-center ">
            <h2 className=" font-semibold text-xl">CSM - 2024 </h2>
          </div>
          <div className="w-[300px] h-8 text-lg bg-green-100 rounded-[15px] flex justify-center ">
            <h2 className=" font-semibold text-xl">4-2</h2>
          </div>
          <div className="w-[300px] h-8 text-lg bg-green-100 rounded-[15px] flex justify-center ">
            <h2 className=" font-semibold text-xl">4-1</h2>
          </div>
          <div className="w-[300px] h-8 text-lg bg-green-100 rounded-[15px] flex justify-center ">
            <h2 className=" font-semibold text-xl">3-2</h2>
          </div>
          <div className="w-[300px] h-8 text-lg bg-green-100 rounded-[15px] flex justify-center ">
            <h2 className=" font-semibold text-xl">3-1</h2>
          </div>
          
          <div className="w-[300px] h-8 text-lg bg-green-100 rounded-[15px] flex justify-center ">
            <h2 className=" font-semibold text-xl">2-2</h2>
          </div>
          <div className="w-[300px] h-8 text-lg bg-green-100 rounded-[15px] flex justify-center ">
            <h2 className=" font-semibold text-xl">2-1</h2>
          </div>
          <div className="w-[300px] h-8 text-lg bg-green-100 rounded-[15px] flex justify-center ">
            <h2 className=" font-semibold text-xl">1-2</h2>
          </div>
          <div className="w-[300px] h-8 text-lg bg-green-100 rounded-[15px] flex justify-center ">
            <h2 className=" font-semibold text-xl">1-1</h2>
          </div>

        </div>
      
    )
}

function Branchcomponent()
{
    return(
<div className="w-[350px] h-[250px] flex flex-col justify-evenly">
          <div className="w-[300px] h-8 text-lg bg-blue-200 rounded-[15px] flex justify-center ">
            <h2 className=" font-semibold text-xl">Branch</h2>
          </div>
          <div className="w-[300px] h-8 text-lg bg-blue-100 rounded-[15px] flex justify-center ">
            <h2 className=" font-semibold text-xl">CSE</h2>
          </div>
          <div className="w-[300px] h-8 text-lg bg-blue-100 rounded-[15px] flex justify-center ">
            <h2 className=" font-semibold text-xl">CSM</h2>
          </div>
          <div className="w-[300px] h-8 text-lg bg-blue-100 rounded-[15px] flex justify-center ">
            <h2 className=" font-semibold text-xl">CSD</h2>
          </div>
          <div className="w-[300px] h-8 text-lg bg-blue-100 rounded-[15px] flex justify-center ">
            <h2 className=" font-semibold text-xl">IT</h2>
          </div>

        </div>
      
    )
}


export default FacultyManage;
