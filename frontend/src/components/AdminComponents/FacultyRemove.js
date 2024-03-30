import Kmithead from "../DashBoard/KmitHeader";
import { useState, useEffect } from "react";
import axios from "axios";
const FacultyRemovalPage = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [FacultyIdRemove, setFacultyId] = useState("");
  const [FacultyList, setFaculty] = useState(null);
  useEffect(() => {
   
    const getlist = async () => {
      const FacultyDataResponse = await axios.get(
        "http://localhost:5000/api/TeacherRoute/getFacultyDetails"
      );
      console.log(FacultyDataResponse.data.FacData);
      setFaculty(FacultyDataResponse.data.FacData);
    };
    getlist();
  }, []);

  const deleteUser = async () => {
    try {
      
      const response = await axios.post(
        "http://localhost:5000/api/TeacherRoute/removeFaculty",
        { id: FacultyIdRemove }
      ); 
      alert(response.data.message);
    } catch (error) {
      console.error("Error deleting user:", error);
      
    } finally {
      setShowAlert(false); 
    }
  };

  const handleDeleteClick = (userId) => {
    setFacultyId(userId);

    setShowAlert(true);
    console.log("user is ", FacultyIdRemove); 
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
      <div className="h-10 m-2 bg-red-100 flex flex-row justify-center items-center rounded-sm">
        {" "}
        <h1 className="text-xl font-semibold"> Faculty Removal Section </h1>
      </div>
      <div>
        {FacultyList !== null && FacultyList.length !== 0 ? (
          <div align="center">
          <div className="w-[800px] flex flex-row  m-2 p-1 justify-evenly items-center ">
            <div >
              {" "}
              {FacultyList.map((Faculty) => (
                <div className="border border-red-200 px-1 mb-1 ">
                  {" "}
                  <div className="flex flex-row p-1 m-1">
                    <h1>{Faculty.faculty_id}</h1></div>
                 
                </div>
              ))}
            </div>
            <div>
              {" "}
              {FacultyList.map((Faculty) => (
                <div className="border  border-red-200 px-1 mb-1">
                  {" "}
                  <div className="p-1 m-1">{Faculty.name}</div>
                 
                </div>
              ))}
            </div>
            <div>
              {" "}
              {FacultyList.map((Faculty) => (
                <div className="border  border-red-200 px-1 mb-1">
                  {" "}
                  <div className="p-1 m-1">{Faculty.department_id}</div>
                 
                </div>
              ))}
            </div>
            <div>
              {" "}
              {FacultyList.map((Faculty) => (
                <div>
                 
                  <div  className=" px-1 mb-1">
                    <button
                      className="bg-red-300 p-1 m-1 rounded-md shadow-md shadow-red-200"
                      onClick={() => {
                        handleDeleteClick(Faculty.faculty_id);
                      }}
                    >
                      remove
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
      <div className="flex justify-center">
        {/* Confirmation dialog */}
        {showAlert && FacultyIdRemove != null && (
          <div className="confirmation-dialog justify-center">
            <h1 className="text-xl">Confirm  deletion of  {FacultyIdRemove} ?</h1>
            <div className="flex justify-center">
              {" "}
              <button
                onClick={handleConfirmDelete}
                className="p-1 bg-red-300 rounded-md mt-1"
              >
               <h1 className="text-xl"> Confirm</h1>
              </button>
              <button
                onClick={handleCancelDelete}
                className="p-1 bg-green-200 rounded-md ml-1 mt-1"
              >
                 <h1 className="text-xl"> Cancel</h1>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultyRemovalPage;
