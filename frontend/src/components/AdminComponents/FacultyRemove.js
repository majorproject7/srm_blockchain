import Kmithead from "../DashBoard/KmitHeader";
import {useState,useEffect} from 'react';
import axios from 'axios';
const FacultyRemovalPage = () => {
  const [showAlert, setShowAlert]= useState(false);
  const[adminIdRemove,setAdminId] = useState("");
  const [AdminList,setAdmin] = useState(null);
  useEffect(()=>{
    
    //console.log("use effect called");
    const getlist = async ()=>  {
                 const AdminDataResponse = await axios.get('http://localhost:5000/api/TeacherRoute/getFacultyDetails');
                 console.log(AdminDataResponse.data.FacData);
                 setAdmin(AdminDataResponse.data.FacData);
    }
    getlist();
   
  },[]);
  
  const deleteUser = async () => {
    try {
      //console.log("deleteduser ",adminIdRemove);
     const response= await axios.post('http://localhost:5000/api/TeacherRoute/removeFaculty',{id:adminIdRemove}); // Assuming your API endpoint is /api/users/:id
      // Handle success (e.g., update user list)
      alert(response.data.message);
    } catch (error) {
      console.error('Error deleting user:', error);
      // Handle error (show error message, etc.)
    } finally {
      setShowAlert(false); // Close the confirmation dialog
    }
  };

  const handleDeleteClick = (userId) => {
    setAdminId(userId);
    
    setShowAlert(true);
    console.log("user is ",adminIdRemove); // Show confirmation dialog
  };

  const handleConfirmDelete = () => {
    deleteUser();
    setShowAlert(false);
  };

  const handleCancelDelete = () => {
    setShowAlert(false); // Close the confirmation dialog
  };

  return (
    <div>
      <Kmithead></Kmithead>
      <div className="h-10 m-2 bg-red-100 flex flex-row justify-center items-center rounded-sm">
        {" "}
        <h1 className="text-xl font-semibold"> Faculty Removal Section </h1>
      </div>
       <div>
        { (AdminList !== null && AdminList.length !== 0) ? (AdminList.map((Admin)=>(
          <div className="flex flex-col-3 h-10 m-2 p-1 justify-evenly items-center border border-red-400"> 
            <div className="p-1 m-1">{Admin.name}</div>
            <div className="p-1 m-1">{Admin.faculty_id}</div>
            <div><button className="bg-red-300 p-1 m-1 rounded-md" onClick={()=>{handleDeleteClick(Admin.faculty_id)}}>Remove</button></div>
            </div>
        ))) : (<div>No Data Found</div>)}
       </div>
       <div className="flex justify-center">
        {/* Confirmation dialog */}
      {showAlert && adminIdRemove != null  && (
        <div className="confirmation-dialog justify-center">
          <p>Are you sure you want to delete {adminIdRemove} ?</p>
         <div className="flex justify-center"> <button onClick={handleConfirmDelete} className="p-1 bg-red-300 rounded-md">Confirm</button>
          <button onClick={handleCancelDelete} className="p-1 bg-green-200 rounded-md">Cancel</button>
          </div>
        </div>
      )}
       </div>
    </div>
  );
};


export default FacultyRemovalPage;
