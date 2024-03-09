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
    <div className="flex flex-col border border-black justify-center">
      <div className="w-[600px] flex flex-col-2 justify-evenly">
        <h1>
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
                <div className="">Semester {item}</div>
               <div><button
                  onClick={() => {
                    navigate("/result", {
                      state: { roll_no: rollno, sem: item, branched: branch },
                    });
                  }}
                >
                  <h2 className=" font-semibold text-xl">Go to Result</h2>
                </button></div> 
              </div>
            ))
          ) : (
            <div>No data available</div>
          )
        ) : (
          <div>"getting data"</div>
        )}
      </div>
    </div>
  );
};
export default SemSel;
