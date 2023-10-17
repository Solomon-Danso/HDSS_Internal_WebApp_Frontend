import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Admin from './Pages/Admin';
import Teacher from './Pages/Teacher';


const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/admin/*" element={<Admin />} />
      <Route path="/teacher/*" element={<Teacher />} />
        <Route path="/" element={<Login />} /> 
        

      </Routes>
    </Router>
  )
}

export default App