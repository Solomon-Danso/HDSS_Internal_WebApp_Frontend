import React, { useEffect, useState } from 'react'

import { MainDashboardContainer, MainDashboardMobileContainer } from '../Designs/Styles/Styles'
import Student_Dashboard from "../Pages/Student/Student_DashBoard"
import Student_MenuButton from "../Pages/Student/Student_MenuButtons"
import { useLocation } from 'react-router-dom'
import Navigation from './StudentNavigator'
const AdminDashboard = () => {


  const [page, setPage] = useState("");
  const location = useLocation();
 
  
  useEffect(() => {
    try {
      const pages = location.pathname?.split("/");
  
      setPage(pages.length === 3 ? pages[2] : pages[1]);
  
    } catch (e) {
      console.error(e);
    }
  }, [location]);

  const [openNav, setOpenNav] = useState(false)

  const openfunction = ()=>{
    setOpenNav(!openNav)
  }

  const [isMobile, setIsMobile] = useState(false);
  const [active, setActive] = useState(null);

  useEffect(() => {
    setActive(1);
     window.addEventListener("resize", handleResize);
    handleResize();

  }, []);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };





  return (
    <>

      {
        isMobile?(
        
        <MainDashboardMobileContainer>
          <Student_Dashboard openNav={openNav} openfunction={openfunction}/>

          <Navigation page={page}  openfunction={openfunction}/>
          </MainDashboardMobileContainer>
        ):(
          <MainDashboardContainer>

        <Student_MenuButton />      
        <Student_Dashboard openNav={openNav} openfunction={openfunction}/>
 
        
        </MainDashboardContainer>)
      }

    
    </>
  )
}

export default AdminDashboard