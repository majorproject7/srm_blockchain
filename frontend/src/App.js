
import React  from 'react';
import DashBoard from './components/StudentComponents/stuDashBoard.js';
import { BrowserRouter as Router, Route, Routes ,Link} from "react-router-dom";
import StuGrade from './components/StudentComponents/studentGrade.js';
import HomePage from './components/DashBoard/DashBoard.js';
const App = () => {
    return (
      
        
        <Router>
          <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/studashboard" element={<DashBoard/>} />
          <Route path="/result" element={<StuGrade/>}></Route>
          </Routes>
        </Router>
       
    );
};

export default App;
