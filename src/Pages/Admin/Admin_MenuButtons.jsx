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
import { BsGraphUpArrow,BsPersonCheck,BsPersonFillAdd} from "react-icons/bs";
import { MdAttachMoney,MdOutlineSportsSoccer,MdLocalLibrary,MdCastForEducation,MdPerson,MdOutlineHealthAndSafety } from "react-icons/md";
import { TiGroup } from "react-icons/ti";
import { FcDepartment,FcPlanner } from "react-icons/fc";
import { LiaChalkboardSolid } from "react-icons/lia";



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


<MenuInfo onClick={() => { navigate("/admin") }}>
CIS
</MenuInfo>



{
  specificRole==="SuperiorUser"||specificRole==="HeadTeacher" ? (
  <>
  <DropList logo={<HiUserGroup/>} title="Students">
    <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Admit Student</MenuButtonOptionLink>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/studentsInfo") }}>Student Info</MenuButtonOptionLink>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/updateStudent") }}>Update Students</MenuButtonOptionLink>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/deleteStudent") }}>Delete Students</MenuButtonOptionLink>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Assessments</MenuButtonOptionLink>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/schoolfees") }}>School Fees</MenuButtonOptionLink>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Transport</MenuButtonOptionLink>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Feeding</MenuButtonOptionLink>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Subscription</MenuButtonOptionLink>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Notification</MenuButtonOptionLink>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Attendance</MenuButtonOptionLink>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Personal Chats</MenuButtonOptionLink>
    
   
    </DropList>
  </>
  ):(
  <></>
  )
}
    
         
{
  specificRole==="SuperiorUser"||specificRole==="HeadTeacher" ? (
  <>
  <DropList logo={<GiTeacher/>} title="Teacher">
    <MenuButtonOptionLink onClick={() => { navigate("/admin/teachers") }}>Register </MenuButtonOptionLink>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/updateteacher") }}>Update </MenuButtonOptionLink>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/teacherinfo") }}>View Details</MenuButtonOptionLink>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/deleteteacher") }}>Delete</MenuButtonOptionLink>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Lesson Notes </MenuButtonOptionLink>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Assessments</MenuButtonOptionLink>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Assign to Classroom</MenuButtonOptionLink>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Assign to Subject</MenuButtonOptionLink>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Assign to Activities</MenuButtonOptionLink>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Salary </MenuButtonOptionLink>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Subscription</MenuButtonOptionLink>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Clocking</MenuButtonOptionLink>    
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Personal Chats </MenuButtonOptionLink>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Staff Platform</MenuButtonOptionLink>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>PTA Platform</MenuButtonOptionLink>


  


    
    </DropList>
  </>
  ):(
  <></>
  )
}

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



{
  specificRole==="SuperiorUser"||specificRole==="HeadTeacher" ? (
  <>
  <DropList logo={<FaLayerGroup/>} title="LMS">

    <InnerDroplist title="Class">
    <MenuButtonOptionLink onClick={() => { navigate("/admin/class") }}>Class List</MenuButtonOptionLink>
  </InnerDroplist>

    <InnerDroplist title="Discussions">
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>View Discussions</MenuButtonOptionLink>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Teacher's Chat</MenuButtonOptionLink>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Student's Chat</MenuButtonOptionLink>    
    </InnerDroplist>


    <InnerDroplist title="Subjects">
    <MenuButtonOptionLink onClick={() => { navigate("/admin/subjects") }}>Subject List </MenuButtonOptionLink>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/subjectteacher") }}>Subject Teachers</MenuButtonOptionLink>
    
      </InnerDroplist>

      <InnerDroplist title="Uploads">
      <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Slides</MenuButtonOptionLink>
      <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Audio</MenuButtonOptionLink>
      <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Video</MenuButtonOptionLink>
      <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Pictures</MenuButtonOptionLink>
      <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Syllabus</MenuButtonOptionLink>
      <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Calendar</MenuButtonOptionLink>

      </InnerDroplist>

      <InnerDroplist title="View As Student">
      <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Slides</MenuButtonOptionLink>
      <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Audio</MenuButtonOptionLink>
      <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Video</MenuButtonOptionLink>
      <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Pictures</MenuButtonOptionLink>
      <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Syllabus</MenuButtonOptionLink>
      <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Calendar</MenuButtonOptionLink>

      </InnerDroplist>

      <InnerDroplist title="View As Teacher">
      <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Slides</MenuButtonOptionLink>
      <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Audio</MenuButtonOptionLink>
      <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Video</MenuButtonOptionLink>
      <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Pictures</MenuButtonOptionLink>
      <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Syllabus</MenuButtonOptionLink>
      <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Calendar</MenuButtonOptionLink>

      </InnerDroplist>

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
      
      </InnerDroplist>

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


      </InnerDroplist>


      
    

    
    
    </DropList>
  </>
  ):(
  <></>
  )
}








