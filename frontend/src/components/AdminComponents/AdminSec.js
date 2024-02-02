import Kmithead from "../DashBoard/KmitHeader";


function AdminManagePage(){

    return (
 <div> 
    <Kmithead> </Kmithead>
    <Adminhead></Adminhead>
    <div className="flex justify-center items-center ">
    <div className="flex justify-center">
    
    <Adminlistcomponent></Adminlistcomponent>
    {AdminDetailscard()}
    <AbuttonPanel></AbuttonPanel>
    </div>
    </div>
 </div>
    );
}
function AdminDetailscard()
{   const studentInfo = new Map([
    ['Name', 'Rakesh'],
    ['Mobile', '+91 8000000780'],
    ['email', 'srmAdmin@edu.in'],
    ['Role', 'SRM Admin'],
    // Add more information as needed
  ]);


    return(
        <>
        

    <div align="center" className=" grid grid-cols-1   justify-items-center">
    <div className=" w-[150px] h-[150px] text-lg bg-blue-300 rounded-[15px]  " >
     <img src="/person_profile.jpg" alt="gadfg"></img> </div>
    { Array.from(studentInfo.entries()).map(([subject, mark], index) => (
        
        <div className=" grid grid-cols-2 justify-center">
        <div className="w-[160px] h-10 text-lg gap-2 bg-cyan-100 rounded-[15px] flex justify-center" >{subject}   </div>
        <div className="w-[160px] h-10 text-lg bg-cyan-50 rounded-[15px] flex justify-center" >{mark}   </div>
        </div>
      ))
    }
    </div>
   
        </>
    );
    

}
function AbuttonPanel()
{
      return (
        <div className="flex flex-col justify-center">
        <div className="p-1">
        <div className=" w-[300px] h-8 text-lg bg-red-200 rounded-[15px] flex justify-center ">
          <h2 className=" font-semibold text-xl">EDIT ADMIN DETAILS</h2>
        </div>
        </div>
        <div className="p-1">
        <div className="w-[300px] h-8 text-lg bg-red-200 rounded-[15px] flex justify-center ">
          <h2 className=" font-semibold text-xl">REMOVE ADMIN</h2>
        </div>
        </div>
      </div>
      );
}
function Adminhead()
{
    return(
        <div className="w-full h-8 text-lg bg-cyan-100 rounded-[15px] flex justify-center ">
 <h1 className="text-lg font-semibold"> Admin Section</h1>
 </div>
    );
}

function Adminlistcomponent()
{
    return(
<div className="p-1 my-10 w-[350px] h-[250px] flex flex-col justify-evenly">
          <div className="w-[300px] h-8 text-lg bg-green-200 rounded-[15px] flex justify-center ">
            <h2 className=" font-semibold text-xl">Current Admins</h2>
          </div>
          <div className="w-[300px] h-8 text-lg bg-green-100 rounded-[15px] flex justify-center ">
            <h2 className=" font-semibold text-xl">Ganesh</h2>
          </div>
          <div className="w-[300px] h-8 text-lg bg-green-100 rounded-[15px] flex justify-center ">
            <h2 className=" font-semibold text-xl">Rakesh</h2>
          </div>
          <div className="w-[300px] h-8 text-lg bg-green-100 rounded-[15px] flex justify-center ">
            <h2 className=" font-semibold text-xl">Akhil</h2>
          </div>
          <div className="w-[300px] h-8 text-lg bg-green-100 rounded-[15px] flex justify-center ">
            <h2 className=" font-semibold text-xl">Chandu</h2>
          </div>
          
    <div className="w-[300px] h-8 text-lg bg-red-200 rounded-[15px] flex justify-center ">
          <h2 className=" font-semibold text-xl">Add ADMIN</h2>
        </div>

        </div>
      
    )
}
export default AdminManagePage;