import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MenuContainer,MenuButtonOptionLink, menuInfo, SchoolDashboardLogo, SchoolNameNMotto, SchoolName, MenuInfo, HomeLogoL, } from '../../Designs/Styles/Styles'
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
import { apiMedia, apiServer } from '../../Constants /Endpoints'
import { Show } from '../../Constants /Alerts'
import { IoFastFoodOutline } from 'react-icons/io5'
import { BiBusSchool } from 'react-icons/bi'



const MenuButtons = () => {
  const navigate = useNavigate();

 
  const [SchoolData, SetSchoolData] = useState({})

  useEffect(()=>{
  fetch(apiServer+"ViewSchoolData")
  .then(res=>res.json())
  .then(data=>SetSchoolData(data))
  .catch(error=>console.error(error))
  },[])

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

  const [RoleList, setRoleList] = useState([])
 
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

  const checkRole = (role) => {
    return RoleList.includes(role);
  };




  return (
<MenuContainer>

<HomeLogoL src={apiMedia+SchoolData.CompanyLogo} onClick={() => { navigate("/admin") }}/>

<MenuInfo onClick={() => { navigate("/admin") }}>
DashBoard
</MenuInfo>


{/*Student 360 */}
{checkRole("SuperAdmin")|| checkRole('Annoucements')|| checkRole('Attendance')|| checkRole('Feeding')|| checkRole('Transport')|| checkRole('ViewSchoolFees')|| checkRole('ViewAssessment') || checkRole('AddStudent')|| checkRole("DeleteStudent")|| checkRole("ViewStudent")|| checkRole("UpdateStudent") ? (   
  <DropList logo={<HiUserGroup />} title="Students Mgmt">

{checkRole("SuperAdmin") || checkRole('AddStudent') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Admit Student</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("ViewStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/studentsInfo") }}>Student Info</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("UpdateStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/updateStudent") }}>Update Students</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("DeleteStudent") ? (   
   <MenuButtonOptionLink onClick={() => { navigate("/admin/deleteStudent") }}>Delete Students</MenuButtonOptionLink>
   ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewAssessment') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Assessments</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewSchoolFees') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/schoolfees")  }}>School Fees</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Transport') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/transport") }}>Transport</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Feeding') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Feeding</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Attendance') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Attendance</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Annoucements') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Annoucements</MenuButtonOptionLink>
  ) : (<></>)}





  </DropList>
  ) : (<></>)}

  

{/*Staff Member 360 */}
{checkRole("SuperAdmin") || checkRole('PTAPlatform') || checkRole('StaffPlatform') || checkRole('PersonalChats') || checkRole('Clocking') || checkRole('Salary') || checkRole('AssignToActivities')  || checkRole('AssignToSubject')|| checkRole('AssignToClassroom')|| checkRole('Annoucements')|| checkRole('Assessments')|| checkRole( "RegisterStaffMembers")|| checkRole("UpdateStaffMembers")|| checkRole("ViewStaffMembers")|| checkRole("DeleteStaffMembers")|| checkRole("ViewStaffMembersInSchool")|| checkRole("AutoGenerateStaffMembers") || checkRole( "UploadAutoGenerateStaffMembers")|| checkRole('LessonNotes') ? (   
  <DropList logo={<GiTeacher/>} title="Staff Members ">

{checkRole("SuperAdmin") || checkRole( "RegisterStaffMembers") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/teachers")  }}>Register </MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("UpdateStaffMembers") ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/updateteacher")  }}>Update </MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("ViewStaffMembers") ? (   
    <MenuButtonOptionLink onClick={() => { navigate("/admin/teacherinfo") }}>View Details</MenuButtonOptionLink>
    ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("DeleteStaffMembers") ? (   
   <MenuButtonOptionLink onClick={() => { navigate("/admin/deleteteacher") }}>Delete</MenuButtonOptionLink>
   ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("ViewStaffMembersInSchool") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Staff Members</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("BulkRegisterStaffMember") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/schoolfees")  }}>Bulk Registration</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("BulkRegisterStaffMember") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/schoolfees")  }}>Bulk Staff Upload</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("AutoGenerateStaffMembers") ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Generate Staff List</MenuButtonOptionLink>
  ) : (<></>)}


