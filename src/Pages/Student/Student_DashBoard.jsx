import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DashboardContainer, HomeLogoM, HomeSchoolNameM } from '../../Designs/Styles/Styles';
import { AES, enc } from 'crypto-js';
import Pass from '../../Portals/Admin/Pass';
import PermissionDenied from '../../Portals/Admin/PermissionDenied';
import { DateNTime, HomeDetailsGrouper, HomeGrouper, HomeLogo, HomePage, HomePageBanner, HomeSchoolName, HomeUserName, HomeUserPic, HomeUserSpecificRole, MenuButtonOptionLink, ProfileButtonOptionLink, ProfileDetails, ProfileNDate,  } from '../../Designs/Styles/Styles'
import pic1 from "../../Designs/Images/download.png"
import { useNavigate } from 'react-router-dom'
import AnimateHeight from 'react-animate-height';
import { apiMedia, apiServer } from '../../Constants /Endpoints';
import Home from '../../Portals/Admin/Home';
import Profile from '../../Portals/Admin/Profile'


import ViewBook from "../../Portals/Admin/LMS/ViewBooks"

import HeadernSearch from '../HeadernSearch';

import { IoIosNotificationsOutline } from 'react-icons/io'
import {CiSettings,CiGlobe} from 'react-icons/ci'

import StraightLink from "./StraightLink"
import { BsChatDots, BsGlobeAsiaAustralia, BsPersonVideo3 } from 'react-icons/bs'
import { AiOutlineCalendar, AiOutlineFileText, AiOutlineMenuUnfold, AiOutlineNotification } from 'react-icons/ai'

import { MdOutlineAssignmentTurnedIn, MdReportProblem } from 'react-icons/md'

import { MenuCard, MenuCard2 } from '../../Designs/Styles/Profile';
import { Breaker, BreakerM, HeaderBanner, NotificationBadge, NotificationBadgeM, NotificationIcon, NotificationIconM } from '../../Designs/Styles/Dashboard';
import { GiBookCover, GiBookmarklet, GiNotebook, GiSecretBook } from 'react-icons/gi';
import { RiFileUploadLine } from 'react-icons/ri';

import TimeTable from "../../Portals/Student/TimeTable"
import Lessons from "../../Portals/Student/Lessons"
import VideoWithNotes from "../../Portals/Student/VideoWithNotes"
import AudioWithNotes from "../../Portals/Student/AudioWithNotes"
import PictureWithNotes from "../../Portals/Student/PictureWithNotes"
import ViewAnnouncement from "../../Portals/Student/ViewAnnoucement"
import HyChat from "../../Portals/Student/HyChat"
import AddGroup from "../../Portals/Student/AddGroup"
import Assignment from "../../Portals/Student/Assignment"
import AssignmentSolution from "../../Portals/Student/AssignmentSolution"
import TextnQuiz from "../../Portals/Student/ViewTextnQuiz"
import TextnQuizGrp from "../../Portals/Student/ViewAllTextnQuizInGroup"
import GradeBook from '../../Portals/Student/GradeBook';
import PaymentHis from '../../Portals/Student/PaymentHistory';
import ViewNotes from '../../Portals/Student/ViewNotes';
import ReportCard from '../../Portals/Student/ReportCard';
















const Dashboard = ({openNav,openfunction}) => {
  const [specificRole, setspecificRole] = useState("");
  

  

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    try{
      const encryptedData = sessionStorage.getItem("userDataEnc");
      const encryptionKey = '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK';
      const decryptedData = AES.decrypt(encryptedData, encryptionKey);
      const decryptedString = decryptedData.toString(enc.Utf8);
      const parsedData = JSON.parse(decryptedString);
        setUserInfo(parsedData);
    }catch(e){
navigate("/")
    }
    
  }, []);
  const profilePic = apiServer+userInfo.profilePic

  
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


<div onClick={openfunction}>

