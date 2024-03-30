import Kmithead from "../DashBoard/KmitHeader";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
const StudentRemovePage = () => {
  const location = useLocation();
  const data = location.state;
  const deptval = data.dept;
  const ayear = data.Ayear;

  const [secVal, setSection] = useState("A");
  const [showAlert, setShowAlert] = useState(false);
  const [StudentIdRemove, setStudentId] = useState("");
  const [StudentList, setStudents] = useState(null);
  useEffect(() => {
    console.log("use effect called");
    const getlist = async () => {
      const StudentDataResponse = await axios.post(
        "http://localhost:5000/api/StudentRoute/getStudentDetails",
        { dept: deptval, section: secVal, year: ayear }
      );
      console.log(StudentDataResponse.data.StudentList);
      setStudents(StudentDataResponse.data.StudentList);
    };
    getlist();
  }, [secVal]);

  const HandleClickSection = (section) => {
    setSection(section);
  };
  const handleDeleteClick = (userId) => {
    setStudentId(userId);

    setShowAlert(true);
    console.log("user is ", StudentIdRemove);
  };

  const deleteUser = async () => {
    try {
      console.log("deleteduser ", StudentIdRemove);
      const response = await axios.post(
        "http://localhost:5000/api/StudentRoute/removeStudent",
        { id: StudentIdRemove }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setShowAlert(false);
    }
  };

  const handleConfirmDelete = () => {
    deleteUser();
    setShowAlert(false);
  };

  const handleCancelDelete = () => {
    setShowAlert(false);
  };

  return (
    <div>
      <Kmithead></Kmithead>
      <div className=" h-10 flex justify-center items-center bg-red-200 m-2">
        {" "}
        <h1 className="text-xl font-semibold"> Student Removal Section</h1>{" "}
      </div>
      <div className="m-2 flex justify-center items-center bg-red-200">
        {" "}
        <h1 className="m-1 text-lg font-semibold">{deptval} </h1>{" "}
        <h1 className="m-1 text-lg font-semibold">{ayear} Year</h1>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => {
            HandleClickSection("A");
          }}
          className="w-[100px] bg-amber-100 m-1"
        >
          {" "}
          <h1 className="p-1 text-xl">A</h1>
        </button>
        <button
          onClick={() => {
            HandleClickSection("B");
          }}
          className="w-[100px] bg-amber-100 m-1 "
        >
          {" "}
          <h1 className="p-1 text-xl">B</h1>
        </button>
      </div>
      <div className="flex justify-center">
        {/* Confirmation dialog */}
        {showAlert && StudentIdRemove != null && (
          <div className=" flex flex-col confirmation-dialog justify-center items-center">
            <p>Confirm deletion of  {StudentIdRemove} ?</p>
            <p className="text-red-500">This action cannot be reversed</p>
            <div className="flex justify-center">
              {" "}
              <button
                onClick={handleConfirmDelete}
                className="p-1 bg-red-300 rounded-md m-1"
              >
                Confirm
              </button>
              <button
                onClick={handleCancelDelete}
                className="p-1 bg-green-200 rounded-md m-1"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      <div>
      <div>
        {StudentList !== null && StudentList.length !== 0 ? (
          <div align="center">
          <div className="w-[800px] flex flex-row  m-2 p-1 justify-evenly items-center ">
            <div >
              {" "}
              {StudentList.map((Student) => (
                <div className="border border-red-200 px-1 mb-1 ">
                  {" "}
                  <div className="flex flex-row p-1 m-1">
                    <h1>{Student.roll_no}</h1></div>
                 
                </div>
              ))}
            </div>
            <div>
              {" "}
              {StudentList.map((Student) => (
                <div className="border  border-red-200 px-1 mb-1">
                  {" "}
                  <div className="p-1 m-1">{Student.name}</div>
                 
                </div>
              ))}
            </div>
           
            <div>
              {" "}
              {StudentList.map((Student) => (
                <div>
                 
                  <div  className=" px-1 mb-1">
                    <button
                      className="bg-red-300 p-1 m-1 rounded-md shadow-md shadow-red-200"
                      onClick={() => {
                        handleDeleteClick(Student.roll_no);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div> ) : (
          <div>No Data Found</div>
        )}
      </div>
      </div>
    </div>
  );
};
export default StudentRemovePage;
