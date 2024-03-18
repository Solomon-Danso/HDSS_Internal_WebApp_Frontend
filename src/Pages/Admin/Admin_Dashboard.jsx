import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DashboardContainer, FixedTop, HomeLogoL, HomeLogoM, HomeSchoolNameM, MenuButtonIcon, MenuButtonLink, MenuInfo } from '../../Designs/Styles/Styles';
import { AES, enc } from 'crypto-js';
import Pass from '../../Portals/Admin/Pass';
import PermissionDenied from '../../Portals/Admin/PermissionDenied';
import { DateNTime, HomeDetailsGrouper, HomeGrouper, HomeLogo, HomePage, HomePageBanner, HomeSchoolName, HomeUserName, HomeUserPic, HomeUserSpecificRole, MenuButtonOptionLink, ProfileButtonOptionLink, ProfileDetails, ProfileNDate,  } from '../../Designs/Styles/Styles'
import pic1 from "../../Designs/Images/download.png"
import { useNavigate } from 'react-router-dom'
import AnimateHeight from 'react-animate-height';
import { apiMedia, apiServer } from '../../Constants /Endpoints';
import Home from '../../Portals/Admin/Home';
import Test from '../../Portals/Admin/Test'

import StudentProfile from '../../Portals/Admin/StudentProfile'
import TeacherProfile from '../../Portals/Admin/TeacherProfile'


import Students from '../../Portals/Admin/Students';
import StudentInfo from '../../Portals/Admin/StudentIInfo';
import StudentDetails from '../../Portals/Admin/StudentDetails';
import UpdateStudent from "../../Portals/Admin/UpdateStudent";

import UpdateStudentFromProfile from "../../Portals/Admin/UpdateStudentFromProfile";
import UpdateTeachersFromProfile from "../../Portals/Admin/UpdateTeachersFromProfile";

import DeleteStudent from "../../Portals/Admin/DeleteStudent"
import MainFees from "../../Portals/Admin/MainFeesPage"
import FeesDetail from "../../Portals/Admin/FeesDetails"
import Teachers from "../../Portals/Admin/Teachers"
import UpdateTeacher from "../../Portals/Admin/UpdateTeachers"
import TeacherInfo from "../../Portals/Admin/TeacherInfo"
import TeacherDetails from "../../Portals/Admin/TeacherDetails"
import DeleteTeacher from "../../Portals/Admin/DeleteTeacher"
import Class from "../../Portals/Admin/LMS/Class"
import AddSubject  from "../../Portals/Admin/LMS/AddSubject"
import SubjectTeacher from "../../Portals/Admin/LMS/SubjectTeachers"
import ViewSlide from "../../Portals/Admin/LMS/AdminViewSlides"
import ViewAudio from "../../Portals/Admin/LMS/AdminViewAudios"
import ViewVideo from "../../Portals/Admin/LMS/AdminViewVideos"
import ViewTimeTable from "../../Portals/Admin/LMS/AdminViewTimetable"
import AddAnnoucementS from "../../Portals/Admin/LMS/AddAnnoucementS"
import AddAnnoucementT from "../../Portals/Admin/LMS/AddAnnouncementT"
import AddAnnoucementP from "../../Portals/Admin/LMS/AddAnnoucementP"
import AddAnnoucementH from "../../Portals/Admin/LMS/AddAnnouncementH"







import ViewPicture from "../../Portals/Admin/LMS/AdminViewPicture"
import ViewBooks from "../../Portals/Admin/LMS/AdminViewBooks"
import HeadernSearch from '../HeadernSearch';
import Admin_MenuButtons from './Admin_MenuButtons'
import { MenuCard, StudentInfoCard } from '../../Designs/Styles/Profile';


import DropList from "../../Pages/DropList"
import InnerDroplist from "../../Pages/InnerDroplist"
import { GiTeacher } from "react-icons/gi";
import { RiAdminFill,RiBarChartGroupedFill,RiComputerFill } from "react-icons/ri";
import { HiUserGroup } from "react-icons/hi";
import { FaLayerGroup,FaCity } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
import { CgNotes } from "react-icons/cg";
import { BsGraphUpArrow,BsPersonCheck,BsPersonFillAdd} from "react-icons/bs";
import { MdAttachMoney,MdOutlineSportsSoccer,MdLocalLibrary,MdCastForEducation,MdPerson,MdOutlineHealthAndSafety } from "react-icons/md";
import { TiGroup } from "react-icons/ti";
import { FcDepartment,FcPlanner } from "react-icons/fc";
import { LiaChalkboardSolid } from "react-icons/lia";
import { BreakerM, HeaderBanner, NotificationBadgeM, NotificationIconM } from '../../Designs/Styles/Dashboard';
import { IoIosNotificationsOutline } from 'react-icons/io'
import {CiSettings,CiGlobe} from 'react-icons/ci'
import { colors } from '../../Designs/Colors';
import { Show } from '../../Constants /Alerts';
import { BiBusSchool } from 'react-icons/bi';
import { IoFastFoodOutline } from 'react-icons/io5';
import StraightLink from "../../Pages/Student/StraightLink"
import { AiOutlineCloseCircle } from 'react-icons/ai';

