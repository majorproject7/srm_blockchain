import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        // Other fields
    });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        console.log("submission files");
        event.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/students/register', formData);
            // Handle successful registration
        } catch (error) {
            console.log(error);
        }
    };

    return (
        // Registration form JSX
        <form
 
onSubmit={handleSubmit}>

      
<label
 
htmlFor="name">Name:</label>

      
<input
 
type="text"
 
id="name"
 
name="name"
 
value={formData.name}
 
onChange={handleChange} />
<br></br>
<label
 
htmlFor="email">Email Id :</label>
<input

type="email"
 
id="email"
 
name="email"
 
value={formData.email}
 
onChange={handleChange} 

/>
<br></br>
<br></br>
<label
 
htmlFor="password">Pass code :</label>
<input

type="password"
 
id="password"
 
name="password"
 
value={formData.password}
 
onChange={handleChange} 

/>
<br></br>
      <button type="submit">Register</button>
    </form>
  );
    
};

export default RegistrationForm;
