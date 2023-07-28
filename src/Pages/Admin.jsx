import React from 'react'
import Admin_MenuButtons from './Admin/Admin_MenuButtons'
import Admin_Dashboard from './Admin/Admin_Dashboard'
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