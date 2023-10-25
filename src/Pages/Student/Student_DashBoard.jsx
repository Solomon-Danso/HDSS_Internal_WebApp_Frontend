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
import { IoNotificationsOutline } from 'react-icons/io5';
import { AiOutlineMenuFold } from 'react-icons/ai';
import HeadernSearch from '../HeadernSearch';

import { IoIosNotificationsOutline } from 'react-icons/io'
import {CiSettings,CiGlobe} from 'react-icons/ci'


import DropList from "../../Pages/DropList"
import InnerDroplist from "../../Pages/InnerDroplist"
import { FaLayerGroup,FaCity } from "react-icons/fa";

import { MenuCard } from '../../Designs/Styles/Profile';
import { Breaker, BreakerM, HeaderBanner, NotificationBadge, NotificationBadgeM, NotificationIcon, NotificationIconM } from '../../Designs/Styles/Dashboard';




















const Dashboard = ({openNav}) => {
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
  const profilePic = apiServer+userInfo.profilePic
console.log(profilePic);
console.log(userInfo)
  
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
  


const [SchoolData, SetSchoolData] = useState({})

useEffect(()=>{
fetch(apiServer+"api/Setup/GetSchoolData")
.then(res=>res.json())
.then(data=>SetSchoolData(data))
.catch(error=>console.error(error))
},[])




const [isMobile, setIsMobile] = useState(false);
const [active, setActive] = useState(null);

useEffect(() => {
  setActive(1);
   window.addEventListener("resize", handleResize);
    handleResize();
}, []);

//choose the screen size
const handleResize = () => {
  if (window.innerWidth < 768) {
    setIsMobile(true);
  } else {
    setIsMobile(false);
  }
};


const [toggle, setToggle] = useState(true)
const [search, setSearch] = useState("")
const toggler = () => {
    setToggle((prevState) => !prevState); 
  };






  return (
   <DashboardContainer>

{
  openNav?(<>
  <MenuCard >




    



<DropList logo={<FaLayerGroup/>} title="LMS">

<InnerDroplist title="Class">
<MenuButtonOptionLink onClick={() => { navigate("/teacher/class") }}>Class List</MenuButtonOptionLink>
</InnerDroplist>

<InnerDroplist title="Subjects">
<MenuButtonOptionLink onClick={() => { navigate("/teacher/subjects") }}>Subject List </MenuButtonOptionLink>
<MenuButtonOptionLink onClick={() => { navigate("/teacher/subjectteacher") }}>Subject Teachers</MenuButtonOptionLink>

  </InnerDroplist>

<InnerDroplist title="Discussions">
<MenuButtonOptionLink onClick={() => { navigate("/teacher/test") }}>View Discussions</MenuButtonOptionLink>
<MenuButtonOptionLink onClick={() => { navigate("/teacher/test") }}>Teacher's Chat</MenuButtonOptionLink>
<MenuButtonOptionLink onClick={() => { navigate("/teacher/test") }}>Student's Chat</MenuButtonOptionLink>    
</InnerDroplist>




  <InnerDroplist title="Uploads">
  <MenuButtonOptionLink onClick={() => { navigate("/teacher/uploadslides") }}>Slides</MenuButtonOptionLink>
  <MenuButtonOptionLink onClick={() => { navigate("/teacher/uploadAudio") }}>Audio</MenuButtonOptionLink>
  <MenuButtonOptionLink onClick={() => { navigate("/teacher/uploadVideo") }}>Video</MenuButtonOptionLink>
  <MenuButtonOptionLink onClick={() => { navigate("/teacher/uploadPicture") }}>Pictures</MenuButtonOptionLink>
  <MenuButtonOptionLink onClick={() => { navigate("/teacher/uploadBook") }}>Books</MenuButtonOptionLink>
 
  </InnerDroplist>


  <InnerDroplist title="Resources">
  <MenuButtonOptionLink onClick={() => { navigate("/teacher/viewSlides") }}>Slides</MenuButtonOptionLink>
  <MenuButtonOptionLink onClick={() => { navigate("/teacher/viewAudios") }}>Audio</MenuButtonOptionLink>
  <MenuButtonOptionLink onClick={() => { navigate("/teacher/viewVideos") }}>Video</MenuButtonOptionLink>
  <MenuButtonOptionLink onClick={() => { navigate("/teacher/viewPictures") }}>Pictures</MenuButtonOptionLink>
  <MenuButtonOptionLink onClick={() => { navigate("/teacher/viewBooks") }}>Books</MenuButtonOptionLink>
 
  </InnerDroplist>

  <InnerDroplist title="Annoucements">
    
  <InnerDroplist title="Students" logo=">">
  <MenuButtonOptionLink onClick={() => { navigate("/teacher/test") }}>Add</MenuButtonOptionLink>
  <MenuButtonOptionLink onClick={() => { navigate("/teacher/test") }}>View</MenuButtonOptionLink>
  <MenuButtonOptionLink onClick={() => { navigate("/teacher/test") }}>Update</MenuButtonOptionLink>
  <MenuButtonOptionLink onClick={() => { navigate("/teacher/test") }}>Delete</MenuButtonOptionLink>
  </InnerDroplist>

  <InnerDroplist title="Teachers" logo=">">
  <MenuButtonOptionLink onClick={() => { navigate("/teacher/test") }}>Add</MenuButtonOptionLink>
  <MenuButtonOptionLink onClick={() => { navigate("/teacher/test") }}>View</MenuButtonOptionLink>
  <MenuButtonOptionLink onClick={() => { navigate("/teacher/test") }}>Update</MenuButtonOptionLink>
  <MenuButtonOptionLink onClick={() => { navigate("/teacher/test") }}>Delete</MenuButtonOptionLink>
  </InnerDroplist>

  <InnerDroplist title="PTA" logo=">">
  <MenuButtonOptionLink onClick={() => { navigate("/teacher/test") }}>Add</MenuButtonOptionLink>
  <MenuButtonOptionLink onClick={() => { navigate("/teacher/test") }}>View</MenuButtonOptionLink>
  <MenuButtonOptionLink onClick={() => { navigate("/teacher/test") }}>Update</MenuButtonOptionLink>
  <MenuButtonOptionLink onClick={() => { navigate("/teacher/test") }}>Delete</MenuButtonOptionLink>
  </InnerDroplist>

  <InnerDroplist title="HOD" logo=">">
  <MenuButtonOptionLink onClick={() => { navigate("/teacher/test") }}>Add</MenuButtonOptionLink>
  <MenuButtonOptionLink onClick={() => { navigate("/teacher/test") }}>View</MenuButtonOptionLink>
  <MenuButtonOptionLink onClick={() => { navigate("/teacher/test") }}>Update</MenuButtonOptionLink>
  <MenuButtonOptionLink onClick={() => { navigate("/teacher/test") }}>Delete</MenuButtonOptionLink>
  </InnerDroplist>
  
  </InnerDroplist>

  <InnerDroplist title="Assignments">


  <MenuButtonOptionLink onClick={() => { navigate("/teacher/uploadAssignment") }}>Upload Assignment</MenuButtonOptionLink>
 



  </InnerDroplist>


  




</DropList>









    
</MenuCard>
  </>):(<>

  </>)
}



<>
<HomePageBanner>
{
  isMobile?(<>
              <HeaderBanner>

<BreakerM>

<NotificationIconM onClick={() => { navigate("/student") }}>
<CiSettings  />
<NotificationBadgeM>15</NotificationBadgeM>
</NotificationIconM>

<NotificationIconM onClick={() => { navigate("/student") }}>
<CiGlobe  />
<NotificationBadgeM>507</NotificationBadgeM>
</NotificationIconM>

<NotificationIconM onClick={() => { navigate("/student") }}>
<IoIosNotificationsOutline  />
<NotificationBadgeM>5</NotificationBadgeM>
</NotificationIconM>


</BreakerM>




</HeaderBanner>
  </>):(<>
  

  <>
<HeadernSearch pic={profilePic} name={userInfo.fullName} toggle={toggle} toggler={toggler}/>
<ProfileNDate  onClick={()=>toggler()}>
<HomeSchoolName> {SchoolData.schoolName} </HomeSchoolName>

<ProfileDetails>

<AnimateHeight height={dropdownOpen?"auto":0} duration={500}>    
<ProfileButtonOptionLink onClick={() => { navigate("/admin/viewProfile"); toggleDropdown() }}>View Profile </ProfileButtonOptionLink>
<ProfileButtonOptionLink onClick={() => { navigate("/admin/test"); toggleDropdown() }}>Edit Profile </ProfileButtonOptionLink>
<ProfileButtonOptionLink onClick={() => { navigate("/admin/test"); toggleDropdown() }}>Notifications </ProfileButtonOptionLink>
<ProfileButtonOptionLink onClick={() => { navigate("/admin/test"); toggleDropdown() }}>Chats </ProfileButtonOptionLink>

</AnimateHeight>

 </ProfileDetails>

</ProfileNDate>

    </>

  </>)
}

    
  <HomeGrouper style={{
alignItems: 'center',
  }}>


    
    <HomeUserPic src={profilePic} onClick={toggleDropdown}/>

  <HomeDetailsGrouper >
   <HomeUserName onClick={toggleDropdown}>{userInfo.title} {userInfo.firstName} {userInfo.otherName} {userInfo.lastName}</HomeUserName>
   <HomeUserSpecificRole onClick={toggleDropdown}>{userInfo.level}</HomeUserSpecificRole>
   
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