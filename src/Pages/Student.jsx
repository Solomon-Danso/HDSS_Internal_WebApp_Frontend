import React from 'react'

import { MainDashboardContainer } from '../Designs/Styles/Styles'
import Student_Dashboard from "../Pages/Student/Student_DashBoard"
import Student_MenuButton from "../Pages/Student/Student_MenuButtons"
const AdminDashboard = () => {
  return (
    <MainDashboardContainer>

        <Student_MenuButton/>
        <Student_Dashboard/>
       
     
    </MainDashboardContainer>
  )
}

export default AdminDashboard