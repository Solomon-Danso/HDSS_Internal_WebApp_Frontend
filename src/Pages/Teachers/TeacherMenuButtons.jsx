import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MenuContainer,MenuButtonOptionLink, menuInfo, SchoolDashboardLogo, SchoolNameNMotto, SchoolName, MenuInfo, } from '../../Designs/Styles/Styles'
import DropList from "../../Pages/DropList"
import InnerDroplist from "../../Pages/InnerDroplist"
import { AES, enc } from 'crypto-js';
import { GiTeacher } from "react-icons/gi";
import { RiAdminFill,RiBarChartGroupedFill,RiComputerFill } from "react-icons/ri";
import { HiUserGroup } from "react-icons/hi";
import { FaLayerGroup,FaCity } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
import { CgNotes } from "react-icons/cg";



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


<MenuInfo onClick={() => { navigate("/teacher") }}>
CIS
</MenuInfo>



{
  specificRole==="Teacher" ? (
  <>
  <DropList logo={<HiUserGroup/>} title="Students">
    <MenuButtonOptionLink onClick={() => { navigate("/teacher/studentsInfo") }}>Students</MenuButtonOptionLink>    
   
    </DropList>
  </>
  ):(
  <></>
  )
}
    



{
  specificRole==="SuperiorUser"||specificRole==="HeadTeacher"||specificRole==="Teacher" ? (
  <>
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
      <MenuButtonOptionLink onClick={() => { navigate("/teacher/test") }}>Audio</MenuButtonOptionLink>
      <MenuButtonOptionLink onClick={() => { navigate("/teacher/test") }}>Video</MenuButtonOptionLink>
      <MenuButtonOptionLink onClick={() => { navigate("/teacher/test") }}>Pictures</MenuButtonOptionLink>
      <MenuButtonOptionLink onClick={() => { navigate("/teacher/test") }}>Syllabus</MenuButtonOptionLink>
      <MenuButtonOptionLink onClick={() => { navigate("/teacher/test") }}>Calendar</MenuButtonOptionLink>

      </InnerDroplist>


      <InnerDroplist title="Resources">
      <MenuButtonOptionLink onClick={() => { navigate("/teacher/test") }}>Slides</MenuButtonOptionLink>
      <MenuButtonOptionLink onClick={() => { navigate("/teacher/test") }}>Audio</MenuButtonOptionLink>
      <MenuButtonOptionLink onClick={() => { navigate("/teacher/test") }}>Video</MenuButtonOptionLink>
      <MenuButtonOptionLink onClick={() => { navigate("/teacher/test") }}>Pictures</MenuButtonOptionLink>
      <MenuButtonOptionLink onClick={() => { navigate("/teacher/test") }}>Syllabus</MenuButtonOptionLink>
      <MenuButtonOptionLink onClick={() => { navigate("/teacher/test") }}>Calendar</MenuButtonOptionLink>

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

      <InnerDroplist title="Teacher" logo=">">
      <MenuButtonOptionLink onClick={() => { navigate("/teacher/test") }}>Upload Assignment</MenuButtonOptionLink>
      <MenuButtonOptionLink onClick={() => { navigate("/teacher/test") }}>Edit Assignment</MenuButtonOptionLink>
      <MenuButtonOptionLink onClick={() => { navigate("/teacher/test") }}>View Assigments</MenuButtonOptionLink>
      <MenuButtonOptionLink onClick={() => { navigate("/teacher/test") }}>View Solutions</MenuButtonOptionLink>
      </InnerDroplist>

      <InnerDroplist title="Student" logo=">">
      <MenuButtonOptionLink onClick={() => { navigate("/teacher/test") }}>View Assignment</MenuButtonOptionLink>
      <MenuButtonOptionLink onClick={() => { navigate("/teacher/test") }}>Upload Solution</MenuButtonOptionLink>
      <MenuButtonOptionLink onClick={() => { navigate("/teacher/test") }}>View Solutions</MenuButtonOptionLink>
      </InnerDroplist>


      </InnerDroplist>


      
    

    
    
    </DropList>
  </>
  ):(
  <></>
  )
}








{
  specificRole==="SuperiorUser"||specificRole==="HeadTeacher"||specificRole==="Teacher" ? (
  <>
  <DropList logo={<CgNotes/>} title="Lesson Notes">

    <InnerDroplist title="Create Notes">

    <MenuButtonOptionLink onClick={() => { navigate("/teacher/test") }}>Upload Notes</MenuButtonOptionLink>
    
    <MenuButtonOptionLink onClick={() => { navigate("/teacher/test") }}>Type Notes</MenuButtonOptionLink>
   

    </InnerDroplist>

    <InnerDroplist title="View Notes">

    <MenuButtonOptionLink onClick={() => { navigate("/teacher/test") }}>View Notes File</MenuButtonOptionLink>
    
    <MenuButtonOptionLink onClick={() => { navigate("/teacher/test") }}>View Typed Notes</MenuButtonOptionLink>
   
    </InnerDroplist>

    <InnerDroplist title="Update Notes">

    <MenuButtonOptionLink onClick={() => { navigate("/teacher/test") }}>Update Notes File</MenuButtonOptionLink>
    
    <MenuButtonOptionLink onClick={() => { navigate("/teacher/test") }}>Update Typed Notes</MenuButtonOptionLink>
   
    </InnerDroplist>

    <InnerDroplist title="Delete Notes">

    <MenuButtonOptionLink onClick={() => { navigate("/teacher/test") }}>Delete Notes File</MenuButtonOptionLink>

    <MenuButtonOptionLink onClick={() => { navigate("/teacher/test") }}>Delete Typed Notes</MenuButtonOptionLink>

    </InnerDroplist>


    
    </DropList>
  </>
  ):(
  <></>
  )
}








    
</MenuContainer>

  )
}

export default MenuButtons