import Transport from '../../Portals/Admin/Transport';
import PickUp from '../../Portals/Admin/PickUp';
import Departure from '../../Portals/Admin/Departure';
import Destination from '../../Portals/Admin/Destination';



const Dashboard = ({openNav,openfunction}) => {
   const specificRole="SuperiorUser"
  const [RoleList, setRoleList] = useState([])
 



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
      window.location.reload()
    }
   
  }, []);
  const profilePic = apiMedia+userInfo.ProfilePic

  
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
  fetch(apiServer+"ViewSchoolData")
  .then(res=>res.json())
  .then(data=>SetSchoolData(data))
  .catch(error=>console.error(error))
  },[])
  
useEffect(()=>{
  handleRoles()

},[userInfo])



const handleRoles = async () => {
 
 
    try {
      const formData = new FormData();

      const CompanyId = userInfo.CompanyId;
      const UserId = userInfo.UserId;
    
      formData.append("CompanyId",CompanyId)
      formData.append("UserId",UserId)

  
      const response = await fetch(apiServer+"ViewUserDetailedRole", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
  
      if (response.ok) {
        
       
        setRoleList(data)
        
      } else {
      
      }
    } catch (error) {

      Show.Attention("An error has occurred");
      navigate("/")
      window.location.reload()
    }

}








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


    const checkRole = (role) => {
      return RoleList.includes(role);
    };





  return (
   <DashboardContainer>
<br/>
{
  openNav?(
  
 <>
  <MenuCard >
  
  
  <div style={{display:"flex", flexDirection:"flex-end", gap:"1rem"}} onClick={() => {openfunction() }}>
          <MenuButtonIcon style={{color:`${colors.red}`}}><AiOutlineCloseCircle /></MenuButtonIcon>
         
  </div>


  <MenuInfo onClick={() => { navigate("/admin");openfunction() }}>
DashBoard
</MenuInfo>
 
{/*Student 360 */}
  {checkRole("SuperAdmin")|| checkRole('Annoucements')|| checkRole('Attendance')|| checkRole('Feeding')|| checkRole('Transport')|| checkRole('ViewSchoolFees')|| checkRole('ViewAssessment') || checkRole('AddStudent')|| checkRole("DeleteStudent")|| checkRole("ViewStudent")|| checkRole("UpdateStudent") ? (   
  <DropList logo={<HiUserGroup />} title="Students Mgmt">

{checkRole("SuperAdmin") || checkRole('AddStudent') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Admit Student</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("ViewStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/studentsInfo"); openfunction() }}>Student Info</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("UpdateStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/updateStudent"); openfunction() }}>Update Students</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("DeleteStudent") ? (   
   <MenuButtonOptionLink onClick={() => { navigate("/admin/deleteStudent"); openfunction() }}>Delete Students</MenuButtonOptionLink>
   ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewAssessment') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test"); openfunction() }}>Assessments</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewSchoolFees') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/schoolfees"); openfunction()  }}>School Fees</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Transport') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/transport"); openfunction() }}>Transport</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Feeding') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Feeding</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Attendance') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Attendance</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Annoucements') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Annoucements</MenuButtonOptionLink>
  ) : (<></>)}





  </DropList>
  ) : (<></>)}

  

{/*Staff Member 360 */}
{checkRole("SuperAdmin") || checkRole('PTAPlatform') || checkRole('StaffPlatform') || checkRole('PersonalChats') || checkRole('Clocking') || checkRole('Salary') || checkRole('AssignToActivities')  || checkRole('AssignToSubject')|| checkRole('AssignToClassroom')|| checkRole('Annoucements')|| checkRole('Assessments')|| checkRole( "RegisterStaffMembers")|| checkRole("UpdateStaffMembers")|| checkRole("ViewStaffMembers")|| checkRole("DeleteStaffMembers")|| checkRole("ViewStaffMembersInSchool")|| checkRole("AutoGenerateStaffMembers") || checkRole( "UploadAutoGenerateStaffMembers")|| checkRole('LessonNotes') ? (   
  <DropList logo={<GiTeacher/>} title="Staff Management">

{checkRole("SuperAdmin") || checkRole( "RegisterStaffMembers") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/teachers"); openfunction()  }}>Register </MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("UpdateStaffMembers") ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/updateteacher"); openfunction()  }}>Update </MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("ViewStaffMembers") ? (   
    <MenuButtonOptionLink onClick={() => { navigate("/admin/teacherinfo"); openfunction() }}>View Details</MenuButtonOptionLink>
    ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("DeleteStaffMembers") ? (   
   <MenuButtonOptionLink onClick={() => { navigate("/admin/deleteteacher"); openfunction() }}>Delete</MenuButtonOptionLink>
   ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("ViewStaffMembersInSchool") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test"); openfunction() }}>Staff Members</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("BulkRegisterStaffMember") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/schoolfees"); openfunction()  }}>Bulk Registration</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("BulkRegisterStaffMember") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/schoolfees"); openfunction()  }}>Bulk Staff Upload</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("AutoGenerateStaffMembers") ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Generate Staff List</MenuButtonOptionLink>
  ) : (<></>)}