{checkRole("SuperAdmin") || checkRole('LessonNotes') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Lesson Notes </MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Assessments') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Assessments</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Annoucements') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Annoucements</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('AssignToClassroom') ? (   
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Assign to Classroom</MenuButtonOptionLink>
    ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('AssignToSubject') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Assign to Subject</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('AssignToActivities') ? (   
   <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Assign to Activities</MenuButtonOptionLink>
   ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Salary') ? (   
     <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Salary </MenuButtonOptionLink>
  ) : (<></>)}



{checkRole("SuperAdmin") || checkRole('Clocking') ? (   
   <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Clocking</MenuButtonOptionLink>    
   ) : (<></>)}


{checkRole("SuperAdmin") || checkRole('PersonalChats') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Personal Chats </MenuButtonOptionLink>
    ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('StaffPlatform') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Staff Platform</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('PTAPlatform') ? (   
    <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>PTA Platform</MenuButtonOptionLink>
    ) : (<></>)}





  </DropList>
  ) : (<></>)}

  {/*LMS */}
{checkRole("SuperAdmin") || checkRole("Assignments") || checkRole("Annoucements") || checkRole("Discussions")|| checkRole( "ClassList")|| checkRole("ModifySubjects")  ? (   
  <DropList logo={<FaLayerGroup/>} title="LMS">

{checkRole("SuperAdmin") || checkRole( "ClassList") ? (   
 <InnerDroplist title="Class">
 <MenuButtonOptionLink onClick={() => { navigate("/admin/class") }}>Class List</MenuButtonOptionLink>
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
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Fees Configuration</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("ViewStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/studentsInfo") }}>Student Info</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("UpdateStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/updateStudent") }}>Update Students</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("DeleteStudent") ? (   
   <MenuButtonOptionLink onClick={() => { navigate("/admin/deleteStudent") }}>Delete Students</MenuButtonOptionLink>
   ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewAssessment') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Assessments</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewSchoolFees') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/schoolfees")  }}>School Fees</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Transport') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Transport</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Feeding') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Feeding</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Attendance') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Attendance</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Annoucements') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Annoucements</MenuButtonOptionLink>
  ) : (<></>)}





  </DropList>
  ) : (<></>)}


{/*Reports */}
{checkRole("SuperAdmin")|| checkRole('Annoucements') ? (   
  <DropList logo={<BsGraphUpArrow/>} title="Reports">

{checkRole("SuperAdmin") || checkRole('FeesConfig') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Fees Configuration</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("ViewStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/studentsInfo") }}>Student Info</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("UpdateStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/updateStudent") }}>Update Students</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("DeleteStudent") ? (   
   <MenuButtonOptionLink onClick={() => { navigate("/admin/deleteStudent") }}>Delete Students</MenuButtonOptionLink>
   ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewAssessment') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Assessments</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewSchoolFees') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/schoolfees")  }}>School Fees</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Transport') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Transport</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Feeding') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Feeding</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Attendance') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Attendance</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Annoucements') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Annoucements</MenuButtonOptionLink>
  ) : (<></>)}





  </DropList>
  ) : (<></>)}

{/*Human Resource */}
{checkRole("SuperAdmin")|| checkRole('Annoucements') ? (   
  <DropList logo={<TiGroup/>} title="Human Resource">

{checkRole("SuperAdmin") || checkRole('FeesConfig') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Fees Configuration</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("ViewStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/studentsInfo") }}>Student Info</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("UpdateStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/updateStudent") }}>Update Students</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("DeleteStudent") ? (   
   <MenuButtonOptionLink onClick={() => { navigate("/admin/deleteStudent") }}>Delete Students</MenuButtonOptionLink>
   ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewAssessment') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Assessments</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewSchoolFees') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/schoolfees")  }}>School Fees</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Transport') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Transport</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Feeding') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Feeding</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Attendance') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Attendance</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Annoucements') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Annoucements</MenuButtonOptionLink>
  ) : (<></>)}





  </DropList>
  ) : (<></>)}



