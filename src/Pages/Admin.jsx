import React from 'react'
import Admin_MenuButtons from './Admin/Admin_MenuButtons'
import Admin_Dashboard from './Admin/Admin_Dashboard'
import Admin_Navigation from './Admin/Admin_Navigation'
import { MainDashboardContainer } from '../Designs/Styles'
const AdminDashboard = () => {
  return (
    <MainDashboardContainer>

        
        <Admin_MenuButtons/>      
        <Admin_Dashboard/>
     
    </MainDashboardContainer>
  )
}

export default AdminDashboard