{checkRole("SuperAdmin") || checkRole('LessonNotes') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/test"); openfunction() }}>Lesson Notes </MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Assessments') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/test"); openfunction() }}>Assessments</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Annoucements') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Annoucements</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('AssignToClassroom') ? (   
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test"); openfunction() }}>Assign to Classroom</MenuButtonOptionLink>
    ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('AssignToSubject') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/test"); openfunction() }}>Assign to Subject</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('AssignToActivities') ? (   
   <MenuButtonOptionLink onClick={() => { navigate("/admin/test"); openfunction() }}>Assign to Activities</MenuButtonOptionLink>
   ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Salary') ? (   
     <MenuButtonOptionLink onClick={() => { navigate("/admin/test"); openfunction() }}>Salary </MenuButtonOptionLink>
  ) : (<></>)}



{checkRole("SuperAdmin") || checkRole('Clocking') ? (   
   <MenuButtonOptionLink onClick={() => { navigate("/admin/test"); openfunction() }}>Clocking</MenuButtonOptionLink>    
   ) : (<></>)}


{checkRole("SuperAdmin") || checkRole('PersonalChats') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/test"); openfunction() }}>Personal Chats </MenuButtonOptionLink>
    ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('StaffPlatform') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/test"); openfunction() }}>Staff Platform</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('PTAPlatform') ? (   
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test"); openfunction() }}>PTA Platform</MenuButtonOptionLink>
    ) : (<></>)}





  </DropList>
  ) : (<></>)}

  {/*LMS */}
{checkRole("SuperAdmin") || checkRole("Assignments") || checkRole("Annoucements") || checkRole("Discussions")|| checkRole( "ClassList")|| checkRole("ModifySubjects")  ? (   
  <DropList logo={<FaLayerGroup/>} title="LMS">

{checkRole("SuperAdmin") || checkRole( "ClassList") ? (   
 <InnerDroplist title="Class">
 <MenuButtonOptionLink onClick={() => { navigate("/admin/class"); openfunction() }}>Class List</MenuButtonOptionLink>
</InnerDroplist>
) : (<></>)}

{checkRole("SuperAdmin") || checkRole("Discussions") ? (   
    <InnerDroplist title="Discussions">
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>View Discussions</MenuButtonOptionLink>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Teacher's Chat</MenuButtonOptionLink>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Student's Chat</MenuButtonOptionLink>    
    </InnerDroplist>  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("ModifySubjects") ? (   
     <InnerDroplist title="Subjects">
     <MenuButtonOptionLink onClick={() => { navigate("/admin/subjects") }}>Subject List </MenuButtonOptionLink>
     <MenuButtonOptionLink onClick={() => { navigate("/admin/subjectteacher") }}>Subject Teachers</MenuButtonOptionLink>
     
       </InnerDroplist>    ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("Annoucements") ? (   
 <InnerDroplist title="Annoucements">
        
 <InnerDroplist title="Students" logo=">">
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Add</MenuButtonOptionLink>
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>View</MenuButtonOptionLink>
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Update</MenuButtonOptionLink>
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Delete</MenuButtonOptionLink>
 </InnerDroplist>

 <InnerDroplist title="Teachers" logo=">">
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Add</MenuButtonOptionLink>
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>View</MenuButtonOptionLink>
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Update</MenuButtonOptionLink>
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Delete</MenuButtonOptionLink>
 </InnerDroplist>

 <InnerDroplist title="PTA" logo=">">
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Add</MenuButtonOptionLink>
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>View</MenuButtonOptionLink>
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Update</MenuButtonOptionLink>
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Delete</MenuButtonOptionLink>
 </InnerDroplist>

 <InnerDroplist title="HOD" logo=">">
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Add</MenuButtonOptionLink>
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>View</MenuButtonOptionLink>
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Update</MenuButtonOptionLink>
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Delete</MenuButtonOptionLink>
 </InnerDroplist>
 
 </InnerDroplist>   ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("Assignments") ? (   
       <InnerDroplist title="Assignments">

       <InnerDroplist title="Teacher" logo=">">
       <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Upload Assignment</MenuButtonOptionLink>
       <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Edit Assignment</MenuButtonOptionLink>
       <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>View Assigments</MenuButtonOptionLink>
       <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>View Solutions</MenuButtonOptionLink>
       </InnerDroplist>
 
       <InnerDroplist title="Student" logo=">">
       <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>View Assignment</MenuButtonOptionLink>
       <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Upload Solution</MenuButtonOptionLink>
       <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>View Solutions</MenuButtonOptionLink>
       </InnerDroplist>
 
 
       </InnerDroplist> ) : (<></>)}






  </DropList>
  ) : (<></>)}


  {/*Lesson Notes */}
{checkRole("SuperAdmin")|| checkRole("MarkNotes")|| checkRole("DeleteNotes")|| checkRole("UpdateNotes")|| checkRole("ViewNotes") || checkRole( "CreateNotes") ? (   
  <DropList logo={<CgNotes/>} title="Lesson Notes">

{checkRole("SuperAdmin") || checkRole( "CreateNotes") ? (   
    <InnerDroplist title="Create Notes">

    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Upload Notes</MenuButtonOptionLink>
    
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Type Notes</MenuButtonOptionLink>
   

    </InnerDroplist> ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("ViewNotes") ? (   
      <InnerDroplist title="View Notes">

      <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>View Notes File</MenuButtonOptionLink>
      
      <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>View Typed Notes</MenuButtonOptionLink>
     
      </InnerDroplist>  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("UpdateNotes") ? (   
      <InnerDroplist title="Update Notes">

      <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Update Notes File</MenuButtonOptionLink>
      
      <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Update Typed Notes</MenuButtonOptionLink>
     
      </InnerDroplist>    ) : (<></>)}


{checkRole("SuperAdmin") || checkRole("DeleteNotes") ? (   
 <InnerDroplist title="Delete Notes">

 <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Delete Notes File</MenuButtonOptionLink>

 <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Delete Typed Notes</MenuButtonOptionLink>

 </InnerDroplist>   ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("MarkNotes") ? (   
 <InnerDroplist title="Mark Notes">

 <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Mark Notes File</MenuButtonOptionLink>

 <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Mark Typed Notes</MenuButtonOptionLink>

 </InnerDroplist> ) : (<></>)}


  </DropList>
  ) : (<></>)}

{/*Transport */}
{checkRole("SuperAdmin")|| checkRole("DestinationArrival")|| checkRole("Departure")|| checkRole("Pickup")|| checkRole('TransportAdmin') ? (   
  <DropList logo={<BiBusSchool />} title="Transport">

{checkRole("SuperAdmin") || checkRole('TransportAdmin') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/transport") }}>Administration</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("Pickup") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/pickup") }}>Pickup</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("Departure") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/departure") }}>Departure</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("DestinationArrival") ? (   
   <MenuButtonOptionLink onClick={() => { navigate("/admin/arrivals") }}>Arrivals</MenuButtonOptionLink>
   ) : (<></>)}


  </DropList>
  ) : (<></>)}

{/*Accounting */}
{checkRole("SuperAdmin")|| checkRole('Annoucements') ? (   
  <DropList logo={<MdAttachMoney/>} title="Accounting">

{checkRole("SuperAdmin") || checkRole('FeesConfig') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Fees Configuration</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("ViewStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/studentsInfo"); openfunction() }}>Student Info</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("UpdateStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/updateStudent"); openfunction() }}>Update Students</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("DeleteStudent") ? (   
   <MenuButtonOptionLink onClick={() => { navigate("/admin/deleteStudent"); openfunction() }}>Delete Students</MenuButtonOptionLink>
   ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewAssessment') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test"); openfunction() }}>Assessments</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewSchoolFees') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/schoolfees"); openfunction()  }}>School Fees</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Transport') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Transport</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Feeding') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Feeding</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Attendance') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Attendance</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Annoucements') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Annoucements</MenuButtonOptionLink>
  ) : (<></>)}





  </DropList>
  ) : (<></>)}