{/*Administration */}
{checkRole("SuperAdmin")|| checkRole('Annoucements') ? (   
  <DropList logo={<BsPersonCheck/>} title="Administration">

{checkRole("SuperAdmin") || checkRole('FeesConfig') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Fees Configuration</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("ViewStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/studentsInfo") }}>Student Info</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("UpdateStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/updateStudent") }}>Update Students</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("DeleteStudent") ? (   
   <MenuButtonOptionLink onClick={() => { navigate("/admin/deleteStudent") }}>Delete Students</MenuButtonOptionLink>
   ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewAssessment') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Assessments</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewSchoolFees') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/schoolfees")  }}>School Fees</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Transport') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Transport</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Feeding') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Feeding</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Attendance') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Attendance</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Annoucements') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Annoucements</MenuButtonOptionLink>
  ) : (<></>)}





  </DropList>
  ) : (<></>)}


{/*Academic Boards */}
{checkRole("SuperAdmin")|| checkRole('Annoucements') ? (   
  <DropList logo={<LiaChalkboardSolid/>} title="Academic Boards">

{checkRole("SuperAdmin") || checkRole('FeesConfig') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Fees Configuration</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("ViewStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/studentsInfo") }}>Student Info</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("UpdateStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/updateStudent") }}>Update Students</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("DeleteStudent") ? (   
   <MenuButtonOptionLink onClick={() => { navigate("/admin/deleteStudent") }}>Delete Students</MenuButtonOptionLink>
   ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewAssessment') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Assessments</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewSchoolFees') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/schoolfees")  }}>School Fees</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Transport') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Transport</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Feeding') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Feeding</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Attendance') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Attendance</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Annoucements') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Annoucements</MenuButtonOptionLink>
  ) : (<></>)}





  </DropList>
  ) : (<></>)}


{/*Registrar */}
{checkRole("SuperAdmin")|| checkRole('Annoucements') ? (   
  <DropList logo={<BsPersonFillAdd/>} title="Registrar">

{checkRole("SuperAdmin") || checkRole('FeesConfig') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Fees Configuration</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("ViewStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/studentsInfo") }}>Student Info</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("UpdateStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/updateStudent") }}>Update Students</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("DeleteStudent") ? (   
   <MenuButtonOptionLink onClick={() => { navigate("/admin/deleteStudent") }}>Delete Students</MenuButtonOptionLink>
   ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewAssessment') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Assessments</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewSchoolFees') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/schoolfees")  }}>School Fees</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Transport') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Transport</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Feeding') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Feeding</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Attendance') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Attendance</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Annoucements') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Annoucements</MenuButtonOptionLink>
  ) : (<></>)}





  </DropList>
  ) : (<></>)}


{/*Bursary*/}
{checkRole("SuperAdmin")|| checkRole('Annoucements') ? (   
  <DropList logo={<FaSackDollar/>} title="Bursary">

{checkRole("SuperAdmin") || checkRole('FeesConfig') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Fees Configuration</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("ViewStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/studentsInfo") }}>Student Info</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("UpdateStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/updateStudent") }}>Update Students</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("DeleteStudent") ? (   
   <MenuButtonOptionLink onClick={() => { navigate("/admin/deleteStudent") }}>Delete Students</MenuButtonOptionLink>
   ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewAssessment') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Assessments</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewSchoolFees') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/schoolfees")  }}>School Fees</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Transport') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Transport</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Feeding') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Feeding</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Attendance') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Attendance</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Annoucements') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Annoucements</MenuButtonOptionLink>
  ) : (<></>)}





  </DropList>
  ) : (<></>)}


{/*Sports Cordination */}
{checkRole("SuperAdmin")|| checkRole('Annoucements') ? (   
  <DropList logo={<MdOutlineSportsSoccer/>} title="Sports Cordination">

{checkRole("SuperAdmin") || checkRole('FeesConfig') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Fees Configuration</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("ViewStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/studentsInfo") }}>Student Info</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("UpdateStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/updateStudent") }}>Update Students</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("DeleteStudent") ? (   
   <MenuButtonOptionLink onClick={() => { navigate("/admin/deleteStudent") }}>Delete Students</MenuButtonOptionLink>
   ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewAssessment') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Assessments</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewSchoolFees') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/schoolfees")  }}>School Fees</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Transport') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Transport</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Feeding') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Feeding</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Attendance') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Attendance</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Annoucements') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Annoucements</MenuButtonOptionLink>
  ) : (<></>)}





  </DropList>
  ) : (<></>)}


