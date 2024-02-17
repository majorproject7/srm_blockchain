import { React, useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
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
        const response = await axios.post(
          "http://localhost:5000/api/StudentRoute/simple",
          formdata
        );
        const subjectlist = await axios.post(
          "http://localhost:5000/api/TeacherRoute/getSubjects",
          { semnum: sem_num, branch: branchdep }
        );
        const gradelist = await axios.post(
          "http://localhost:5000/api/StudentRoute/getResults",
          { sem: sem_num, roll_no: rollno }
        );
        const resHash = await axios.post(
          "http://localhost:5000/api/StudentRoute/getResultHash",
          { semnum: sem_num, roll_no: rollno }
        );

        setCalcHash(resHash.data.message);
        setSubjects(subjectlist.data.subjectlist);
        setHashVal(response.data.data);
        setGrades(gradelist.data.data.GradesList);
        setSGPA(gradelist.data.data.SGPA);
        setExamStatus(gradelist.data.data.ExamStatus);
      } catch (error) {
        alert(error);
      }
    }

    fetchHashval();
  }, [rollno]);

  return (
    <>
      <div align="center">
        <div className="w-[min] h-[50px] flex justify-center mix-blend-darken bg-yellow-400 rounded-[30px] shadow">
          <div className="w-[min] h-[50px] text-black text-[32px] font-semibold font-sans flex justify-center items-center ">
            keshav memorial Institute of technology
          </div>
        </div>
      </div>
      <div className=" flex flex-col items-center">
        <div className="">
          <h1 className="text-lg font-sans font-semibold">
            {" "}
            Roll_No : {rollno} SEM RESULTS : {sem_num}{" "}
          </h1>
        </div>
        <div className=" p-2 flex justify-center border-black border-2">
          <div className="w-[160px] h-10 text-lg  rounded-[15px] flex justify-center">
            {" "}
            Subject Code{" "}
          </div>
          <div className="w-[260px] h-10 text-lg  rounded-[15px] flex justify-center">
            {" "}
            Subject{" "}
          </div>
          <div className="w-[260px] h-10 text-lg  rounded-[15px] flex justify-center">
            {" "}
            Grade{" "}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col-2 border-black border justify-center ">
          <div>
            {subjects ? (
              subjects.map((subject) => (
                <div className="p-2 flex flex-row-2 justify-center border-black border">
                  <div className="w-[150px] h-12 text-lg bg-blue-300 rounded-[15px] flex justify-center items-center">
                    {subject.SubCode}{" "}
                  </div>
                  <div className="w-[260px] py-2 text-lg bg-green-300 rounded-[15px] flex justify-center">
                    {subject.Name}{" "}
                  </div>
                </div>
              ))
            ) : (
              <div>no data</div>
            )}
          </div>
          <div className="flex flex-col border-black border justify-center">
            {grades ? (
              grades.map((subject) => (
                <div className="p-2 flex flex-col justify-center  border-black border">
                  <div className="w-[250px] py-3 text-lg bg-green-300 rounded-[15px] flex justify-center ">
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
                   (status === 'FAIL') ? (<div> <p className="text-red-700 font-semibold">Status is {status}</p></div>) :
                    (<div><p className="text-green-700 text-xl font-semibold">Status :{status}</p></div>)
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
              <h2>
                Hash of Result from BlockChain : <h3>{hashvalforsem}</h3>{" "}
              </h2>
            </div>
            </div>
          ) : (
            <div></div>
          )}
          {calcHash != null ? (
            <div className="p-2">
            <div className="p-2 rounded-md  bg-slate-100">
              <h2>
                Hash of Result from Result : <h3>{calcHash}</h3>{" "}
              </h2>
            </div>
            </div>
          ) : (
            <div></div>
          )}
          <div className="flex flex-col items-center">
          {
            (calcHash === hashvalforsem) ? (
              <div> <p className="text-green-700" > Matched </p> </div>
            ): (<div>
                  <p className="text-red-700" > Not Matched </p>
            </div>)
          }
          </div>
        </div>
      </div>
    </>
  );
};

export default StuGrade;
