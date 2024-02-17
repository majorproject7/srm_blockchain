import {React,useState,useEffect} from "react";
import axios from 'axios';
import {useLocation} from 'react-router-dom';
const StuGrade = ()=>{
   const[hashvalforsem, setHashVal] = useState(null);
   const[ subjects, setSubjects] = useState(null);
   const[grades, setGrades] = useState(null);
   const[SGPA, setSGPA] = useState(null);
   const[status,setExamStatus] = useState(null);
  const location = useLocation();
  const rollno = location.state.roll_no;
  const sem_num = location.state.sem;
  const branchdep = location.state.branched;
 console.log("roll "+rollno+"sem "+sem_num);
   useEffect(()=>{

          async function fetchHashval()
          {
            try{
             const formdata = {roll_no : rollno,semnum : sem_num}
             const response = await axios.post('http://localhost:5000/api/StudentRoute/simple',formdata);
             const subjectlist = await(axios.post('http://localhost:5000/api/TeacherRoute/getSubjects',{semnum : sem_num,branch : branchdep}));
             const gradelist = await(axios.post('http://localhost:5000/api/StudentRoute/getResults',{sem : sem_num,roll_no : rollno}));
             
             console.log(response);
             console.log("sbujects ",subjectlist.data.subjectlist);
             console.log("gradelist-->",gradelist.data.data);
            
             setSubjects(subjectlist.data.subjectlist);
             setHashVal(response.data.data);
             setGrades(gradelist.data.data.GradesList);
             setSGPA(gradelist.data.data.SGPA);
             setExamStatus(gradelist.data.data.ExamStatus);

             console.log("grades ",grades);
             console.log("hashval ",hashvalforsem);
            }
            catch(error){

            }
          }

          fetchHashval();

   },[]);

    return (

       <>
       
<div align="center">
<div className="w-[1082px] h-[80px] flex justify-center mix-blend-darken bg-yellow-400 rounded-[30px] shadow" >
<div className="w-[1032px] h-[50px] text-black text-[32px] font-semibold font-['Khand'] flex justify-center ">
    keshav memorial Institute of technology</div></div></div>

    <div className="p-2 flex justify-center">
    <div className="w-[200px] h-10 text-lg bg-blue-300 rounded-[15px] flex justify-center" > subjectCode  </div>
    <div className="w-[200px] h-10 text-lg bg-green-300 rounded-[15px] flex justify-center" > Subject  </div>
    <div className="w-[200px] h-10 text-lg bg-green-300 rounded-[15px] flex justify-center" > Grade  </div> 
        </div>
       <div className="flex flex-col-2 justify-center items-center">
       <div>{ subjects ? (subjects.map((subject) => (
        
        <div className="p-2 flex flex-row-2 justify-center">
        <div className="w-[150px] h-10 text-lg bg-blue-300 rounded-[15px] flex justify-center" >{subject.SubCode}   </div>
        <div className="w-[250px] py-2 text-lg bg-green-300 rounded-[15px] flex justify-center" >{subject.Name}   </div>
        
        </div>
      ))):(
        <div>no data</div>
      )
       }</div>
       <div>
        
          {  grades ? (grades.map((subject) => (
        
            <div className="p-2 flex flex-row-2 justify-center">
            
            <div className="w-[250px] py-2 text-lg bg-green-300 rounded-[15px] flex justify-center" >{subject.grade}   </div>
            
            </div>
          ))):(
            <div>no data</div>
          )
           }

        
       </div>
       
       </div>
       <div className="flex flex-col justify-center items-center">

        <div>
          { (hashvalforsem != null)  ? (<div className="rounded-md  bg-slate-200">
                  <h2>Hash of Result from BlockChain : <h3>{hashvalforsem}</h3> </h2>
          </div>) : (<div></div>) }
        </div>
       
        <div>
          {
            (SGPA) ? (<div className="bg-yellow-200 rounded-lg p-2">SGPA is {SGPA}</div>
              ):(<div> N/A
                </div>)
          }
           {
            (status) ? (<div className="bg-yellow-200 rounded-lg p-2">Status is {status}</div>
              ):(<div> N/A
                </div>)
          }
        </div>
        
        </div>

   
    </>
    );


}


export default StuGrade;