{/*Reports */}
{checkRole("SuperAdmin")|| checkRole('Annoucements') ? (   
  <DropList logo={<BsGraphUpArrow/>} title="Reports">

{checkRole("SuperAdmin") || checkRole('FeesConfig') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Fees Configuration</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("ViewStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/studentsInfo"); openfunction() }}>Student Info</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("UpdateStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/updateStudent"); openfunction() }}>Update Students</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("DeleteStudent") ? (   
   <MenuButtonOptionLink onClick={() => { navigate("/admin/deleteStudent"); openfunction() }}>Delete Students</MenuButtonOptionLink>
   ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewAssessment') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test"); openfunction() }}>Assessments</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewSchoolFees') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/schoolfees"); openfunction()  }}>School Fees</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Transport') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Transport</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Feeding') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Feeding</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Attendance') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Attendance</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Annoucements') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Annoucements</MenuButtonOptionLink>
  ) : (<></>)}





  </DropList>
  ) : (<></>)}

{/*Human Resource */}
{checkRole("SuperAdmin")|| checkRole('Annoucements') ? (   
  <DropList logo={<TiGroup/>} title="Human Resource">

{checkRole("SuperAdmin") || checkRole('FeesConfig') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Fees Configuration</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("ViewStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/studentsInfo"); openfunction() }}>Student Info</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("UpdateStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/updateStudent"); openfunction() }}>Update Students</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("DeleteStudent") ? (   
   <MenuButtonOptionLink onClick={() => { navigate("/admin/deleteStudent"); openfunction() }}>Delete Students</MenuButtonOptionLink>
   ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewAssessment') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test"); openfunction() }}>Assessments</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewSchoolFees') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/schoolfees"); openfunction()  }}>School Fees</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Transport') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Transport</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Feeding') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Feeding</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Attendance') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Attendance</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Annoucements') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Annoucements</MenuButtonOptionLink>
  ) : (<></>)}





  </DropList>
  ) : (<></>)}