{/*Librarian */}
{checkRole("SuperAdmin")|| checkRole('Annoucements') ? (   
  <DropList logo={<MdLocalLibrary/>} title="Library">

{checkRole("SuperAdmin") || checkRole('FeesConfig') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Fees Configuration</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("ViewStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/studentsInfo") }}>Student Info</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("UpdateStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/updateStudent") }}>Update Students</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("DeleteStudent") ? (   
   <MenuButtonOptionLink onClick={() => { navigate("/admin/deleteStudent") }}>Delete Students</MenuButtonOptionLink>
   ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewAssessment') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Assessments</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewSchoolFees') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/schoolfees")  }}>School Fees</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Transport') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Transport</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Feeding') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Feeding</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Attendance') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Attendance</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Annoucements') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Annoucements</MenuButtonOptionLink>
  ) : (<></>)}





  </DropList>
  ) : (<></>)}


{/*Domestics */}
{checkRole("SuperAdmin")|| checkRole('Annoucements') ? (   
  <DropList logo={<FaCity/>} title="Domestics">

{checkRole("SuperAdmin") || checkRole('FeesConfig') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Fees Configuration</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("ViewStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/studentsInfo") }}>Student Info</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("UpdateStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/updateStudent") }}>Update Students</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("DeleteStudent") ? (   
   <MenuButtonOptionLink onClick={() => { navigate("/admin/deleteStudent") }}>Delete Students</MenuButtonOptionLink>
   ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewAssessment') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Assessments</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewSchoolFees') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/schoolfees")  }}>School Fees</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Transport') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Transport</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Feeding') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Feeding</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Attendance') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Attendance</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Annoucements') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Annoucements</MenuButtonOptionLink>
  ) : (<></>)}





  </DropList>
  ) : (<></>)}


{/*Special Education */}
{checkRole("SuperAdmin")|| checkRole('Annoucements') ? (   
  <DropList logo={<MdCastForEducation/>} title="Special Education">

{checkRole("SuperAdmin") || checkRole('FeesConfig') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Fees Configuration</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("ViewStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/studentsInfo") }}>Student Info</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("UpdateStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/updateStudent") }}>Update Students</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("DeleteStudent") ? (   
   <MenuButtonOptionLink onClick={() => { navigate("/admin/deleteStudent") }}>Delete Students</MenuButtonOptionLink>
   ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewAssessment') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Assessments</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewSchoolFees') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/schoolfees")  }}>School Fees</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Transport') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Transport</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Feeding') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Feeding</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Attendance') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Attendance</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Annoucements') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Annoucements</MenuButtonOptionLink>
  ) : (<></>)}





  </DropList>
  ) : (<></>)}


{/*Marketting*/}
{checkRole("SuperAdmin")|| checkRole('Annoucements') ? (   
  <DropList logo={<RiBarChartGroupedFill/>} title="Marketting">

{checkRole("SuperAdmin") || checkRole('FeesConfig') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Fees Configuration</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("ViewStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/studentsInfo") }}>Student Info</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("UpdateStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/updateStudent") }}>Update Students</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("DeleteStudent") ? (   
   <MenuButtonOptionLink onClick={() => { navigate("/admin/deleteStudent") }}>Delete Students</MenuButtonOptionLink>
   ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewAssessment') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Assessments</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewSchoolFees') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/schoolfees")  }}>School Fees</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Transport') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Transport</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Feeding') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Feeding</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Attendance') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Attendance</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Annoucements') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Annoucements</MenuButtonOptionLink>
  ) : (<></>)}





  </DropList>
  ) : (<></>)}


{/*Event Planners */}
{checkRole("SuperAdmin")|| checkRole('Annoucements') ? (   
  <DropList logo={<FcPlanner/>} title="Event Planners">

{checkRole("SuperAdmin") || checkRole('FeesConfig') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Fees Configuration</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("ViewStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/studentsInfo") }}>Student Info</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("UpdateStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/updateStudent") }}>Update Students</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("DeleteStudent") ? (   
   <MenuButtonOptionLink onClick={() => { navigate("/admin/deleteStudent") }}>Delete Students</MenuButtonOptionLink>
   ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewAssessment') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Assessments</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewSchoolFees') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/schoolfees")  }}>School Fees</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Transport') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Transport</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Feeding') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Feeding</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Attendance') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Attendance</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Annoucements') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Annoucements</MenuButtonOptionLink>
  ) : (<></>)}





  </DropList>
  ) : (<></>)}


