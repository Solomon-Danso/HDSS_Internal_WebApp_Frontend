import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DashboardContainer } from '../../Designs/Styles/Styles';
import { AES, enc } from 'crypto-js';
import Pass from '../../Portals/Admin/Pass';
import PermissionDenied from '../../Portals/Admin/PermissionDenied';
import { DateNTime, HomeDetailsGrouper, HomeGrouper, HomeLogo, HomePage, HomePageBanner, HomeSchoolName, HomeUserName, HomeUserPic, HomeUserSpecificRole, MenuButtonOptionLink, ProfileButtonOptionLink, ProfileDetails, ProfileNDate,  } from '../../Designs/Styles/Styles'
import pic1 from "../../Designs/Images/download.png"
import { useNavigate } from 'react-router-dom'
import AnimateHeight from 'react-animate-height';
import { apiServer } from '../../Constants /Endpoints';
import Home from '../../Portals/Admin/Home';
import Profile from '../../Portals/Admin/Profile'

import StudentInfo from '../../Portals/Admin/StudentIInfo';
import StudentDetails from '../../Portals/Admin/StudentDetails';

import Class from "../../Portals/Admin/LMS/Class"
import AddSubject  from "../../Portals/Admin/LMS/AddSubject"
import SubjectTeacher from "../../Portals/Admin/LMS/SubjectTeachers"
import UploadSlides from "../../Portals/Admin/LMS/UploadSlides"
import UploadVideo from "../../Portals/Admin/LMS/UploadVideo"
import UploadAudio from "../../Portals/Admin/LMS/UploadAudio"
import UploadPicture from "../../Portals/Admin/LMS/UploadPicture"
import UploadBook from "../../Portals/Admin/LMS/UploadBook"
import ViewSlide from "../../Portals/Admin/LMS/ViewSlides"
import ViewAudio from "../../Portals/Admin/LMS/ViewAudios"
import ViewVideo from "../../Portals/Admin/LMS/ViewVideos"
import ViewPicture from "../../Portals/Admin/LMS/ViewPictures"
import ViewBook from "../../Portals/Admin/LMS/ViewBooks"
import UploadAssignment from "../../Portals/Admin/LMS//UploadAssignment"






















const Dashboard = () => {
  const [specificRole, setspecificRole] = useState("");
  useEffect(() => {
    const spRole =  AES.decrypt(sessionStorage.getItem("SpecificRole"), '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK').toString(enc.Utf8);
    setspecificRole(spRole);
    
  }, []);



  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const encryptedData = sessionStorage.getItem("userDataEnc");
    const encryptionKey = '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK';
    const decryptedData = AES.decrypt(encryptedData, encryptionKey);
    const decryptedString = decryptedData.toString(enc.Utf8);
    const parsedData = JSON.parse(decryptedString);
      setUserInfo(parsedData);
  }, []);
  const profilePic = apiServer+userInfo.filePath
console.log(profilePic);
  
  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState); // Toggle the value of dropdownOpen
  };

  const navigate = useNavigate();
  function formatDate(date) {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
    const day = date.getDate();
    const daySuffix = getDaySuffix(day);
    const weekday = weekdays[date.getDay()];
    const month = months[date.getMonth()];
   
   
  

   
  
    const formattedDate = `${weekday}, ${day}${daySuffix} ${month}`;
  
    return formattedDate;
  }
  
  function getDaySuffix(day) {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }
  
const [sysDate, setSysDate] = useState("")

  
  useEffect(()=>{
 const date = new Date();
 setSysDate(formatDate(date))
  },[])
  











  return (
   <DashboardContainer>


<>
<HomePageBanner>
  <HomeLogo src={pic1}/>

  <HomeSchoolName> Crosshill International School </HomeSchoolName>

  <HomeGrouper>
    <HomeUserPic src={profilePic} onClick={toggleDropdown}/>

  <HomeDetailsGrouper >
   <HomeUserName onClick={toggleDropdown}>{userInfo.title} {userInfo.firstName} {userInfo.otherName} {userInfo.lastName}</HomeUserName>
   <HomeUserSpecificRole onClick={toggleDropdown}>{userInfo.specificRole}</HomeUserSpecificRole>
   
  </HomeDetailsGrouper>


  </HomeGrouper>


</HomePageBanner>

<ProfileNDate>
<DateNTime>
  {sysDate}
</DateNTime>

<ProfileDetails>

<AnimateHeight height={dropdownOpen?"auto":0} duration={500}>    
<ProfileButtonOptionLink onClick={() => { navigate("/teacher/viewProfile"); toggleDropdown() }}>View Profile </ProfileButtonOptionLink>
<ProfileButtonOptionLink onClick={() => { navigate("/teacher/test"); toggleDropdown() }}>Edit Profile </ProfileButtonOptionLink>
<ProfileButtonOptionLink onClick={() => { navigate("/teacher/test"); toggleDropdown() }}>Notifications </ProfileButtonOptionLink>
<ProfileButtonOptionLink onClick={() => { navigate("/teacher/test"); toggleDropdown() }}>Chats </ProfileButtonOptionLink>

</AnimateHeight>

 </ProfileDetails>

</ProfileNDate>

    </>

    

        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="viewProfile" element={<Profile/>} />
          
          
          
          
          
          
          
          
          
          
          
          

             


          
          
{
             specificRole==="Teacher" ? (
             <>
              <Route path="studentsInfo" element={<StudentInfo />} />
              <Route path="studentsDetails/:studentId" element={<StudentDetails />} />
              <Route path="class" element={<Class />} /> 
              <Route path="subjects" element={<AddSubject />} /> 
              <Route path="subjectteacher" element={<SubjectTeacher />} />
              <Route path="uploadslides" element={<UploadSlides />} />
              <Route path="uploadVideo" element={<UploadVideo />} />
              <Route path="uploadAudio" element={<UploadAudio />} /> 
              <Route path="uploadPicture" element={<UploadPicture />} />
              <Route path="uploadBook" element={<UploadBook />} />
              <Route path="viewSlides" element={<ViewSlide />} />
              <Route path="viewAudios" element={<ViewAudio />} />
              <Route path="viewVideos" element={<ViewVideo />} />
              <Route path="viewPictures" element={<ViewPicture />} />
              <Route path="viewBooks" element={<ViewBook />} />
              <Route path="uploadAssignment" element={<UploadAssignment />} />



              

             </>
             ):(
             <>
              <Route path="*" element={<PermissionDenied />} />
             </>
             )
          }          
          
          
          
   

    </Routes>
    
    </DashboardContainer>

 
  )
}

export default Dashboard