import {React ,useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const HomePage=() =>
{   const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        rollno: "",
        dob: "",
        facultyid:"",
        fcpass:"",
        adminid:"",
        adminpass:""
      });
    
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
    
    const handleSubmit = async (event) => {
        console.log("data from student submitted");
        event.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:5000/api/students/login', formData);
    
            if (response.data.success) {
                // Redirect to student page
                navigate('/studashboard');
            } else {
                // Handle login error
                if(formData.rollno===""  || formData.dob ==="" )
                {
                    alert("please fill details");
                }
                else
                {alert('not data found! please contact concerned faculty');
            }setError('Invalid credentials');
            }
        } catch (error) {

            if(formData.rollno ==="")
            {
                alert("Database not active");
            }
            // Handle network or server errors
            console.error('Login error:', error);
            setError('An error occurred');
        }
    };

    return (
        <>
        <div className='bg-slate-600'>
            <div className="text-2xl text-center mx-2 my-2 w-[full] h-[50px] border-solid borde border-4 bg-yellow-400 rounded-[30px] shadow ">
                 <div  className="w-[full] ">Keshav Memorial Institute of Techology</div>
                </div> 
        </div>
        
        {/* grid for 3 boxes student, admin , teacher*/ }

        <div align="center" className=" p-3 grid grid-cols-3 border bg-slate-400 border-2 justify-items-center ">

        <div className="  justify-center text-center">
    <div className="mx-1 my-2 w-[250px] h-[400px]  bg-gray-900 rounded-[30px] shadow justify-items-center" >
    <div className="  mx-1 my-2 w-[230px] h-[380px]   bg-amber-200 rounded-[30px]  flex items-center " >
    <form onSubmit={handleSubmit}>
                  <h2 className='text-lg'> Student Login</h2>
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
                 DOB<br></br>
                  <input type="date"
                  name="dob"
                  value = {formData.dob}
                  onChange={handleChange}
                  ></input>
                  </label><br></br>

                    <button type="submit">submit</button>
              </form>


     </div></div> 

    </div>



    {/*"second card teacher*/ }
    
    <div className="  justify-center text-center">
    <div className="mx-1 my-2 w-[250px] h-[400px]  bg-gray-900 rounded-[30px] shadow justify-items-center" >
    <div className="  mx-1 my-2 w-[230px] h-[380px]   bg-blue-200 rounded-[30px]  flex items-center " >
    <form onSubmit={handleSubmit}>
                  <h2 className='text-lg'> Faculty Login</h2>
                  <label>Faculty Id : 
                  
                  <input type="text"
                  name="facultyid"
                  value = {formData.facultyid}
                  onChange={handleChange}
                  ></input>
                  </label>
                  <br>
                  </br>
                  <label>
                 Password<br></br>
                  <input type="password"
                  name="password"
                  value = {formData.fcpass}
                  onChange={handleChange}
                  ></input>
                  </label><br></br>

                    <button type="submit">submit</button>
              </form>
     </div></div> 
    </div>
    
    {/* third */}
    
    <div className="  justify-center text-center">
    <div className="mx-1 my-2 w-[250px] h-[400px]  bg-gray-900 rounded-[30px] shadow justify-items-center" >
    <div className="  mx-1 my-2 w-[230px] h-[380px]   bg-green-200 rounded-[30px]  flex items-center " >
    <form onSubmit={handleSubmit}>
                  <h2 className='text-lg'> Admin Login</h2>
                  <label>Admin  / Id : 
                  
                  <input type="text"
                  name="admin"
                  value = {formData.adminid}
                  onChange={handleChange}
                  ></input>
                  </label>
                  <br>
                  </br>
                  <label>
                 Password<br></br>
                  <input type="password"
                  name="adminpassword"
                  value = {formData.adminpass}
                  onChange={handleChange}
                  ></input>
                  </label><br></br>

                    <button type="submit">submit</button>
              </form>
     </div></div> 
    </div>




</div>
       
        </>
        
    );
}

export default HomePage;