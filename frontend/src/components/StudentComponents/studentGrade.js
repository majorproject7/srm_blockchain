import { React, useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Kmithead  from "../DashBoard/KmitHeader";
const StuGrade = () => {
  const [hashvalforsem, setHashVal] = useState(null);
  const [subjects, setSubjects] = useState(null);
  const [grades, setGrades] = useState(null);
  const [SGPA, setSGPA] = useState(null);
  const [status, setExamStatus] = useState(null);
  const [calcHash, setCalcHash] = useState(null);

  const location = useLocation();
  const rollno = location.state.roll_no;
  const sem_num = location.state.sem;
  const branchdep = location.state.branched;
  console.log("roll " + rollno + "sem " + sem_num);
  useEffect(() => {
    async function fetchHashval() {
      try {
        const formdata = { roll_no: rollno, semnum: sem_num };

        const subjectlist = await axios.post(
          "http://localhost:5000/api/TeacherRoute/getSubjects",
          { semnum: sem_num, branch: branchdep }
        );
        setSubjects(subjectlist.data.subjectlist);

        const gradelist = await axios.post(
          "http://localhost:5000/api/StudentRoute/getResults",
          { sem: sem_num, roll_no: rollno }
        );
        setGrades(gradelist.data.data.GradesList);
        setSGPA(gradelist.data.data.SGPA);
        setExamStatus(gradelist.data.data.ExamStatus);
        
       
        const resHash = await axios.post(
          "http://localhost:5000/api/StudentRoute/getResultHash",
          { semnum: sem_num, roll_no: rollno }
        );

        setCalcHash(resHash.data.message);
        const response = await axios.post(
          "http://localhost:5000/api/StudentRoute/BlockchainHash",
          formdata
        );
     
        setHashVal(response.data.data);
        
        
        
      } catch (error) {
        alert(error);
      }
    }

    fetchHashval();
  }, []);

  return (
    <>
      <Kmithead></Kmithead>
      <div className=" flex flex-col items-center">
        <div className="">
          <h1 className="ml-4 text-lg font-sans font-semibold">
            {" "}
            Roll_No : {rollno} SEM  : {sem_num}{" "}
          </h1>
        </div>
        
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col-3 border-black border justify-center ">
          <div>
          <div className="w-[160px] h-10 text-lg  bg-amber-100 flex justify-center items-center">
            {" "}
            Subject Code{" "}
          </div>
            {subjects ? (
              subjects.map((subject) => (

                <div className=" flex my-1 flex-col-1 bg-blue-50  justify-center border-black border ">
                  <div className=" h-12 text-lg   flex flex-col-1  items-center">
                    {subject.SubCode}{" "}
                  </div>
                  
                </div>
              ))
            ) : (
              <div>no data</div>
            )}
          </div>
          <div >
          <div className=" h-10 text-lg bg-amber-100 flex justify-center items-center">
            {" "}
            Subject{" "}
          </div>
            {subjects ? (
              subjects.map((subject) => (

                <div className="flex flex-col-1 my-1 bg-green-50 justify-center border-black border">
                  <div className=" p-1 h-12 text-lg  flex flex-col items-center">
                    {subject.Name}{" "}
                  </div>
                  
                </div>
              ))
            ) : (
              <div>no data</div>
            )}
          </div>
          <div>
          <div className="w-[260px] h-10 text-lg  bg-amber-100 flex justify-center items-center">
            {" "}
            Grade{" "}
          </div>
            {grades ? (
              grades.map((subject) => (
                <div className="flex flex-col my-1 justify-center  border-black border">
                  <div className=" p-1 h-12 text-lg bg-green-200  flex flex-col items-center">
                    {subject.grade}{" "}
                  </div>
                </div>
              ))
            ) : (
              <div>no data</div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="flex m-2 ">
          <div className="p-2">
            {SGPA ? (
              <div className="font-semibold text-xl rounded-lg p-2">SGPA : {SGPA}</div>
            ) : (
              <div> N/A</div>
            )}
          </div>
          <div className="p-2">
            {status  ? (
              <div className="rounded-lg p-2">
                {
                   (status === 'FAIL') ? (<div> <p className="text-red-700 text-xl font-semibold">Status is {status}</p></div>) :
                    (<div><p className="text-green-700 text-xl font-semibold">Status is :{status}</p></div>)
                }
                
              </div>
            ) : (
              <div> N/A</div>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-center">
          {hashvalforsem != null ? (
            <div className="p-2">
            <div className="p-2 rounded-md  bg-slate-100">
              <h2 className="font-semibold">
                Hash of Result from BlockChain : <h3>{hashvalforsem}</h3>{" "}
              </h2>
            </div>
            </div>
          ) : (
            <div className="p-4 border border-red-300 flex justify-center"> 
            <h1> Error Loading Data from Block Chain. Please Contact Admin.</h1></div>
          )}
          {calcHash != null ? (
            <div className="p-2">
            <div className="p-2 rounded-md  bg-slate-100">
              <h2 className="font-semibold">
                Hash of Result from Database : <h3>{calcHash}</h3>{" "}
              </h2>
            </div>
            </div>
          ) : (
            <div></div>
          )}
          <div className="flex flex-col items-center">
          {
            (calcHash === hashvalforsem) ? (
              <div> <p className="text-green-700 text-xl font-semibold" > Matched Hash values. Data Secured</p> </div>
            ): (<div>
                  <p className="text-red-700 text-xl font-semibold" > Hash Values doesn't match. Data Might be Corrupted. </p>
            </div>)
          }
          </div>
        </div>
      </div>
    </>
  );
};

export default StuGrade;
