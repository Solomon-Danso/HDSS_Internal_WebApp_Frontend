import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Admin from './Pages/Admin';


const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/admin/*" element={<Admin />} />
        <Route path="/" element={<Login />} /> 
        

      </Routes>
    </Router>
  )
}

export default App