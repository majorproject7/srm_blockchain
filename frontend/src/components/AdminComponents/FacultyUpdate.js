
import Kmithead from "../DashBoard/KmitHeader";
import {useState,useEffect} from 'react';
import axios from 'axios';
const FacultyDetailsUpdate=()=>{
    
    const [AdminList,setAdmin] = useState(null);
    const [selectedUserId, setSelectedUser] = useState(null);
    
    const [formData, setUserData] = useState({ });
    useEffect(()=>{
      
        console.log("use effect called");
        const getlist = async ()=>  {
                     const AdminDataResponse = await axios.get('http://localhost:5000/api/TeacherRoute/getFacultyDetails');
                     console.log(AdminDataResponse.data.FacData);
                     setAdmin(AdminDataResponse.data.FacData);
        }
        getlist();
    },[]);

    useEffect( ()  => {
        if(selectedUserId !== null)
        {
         console.log("user is ",selectedUserId);
       const getuserform = async ()=>  {
        const response = await axios.post('http://localhost:5000/api/TeacherRoute/getUserForm',{faculty_id : selectedUserId});
          console.log("data retrieved is ",response.data.facdata);
           setUserData(response.data.facdata);
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
      // Send updated user data to backend
      alert("Confirm the new Details ");
      axios.post('http://localhost:5000/api/TeacherRoute/UpdateFaculty', formData)
        .then(response => {
          console.log(response.data.message);
          alert(response.data.message);
          setSelectedUser(null);
          // Optionally, perform additional actions after successful update
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
        <div className="h-10 bg-orange-100 flex justify-center items-center"><h1 className="font-semibold text-xl">Admin Details Update Section</h1></div>
        <div>
            {AdminList !== null && AdminList.length !== 0 ? 
                (AdminList.map((Admin)=>(
                    <div className="flex flex-col-3 h-10 m-2 p-1 justify-evenly items-center border border-blue-400"> 
                      <div className="p-1 m-1">{Admin.name}</div>
                      <div className="p-1 m-1">{Admin.faculty_id}</div>
                      <div><button className="bg-blue-300 p-1 m-1 rounded-md" onClick={()=>{handleUserSelect(Admin.faculty_id)}}>Update</button></div>
                      </div>
                  ))) : (<div>No Data Found</div>)}
        </div>
        <div>
        {selectedUserId != null ? ( <div className="mx-auto max-w-md p-4 bg-blue-300 border rounded-md shadow-md">
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
            <label htmlFor="faculty_id" className="block text-sm font-medium text-gray-600">
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
            <label htmlFor="contact" className="block text-sm font-medium text-gray-600">
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
            <label htmlFor="department_id" className="block text-sm font-medium text-gray-600">
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
            <label htmlFor="qualification" className="block text-sm font-medium text-gray-600">
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
            <label htmlFor="passwd" className="block text-sm font-medium text-gray-600">
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
      </div>):(
           <div></div>
      ) }
        </div>
        </>
    )
};

  
export default FacultyDetailsUpdate;