import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/MainPages/Login';
import Dashboard from './Pages/MainPages/Dashboard';


const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Login />} /> 
        <Route path="*" element={<Login />} />

      </Routes>
    </Router>
  )
}

export default App