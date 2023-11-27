import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Admin from './Pages/Admin';
import Teacher from './Pages/Teacher';
import Student from './Pages/Student';
import HyChat from './Portals/Student/HyChat'
import GroupChatWindow from './Portals/Student/GroupChatWindow';
import AddGroup from './Portals/Student/AddGroup';
import AddDocument from './Portals/Student/AddDocument';
import AddAudio from './Portals/Student/AddAudio';
import AddVideo from './Portals/Student/AddVideo';
import AddPicture from './Portals/Student/AddPicture';
import AddBook from './Portals/Student/AddBook';
import VideoHome from './VideoCall/Pages/VideoHome';
import VideoRoom from './VideoCall/Pages/VideoRoom';

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
      <Route path="/HyChat/Video/:Id" element={<AddVideo />} />
      <Route path="/HyChat/Audio/:Id" element={<AddAudio />} />
      <Route path="/HyChat/Picture/:Id" element={<AddPicture />} />
      <Route path="/HyChat/Book/:Id" element={<AddBook />} />
      <Route path="/HyChat/Document/:Id" element={<AddDocument />} />
      <Route path="/HyChat/Document/:Id" element={<AddDocument />} />
      <Route path="/VideoCall" element={<VideoHome />} />
      <Route path="/VideoCall/:Id" element={<VideoRoom />} />
        
        
        
        
        
        
        
        
        <Route path="/" element={<Login />} /> 
        

      </Routes>
    </Router>
  )
}

export default App