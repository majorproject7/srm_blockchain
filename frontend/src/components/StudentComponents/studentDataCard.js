/* this card will be shown in student data in card */
import React from "react";
//import photo from 'C:/GANESH/srms/frontend/src/photo.jpeg';
const StuCard =(stuCardData)=>{

    const studentInfo = stuCardData;
    
        // Add more information as needed
    if(!(studentInfo instanceof Map) || studentInfo.size === 0 )
    {
        return (
            <div>
                no data
            </div>
        );
    }

return(

    <div>
        <div align="center"  className=" grid grid-cols-1 justify-items-center">
    <div className=" w-[200px] h-[200px] text-lg bg-blue-300 rounded-[15px]  " > <img src="/photo.jpeg" alt="gadfg"></img> </div>
    
    <div align="center" className=" p-3 grid grid-cols-1   justify-items-center">
    { Array.from(studentInfo.entries()).map(([subject, mark], index) => (
        
        <div className=" grid grid-cols-2 justify-center">
        <div className="w-[150px] h-10 text-lg gap-2 bg-blue-300 rounded-[15px] flex justify-center" >{subject}   </div>
        <div className="w-[150px] h-10 text-lg bg-green-300 rounded-[15px] flex justify-center" >{mark}   </div>
        </div>
      ))
       }
    </div>
    </div>
    </div>
);


}

export default StuCard;