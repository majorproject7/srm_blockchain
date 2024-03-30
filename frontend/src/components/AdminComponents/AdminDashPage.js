import Kmithead from "../DashBoard/KmitHeader";
import { Link } from "react-router-dom";

import { useLocation } from "react-router-dom";
function AdminDash() {
  const location = useLocation();
  const adminData = location.state.AdminLogin;
  console.log(adminData);

  return (
    <>
      <Kmithead></Kmithead>
      <div className="flex flex-row justify-center">
        <div className=" w-[600px] flex justify-center h-8 bg-blue-300 items-center m-1 shadow-md shadow-blue-200"><h1 className="text-xl m-2"> Admin DashBoard</h1></div> 
      </div>
      <div>
        <div align="center" className=" grid grid-cols-1 justify-items-center">
          <div>{AdminDetCard(adminData)}</div>

          <div
            align="center"
            className=" p-3 grid grid-cols-1   justify-items-center"
          >
            <div className="w-[320px]   flex flex-col justify-evenly items-center">
              <div className="w-[320px] h-10 text-lg m-1  bg-cyan-500 rounded-md flex justify-center items-center">
                <Link to="/facultyManage">
                  {" "}
                  <h2 className="text-white font-semibold">
                    Faculty Management
                  </h2>
                </Link>
              </div>

              <div className="w-[320px] h-10 text-lg m-1 bg-cyan-500 rounded-md flex justify-center items-center">
                <Link to="/StudentManagePage">
                  {" "}
                  <h2 className="text-white font-semibold">
                    Student Management
                  </h2>
                </Link>
              </div>

              <div className="w-[320px] h-10 text-lg m-1 bg-cyan-500 rounded-md flex justify-center items-center ">
                <Link to="/AdminManage">
                  {" "}
                  <h2 className="text-white font-semibold">Admin Management</h2>
                </Link>
              </div>
 
              <div className="w-[320px] h-10 text-lg m-1 bg-cyan-500 rounded-md flex justify-center items-center ">
                <Link to="/ResultManagePage">
                  {" "}
                  <h2 className="text-white font-semibold">Result Management</h2>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const AdminDetCard = (stuCardData) => {
  const StudentInfo = stuCardData;
  return (
    <div className=" flex flex-col-1 justify-center items-center">
      <div className=" w-[200px] h-[200px] text-lg flex flex-col ">
        <img
          src={StudentInfo.image}
          alt="image"
          className="rounded-[100px] shadow shadow-md shadow-blue-400"
        ></img>
      </div>

      <div className="m-2 flex flex-col-2 justify-center items-center">
        <div className=" flex flex-col justify-center items-center">
          <div className="w-[150px] h-10 text-lg my-1 bg-blue-100 flex justify-center items-center">
            Name{" "}
          </div>
          <div className="w-[150px] h-10 text-lg  my-1 bg-blue-100  flex justify-center items-center">
            Email{" "}
          </div>
          <div className="w-[150px] h-10 text-lg my-1 bg-blue-100  flex justify-center items-center">
            contact{" "}
          </div>
          <div className="w-[150px] h-10 text-lg  my-1 bg-blue-100 flex justify-center items-center">
           admin_id{" "}
          </div>
        </div>

        <div className=" flex flex-col  justify-center items-center">
          <div className="w-[250px] h-10 text-lg bg-green-300  my-1 flex justify-center items-center">
            {StudentInfo.name}{" "}
          </div>
          <div className="w-[250px] h-10 text-lg  bg-green-300 my-1 flex justify-center items-center">
            {StudentInfo.email}{" "}
          </div>
          <div className="w-[250px] h-10 text-lg  bg-green-300 my-1 flex justify-center items-center">
            {StudentInfo.contact}{" "}
          </div>
          <div className="w-[250px] h-10 text-lg  bg-green-300 my-1 flex justify-center items-center">
            {StudentInfo.admin_id}{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
