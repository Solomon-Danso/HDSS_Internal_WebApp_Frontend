import React, { useEffect, useState } from 'react'

import { MainDashboardContainer } from '../Designs/Styles/Styles'
import Student_Dashboard from "../Pages/Student/Student_DashBoard"
import Student_MenuButton from "../Pages/Student/Student_MenuButtons"
import { useLocation } from 'react-router-dom'
import Navigation from './Navigator'
const AdminDashboard = () => {


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

  const [openNav, setOpenNav] = useState(false)

  const openfunction = ()=>{
    setOpenNav(!openNav)
  }




  return (
    <MainDashboardContainer>
    <Navigation page={page}  openfunction={openfunction}/>
    <Student_MenuButton/>
        <Student_Dashboard openNav={openNav}/>
       
     
    </MainDashboardContainer>
  )
}

export default AdminDashboard