{/*Administration */}
{checkRole("SuperAdmin")|| checkRole('Annoucements') ? (   
  <DropList logo={<BsPersonCheck/>} title="Administration">

{checkRole("SuperAdmin") || checkRole('FeesConfig') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Fees Configuration</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("ViewStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/studentsInfo"); openfunction() }}>Student Info</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("UpdateStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/updateStudent"); openfunction() }}>Update Students</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("DeleteStudent") ? (   
   <MenuButtonOptionLink onClick={() => { navigate("/admin/deleteStudent"); openfunction() }}>Delete Students</MenuButtonOptionLink>
   ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewAssessment') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test"); openfunction() }}>Assessments</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewSchoolFees') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/schoolfees"); openfunction()  }}>School Fees</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Transport') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Transport</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Feeding') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Feeding</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Attendance') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Attendance</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Annoucements') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Annoucements</MenuButtonOptionLink>
  ) : (<></>)}





  </DropList>
  ) : (<></>)}


{/*Academic Boards */}
{checkRole("SuperAdmin")|| checkRole('Annoucements') ? (   
  <DropList logo={<LiaChalkboardSolid/>} title="Academic Boards">

{checkRole("SuperAdmin") || checkRole('FeesConfig') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Fees Configuration</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("ViewStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/studentsInfo"); openfunction() }}>Student Info</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("UpdateStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/updateStudent"); openfunction() }}>Update Students</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("DeleteStudent") ? (   
   <MenuButtonOptionLink onClick={() => { navigate("/admin/deleteStudent"); openfunction() }}>Delete Students</MenuButtonOptionLink>
   ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewAssessment') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test"); openfunction() }}>Assessments</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewSchoolFees') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/schoolfees"); openfunction()  }}>School Fees</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Transport') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Transport</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Feeding') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Feeding</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Attendance') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Attendance</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Annoucements') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Annoucements</MenuButtonOptionLink>
  ) : (<></>)}





  </DropList>
  ) : (<></>)}


{/*Registrar */}
{checkRole("SuperAdmin")|| checkRole('Annoucements') ? (   
  <DropList logo={<BsPersonFillAdd/>} title="Registrar">

{checkRole("SuperAdmin") || checkRole('FeesConfig') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Fees Configuration</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("ViewStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/studentsInfo"); openfunction() }}>Student Info</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("UpdateStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/updateStudent"); openfunction() }}>Update Students</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("DeleteStudent") ? (   
   <MenuButtonOptionLink onClick={() => { navigate("/admin/deleteStudent"); openfunction() }}>Delete Students</MenuButtonOptionLink>
   ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewAssessment') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test"); openfunction() }}>Assessments</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewSchoolFees') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/schoolfees"); openfunction()  }}>School Fees</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Transport') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Transport</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Feeding') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Feeding</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Attendance') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Attendance</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Annoucements') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Annoucements</MenuButtonOptionLink>
  ) : (<></>)}





  </DropList>
  ) : (<></>)}


{/*Bursary*/}
{checkRole("SuperAdmin")|| checkRole('Annoucements') ? (   
  <DropList logo={<FaSackDollar/>} title="Bursary">

{checkRole("SuperAdmin") || checkRole('FeesConfig') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Fees Configuration</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("ViewStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/studentsInfo"); openfunction() }}>Student Info</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("UpdateStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/updateStudent"); openfunction() }}>Update Students</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("DeleteStudent") ? (   
   <MenuButtonOptionLink onClick={() => { navigate("/admin/deleteStudent"); openfunction() }}>Delete Students</MenuButtonOptionLink>
   ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewAssessment') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test"); openfunction() }}>Assessments</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewSchoolFees') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/schoolfees"); openfunction()  }}>School Fees</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Transport') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Transport</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Feeding') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Feeding</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Attendance') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Attendance</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Annoucements') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Annoucements</MenuButtonOptionLink>
  ) : (<></>)}





  </DropList>
  ) : (<></>)}


