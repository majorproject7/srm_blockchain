import Kmithead from "../DashBoard/KmitHeader";
import {useState,useEffect} from 'react';
import axios from 'axios';
const AdminRemovalPage = () => {
  const [showAlert, setShowAlert]= useState(false);
  const[adminIdRemove,setAdminId] = useState("");
  const [AdminList,setAdmin] = useState(null);
  useEffect(()=>{
    
    console.log("use effect called");
    const getlist = async ()=>  {
                 const AdminDataResponse = await axios.get('http://localhost:5000/api/AdminRoute/getAdminListForRemoval');
                 console.log(AdminDataResponse.data.AdminData);
                 setAdmin(AdminDataResponse.data.AdminData);
    }
    getlist();
   
  },[]);
  
  const deleteUser = async () => {
    try {
      console.log("deleteduser ",adminIdRemove);
     const response= await axios.post('http://localhost:5000/api/AdminRoute/removeAdmin',{id:adminIdRemove}); 
      alert(response.data.message);
    } catch (error) {
      console.error('Error deleting user:', error);
     
    } finally {
      setShowAlert(false);
    }
  };

  const handleDeleteClick = (userId) => {
    setAdminId(userId);
    
    setShowAlert(true);
    console.log("user is ",adminIdRemove);
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
        <h1 className="text-xl font-semibold"> Admin Removal Section </h1>
      </div>
      <div>
        {AdminList !== null && AdminList.length !== 0 ? (
          <div align="center">
          <div className="w-[800px] flex flex-row  m-2 p-1 justify-evenly items-center ">
            <div >
              {" "}
              {AdminList.map((admin) => (
                <div className="border border-red-200 px-1 mb-1 ">
                  {" "}
                  <div className="flex flex-row p-1 m-1">
                    <h1>{admin.admin_id}</h1></div>
                 
                </div>
              ))}
            </div>
            <div>
              {" "}
              {AdminList.map((admin) => (
                <div className="border  border-red-200 px-1 mb-1">
                  {" "}
                  <div className="p-1 m-1">{admin.name}</div>
                 
                </div>
              ))}
            </div>
           
            <div>
              {" "}
              {AdminList.map((admin) => (
                <div>
                 
                  <div  className=" px-1 mb-1">
                    <button
                      className="bg-red-300 p-1 m-1 rounded-md shadow-md shadow-red-200"
                      onClick={() => {
                        handleDeleteClick(admin.admin_id);
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


export default AdminRemovalPage;
