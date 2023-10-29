import React, { useEffect, useState } from 'react'
import Admin_MenuButtons from './Admin/Admin_MenuButtons'
import Admin_Dashboard from './Admin/Admin_Dashboard'
import { MainDashboardContainer } from '../Designs/Styles/Styles'
import { useLocation } from 'react-router-dom'
import Navigation from './Navigator'


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

  return (
    <MainDashboardContainer>

<Navigation page={page}  openfunction={openfunction}/>
        <Admin_MenuButtons />      
        <Admin_Dashboard openNav={openNav}/>
     
    </MainDashboardContainer>
  )
}

export default AdminDashboard