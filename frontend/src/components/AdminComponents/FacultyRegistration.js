import react from "react";
import { useState } from "react";
import axios from "axios";
import Kmithead from "../DashBoard/KmitHeader";
const FacultyAdditionPage = () => {
  return (
    <div>
      <Kmithead></Kmithead>
      <div className="h-10 bg-blue-50 m-1 flex justify-center items-center">
        <h1 className="text-xl font-semibold">Faculty Registration Section</h1>
      </div>
      {FacultyForm()}
    </div>
  );
};

const FacultyForm = () => {
  const [imageData, setImage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    faculty_id: "",
    contact: "",
    email: "",
    dob: "",
    department_id: "CSM",
    qualification: "M.Tech",
    passwd: "",
  });

  const handleImageChange = (event) => {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      console.log(typeof reader.result);
      setImage(reader.result);
      console.log("Image data ", imageData);
    };
    reader.onerror = (error) => {
      console.log("error ", error);
    };
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFormData = {
      name: formData.name,
      faculty_id: formData.faculty_id,
      contact: formData.contact,
      email: formData.email,
      dob: formData.dob,
      department_id: formData.department_id,
      qualification: formData.qualification,
      passwd: formData.passwd,
      image: imageData,
    };

    console.log("Form data submitted:", newFormData);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/TeacherRoute/addfaculty",
        newFormData
      );

      if (response.data.success) {
        alert(response.data.message);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while processing the request.");
    }
  };

  return (
    <div className="mx-auto max-w-md p-4 bg-blue-300 border rounded-md shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
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
          <label
            htmlFor="faculty_id"
            className="block text-sm font-medium text-gray-600"
          >
            Faculty_id
          </label>
          <input
            type="text"
            id="faculty_id"
            name="faculty_id"
            value={formData.rollno}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
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
          <label
            htmlFor="dob"
            className="block text-sm font-medium text-gray-600"
          >
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
          <label
            htmlFor="contact"
            className="block text-sm font-medium text-gray-600"
          >
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
          <label
            htmlFor="department_id"
            className="block text-sm font-medium text-gray-600"
          >
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
          <label
            htmlFor="qualification"
            className="block text-sm font-medium text-gray-600"
          >
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
          <label
            htmlFor="passwd"
            className="block text-sm font-medium text-gray-600"
          >
            Login Password
          </label>
          <input
            type="text"
            id="passwd"
            name="passwd"
            value={formData.passwd}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div>
          <label
            htmlFor="photo"
            className="block text-sm font-medium text-gray-600"
          >
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

export default FacultyAdditionPage;
