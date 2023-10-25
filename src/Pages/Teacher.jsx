import React, { useEffect, useState } from 'react'

import { MainDashboardContainer } from '../Designs/Styles/Styles'
import TeacherDashBoard from "../Pages/Teachers/TeacherDashBoard"
import TeacherMenuButtons from "../Pages/Teachers/TeacherMenuButtons"
import Navigation from './Navigator'
import { useLocation } from 'react-router-dom'


const AdminDashboard = () => {

  const [navOpen, setNavOpen] = useState(false);
  const [page, setPage] = useState("");
  const location = useLocation();
 
  
  useEffect(() => {
    try {
      const pages = location.pathname?.split("/");
       console.log("Url: ", pages);
      setPage(pages.length === 3 ? pages[2] : pages[1]);
  
    } catch (e) {
      console.error(e);
    }
  }, [location]);

  



  return (
    <MainDashboardContainer>
        <Navigation setNavOpen={setNavOpen} page={page} />
        <TeacherMenuButtons/>
        <TeacherDashBoard/>
       
     
    </MainDashboardContainer>
  )
}

export default AdminDashboard