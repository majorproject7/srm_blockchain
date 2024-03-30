import Kmithead from "../DashBoard/KmitHeader";
import {useState,useEffect} from 'react';
import axios from 'axios';
const AdminDetailsUpdate=()=>{
    
    const [AdminList,setAdmin] = useState(null);
    const [selectedUserId, setSelectedUser] = useState(null);
    
    const [formData, setUserData] = useState({ });
    useEffect(()=>{
      
        console.log("use effect called");
        const getlist = async ()=>  {
                     const AdminDataResponse = await axios.get('http://localhost:5000/api/AdminRoute/getAdminDetailsForUpdate');
                     console.log(AdminDataResponse.data.AdminData);
                     setAdmin(AdminDataResponse.data.AdminData);
        }
        getlist();
    },[]);

    useEffect( ()  => {
        if(selectedUserId !== null)
        {
         console.log("user is ",selectedUserId);
       const getuserform = async ()=>  {
        const response = await axios.post('http://localhost:5000/api/AdminRoute/getUserForm',{admin_id : selectedUserId});
          console.log("data retrieved is ",response.data.admindata);
           setUserData(response.data.admindata);
          }
        getuserform();
        }
    
    },[selectedUserId]);

  
    const handleInputChange = e => {
      const { name, value } = e.target;
      setUserData(prevState => ({ ...prevState, [name]: value }));
    };
  
    const handleSubmit = e => {
      e.preventDefault();
      
      alert("Updating the details.... please wait");
      axios.post('http://localhost:5000/api/AdminRoute/UpdateAdmin', formData)
        .then(response => {
          console.log(response.data.message);
          alert(response.data.message);
          setSelectedUser(null);
        
        })
        .catch(error => {
          console.error('Error updating user:', error);
        });
    };
    const handleUserSelect = async (userId) => {
        console.log("user selected button ",userId);
     await setSelectedUser(userId);
      console.log("user selected ",selectedUserId);
    };
   

    return (
        <>
        <Kmithead></Kmithead>
        <div className="h-10 m-1 bg-orange-100 flex justify-center items-center"><h1 className="font-semibold text-xl">Admin Details Update Section</h1></div>
        <div>
        {AdminList !== null && AdminList.length !== 0 ? (
          <div align="center">
          <div className="w-[800px] flex flex-row  m-2 p-1 justify-evenly items-center ">
            <div >
              {" "}
              {AdminList.map((admin) => (
                <div className="border border-blue-200 px-1 mb-1 ">
                  {" "}
                  <div className="flex flex-row p-1 m-1">
                    <h1>{admin.admin_id}</h1></div>
                 
                </div>
              ))}
            </div>
            <div>
              {" "}
              {AdminList.map((admin) => (
                <div className="border  border-blue-200 px-1 mb-1">
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
                      className="bg-blue-300 p-1 m-1 rounded-md shadow-md shadow-blue-200"
                      onClick={() => {
                        handleUserSelect(admin.admin_id);
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
        {selectedUserId != null ? ( <div className="mx-auto max-w-md p-4 bg-blue-200 border rounded-md shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
        
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
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
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
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
            <label htmlFor="dob" className="block text-sm font-medium text-gray-600">
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
            <label htmlFor="admin_id" className="block text-sm font-medium text-gray-600">
              Admin_Id
            </label>
            <input
              type="text"
              id="admin_id"
              name="admin_id"
              value={formData.admin_id}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
              disabled
            />
            
            </div>

            <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-600">
              Contact
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            /></div>
             <div>
            <label htmlFor="passwd" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="passwd"
              name="passwd"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            /></div>
           
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Submit
          </button>
        </form>
      </div>):(
           <div></div>
      ) }
        </div>
        </>
    )
};


  
    
       

  
export default AdminDetailsUpdate;