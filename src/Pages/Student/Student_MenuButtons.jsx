import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MenuContainer,MenuButtonOptionLink, menuInfo, SchoolDashboardLogo, SchoolNameNMotto, SchoolName, MenuInfo, } from '../../Designs/Styles/Styles'
import DropList from "../../Pages/DropList"
import InnerDroplist from "../../Pages/InnerDroplist"
import { AES, enc } from 'crypto-js';
import { GiBookCover, GiBookmarklet, GiNotebook, GiSecretBook, GiTeacher } from "react-icons/gi";
import { RiAdminFill,RiBarChartGroupedFill,RiComputerFill, RiFileUploadLine } from "react-icons/ri";
import { HiUserGroup } from "react-icons/hi";
import { FaLayerGroup,FaCity } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
import { CgNotes } from "react-icons/cg";
import StraightLink from "./StraightLink"
import { BsChatDots, BsGlobeAsiaAustralia, BsPersonVideo3 } from 'react-icons/bs'
import { AiOutlineCalendar, AiOutlineFileText, AiOutlineMenuUnfold, AiOutlineNotification } from 'react-icons/ai'
import { BiSolidCalendarHeart } from 'react-icons/bi'
import { MdOutlineAssignmentTurnedIn, MdReportProblem } from 'react-icons/md'


const MenuButtons = () => {
  const navigate = useNavigate();

 
  const [specificRole, setspecificRole] = useState("");
  const [role, setrole] = useState("");

  useEffect(() => {
    const spRole =  AES.decrypt(sessionStorage.getItem("SpecificRole"), '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK').toString(enc.Utf8);
    setspecificRole(spRole);
    
  }, []);
  

  



  return (
<MenuContainer>


<MenuInfo onClick={() => { navigate("/student") }}>
DashBoard
</MenuInfo>




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








    
</MenuContainer>

  )
}

export default MenuButtons