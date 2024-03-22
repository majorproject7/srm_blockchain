import Kmithead from "../DashBoard/KmitHeader";
import {Link} from "react-router-dom";
import {useState,useEffect} from 'react';
import axios from 'axios';
function AdminManagePage(){

    return (
 <div> 
    <Kmithead> </Kmithead>
   
    <div className="flex flex-col justify-center items-center ">
    
    <buttonPanel></buttonPanel>
    {AdminDetails()}
    </div>
 </div>
    );
}

const AdminDetails = ()=>
 { 
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      const response = await  axios.get('http://localhost:5000/api/AdminRoute/getAllAdmin');// Replace with your API call
      setAdmins(response.data.AdminData);
    };

    fetchAdmins();
  },[] );



     return (
       <div className="flex flex-col justify-center items-center">
         <div className="flex flex-col">
           <h1 className=" text-2xl font-bold text-center m-4">
             Admin List
           </h1>
         </div>

         <div className="grid grid-cols-3 m-1  justify-center ">
           {admins.length > 0 ? (
             admins.map((admin) => (
               <AdminCard key={admin.admin_id} data={admin} />
             ))
           ) : (
             <p>No admins found</p>
           )}</div>
         
       </div>
     );

};

const AdminCard = ({ data }) => {
    const { name, email, contact, admin_id,image } = data;
   
    const base64String = image
   
    const imageData = {
      base64: base64String || null, 
      mimeType: 'image/png' 
  };
  
    return (
      
      <div className="flex flex-col m-1 rounded-lg text-center bg-gray-200 p-4 hover:bg-gray-300 justify-center items-center">
     
        <div>
          {imageData && (
             <img src={image} width="200" height="200"></img>
          )}
      </div>
        <div className="font-bold text-xl m-2">{name}</div>
  
          {/* Admin ID */}
          <div className="flex flex-row justify-center items-center">
            <div className="text-base font-medium">Admin ID : </div>
            <div className="text-sm">{admin_id}</div>
          </div>
  
          {/* Contact */}
          <div className="flex flex-row justify-center items-center">
            <span className="text-base font-medium">Contact : </span>
            <span className="text-sm">{contact}</span>
          </div>
  
          {/* Email */}
          <div className="flex flex-row justify-center items-center">
            <span className="text-base font-medium">Email : </span>
            <span className="text-sm overflow-hidden truncate">{email}</span>
          </div>
        
      </div>
      
    );
  };
  
  
function buttonPanel()
{
      return (
        <div className="flex flex-col justify-center my-1">
       
        <div className=" p-1 my-1  bg-amber-100 flex justify-center ">
         <Link to="/AdminUpdate"> <h2 className=" font-semibold text-xl">UPDATE ADMIN DETAILS</h2>
         </Link></div>
        
        
        <div className=" my-1 p-1 bg-amber-100  flex justify-center ">
        <Link to="/AdminRemove"> <h2 className=" font-semibold text-xl">REMOVE ADMIN</h2>
        </Link>  </div>
        <div className="flex flex-col bg-amber-100 p-1 my-1 items-center justify-center">
        <Link to='/AdminActions'> <h2 className=" font-semibold text-xl">ADD ADMIN</h2>
         </Link>
          </div>
        
      </div>
      );
}


export default AdminManagePage;