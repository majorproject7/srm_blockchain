import { React, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Kmithead from "./KmitHeader";
const HomePage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    rollno: "",
    dob: "",
    faculty_id: "",
    fc_pass: "",
    admin_id: "",
    passwd: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleStuSubmit = async (event) => {
    console.log("data from student submitted");
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/StudentRoute/login",
        formData
      );

      if (response.data.success) {
        navigate("/studashboard", {
          state: { StudentLogin: response.data.StudentData },
        });
        alert(response.data.message);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      if (formData.rollno === "") {
        alert("Database not active");
      }
     
      console.error("Login error:", error);
    }
  };

  const handleAdminSubmit = async (event) => {
    console.log("data from student submitted");
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/AdminRoute/login",
        formData
      );

      if (response.data.success) {
        navigate("/AdminDash", {
          state: { AdminLogin: response.data.AdminData },
        });
        alert(response.data.message);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      if (formData.admin_id === "") {
        alert("Database not active");
      }
     
      console.error("Login error:", error);
    }
  };

  const handleSubmit = async (event) => {
    console.log("data from Teacher form submitted");
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/TeacherRoute/login",
        formData
      );

      if (response.data.success) {
        navigate("/TeacherDashBoard", {
          state: { faculty: response.data.facultydata },
        });
        alert(response.data.message);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      
      console.error("Login error:", error);
    }
  };

  return (
    <>

      <Kmithead></Kmithead>

      <div className="flex justify-center items-center">
      <div className=" w-[600px] flex justify-center mt-5  shadow-amber-200 shadow-md"><h1 className="text-xl font-semibold  p-2">Student Result Management System</h1></div>
      </div>
      <div className=" min-h-screen flex flex-row items-center justify-center ">
       
        <div className=" p-10 flex flex-row   justify-center rounded-[30px]">
          <div className="  justify-center text-center">
            <div className=" border-amber-300 border-4 mx-1 my-2 w-[230px] h-[380px]   shadow-white shadow-md bg-amber-200 rounded-[30px]  flex items-center ">
              <form onSubmit={handleStuSubmit}>
                <h2 className="text-lg font-semibold"> Student Login</h2>
                <br></br>
                <label>
                  Student Roll No / Id :
                  <input
                    type="text"
                    name="rollno"
                    value={formData.rollno}
                    onChange={handleChange}
                    className="rounded-lg"
                  ></input>
                </label>
                <br></br>
                <label>
                  DOB<br></br>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="rounded-lg"
                  ></input>
                </label>
                <br></br>

                <button type="submit">submit</button>
              </form>
            </div>
          </div>

         

          <div className="  justify-center text-center">
            <div className="border-blue-400 border-4   mx-1 my-2 w-[230px] h-[380px] shadow-white shadow-md   bg-blue-300 rounded-[30px]  flex items-center ">
              <form onSubmit={handleSubmit}>
                <h2 className="text-lg font-semibold"> Faculty Login</h2>
                <br></br>
                <label>
                  Faculty Id :
                  <input
                    type="text"
                    id="faculty_id"
                    name="faculty_id"
                    value={formData.faculty_id}
                    onChange={handleChange}
                    className="rounded-lg"
                  ></input>
                </label>
                <br></br>
                <label>
                  Password<br></br>
                  <input
                    type="password"
                    id="fc_pass"
                    name="fc_pass"
                    value={formData.fcpass}
                    onChange={handleChange}
                    className="rounded-lg"
                  ></input>
                </label>
                <br></br>

                <button type="submit">submit</button>
              </form>
            </div>
          </div>

       

          <div className="  justify-center text-center">
            <div className="border-green-400 border-4   mx-1 my-2 w-[230px] h-[380px] shadow-white shadow-md  bg-green-200 rounded-[30px]  flex items-center ">
              <form onSubmit={handleAdminSubmit}>
                <h2 className="text-lg font-semibold"> Admin Login</h2>
                <br></br>
                <label>
                  Admin/Id:
                  <input
                    type="text"
                    name="admin_id"
                    id="admin_id"
                    value={formData.admin_id}
                    onChange={handleChange}
                    className="rounded-lg"
                  ></input>
                </label>
                <br></br>
                <label>
                  Password<br></br>
                  <input
                    type="password"
                    name="passwd"
                    value={formData.passwd}
                    onChange={handleChange}
                    className="rounded-lg"
                  ></input>
                </label>
                <br></br>

                <button type="submit">submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
