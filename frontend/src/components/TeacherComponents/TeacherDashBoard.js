
import { React} from 'react';
import Kmithead from "../DashBoard/KmitHeader";


function TDashBoard(){

        return (
            <div>
                <Kmithead/>

                <div className='bg-blue-300 h-10 rounded-e-md flex  items-center justify-center'><h1 className='font-bold flex '>Welcome to Teacher DashBoard</h1></div>

                <div className='flex flex-row justify-center items-center'>
                    <div>{TeacherDetailsCard()}</div>
                    <div>{TeacherSectionCard()}</div>
                    <div>{buttonPanel()}</div>
                </div>
            </div>
        )

}



function TeacherSectionCard()
{

       
    const data = [
        { category: 'CSM', subCategory: 'A', technology: 'DSA' },
        { category: 'CSM', subCategory: 'A', technology: 'JAVA' },
        { category: 'CSM', subCategory: 'B', technology: 'JAVA' },
        { category: 'CSM', subCategory: 'B', technology: 'DSA' }
      ];
      
      const MyComponent = ({ category, subCategory, technology }) => {
        return (
          <div>
             <div className=" p-1 grid grid-cols-2 justify-center">
            <div className="w-[180px] h-10 text-lg gap-2 bg-cyan-100 rounded-[15px] flex justify-center" >{category} {subCategory}</div>
            <div className="w-[180px] h-10 text-lg bg-cyan-50 rounded-[15px] flex justify-center" >{technology}   </div>
            </div>
          </div>
        );
      };
    
        return(
            <>
            
        
        <div align="center" className=" grid grid-cols-1   justify-items-center">
          <div className="my-2 p-1 grid grid-cols-2 justify-center">
            <div className="w-[180px] h-10 text-lg gap-2 bg-cyan-100 rounded-[15px] flex justify-center" >section  </div>
            <div className="w-[180px] h-10 text-lg bg-cyan-50 rounded-[15px] flex justify-center" > subject   </div>
            </div>
        {data.map((item, index) => (
        <MyComponent key={index} {...item} />
      ))}
      </div>
     
       
            </>
        );
}


function TeacherDetailsCard()
{
    const TeacherInfo = new Map([
        ['Name', 'Rakesh'],
        ['Mobile', '+91 8000000780'],
        ['email', 'kmitasfaculty9@edu.in'],
        ['Role', 'Assistant Professor'],
        ['Dept','CSM']
        // Add more information as needed
      ]);
    
    
        return(
            <>
            
    
        <div align="center" className=" grid grid-cols-1   justify-items-center">
        <div className=" w-[150px] h-[150px] text-lg bg-blue-300 rounded-[15px]  " >
         <img src="/person_profile.jpg" alt="gadfg"></img> </div>
        { Array.from(TeacherInfo.entries()).map(([subject, mark], index) => (
            
            <div className=" p-1 grid grid-cols-2 justify-center">
            <div className="w-[180px] h-10 text-lg gap-2 bg-cyan-100 rounded-[15px] flex justify-center" >{subject}   </div>
            <div className="w-[180px] h-10 text-lg bg-cyan-50 rounded-[15px] flex justify-center" >{mark}   </div>
            </div>
          ))
        }
        </div>
       
            </>
        );
}
function buttonPanel()
{
      return (
        <div className="h-[150px] flex flex-col justify-evenly">

        <div className="w-[300px] h-8 text-lg bg-red-200 rounded-[15px] flex justify-center ">
          <h2 className=" font-semibold text-xl">ADD STUDENT MARKS</h2>
        </div>
        <div className="w-[300px] h-8 text-lg bg-red-200 rounded-[15px] flex justify-center ">
          <h2 className=" font-semibold text-xl">EDIT STUDENT MARKS</h2>
        </div>
        <div className="w-[300px] h-8 text-lg bg-red-200 rounded-[15px] flex justify-center ">
          <h2 className=" font-semibold text-xl">SUBMIT MARKS</h2>
        </div>
      </div>
      );
}
export default TDashBoard;
