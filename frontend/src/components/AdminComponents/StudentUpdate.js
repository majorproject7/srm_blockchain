import Kmithead from "../DashBoard/KmitHeader";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const StudentUpdatePage = () => {
  const location = useLocation();
  const data = location.state;
  const deptval = data.dept;
  const ayear = data.Ayear;
  const sections = ["A", "B"];
  const [StudentList, setStudent] = useState(null);
  const [selectedUserId, setSelectedUser] = useState(null);
  const [secVal, setSection] = useState("A");
  const [formData, setUserData] = useState({});
  useEffect(() => {
    if (selectedUserId !== null) {
      console.log("user is ", selectedUserId);
      const getuserform = async () => {
        const response = await axios.post(
          "http://localhost:5000/api/StudentRoute/getUserForm",
          { roll_no: selectedUserId }
        );
        console.log("data retrieved is ", response.data.StudentData);
        setUserData(response.data.StudentData);
      };
      getuserform();
    }
  }, [selectedUserId]);
  useEffect(() => {
    console.log("use effect called");
    const getlist = async () => {
      const StudentDataResponse = await axios.post(
        "http://localhost:5000/api/StudentRoute/getStudentDetails",
        { dept: deptval, section: secVal, year: ayear }
      );
      console.log("data list is ", StudentDataResponse.data.StudentList);
      setStudent(StudentDataResponse.data.StudentList);
    };
    getlist();
  }, [secVal]);

  const HandleClickSection = (section) => {
    setSection(section);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Confirm the new Details ");
    axios
      .post("http://localhost:5000/api/StudentRoute/UpdateStudent", formData)
      .then((response) => {
        console.log(response.data.message);
        alert(response.data.message);
        setSelectedUser(null);
       
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };
  const handleUserSelect = async (userId) => {
    console.log("user selected button ", userId);
    await setSelectedUser(userId);
    console.log("user selected ", selectedUserId);
  };

  return (
    <div>
      <Kmithead></Kmithead>
      <div className=" h-10 flex justify-center items-center bg-blue-100 m-2">
        <h1 className="text-xl font-semibold"> Student Update Section</h1>{" "}
      </div>
      <div className="m-2 flex justify-center items-center bg-blue-200">
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
      <div>
        {StudentList !== null && StudentList.length !== 0 ? (
          <div align="center">
          <div className="w-[800px] flex flex-row  m-2 p-1 justify-evenly items-center ">
            <div >
              {" "}
              {StudentList.map((Student) => (
                <div className="border border-blue-200 px-1 mb-1 ">
                  {" "}
                  <div className="flex flex-row p-1 m-1">
                    <h1>{Student.roll_no}</h1></div>
                 
                </div>
              ))}
            </div>
            <div>
              {" "}
              {StudentList.map((Student) => (
                <div className="border  border-blue-200 px-1 mb-1">
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
                      className="bg-blue-300 p-1 m-1 rounded-md shadow-md shadow-blue-200"
                      onClick={() => {
                        handleUserSelect(Student.roll_no);
                      }}
                    >
                      Update
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
        {/* student form */}
        <div>
          {selectedUserId !== null ? (
            <div>
              <div className="mx-4 max-w-md p-4 bg-blue-300 border rounded-md shadow-md">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Academic Year
                    </label>
                    <input
                      type="text"
                      id="Ayear"
                      name="Ayear"
                      value={formData.Ayear}
                      onChange={handleInputChange}
                      className="mt-1 p-2 w-full border rounded-md"
                      required
                      disabled
                    >
                      
                    </input>
                  </div>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-1 p-2 w-full border rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 p-2 w-full border rounded-md"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Date Of Birth
                    </label>
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      className="mt-1 p-2 w-full border rounded-md"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="branch"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Branch
                    </label>
                    <input
                      id="branch"
                      name="branch"
                      value={formData.branch}
                      onChange={handleInputChange}
                      disabled
                      className="mt-1 p-2 w-full border rounded-md"
                    >
                      
                    </input>
                  </div>

                  <div>
                    <label
                      htmlFor="section"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Section
                    </label>
                    <select
                      id="section"
                      name="section"
                      value={formData.section}
                      onChange={handleInputChange}
                      className="mt-1 p-2 w-full border rounded-md"
                      required
                    >
                      {sections.map((branch) => (
                        <option key={branch} value={branch}>
                          {branch}
                        </option>
                      ))}
                      {/* Add options for other sections */}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-600"
                    >
                      Roll_No/Student_id
                    </label>
                    <input
                      type="text"
                      id="roll"
                      name="roll_no"
                      value={formData.roll_no}
                      onChange={handleInputChange}
                      className="mt-1 p-2 w-full border rounded-md"
                      required
                      disabled
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                  >
                    Submit
                  </button>
                </form>
              </div>{" "}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};
export default StudentUpdatePage;
