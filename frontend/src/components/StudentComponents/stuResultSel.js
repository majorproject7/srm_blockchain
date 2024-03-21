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
    <div className="flex flex-col border border-green-300 justify-center">
      <div className="w-[600px] flex flex-col-2 justify-evenly">
        <h1 className="text-lg ">
          Semester
        </h1>
        <h1>Result</h1>
      </div>
      <div >
        {!loading ? (
          list.length > 0 ? (
            list.map((item, index) => (
              <div
                key={index}
                className="w-[600px] mx-2 my-2 flex flex-col-2  h-10  bg-green-200 rounded-[15px] justify-evenly items-center"
              >
                <div className=""><h1 className="text-lg">Semester {item.Semester}</h1></div>
               <div><button
                  onClick={() => {
                    navigate("/result", {
                      state: { roll_no: rollno, sem : (item.Semester), branched: branch,ResNo : item.ResNo },
                    });
                  }}
                >
                  <h2 className=" font-semibold text-xl">Go to Result</h2>
                </button></div> 
              </div>
            ))
          ) : (
            <div className="flex justify-center "><div><h1> No data available</h1></div></div>
          )
        ) : (
          <div>"getting data"</div>
        )}
      </div>
    </div>
  );
};
export default SemSel;
