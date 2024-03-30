
import Kmithead from '../DashBoard/KmitHeader';
import axios from 'axios';
import {useState,useEffect} from 'react';

 const AdminActions =() =>
{
      const data="";
      
   return (
        <div>
            <Kmithead></Kmithead>
            <div className="h-10 m-2 bg-blue-100 flex flex-row justify-center items-center rounded-sm">
        {" "}
        <h1 className="text-xl font-semibold"> Admin Addition Section </h1>
      </div>
           {AdminForm()}
            {/* {AdminDetails()} */}
        </div>
    );

}

const AdminForm = () => {
    
   const [imageData,setImage] = useState("");
    var [formData, setFormData] = useState({
     
      name: '',
      email: '',
      contact: '',
      admin_id: '',
      dob:'',
      passwd : '',
      
    });
    

     const handleImageChange = (event)=>{
      console.log("image ",event);
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload= ()=>{
        console.log(typeof(reader.result));
        setImage(reader.result);
        
      };
      reader.onerror = error=>{
        console.log("error ",error);
      };
     
     }
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(formData);
    
      const newFormData = {
       
      name: formData.name,
      email: formData.email,
      contact: formData.contact,
      admin_id: formData.admin_id,
      dob:formData.dob,
      passwd : formData.passwd,
      image : imageData
      };
      
     
     try{
      const response= await axios.post('http://localhost:5000/api/AdminRoute/add', newFormData);
        
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
      <div className="mx-auto max-w-md p-4 bg-blue-200 border rounded-md shadow-md">
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
              maxLength={10}
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
           <div>
            <label htmlFor="photo" className="block text-sm font-medium text-gray-600">
              Profile Photo
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              
              onChange={handleImageChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
            <div>{imageData  && <img src={imageData} alt='image'></img>}</div>
            </div>
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