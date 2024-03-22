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
  const [adminIdRemove, setAdminId] = useState("");
  const [AdminList, setAdmin] = useState(null);
  useEffect(() => {
    console.log("use effect called");
    const getlist = async () => {
      const AdminDataResponse = await axios.post(
        "http://localhost:5000/api/StudentRoute/getStudentDetails",
        { dept: deptval, section: secVal, year: ayear }
      );
      console.log(AdminDataResponse.data.StudentList);
      setAdmin(AdminDataResponse.data.StudentList);
    };
    getlist();
  }, [secVal]);

  const HandleClickSection = (section) => {
    setSection(section);
  };
  const handleDeleteClick = (userId) => {
    setAdminId(userId);

    setShowAlert(true);
    console.log("user is ", adminIdRemove);
  };

  const deleteUser = async () => {
    try {
      console.log("deleteduser ", adminIdRemove);
      const response = await axios.post(
        "http://localhost:5000/api/StudentRoute/removeStudent",
        { id: adminIdRemove }
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
        {showAlert && adminIdRemove != null && (
          <div className="confirmation-dialog justify-center">
            <p>Are you sure you want to delete {adminIdRemove} ?</p>
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
          {AdminList !== null && AdminList.length !== 0 ? (
            AdminList.map((Admin) => (
              <div className="flex flex-col-3 h-10 m-2 p- justify-evenly items-center border border-red-400">
                <div className="p-1 m-1">{Admin.name}</div>
                <div className="p-1 m-1">{Admin.roll_no}</div>
                <div>
                  <button
                    className="bg-red-300 p-1 m-1 rounded-md"
                    onClick={() => {
                      handleDeleteClick(Admin.roll_no);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div>No Data Found</div>
          )}
        </div>
      </div>
    </div>
  );
};
export default StudentRemovePage;
