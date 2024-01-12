
import React,{useState} from "react";

const StudentForm = () => {
  const [formData, setFormData] = useState({
    rollno: "",
    dob: "",
  });

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = (e) => {
  e.preventDefault();
  console.log("form data submitted is ", formData.dob+"--",formData.rollno);
};


  return (
      <div>
          <h1 align="center">welcome</h1>
          <div className="card">
              <form onSubmit={handleSubmit}>
                  <h2> Student Login</h2>
                  <label>Student Roll No / Id : 
                  
                  <input type="text"
                  name="rollno"
                  value = {formData.rollno}
                  onChange={handleChange}
                  ></input>
                  </label>
                  <br>
                  </br>
                  <label>
                  D.O.B<br></br>
                  <input type="date"
                  name="dob"
                  value = {formData.dob}
                  onChange={handleChange}
                  ></input>
                  </label><br></br>

                    <button type="submit">submit</button>
                
                  
              </form>
          </div>
      </div>
  );
};
export default StudentForm;
