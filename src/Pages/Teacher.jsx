import React from 'react'

import { MainDashboardContainer } from '../Designs/Styles/Styles'
import TeacherDashBoard from "../Pages/Teachers/TeacherDashBoard"
import TeacherMenuButtons from "../Pages/Teachers/TeacherMenuButtons"
const AdminDashboard = () => {
  return (
    <MainDashboardContainer>

        <TeacherMenuButtons/>
        <TeacherDashBoard/>
       
     
    </MainDashboardContainer>
  )
}

export default AdminDashboard