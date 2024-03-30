import Kmithead from "../DashBoard/KmitHeader";
import { useState, useEffect } from "react";
import axios from "axios";
const FacultyDetailsUpdate = () => {
  const [FacultyList, setFaculty] = useState(null);
  const [selectedUserId, setSelectedUser] = useState(null);

  const [formData, setUserData] = useState({});
  useEffect(() => {
    console.log("use effect called");
    const getlist = async () => {
      const FacultyDataResponse = await axios.get(
        "http://localhost:5000/api/TeacherRoute/getFacultyDetails"
      );
      console.log(FacultyDataResponse.data.FacData);
      setFaculty(FacultyDataResponse.data.FacData);
    };
    getlist();
  }, []);

  useEffect(() => {
    if (selectedUserId !== null) {
      console.log("user is ", selectedUserId);
      const getuserform = async () => {
        const response = await axios.post(
          "http://localhost:5000/api/TeacherRoute/getUserForm",
          { faculty_id: selectedUserId }
        );
        console.log("data retrieved is ", response.data.facdata);
        setUserData(response.data.facdata);
      };
      getuserform();
    }
  }, [selectedUserId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Confirm the new Details ");
    axios
      .post("http://localhost:5000/api/TeacherRoute/UpdateFaculty", formData)
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
    <>
      <Kmithead></Kmithead>
      <div>
      <div className="h-10 bg-orange-100 flex justify-center items-center">
        <h1 className="font-semibold text-xl">
          Faculty Details Update Section
        </h1>
      </div>
      </div>
      <div>
        {FacultyList !== null && FacultyList.length !== 0 ? (
          <div align="center">
          <div className="w-[800px] flex flex-row  m-2 p-1 justify-evenly items-center ">
            <div >
              {" "}
              {FacultyList.map((Faculty) => (
                <div className="border border-blue-200 px-1 mb-1 ">
                  {" "}
                  <div className="flex flex-row p-1 m-1">
                    <h1>{Faculty.faculty_id}</h1></div>
                 
                </div>
              ))}
            </div>
            <div>
              {" "}
              {FacultyList.map((Faculty) => (
                <div className="border  border-blue-200 px-1 mb-1">
                  {" "}
                  <div className="p-1 m-1">{Faculty.name}</div>
                 
                </div>
              ))}
            </div>
            <div>
              {" "}
              {FacultyList.map((Faculty) => (
                <div className="border  border-blue-200 px-1 mb-1">
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
                      className="bg-blue-300 p-1 m-1 rounded-md shadow-md shadow-blue-200"
                      onClick={() => {
                        handleUserSelect(Faculty.faculty_id);
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
      <div>
        {selectedUserId != null ? (
          <div className="mx-auto max-w-md p-4 bg-blue-300 border rounded-md shadow-md">
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  htmlFor="faculty_id"
                  className="block text-sm font-medium text-gray-600"
                >
                  Faculty_id
                </label>
                <input
                  type="text"
                  id="faculty_id"
                  name="faculty_id"
                  disabled
                  value={formData.faculty_id}
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
                  htmlFor="dob"
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
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="contact"
                  className="block text-sm font-medium text-gray-600"
                >
                  contact
                </label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  maxLength={10}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="department_id"
                  className="block text-sm font-medium text-gray-600"
                >
                  Department_id
                </label>
                <select
                  type="text"
                  id="department_id"
                  name="department_id"
                  value={formData.department_id}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                >
                  <option value="CSM">CSM </option>
                  <option value="CSD">CSD</option>
                  <option value="CSE">CSE </option>
                  <option value="IT">IT </option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="qualification"
                  className="block text-sm font-medium text-gray-600"
                >
                  Highest Qualification
                </label>
                <select
                  type="text"
                  id="qualification"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                >
                  <option value="M.Tech">M.Tech</option>
                  <option value="PhD in CS">PhD in CS</option>
                  <option value="M.Sc">M.Sc</option>
                  <option value="MCA">MCA</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="passwd"
                  className="block text-sm font-medium text-gray-600"
                >
                  Login Password
                </label>
                <input
                  type="text"
                  id="passwd"
                  name="login_pwd"
                  value={formData.login_pwd}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                Submit
              </button>
            </form>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default FacultyDetailsUpdate;