<StraightLink logo={<BsGlobeAsiaAustralia/>} title="TimeTable" path="/student/timetable"/>
<StraightLink logo={<GiSecretBook/>} title="Lesson" path="/student/lesson"/>
<StraightLink logo={<AiOutlineCalendar/>} title="Events" path="/student"/>
<StraightLink logo={<AiOutlineNotification/>} title="Announcements" path="/student/announcements"/>
<StraightLink logo={<BsChatDots/>} title="Discussions" path="/HyChat"/>
<StraightLink logo={<RiFileUploadLine/>} title="Assignments" path="/student/assignments"/>
<StraightLink logo={<MdOutlineAssignmentTurnedIn/>} title="Tests & Quizzes" path="/student/testnquizzes"/>
<StraightLink logo={<GiBookmarklet/>} title="GradeBook" path="/student/gradebook"/>
<StraightLink logo={<BsPersonVideo3/>} title="Classroom" path="/student/classroom"/>
<StraightLink logo={<GiNotebook/>} title="My Notes" path="/MyNotes"/>
<StraightLink logo={<MdReportProblem/>} title="Reports" path="/student/Reports"/>
<StraightLink logo={<AiOutlineNotification/>} title="Payments" path="/student/paymentHistory"/>


</div>

    












    
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
<HeadernSearch pic={profilePic}  toggle={toggle} toggler={toggler}/>
<ProfileNDate  onClick={()=>toggler()}>
<HomeSchoolName> {SchoolData.CompanyName} </HomeSchoolName>

<ProfileDetails>

 </ProfileDetails>

</ProfileNDate>

    </>

  </>)
}

    
  <HomeGrouper style={{
alignItems: 'center',
  }}>


    
    <HomeUserPic src={profilePic} onClick={toggleDropdown}/>
  {
    isMobile?(
    <>
    
    </>):(
    <>
   <HomeDetailsGrouper >
   <HomeUserName onClick={toggleDropdown}>{userInfo.title} {userInfo.firstName} {userInfo.otherName} {userInfo.lastName}</HomeUserName>
   <HomeUserSpecificRole onClick={toggleDropdown}>{userInfo.level}</HomeUserSpecificRole>
   
  </HomeDetailsGrouper>   
    </>)
  }



  </HomeGrouper>


</HomePageBanner>

<ProfileNDate>
<DateNTime>
  {sysDate}
</DateNTime>
{
  dropdownOpen?(<><MenuCard2 >

    <StraightLink logo={<BsGlobeAsiaAustralia/>} title="View Profile" path="/student/timetable"/>
    <StraightLink logo={<AiOutlineFileText/>} title="Notifications" path="/student/lesson"/>
    <StraightLink logo={<AiOutlineMenuUnfold/>} title="Contacts" path="/student/overview"/>
    <StraightLink logo={<AiOutlineCalendar/>} title="Events" path="/student"/>
    <StraightLink logo={<AiOutlineNotification/>} title="Payments" path="/student/announcements"/>
    
    
    
      
    </MenuCard2></>):(<></>)
}

</ProfileNDate>

    </>

    {
  isMobile?(<div
  style={{
    display:"flex",
    flexDirection:'row',
    alignItems: 'center',
    gap:"1rem"
  }}
  >
  <br/><br/><br/>
  <HomeLogoM src={apiMedia+SchoolData.CompanyLogo}/>
  <HomeSchoolNameM> {SchoolData.CompanyName} </HomeSchoolNameM>

  </div>):(<>
  
  </>)
}

   



    

        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="viewProfile" element={<Profile/>} />             
          
          <Route path="TimeTable" element={<TimeTable />} />
          <Route path="lesson" element={<Lessons />} />
          <Route path="lesson/video/:Id/:Title" element={<VideoWithNotes />} />
          <Route path="lesson/audio/:Id/:Title" element={<AudioWithNotes />} />
          <Route path="lesson/picture/:Id/:Title" element={<PictureWithNotes />} />
          <Route path="announcements" element={<ViewAnnouncement />} />
          <Route path="Discussions" element={<HyChat />} />
          <Route path="group" element={<AddGroup />} />
          <Route path="assignments" element={<Assignment />} />
          <Route path="assignments/:Id" element={<AssignmentSolution />} />
          <Route path="testnquizzes" element={<TextnQuiz />} />
          <Route path="testnquizzes/:Id" element={<TextnQuizGrp />} />
          <Route path="gradebook" element={<GradeBook />} />
          <Route path="paymentHistory" element={<PaymentHis />} />
          <Route path="MyNotes" element={<ViewNotes />} />
          <Route path="Reports" element={<ReportCard />} />
      
      

          <Route path="*" element={<PermissionDenied />} />
           
          
   

    </Routes>
    
    </DashboardContainer>

 
  )
}

export default Dashboard