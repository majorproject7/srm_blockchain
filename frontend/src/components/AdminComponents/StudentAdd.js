import Kmithead from "../DashBoard/KmitHeader";
import {useState} from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';
const StudentAddPage=()=>{
   const location = useLocation();
   const data = location.state;
   
    const deptval = data.dept;
    const ayear = data.Ayear;
    return (<div>
                <Kmithead></Kmithead>
                <div className=" h-10 flex justify-center bg-blue-100 m-2"> <h1 className="text-xl font-semibold"> Student Registration Section</h1> </div>
                <div className="flex justify-center">{StudentForm(deptval,ayear)}</div>
    </div>);
};


const StudentForm = (deptval,ayear) => {
  const [imageData,setImage] = useState("");

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
    const [formData, setFormData] = useState({
      year: 2024,
      Ayear: ayear,
      name: '',
      email: '',
      branch: deptval,
      section: 'A',
      roll_no: '',
      dob:'',
    });
  //const branches=['CSD','CSE','CSM','IT'];
  const sections=['A','B'];
  //const Ayears=[1,2,3,4]
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
      //console.log('Form data submitted:', formData);
      const newFormData = {
       
        year : formData.year,
      Ayear : formData.Ayear,
      name : formData.name,
      email : formData.email,
      branch : formData.branch,
      section : formData.section,
      roll_no : formData.roll_no,
      dob : formData.dob,
      image : imageData,
        };
     try{
      
        console.log("new form data ",newFormData);
     const response= await axios.post('http://localhost:5000/api/StudentRoute/add', newFormData);
        
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
      <div className="mx-4 max-w-md p-4 bg-blue-300 border rounded-md shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Academic Year
            </label>
            <input
              type="text"
              id="Ayear"
              name="Ayear"
              value={formData.Ayear}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
              
              disabled
            >
              {/* {Ayears.map((branch)=> (
              <option key={branch} value={branch}>{branch}</option>))
} */}
</input>
          
          </div>
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
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Date Of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
           
              
            />
          </div>
  
          <div>
            <label htmlFor="branch" className="block text-sm font-medium text-gray-600">
              Branch
            </label>
            <input
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleInputChange}
              disabled
              className="mt-1 p-2 w-full border rounded-md"
              
            >
                {/* {branches.map((branch)=> (
              <option key={branch} value={branch}>{branch}</option>))
            
            } */}
            </input>
          </div>
  
          <div>
            <label htmlFor="section" className="block text-sm font-medium text-gray-600">
              Section
            </label>
            <select
              id="section"
              name="section"
              value={formData.section}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            > 
               {sections.map((branch)=> (
              <option key={branch} value={branch}>{branch}</option>))
            
            }
              {/* Add options for other sections */}
            </select>
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Roll_No/Student_id
            </label>
            <input
              type="text"
              id="roll"
              name="roll_no"
              value={formData.rollno}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
            
            </div>

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
            
            </div>
            <div>
              { imageData?(<div> <img src={imageData} width="200" height="200"></img></div>):(<div></div>)}
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
  };
export default StudentAddPage;