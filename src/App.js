import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Admin from './Pages/Admin';
import Teacher from './Pages/Teacher';
import Student from './Pages/Student';
import HyChat from './Portals/Student/HyChat'
import GroupChatWindow from './Portals/Student/GroupChatWindow';
import AddGroup from './Portals/Student/AddGroup';


const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/admin/*" element={<Admin />} />
      <Route path="/teacher/*" element={<Teacher />} />
      <Route path="/student/*" element={<Student />} />
      <Route path="/HyChat" element={<HyChat />} />
      <Route path="/HyChat/:Id" element={<GroupChatWindow />} />
      <Route path="/HyChat/NewGroup" element={<AddGroup />} />
        
        
        
        
        
        
        
        
        
        <Route path="/" element={<Login />} /> 
        

      </Routes>
    </Router>
  )
}

export default App