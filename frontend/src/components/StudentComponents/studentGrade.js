import React from "react";


const StuGrade = ()=>{

    const studentData = new Map([
        ['Math', 90],
        ['English', 85],
        ['Science', 92],
        ['kranti',40]
        // Add more subjects and marks as needed
      ]);


    return (

       
        <div >
<div align="center">
<div className="w-[1082px] h-[80px] flex justify-center mix-blend-darken bg-yellow-400 rounded-[30px] shadow" >
<div className="w-[1032px] h-[50px] text-black text-[32px] font-semibold font-['Khand'] flex justify-center ">
    keshav memorial Institute of technology</div></div></div>

    <div className="p-2 flex justify-center">
    <div className="w-[300px] h-10 text-lg bg-blue-300 rounded-[15px] flex justify-center" > subject  </div>
    <div className="w-[300px] h-10 text-lg bg-green-300 rounded-[15px] flex justify-center" > Grade  </div>
        
        </div>
       
       { Array.from(studentData.entries()).map(([subject, mark], index) => (
        
        <div className="p-2 flex justify-center">
        <div className="w-[300px] h-10 text-lg bg-blue-300 rounded-[15px] flex justify-center" >{subject}   </div>
        <div className="w-[300px] h-10 text-lg bg-green-300 rounded-[15px] flex justify-center" >{mark}   </div>
        
        </div>
      ))
       }
    </div>






);
 
}


export default StuGrade;