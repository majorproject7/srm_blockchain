import React, { useEffect, useState } from "react";
import Kmithead from "../DashBoard/KmitHeader";
import axios from "axios";
import { Link } from "react-router-dom";
const StudentManagementPage = () => {
  const [deptval, setDept] = useState(null);
  const [Ayear, setAyear] = useState(null);
  const [StuDet, setStuDetails] = useState(null);

  const handleBranchClick = (deptname) => {
    setDept(deptname);
  };
  const handleClick = async (ayear) => {
    setAyear(ayear);
  };

  useEffect(() => {
    if (deptval !== null && Ayear !== null) {
      const getdata = async () => {
        const data = { dept: deptval, Ayear: Ayear };

        setStuDetails(data);
        console.log("Student", StuDet);
      };
      getdata();
    }
  }, [Ayear]);

  return (
    <div>
      <Kmithead></Kmithead>
      {/* {StudentManagementPage(Sdata)} */}

      <div className="h-10 m-1  bg-blue-200 rounded-sm flex items-center justify-center">
        {" "}
        <h1 className="text-xl font-semibold">Student Management</h1>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col justify-evenly">
          <div className="w-[250px] h-8 text-lg bg-blue-200 rounded-sm m-1 flex justify-center ">
            <h2 className=" font-semibold text-xl">Branch</h2>
          </div>
          <div className="w-[250px] h-8 text-lg bg-blue-100 rounded-sm m-1 flex justify-center ">
            <button
              onClick={() => {
                handleBranchClick("CSE");
              }}
            >
              <h2 className=" font-semibold text-xl">CSE</h2>
            </button>
          </div>
          <div className="w-[250px] h-8 text-lg bg-blue-100 rounded-sm m-1 flex justify-center ">
            <button
              onClick={() => {
                handleBranchClick("CSM");
              }}
            >
              {" "}
              <h2 className=" font-semibold text-xl">CSM</h2>
            </button>
          </div>
          <div className="w-[250px] h-8 text-lg bg-blue-100 rounded-sm m-1 flex justify-center ">
            <button
              onClick={() => {
                handleBranchClick("CSD");
              }}
            >
              <h2 className=" font-semibold text-xl">CSD</h2>
            </button>{" "}
          </div>
          <div className="w-[250px] h-8 text-lg bg-blue-100 rounded-sm m-1 flex justify-center ">
            <button
              onClick={() => {
                handleBranchClick("IT");
              }}
            >
              {" "}
              <h2 className=" font-semibold text-xl">IT</h2>
            </button>
          </div>
        </div>

        {/* Year Panel */}
        <div className="flex flex-col justify-evenly">
          <div className="w-[250px] h-8 text-lg bg-blue-200 rounded-sm m-1 flex justify-center ">
            <h2 className=" font-semibold text-xl"> Academic Year</h2>
          </div>
          <div className="w-[250px] h-8 text-lg bg-blue-100 rounded-sm m-1 flex justify-center ">
            <button
              onClick={() => {
                handleClick(4);
              }}
            >
              <h2 className=" font-semibold text-xl">4 Year</h2>
            </button>
          </div>
          <div className="w-[250px] h-8 text-lg bg-blue-100 rounded-sm m-1 flex justify-center ">
            <button
              onClick={() => {
                handleClick(3);
              }}
            >
              {" "}
              <h2 className=" font-semibold text-xl">3 Year</h2>
            </button>
          </div>
          <div className="w-[250px] h-8 text-lg bg-blue-100 rounded-sm m-1 flex justify-center ">
            <button
              onClick={() => {
                handleClick(2);
              }}
            >
              <h2 className=" font-semibold text-xl">2 Year</h2>
            </button>{" "}
          </div>
          <div className="w-[250px] h-8 text-lg bg-blue-100 rounded-sm m-1 flex justify-center ">
            <button
              onClick={() => {
                handleClick(1);
              }}
            >
              {" "}
              <h2 className=" font-semibold text-xl">1 Year</h2>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center m-2">
        <div className="p-2 m-1  bg-amber-200 h-8 flex justify-center items-center rounded-sm">
          {deptval !== null ? (
            <div>
              <h1 className="text-xl font-semibold"> {deptval}</h1>
            </div>
          ) : (
            <div> Select Branch and Year</div>
          )}
        </div>

        <div>
          {Ayear !== null ? (
            <div className="w-[150px] m-1 bg-amber-200 h-8 flex justify-center items-center rounded-sm">
              <h1 className="text-xl font-semibold"> {Ayear}</h1>
            </div>
          ) : (
            <div></div>
          )}
        </div>

        {Ayear !== null && deptval !== null ? (
          <div>
            <div className="w-[300px] h-8 text-lg bg-blue-200 rounded m-1 flex justify-center ">
              <Link to="/StudentAdd" state={StuDet}>
                <h2 className=" font-semibold text-xl">Add Student</h2>
              </Link>{" "}
            </div>
            <div className="w-[300px] h-8 text-lg bg-blue-200 rounded m-1 flex justify-center ">
              <Link to="/StudentUpdate" state={StuDet}>
                <h2 className=" font-semibold text-xl">Update Student</h2>
              </Link>
            </div>
            <div className="w-[300px] h-8 text-lg bg-blue-200 rounded m-1 flex justify-center ">
              <Link to="/StudentRemove" state={StuDet}>
                {" "}
                <h2 className=" font-semibold text-xl">Remove Student</h2>
              </Link>{" "}
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default StudentManagementPage;
