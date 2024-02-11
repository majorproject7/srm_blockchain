
import Kmithead from '../DashBoard/KmitHeader';
import axios from 'axios';
import {useState,useEffect} from 'react';

 const AdminActions =() =>
{
      const data="";
      
   return (
        <div>
            <Kmithead></Kmithead>
           {AdminForm()}
            {AdminDetails()}
        </div>
    );

}
const AdminCard = ({ data }) => {
  const { name, email, contact, admin_id } = data;

  return (
    <div className="flex flex-col rounded-lg text-center bg-gray-200 p-4 hover:bg-gray-300">
      {/* Name */}
      <div className="font-bold text-xl mb-2">{name}</div>

      {/* Flexbox for other details */}
      <div className="flex flex-row justify-between">
        {/* Admin ID */}
        <div className="flex flex-col items-center mr-4">
          <span className="text-base font-medium">Admin ID:</span>
          <span className="text-sm">{admin_id}</span>
        </div>

        {/* Contact */}
        <div className="flex flex-col items-center">
          <span className="text-base font-medium">Contact:</span>
          <span className="text-sm">{contact}</span>
        </div>

        {/* Email */}
        <div className="flex flex-col items-center ml-4">
          <span className="text-base font-medium">Email:</span>
          <span className="text-sm overflow-hidden truncate">{email}</span>
        </div>
      </div>
    </div>
  );
};
const AdminDetails = ()=>
 { 
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      const response = await  axios.get('http://localhost:5000/api/AdminRoute/getAdminDetails');// Replace with your API call
      setAdmins(response.data);
    };

    fetchAdmins();
  },[] );

 
console.log(admins);
  const adminlist = admins;


     return(
      <div>
          <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold text-center mb-4">Admin List</h1>
      <div className="flex flex-row flex-wrap justify-center gap-4">
      {admins.length > 0 ? (
            admins.map((admin) => (
              <AdminCard key={admin.admin_id} data={admin} />
            ))
          ) : (
            <p>No admins found</p>
          )}
      </div>
    </div>
      </div>
     );

}

const AdminForm = () => {
    const [formData, setFormData] = useState({
     
      name: '',
      email: '',
      contact: '',
      admin_id: '',
      dob:'',
      passwd : '',
    });
 
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      // Handle form submission logic, e.g., send data to the server or perform validation
      console.log('Form data submitted:', formData);
     try{
      const response= await axios.post('http://localhost:5000/api/AdminRoute/add', formData);
        
      if (response.data.success) {
        alert(response.data.message);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing the request.');
    }

    };
  
    return (
      <div className="mx-auto max-w-md p-4 bg-gray-100 border rounded-md shadow-md">
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
      </div>
    );
  }


export default AdminActions;