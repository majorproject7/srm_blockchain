import Kmithead from "../DashBoard/KmitHeader";
import { Link } from "react-router-dom";

function AdminDash()
{  
    const studentInfo = new Map([
        ['Name', 'Rakesh'],
        ['Mobile', '+91 8000000780'],
        ['email', 'srmAdmin@edu.in'],
        ['Role', 'SRM Admin'],
        // Add more information as needed
      ]);

    return(
        <>
        <Kmithead></Kmithead>
        
    <div>
        <div align="center"  className=" grid grid-cols-1 justify-items-center">
    <div className=" w-[200px] h-[200px] text-lg bg-blue-300 rounded-[15px]  " > <img src="/person_profile.jpg" alt="gadfg"></img> </div>
    
    <div align="center" className=" p-3 grid grid-cols-1   justify-items-center">
    { Array.from(studentInfo.entries()).map(([subject, mark], index) => (
        
        <div className=" grid grid-cols-2 justify-center">
        <div className="w-[160px] h-10 text-lg gap-2 bg-cyan-100 rounded-[15px] flex justify-center" >{subject}   </div>
        <div className="w-[160px] h-10 text-lg bg-cyan-50 rounded-[15px] flex justify-center" >{mark}   </div>
        </div>
      ))
    }
    <div className="w-[320px] h-[160px]  flex flex-col justify justify-around">
    <div className="w-[320px] h-10 text-lg bg-cyan-500 rounded-[15px] flex justify-center " >  
    <Link to="/facultyManage">    <h2 className="text-white font-semibold">Faculty Management</h2>
            </Link>
     </div>

     <div className="w-[320px] h-10 text-lg bg-cyan-500 rounded-[15px] flex justify-center " >  
         <Link to="/StudentManagePage">   <h2 className="text-white font-semibold">Student Management</h2>
         </Link>
     </div>


     <div className="w-[320px] h-10 text-lg bg-cyan-500 rounded-[15px] flex justify-center " >  
           <Link to="/AdminManage"> <h2 className="text-white font-semibold">Admin Management</h2></Link>
     
     
     
     </div>
     </div>
    </div>
    </div>
    </div>
        </>
    );

}
export default AdminDash;