{/*Sports Cordination */}
{checkRole("SuperAdmin")|| checkRole('Annoucements') ? (   
  <DropList logo={<MdOutlineSportsSoccer/>} title="Sports Cordination">

{checkRole("SuperAdmin") || checkRole('FeesConfig') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Fees Configuration</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("ViewStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/studentsInfo"); openfunction() }}>Student Info</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("UpdateStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/updateStudent"); openfunction() }}>Update Students</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("DeleteStudent") ? (   
   <MenuButtonOptionLink onClick={() => { navigate("/admin/deleteStudent"); openfunction() }}>Delete Students</MenuButtonOptionLink>
   ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewAssessment') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test"); openfunction() }}>Assessments</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewSchoolFees') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/schoolfees"); openfunction()  }}>School Fees</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Transport') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Transport</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Feeding') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Feeding</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Attendance') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Attendance</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Annoucements') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Annoucements</MenuButtonOptionLink>
  ) : (<></>)}





  </DropList>
  ) : (<></>)}


{/*Librarian */}
{checkRole("SuperAdmin")|| checkRole('Annoucements') ? (   
  <DropList logo={<MdLocalLibrary/>} title="Library">

{checkRole("SuperAdmin") || checkRole('FeesConfig') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Fees Configuration</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("ViewStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/studentsInfo"); openfunction() }}>Student Info</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("UpdateStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/updateStudent"); openfunction() }}>Update Students</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("DeleteStudent") ? (   
   <MenuButtonOptionLink onClick={() => { navigate("/admin/deleteStudent"); openfunction() }}>Delete Students</MenuButtonOptionLink>
   ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewAssessment') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test"); openfunction() }}>Assessments</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewSchoolFees') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/schoolfees"); openfunction()  }}>School Fees</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Transport') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Transport</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Feeding') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Feeding</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Attendance') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Attendance</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Annoucements') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Annoucements</MenuButtonOptionLink>
  ) : (<></>)}





  </DropList>
  ) : (<></>)}


{/*Domestics */}
{checkRole("SuperAdmin")|| checkRole('Annoucements') ? (   
  <DropList logo={<FaCity/>} title="Domestics">

{checkRole("SuperAdmin") || checkRole('FeesConfig') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Fees Configuration</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("ViewStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/studentsInfo"); openfunction() }}>Student Info</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("UpdateStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/updateStudent"); openfunction() }}>Update Students</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("DeleteStudent") ? (   
   <MenuButtonOptionLink onClick={() => { navigate("/admin/deleteStudent"); openfunction() }}>Delete Students</MenuButtonOptionLink>
   ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewAssessment') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test"); openfunction() }}>Assessments</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewSchoolFees') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/schoolfees"); openfunction()  }}>School Fees</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Transport') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Transport</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Feeding') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Feeding</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Attendance') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Attendance</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Annoucements') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Annoucements</MenuButtonOptionLink>
  ) : (<></>)}





  </DropList>
  ) : (<></>)}


{/*Special Education */}
{checkRole("SuperAdmin")|| checkRole('Annoucements') ? (   
  <DropList logo={<MdCastForEducation/>} title="Special Education">

{checkRole("SuperAdmin") || checkRole('FeesConfig') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Fees Configuration</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("ViewStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/studentsInfo"); openfunction() }}>Student Info</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("UpdateStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/updateStudent"); openfunction() }}>Update Students</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("DeleteStudent") ? (   
   <MenuButtonOptionLink onClick={() => { navigate("/admin/deleteStudent"); openfunction() }}>Delete Students</MenuButtonOptionLink>
   ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewAssessment') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test"); openfunction() }}>Assessments</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewSchoolFees') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/schoolfees"); openfunction()  }}>School Fees</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Transport') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Transport</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Feeding') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Feeding</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Attendance') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Attendance</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Annoucements') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Annoucements</MenuButtonOptionLink>
  ) : (<></>)}





  </DropList>
  ) : (<></>)}


{/*Marketting*/}
{checkRole("SuperAdmin")|| checkRole('Annoucements') ? (   
  <DropList logo={<RiBarChartGroupedFill/>} title="Marketting">

{checkRole("SuperAdmin") || checkRole('FeesConfig') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Fees Configuration</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("ViewStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/studentsInfo"); openfunction() }}>Student Info</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("UpdateStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/updateStudent"); openfunction() }}>Update Students</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("DeleteStudent") ? (   
   <MenuButtonOptionLink onClick={() => { navigate("/admin/deleteStudent"); openfunction() }}>Delete Students</MenuButtonOptionLink>
   ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewAssessment') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test"); openfunction() }}>Assessments</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewSchoolFees') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/schoolfees"); openfunction()  }}>School Fees</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Transport') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Transport</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Feeding') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Feeding</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Attendance') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Attendance</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Annoucements') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Annoucements</MenuButtonOptionLink>
  ) : (<></>)}





  </DropList>
  ) : (<></>)}


