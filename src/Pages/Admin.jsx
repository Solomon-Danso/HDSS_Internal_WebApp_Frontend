import React, { useEffect, useState } from 'react'
import Admin_MenuButtons from './Admin/Admin_MenuButtons'
import Admin_Dashboard from './Admin/Admin_Dashboard'
import { MainDashboardContainer, MainDashboardMobileContainer } from '../Designs/Styles/Styles'
import { useLocation } from 'react-router-dom'
import Navigation from './AdminNavigator'


const AdminDashboard = () => {

  const [navOpen, setNavOpen] = useState(false);
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
          <Admin_Dashboard openNav={openNav} openfunction={openfunction}/>

          <Navigation page={page}  openfunction={openfunction}/>
          </MainDashboardMobileContainer>
        ):(
          <MainDashboardContainer>

        <Admin_MenuButtons />      
        <Admin_Dashboard openNav={openNav} openfunction={openfunction}/>
 
        
        </MainDashboardContainer>)
      }

    
    </>
  )
}

export default AdminDashboard