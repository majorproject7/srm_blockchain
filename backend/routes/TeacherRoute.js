const express = require('express');
const router = express.Router();
const Faculty = require('../models/TeacherSchema');

function AddTeacher()
{      console.log("calling ad teacher");
        const res = Faculty.insertMany([
            {
  
                "name": "Rakesh",
                "department": "CSE", 
                "subject_references": { 
                  "OOP": "Object Oriented Programming",
                  "DSA": "Data Structures and Algorithms",
                  "CN": "Computer Networks"
                },
                "sections": { 
                  "Year1": {
                    "A": ["OOP"],
                    "B": ["DSA"],
                    "C": ["CN"]
                  },
                  "Year2": {"A" :["JAVA"] },
                  "Year3": {},
                  "Year4": {}
                },
                "qualifications": ["B.Tech", "M.Tech"], 
                "experience": 5,
                "contact": {
                  "email": "Rakesh@kmit.edu",
                  "phone": "+91 8041512351"
                },
               
              }
            
])
console.log(res);

}
module.exports = {AddTeacher};