{/*Event Planners */}
{checkRole("SuperAdmin")|| checkRole('Annoucements') ? (   
  <DropList logo={<FcPlanner/>} title="Event Planners">

{checkRole("SuperAdmin") || checkRole('FeesConfig') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Fees Configuration</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("ViewStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/studentsInfo"); openfunction() }}>Student Info</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("UpdateStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/updateStudent"); openfunction() }}>Update Students</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("DeleteStudent") ? (   
   <MenuButtonOptionLink onClick={() => { navigate("/admin/deleteStudent"); openfunction() }}>Delete Students</MenuButtonOptionLink>
   ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewAssessment') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test"); openfunction() }}>Assessments</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewSchoolFees') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/schoolfees"); openfunction()  }}>School Fees</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Transport') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Transport</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Feeding') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Feeding</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Attendance') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Attendance</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Annoucements') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Annoucements</MenuButtonOptionLink>
  ) : (<></>)}





  </DropList>
  ) : (<></>)}


{/*Counseling */}
{checkRole("SuperAdmin")|| checkRole('Annoucements') ? (   
  <DropList logo={<MdPerson/>} title="Counseling">

{checkRole("SuperAdmin") || checkRole('FeesConfig') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Fees Configuration</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("ViewStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/studentsInfo"); openfunction() }}>Student Info</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("UpdateStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/updateStudent"); openfunction() }}>Update Students</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("DeleteStudent") ? (   
   <MenuButtonOptionLink onClick={() => { navigate("/admin/deleteStudent"); openfunction() }}>Delete Students</MenuButtonOptionLink>
   ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewAssessment') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test"); openfunction() }}>Assessments</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewSchoolFees') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/schoolfees"); openfunction()  }}>School Fees</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Transport') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Transport</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Feeding') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Feeding</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Attendance') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Attendance</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Annoucements') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Annoucements</MenuButtonOptionLink>
  ) : (<></>)}





  </DropList>
  ) : (<></>)}





  {/*Kitchen */}
{checkRole("SuperAdmin")|| checkRole('Annoucements') ? (   
  <DropList logo={<IoFastFoodOutline />} title="Kitchen">

{checkRole("SuperAdmin") || checkRole('FeesConfig') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Fees Configuration</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("ViewStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/studentsInfo"); openfunction() }}>Student Info</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("UpdateStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/updateStudent"); openfunction() }}>Update Students</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("DeleteStudent") ? (   
   <MenuButtonOptionLink onClick={() => { navigate("/admin/deleteStudent"); openfunction() }}>Delete Students</MenuButtonOptionLink>
   ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewAssessment') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test"); openfunction() }}>Assessments</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewSchoolFees') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/schoolfees"); openfunction()  }}>School Fees</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Transport') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Transport</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Feeding') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Feeding</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Attendance') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Attendance</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Annoucements') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Annoucements</MenuButtonOptionLink>
  ) : (<></>)}





  </DropList>
  ) : (<></>)}

  {/*Health N Safety */}
{checkRole("SuperAdmin")|| checkRole('Annoucements') ? (   
  <DropList logo={<MdOutlineHealthAndSafety/>} title="Health N Safety">

{checkRole("SuperAdmin") || checkRole('FeesConfig') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Fees Configuration</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("ViewStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/studentsInfo"); openfunction() }}>Student Info</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("UpdateStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/updateStudent"); openfunction() }}>Update Students</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("DeleteStudent") ? (   
   <MenuButtonOptionLink onClick={() => { navigate("/admin/deleteStudent"); openfunction() }}>Delete Students</MenuButtonOptionLink>
   ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewAssessment') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test"); openfunction() }}>Assessments</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewSchoolFees') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/schoolfees"); openfunction()  }}>School Fees</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Transport') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Transport</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Feeding') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Feeding</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Attendance') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Attendance</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Annoucements') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Annoucements</MenuButtonOptionLink>
  ) : (<></>)}





  </DropList>
  ) : (<></>)}










{/*System Management */}
{checkRole("SuperAdmin")|| checkRole('Annoucements') ? (   
  <DropList logo={<RiComputerFill/>} title="System Management">

{checkRole("SuperAdmin") || checkRole('FeesConfig') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Fees Configuration</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("ViewStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/studentsInfo"); openfunction() }}>Student Info</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("UpdateStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/updateStudent"); openfunction() }}>Update Students</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("DeleteStudent") ? (   
   <MenuButtonOptionLink onClick={() => { navigate("/admin/deleteStudent"); openfunction() }}>Delete Students</MenuButtonOptionLink>
   ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewAssessment') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test"); openfunction() }}>Assessments</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewSchoolFees') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/schoolfees"); openfunction()  }}>School Fees</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Transport') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Transport</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Feeding') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Feeding</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Attendance') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Attendance</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Annoucements') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students"); openfunction() }}>Annoucements</MenuButtonOptionLink>
  ) : (<></>)}





  </DropList>
  ) : (<></>)}












