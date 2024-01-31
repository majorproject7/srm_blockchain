run backend and frontend server both to use mongo

npm run start to start server and see pages.
always mention the fucntions in used in react components in camelcase.


why block chain.

at any point of time in the traditional database management system.

there exists a database admin who monitors the database and can do anything with the data.

story of bank and their security.


Software used : 
 Figma - > frontend styling
 ganache -> fake ethereum network
 lucid chart -> database designing
 Bard & chat gpt -> code help & brain storming.


 npm start script is mentioned in package.json file.

 for backend code us nodemon server.js for development purpose.

 db.KMIT.insertMany([{                   
    "year": "2024",
    "department": "CSM",
    "section": "A",
    "students" : [
      {
        "name": "John Doe",
        "rollno": "123",
        "dob": "1990-01-01",
        "id": "abc123",
        "result": [
          {
            "sem": 1,
            "maths": 4.0,
            "biology": 2.0,
            "totals": 6.0
          },
          {
            "sem": 2,
            "Python": 4.0,
            "DSA": 2.0,
            "totals": 6.0
          }
        ]
      }
    ]
  },

]);
db.kmit.insertMany([ { 'year': 2024, 'department': 'CSM', 'section': 'A', 'students': [ { 'name': 'John Doe', 'rollno': '123', 'dob': '1990-01-01', 'id': 'abc123', 'result': [ { 'sem': 1, 'maths': 4.0, 'biology': 2.0, 'totals': 6.0 }, { 'sem': 2, 'Python': 4.0, 'DSA': 2.0, 'totals': 6.0 } ] } ] }, ]);

//teacher Record

{
  
  "name": "Rakesh",
  "department": "CSE", 
  "subjects": [   "OOP", "DSA", "CN" ],
  "subject_references": { 
    "OOP": "Object Oriented Programming",
    "DSA": "Data Structures and Algorithms",
    "CN": "Computer Networks"
  },
  "sections": { 
    "1st Year": {
      "A": ["OOP"],
      "B": ["DSA"],
      "C": ["CN"]
    },
    "2nd Year": {  },
    "3rd Year": {},
    "4th Year": {}
  },
  "qualifications": ["B.Tech", "M.Tech (CSE)"], 
  "experience": 5,
  "contact": {
    "email": "Rakesh@kmit.edu",
    "phone": "+91 8041512351"
  },
  "additional_notes": "Specializes in algorithm design.",
}
