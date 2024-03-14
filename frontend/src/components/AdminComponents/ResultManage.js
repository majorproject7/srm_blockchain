import Kmithead from "../DashBoard/KmitHeader";
import { useState, useEffect } from "react";
import axios from "axios";

const ResultManagementPage = () => {
  const [dept, setDept] = useState(null);
  const [Ayear, setAyear] = useState(null);
  const [sem, setSem] = useState(null);
  const [ResultList, setResult] = useState(null);
  const handleClick = (dept) => {
    setDept(dept);
    setAyear(null);
    setResult(null);
  };

  const handleYearClick = (year) => {
    setAyear(year);
    setResult(null);
    
  };
  const handleSemClick = (sem) => {
    setSem(sem);
  };

  const handlePublish= async ()=>{
    alert("please wait Publishing result")
            const data={deptval : dept,semval : sem,Published : true}  ;
            const response = await axios.post("http://localhost:5000/api/AdminRoute/PublishResult",data);
            //console.log(response); 
            alert(response.data.message);         

  }

  const handleHideResult= async ()=>{
    alert("please wait Publishing result")
            const data={deptval : dept,semval : sem, Published : false}  ;
            const response = await axios.post("http://localhost:5000/api/AdminRoute/PublishResult",data);
            //console.log(response);  
            alert(response.data.message);        

  }

  useEffect(() => {
    if (sem !== null) {
      const getResultData = async () => {
        
        const response = await axios.post(
          "http://localhost:5000/api/AdminRoute/getResultPublishStatusList",
          { deptval: dept, semval: sem }
        );
        console.log(response.data.ResultData);
        setResult(response.data.ResultData);
      };
      getResultData();
    }
  }, [sem]);

  return (
    <div>
      <Kmithead></Kmithead>
      <div className="flex justify-center m-1  bg-blue-100">
        <h1 className="text-lg "> Result Management Section</h1>
      </div>
      <div className="flex justify-center ml-4">
        {/* branch selection */}
        <div className="w-[350px] m-1 flex flex-col justify-evenly">
          <div className="w-[300px] m-1 h-6 text-lg bg-blue-200 rounded-md flex justify-center items-center">
            <h2 className=" font-semibold text-lg">Branch</h2>
          </div>
          <div className="w-[300px] m-1 h-6 text-lg bg-blue-100 rounded-md flex justify-center items-center hover:bg-blue-200">
            <button
              onClick={() => {
                handleClick("CSE");
              }}
            >
              <h2 className=" font-semibold text-lg">CSE</h2>
            </button>
          </div>
          <div className="w-[300px] m-1 h-6 text-lg bg-blue-100 rounded-md flex justify-center items-center hover:bg-blue-200">
            <button
              onClick={() => {
                handleClick("CSM");
              }}
            >
              {" "}
              <h2 className=" font-semibold text-lg">CSM</h2>
            </button>
          </div>
          <div className="w-[300px] m-1 h-6 text-lg bg-blue-100 rounded-md flex justify-center items-center hover:bg-blue-200">
            <button
              onClick={() => {
                handleClick("CSD");
              }}
            >
              <h2 className=" font-semibold text-lg">CSD</h2>
            </button>{" "}
          </div>
          <div className="w-[300px] m-1  h-6 text-lg bg-blue-100 rounded-md flex justify-center items-center hover:bg-blue-200">
            <button
              onClick={() => {
                handleClick("IT");
              }}
            >
              {" "}
              <h2 className=" font-semibold text-lg">IT</h2>
            </button>
          </div>
        </div>

        {/* Year Selection */}

        <div className="w-[350px] m-1  flex flex-col justify-evenly">
          <div className="w-[300px] h-6  m-1  text-lg bg-blue-200 rounded-md flex justify-center items-center">
            <h2 className=" font-semibold text-lg">Year</h2>
          </div>
          <div className="w-[300px] h-6 m-1  text-lg bg-blue-100 rounded-md flex justify-center items-center hover:bg-blue-200">
            <button
              onClick={() => {
                handleYearClick(4);
              }}
            >
              <h2 className=" font-semibold text-lg">4</h2>
            </button>
          </div>
          <div className="w-[300px] h-6 m-1 text-lg bg-blue-100 rounded-md flex justify-center items-center hover:bg-blue-200">
            <button
              onClick={() => {
                handleYearClick(3);
              }}
            >
              {" "}
              <h2 className=" font-semibold text-lg">3</h2>
            </button>
          </div>
          <div className="w-[300px] h-6 m-1 text-lg bg-blue-100 rounded-md flex justify-center items-center hover:bg-blue-200">
            <button
              onClick={() => {
                handleYearClick(2);
              }}
            >
              <h2 className=" font-semibold text-lg">2</h2>
            </button>{" "}
          </div>
          <div className="w-[300px] h-6 m-1 text-lg bg-blue-100 rounded-md flex justify-center items-center hover:bg-blue-200">
            <button
              onClick={() => {
                handleYearClick(1);
              }}
            >
              {" "}
              <h2 className=" font-semibold text-lg">1</h2>
            </button>
          </div>
        </div>
      </div>
      {/* branch and year end*/}

      <div>
        <div className="my-4 flex justify-center items-center">
          {dept && (
            <div className="w-[100px] flex justify-center bg-amber-200 px-2 m-1 ">
              <h1 className="text-lg "> {dept}</h1>
            </div>
          )}

          {Ayear && (
            <div className="w-[100px] flex justify-center bg-amber-200 px-2 m-1">
              <h1 className="text-lg "> {Ayear}</h1>
            </div>
          )}
        </div>
      </div>

      <div>
        <div className="my-2 flex justify-center items-center">
          {Ayear === 4 && (
            <>
              <button
                onClick={() => {
                  handleSemClick(7);
                }}
              >
                {" "}
                <div className="w-[100px] flex justify-center bg-yellow-200 px-2 m-1 rounded-md hover:bg-green-300 ">
                  7
                </div>
              </button>
              <button
                onClick={() => {
                  handleSemClick(8);
                }}
              >
                <div className="w-[100px] flex justify-center bg-yellow-200 px-2 m-1 rounded-md hover:bg-green-300 ">
                  8
                </div>
              </button>
            </>
          )}
          {Ayear === 3 && (
            <>
              <button
                onClick={() => {
                  handleSemClick(6);
                }}
              >
                <div className="w-[100px] flex justify-center bg-yellow-200 px-2 m-1 rounded-md hover:bg-green-300">
                  6
                </div>
              </button>
              <button
                onClick={() => {
                  handleSemClick(5);
                }}
              >
                <div className="w-[100px] flex justify-center bg-yellow-200 px-2 m-1 rounded-md hover:bg-green-300">
                  5
                </div>
              </button>
            </>
          )}
          {Ayear === 2 && (
            <>
              <div className="w-[100px] flex justify-center bg-yellow-200 px-2 m-1 rounded-md hover:bg-green-300 ">
                <button
                  onClick={() => {
                    handleSemClick(3);
                  }}
                >
                  {" "}
                  3
                </button>
              </div>
              <button
                onClick={() => {
                  handleSemClick(4);
                }}
              >
                {" "}
                <div className="w-[100px] flex justify-center bg-yellow-200 px-2 m-1 rounded-md hover:bg-green-300">
                  4
                </div>
              </button>
            </>
          )}
          {Ayear === 1 && (
            <>
              <button
                onClick={() => {
                  handleSemClick(1);
                }}
              >
                {" "}
                <div className="w-[100px] flex justify-center bg-yellow-200 px-2 m-1 rounded-md hover:bg-green-300">
                  1
                </div>
              </button>
              <button
                onClick={() => {
                  handleSemClick(2);
                }}
              >
                {" "}
                <div className="w-[100px] flex justify-center bg-yellow-200 px-2 m-1 rounded-md hover:bg-green-300">
                  2
                </div>
              </button>
            </>
          )}
        </div>
      </div>
        

       <div className="flex justify-center">
         <button className="bg-green-200 px-4 py-1 rounded-sm m-1" onClick={()=>{handlePublish()}}> <h1> Publish Result</h1></button>
       </div>
       <div className="flex justify-center">
         <button className="bg-red-300 px-4 py-1 rounded-sm m-1" onClick={()=>{handleHideResult()}}> <h1> conceal Result</h1></button>
       </div>

        {/* Student Result section  */}
      <div>
        <div className=" flex justify-center  ">
          <div className="w-[500px] ">
            {ResultList !== null && ResultList.length !== 0 && (
              <div className=" flex flex-col justify-center items-center ">
                <div className="flex flex-row justify-center items-center my-2 border border-blue-400 p-1">
                  <div className="mr-4 ml-4 ">
                    <h1>Roll_No</h1>
                  </div>
                  <div className="ml-16 ">
                    <h1>SGPA</h1>
                  </div>
                  <div className="ml-8 mr-2 ">
                    <h1>Status</h1>
                  </div>
                  <div className="ml-2 mr-2">
                    <h1>Publish Status</h1>
                  </div>
                </div>
                {ResultList.map((stu, index) => (
                  <div
                    className="w-[400px] flex flex-row my-1 justify-evenly items-center border border-blue-300 p-1 "
                    key={index}
                  >
                    <div className="mr-8 ml-4 ">
                      <h1>{stu.roll_no}</h1>
                    </div>
                    <div className="mr-4 ml-2 ">
                      <h1>{stu.SGPA}</h1>
                    </div>
                    <div className="mx-4 ">
                      <h1>{stu.ExamStatus}</h1>
                    </div>
                    <div className="mr-10 ml-6 ">
                      <h1>{String(stu.Published).toLocaleUpperCase()}</h1>
                    </div>
                  </div>
                ))}{" "}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultManagementPage;
