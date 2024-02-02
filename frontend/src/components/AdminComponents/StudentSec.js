import React, { useState } from 'react';
import Kmithead from '../DashBoard/KmitHeader';
import axios from 'axios';

const StudentManagementPage = ( ) => {
  

    return(
        
        <div>
            <Kmithead></Kmithead>
            {/* {StudentManagementPage(Sdata)} */}
            <div className="h-10 bg-blue-200 rounded-lg flex items-center justify-center"> <h1 className='font-bold'>Add Student</h1></div>
            {StudentForm()}
        </div>
    );
}


const StudentForm = () => {
    const [formData, setFormData] = useState({
      year: 2024,
      Ayear: '1',
      name: '',
      email: '',
      branch: 'CSD',
      section: 'A',
      roll_no: '',
    });
  const branches=['CSD','CSE','CSM','IT'];
  const sections=['A','B'];
  const Ayears=[1,2,3,4]
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
      const response= await axios.post('http://localhost:5000/api/addstu/add', formData);
        
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
              Academic Year
            </label>
            <select
              type="text"
              id="Ayear"
              name="Ayear"
              value={formData.Ayear}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            >
              {Ayears.map((branch)=> (
              <option key={branch} value={branch}>{branch}</option>))
}</select>
          
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
            <label htmlFor="branch" className="block text-sm font-medium text-gray-600">
              Branch
            </label>
            <select
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            >
                {branches.map((branch)=> (
              <option key={branch} value={branch}>{branch}</option>))
            
            }
            </select>
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
export default StudentManagementPage;