{/*Counseling */}
{checkRole("SuperAdmin")|| checkRole('Annoucements') ? (   
  <DropList logo={<MdPerson/>} title="Counseling">

{checkRole("SuperAdmin") || checkRole('FeesConfig') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Fees Configuration</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("ViewStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/studentsInfo") }}>Student Info</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("UpdateStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/updateStudent") }}>Update Students</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("DeleteStudent") ? (   
   <MenuButtonOptionLink onClick={() => { navigate("/admin/deleteStudent") }}>Delete Students</MenuButtonOptionLink>
   ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewAssessment') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Assessments</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewSchoolFees') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/schoolfees")  }}>School Fees</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Transport') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Transport</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Feeding') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Feeding</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Attendance') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Attendance</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Annoucements') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Annoucements</MenuButtonOptionLink>
  ) : (<></>)}





  </DropList>
  ) : (<></>)}


{/*Transport */}
{checkRole("SuperAdmin")|| checkRole('Annoucements') ? (   
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


  {/*Kitchen */}
{checkRole("SuperAdmin")|| checkRole('Annoucements') ? (   
  <DropList logo={<IoFastFoodOutline />} title="Kitchen">

{checkRole("SuperAdmin") || checkRole('FeesConfig') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Fees Configuration</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("ViewStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/studentsInfo") }}>Student Info</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("UpdateStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/updateStudent") }}>Update Students</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("DeleteStudent") ? (   
   <MenuButtonOptionLink onClick={() => { navigate("/admin/deleteStudent") }}>Delete Students</MenuButtonOptionLink>
   ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewAssessment') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Assessments</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewSchoolFees') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/schoolfees")  }}>School Fees</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Transport') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Transport</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Feeding') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Feeding</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Attendance') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Attendance</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Annoucements') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Annoucements</MenuButtonOptionLink>
  ) : (<></>)}





  </DropList>
  ) : (<></>)}

  {/*Health N Safety */}
{checkRole("SuperAdmin")|| checkRole('Annoucements') ? (   
  <DropList logo={<MdOutlineHealthAndSafety/>} title="Health N Safety">

{checkRole("SuperAdmin") || checkRole('FeesConfig') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Fees Configuration</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("ViewStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/studentsInfo") }}>Student Info</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("UpdateStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/updateStudent") }}>Update Students</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("DeleteStudent") ? (   
   <MenuButtonOptionLink onClick={() => { navigate("/admin/deleteStudent") }}>Delete Students</MenuButtonOptionLink>
   ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewAssessment') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Assessments</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewSchoolFees') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/schoolfees")  }}>School Fees</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Transport') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Transport</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Feeding') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Feeding</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Attendance') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Attendance</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Annoucements') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Annoucements</MenuButtonOptionLink>
  ) : (<></>)}





  </DropList>
  ) : (<></>)}










{/*System Management */}
{checkRole("SuperAdmin")|| checkRole('Annoucements') ? (   
  <DropList logo={<RiComputerFill/>} title="System Management">

{checkRole("SuperAdmin") || checkRole('FeesConfig') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Fees Configuration</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("ViewStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/studentsInfo") }}>Student Info</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("UpdateStudent") ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/updateStudent") }}>Update Students</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole("DeleteStudent") ? (   
   <MenuButtonOptionLink onClick={() => { navigate("/admin/deleteStudent") }}>Delete Students</MenuButtonOptionLink>
   ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewAssessment') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/test") }}>Assessments</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('ViewSchoolFees') ? (   
 <MenuButtonOptionLink onClick={() => { navigate("/admin/schoolfees")  }}>School Fees</MenuButtonOptionLink>
 ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Transport') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Transport</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Feeding') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Feeding</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Attendance') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Attendance</MenuButtonOptionLink>
  ) : (<></>)}

{checkRole("SuperAdmin") || checkRole('Annoucements') ? (   
  <MenuButtonOptionLink onClick={() => { navigate("/admin/students") }}>Annoucements</MenuButtonOptionLink>
  ) : (<></>)}





  </DropList>
  ) : (<></>)}








    
</MenuContainer>

  )
}

export default MenuButtons