{
  specificRole==="SuperiorUser"||specificRole==="HeadTeacher" ? (
  <>
  <DropList logo={<CgNotes/>} title="Lesson Notes">

    <InnerDroplist title="Create Notes">

    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Upload Notes</MenuButtonOptionLink>
    
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Type Notes</MenuButtonOptionLink>
   

    </InnerDroplist>

    <InnerDroplist title="View Notes">

    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>View Notes File</MenuButtonOptionLink>
    
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>View Typed Notes</MenuButtonOptionLink>
   
    </InnerDroplist>

    <InnerDroplist title="Update Notes">

    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Update Notes File</MenuButtonOptionLink>
    
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Update Typed Notes</MenuButtonOptionLink>
   
    </InnerDroplist>

    <InnerDroplist title="Delete Notes">

    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Delete Notes File</MenuButtonOptionLink>

    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Delete Typed Notes</MenuButtonOptionLink>

    </InnerDroplist>

    <InnerDroplist title="Mark Notes">

    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Mark Notes File</MenuButtonOptionLink>

    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Mark Typed Notes</MenuButtonOptionLink>

    </InnerDroplist>

    
    </DropList>
  </>
  ):(
  <></>
  )
}

{
  specificRole==="SuperiorUser" ?(
    <>
    <DropList title="Reports" logo={<BsGraphUpArrow/>}>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Under Construction </MenuButtonOptionLink>
    </DropList>
    </>
  ):(
    <></>
  )
}


{
  specificRole==="SuperiorUser"||specificRole==="Accountant" ?(
    <>
    <DropList title="Accounting" logo={<MdAttachMoney/>}>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Under Construction </MenuButtonOptionLink>
    </DropList>
    </>
  ):(
    <></>
  )
}

{
  specificRole==="SuperiorUser"||specificRole==="HumanResourceManager" ?(
    <>
    <DropList title="Human Resource" logo={<TiGroup/>} >
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Under Construction </MenuButtonOptionLink>
    </DropList>
    </>
  ):(
    <></>
  )
}

{
  specificRole==="SuperiorUser"||specificRole==="Secretary" ?(
    <>
    <DropList title="Secretary" logo={<BsPersonCheck/>}>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Under Construction </MenuButtonOptionLink>
    </DropList>
    </>
  ):(
    <></>
  )
}

{
  specificRole==="SuperiorUser"||specificRole==="DepartmentHead" ?(
    <>
    <DropList title="Department Head" logo={<FcDepartment/>}>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Under Construction </MenuButtonOptionLink>
    </DropList>
    </>
  ):(
    <></>
  )
}

{
  specificRole==="SuperiorUser"||specificRole==="Boards" ?(
    <>
    <DropList title="Boards" logo={<LiaChalkboardSolid/>}>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Under Construction </MenuButtonOptionLink>
    </DropList>
    </>
  ):(
    <></>
  )
}

{
  specificRole==="SuperiorUser"||specificRole==="Registrar" ?(
    <>
    <DropList title="Registrar" logo={<BsPersonFillAdd/>}>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Under Construction </MenuButtonOptionLink>
    </DropList>
    </>
  ):(
    <></>
  )
}

{
  specificRole==="SuperiorUser"||specificRole==="Bursar" ?(
    <>
    <DropList title="Bursar" logo={<FaSackDollar/>}>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Under Construction </MenuButtonOptionLink>
    </DropList>
    </>
  ):(
    <></>
  )
}

{
  specificRole==="SuperiorUser"||specificRole==="SportsCordinator" ?(
    <>
    <DropList title="Sports Cordinator" logo={<MdOutlineSportsSoccer/>}>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Under Construction </MenuButtonOptionLink>
    </DropList>
    </>
  ):(
    <></>
  )
}

{
  specificRole==="SuperiorUser"||specificRole==="Librarian" ?(
    <>
    <DropList title="Librarian" logo={<MdLocalLibrary/>}>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Under Construction </MenuButtonOptionLink>
    </DropList>
    </>
  ):(
    <></>
  )
}

{
  specificRole==="SuperiorUser"||specificRole==="FacilitiesManager" ?(
    <>
    <DropList title="Facilities Manager" logo={<FaCity/>}>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Under Construction </MenuButtonOptionLink>
    </DropList>
    </>
  ):(
    <></>
  )
}

{
  specificRole==="SuperiorUser"||specificRole==="SpecialEducationManager" ?(
    <>
    <DropList title="Special Education Manager" logo={<MdCastForEducation/>}>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Under Construction </MenuButtonOptionLink>
    </DropList>
    </>
  ):(
    <></>
  )
}


{
  specificRole==="SuperiorUser"||specificRole==="MarkettingManager" ?(
    <>
    <DropList title="Marketting Manager" logo={<RiBarChartGroupedFill/>}>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Under Construction includes Media </MenuButtonOptionLink>
    </DropList>
    </>
  ):(
    <></>
  )
}

{
  specificRole==="SuperiorUser"||specificRole==="EventNPlanning" ?(
    <>
    <DropList title="Event N Planning" logo={<FcPlanner/>}>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Under Construction </MenuButtonOptionLink>
    </DropList>
    </>
  ):(
    <></>
  )
}




{
  specificRole==="SuperiorUser"||specificRole==="SchoolCouncelor" ?(
    <>
    <DropList title="School Councelor" logo={<MdPerson/>}>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Under Construction </MenuButtonOptionLink>
    </DropList>
    </>
  ):(
    <></>
  )
}

{
  specificRole==="SuperiorUser"||specificRole==="ITManager" ?(
    <>
    <DropList title="IT Manager" logo={<RiComputerFill/>}>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Under Construction </MenuButtonOptionLink>
    </DropList>
    </>
  ):(
    <></>
  )
}



{
  specificRole==="SuperiorUser"||specificRole==="HealthnSafety" ?(
    <>
    <DropList title="Health N Safety" logo={<MdOutlineHealthAndSafety/>}>
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Under Construction </MenuButtonOptionLink>
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