{
  specificRole==="SuperiorUser" ? (
  <>
  <DropList logo={<RiAdminFill/>} title="Admin">
      
    <InnerDroplist title="Superior User">
    <MenuButtonOptionLink onClick={() => { navigate("/admin/pass") }}>Profile Picture </MenuButtonOptionLink>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Update Details</MenuButtonOptionLink>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>View Details</MenuButtonOptionLink>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Password Reset</MenuButtonOptionLink>
    </InnerDroplist>

    <InnerDroplist title="School Directors">
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Register School Director</MenuButtonOptionLink>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Update School Director Profile Picture </MenuButtonOptionLink>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Update School Director Details</MenuButtonOptionLink>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>View School Director Details</MenuButtonOptionLink>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>School Director Password Reset</MenuButtonOptionLink>
    </InnerDroplist>    

    <InnerDroplist title="Managers ">
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Register Manager</MenuButtonOptionLink>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Update Manager Profile Picture</MenuButtonOptionLink>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Update Manager Details</MenuButtonOptionLink>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>View Manager Details</MenuButtonOptionLink>    
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Manager Password Reset</MenuButtonOptionLink>
    </InnerDroplist>

    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>View All Passwords </MenuButtonOptionLink>

    
    </DropList>
  </>
  ):(
  <></>
  )
}






















  </MenuCard>
  </>


 ):(<>

  </>)
}

<>

{
  isMobile?(<>

  
  </>):(<>
  

<div style={{display:"flex", flexDirection:"row", justifyContent:"space-between",height:"auto", backgroundColor:`${colors.card}`, alignItems: "center"}}>


<HeadernSearch pic={profilePic} name={userInfo.FullName} toggle={toggle} toggler={toggler}/>

<HomeSchoolName> {SchoolData.CompanyName} </HomeSchoolName>

<HomeGrouper>
    <HomeUserPic src={profilePic} onClick={toggleDropdown}/>

  <HomeDetailsGrouper >
   <HomeUserName onClick={toggleDropdown}>{userInfo.FullName}</HomeUserName>
   <HomeUserSpecificRole onClick={toggleDropdown}>{userInfo.PrimaryRole}</HomeUserSpecificRole>
   
  </HomeDetailsGrouper>


  </HomeGrouper>

</div>






  

  </>)
}  
  


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
  <FixedTop>
  <HomeLogoM src={apiMedia+SchoolData.CompanyLogo}/>
  <HomeSchoolNameM> {SchoolData.CompanyName} </HomeSchoolNameM>

  </FixedTop>
  
  </div>):(<>
  
  </>)
}


<ProfileNDate>
<DateNTime>
  {sysDate}
</DateNTime>


</ProfileNDate>

    </>


    


        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="viewProfile" element={<StudentProfile/>} />
        
        <Route path="test" element={<Test />} />  
        <Route path="*" element={<PermissionDenied />} />
        <Route path="students" element={<Students />} /> 
        <Route path="studentsInfo" element={<StudentInfo />} />
        <Route path="studentsDetails/:studentId" element={<StudentProfile />} />
        <Route path="teacherDetails/:staffId" element={<TeacherProfile />} />
        <Route path="feesDetails/:studentId" element={<FeesDetail />} />
        <Route path="updateStudent" element={<UpdateStudent />} /> 
        <Route path="updateStudentFromProfile/:studentId" element={<UpdateStudentFromProfile />} /> 
        <Route path="updateTeachersFromProfile/:staffId" element={<UpdateTeachersFromProfile />} /> 

        
        <Route path="deleteStudent" element={<DeleteStudent />} />  
        <Route path="schoolfees" element={<MainFees />} /> 
        <Route path="teachers" element={<Teachers />} /> 
        <Route path="updateteacher" element={<UpdateTeacher />} /> 
        <Route path="teacherinfo" element={<TeacherInfo />} /> 
        <Route path="deleteteacher" element={<DeleteTeacher />} /> 
        <Route path="class" element={<Class />} /> 
        <Route path="students" element={<Students />} /> 
        <Route path="studentsInfo" element={<StudentInfo />} />
        <Route path="studentsDetails/:studentId" element={<StudentDetails />} />
        <Route path="class" element={<Class />} /> 
        <Route path="subjects" element={<AddSubject />} />
        <Route path="subjectteacher" element={<SubjectTeacher />} /> 
        <Route path="viewSlides" element={<ViewSlide />} />
        <Route path="viewAudios" element={<ViewAudio />} />
        <Route path="viewVideos" element={<ViewVideo />} />
        <Route path="viewPictures" element={<ViewPicture />} />
        <Route path="viewBooks" element={<ViewBooks />} />
        <Route path="viewTimeTable" element={<ViewTimeTable />} />
        <Route path="annoucement" element={<AddAnnoucementS />} />
        <Route path="annoucementt" element={<AddAnnoucementT />} />
        <Route path="annoucementp" element={<AddAnnoucementP />} />
        <Route path="annoucementh" element={<AddAnnoucementH />} />
        <Route path="transport" element={<Transport />} />
        <Route path="pickup" element={<PickUp />} />
        <Route path="departure" element={<Departure />} />
        <Route path="arrivals" element={<Destination />} />
        <Route path="pass" element={<Pass />} />  
          
          
          
          
          
          
          
          
          
   

    </Routes>
    
    </DashboardContainer>

 
  )
}

export default Dashboard