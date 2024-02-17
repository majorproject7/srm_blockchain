import { React, useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";

const SemSel = (rollno,branch) => {
    const navigate = useNavigate();
const[list, setList] = useState([])
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
        try {
            const response = await axios.post('http://localhost:5000/api/StudentRoute/getsemlist', { roll_no: rollno });
            setList(response.data.data);
            console.log("list is ",list);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    }

    fetchData();
}, [rollno]); 

  console.log("list ",list);
  console.log("Stu result component rendered");
  return (
    <div>
      <div className="w-[600px] bg-white rounded-[30px] border-2 border-green-600">
        <div className="gird grid-cols-1 justify-center">
          <div className="mx-2 my-2 grid grid-cols-2 w-[900] h-11 justify-items-center bg-green-400 rounded-[15px]">
            <div>Semester</div>
            <div>Grade</div>
          </div>
          {!loading ? (
            
            list.length > 0 ? (
                list.map((item, index) => (
                    <div key={index} className="mx-2 my-2 grid grid-cols-2 w-[900] h-10 justify-items-center bg-green-200 rounded-[15px]">
                        <div className="vertical-align:middle;">Semester {item}</div>
                        <button onClick={()=>{ navigate('/result',{state : { roll_no : rollno,sem : item,branched :branch}})}} ><h2 className=" font-semibold text-xl">Go to Result</h2>
         </button>
                    </div>
                ))
            ) : (
                <div>No data available</div>
            )
        )
           : (
            <div>"getting data"</div>
          )}
        </div>
      </div>
    </div>
  );
};
export default SemSel;
