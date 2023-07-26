import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../../Portals/Admin/Home';
import Test from '../../Portals/Admin/Test'
import { DashboardContainer } from '../../Designs/Styles';
import { AES, enc } from 'crypto-js';

const Dashboard = () => {
  const [specificRole, setspecificRole] = useState("");
  useEffect(() => {
    const spRole =  AES.decrypt(sessionStorage.getItem("SpecificRole"), '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK').toString(enc.Utf8);
    setspecificRole(spRole);
    
  }, []);
  return (
   <DashboardContainer>
        <Routes>
          {
             specificRole==="SuperiorUser"||specificRole==="HeadTeacher" ? (
             <>
              <Route path="/" element={<Home />} />
              <Route path="test" element={<Test />} />  
             </>
             ):(
             <>
             
             </>
             )
          }

   

    </Routes>
    
    </DashboardContainer>

 
  )
}

export default Dashboard