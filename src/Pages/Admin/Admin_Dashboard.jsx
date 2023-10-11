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
import Test from '../../Portals/Admin/Test'
import Profile from '../../Portals/Admin/Profile'
import Students from '../../Portals/Admin/Students';
import StudentInfo from '../../Portals/Admin/StudentIInfo';
import StudentDetails from '../../Portals/Admin/StudentDetails';
import UpdateStudent from "../../Portals/Admin/UpdateStudent";
import DeleteStudent from "../../Portals/Admin/DeleteStudent"
import MainFees from "../../Portals/Admin/MainFeesPage"
import FeesDetail from "../../Portals/Admin/FeesDetails"
import Teachers from "../../Portals/Admin/Teachers"
import UpdateTeacher from "../../Portals/Admin/UpdateTeachers"





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
  const profilePic = apiServer+userInfo.profilePicturePath
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
   <HomeUserName onClick={toggleDropdown}>{userInfo.name}</HomeUserName>
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
<ProfileButtonOptionLink onClick={() => { navigate("/admin/viewProfile"); toggleDropdown() }}>View Profile </ProfileButtonOptionLink>
<ProfileButtonOptionLink onClick={() => { navigate("/admin/test"); toggleDropdown() }}>Edit Profile </ProfileButtonOptionLink>
<ProfileButtonOptionLink onClick={() => { navigate("/admin/test"); toggleDropdown() }}>Notifications </ProfileButtonOptionLink>
<ProfileButtonOptionLink onClick={() => { navigate("/admin/test"); toggleDropdown() }}>Chats </ProfileButtonOptionLink>

</AnimateHeight>

 </ProfileDetails>

</ProfileNDate>

    </>

    

        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="viewProfile" element={<Profile/>} />
          
          
          
          
          
          
          
          
          
          
          
          
          {
             specificRole==="SuperiorUser"||specificRole==="HeadTeacher" ? (
             <>
              <Route path="test" element={<Test />} />  
             </>
             ):(
             <>
              <Route path="*" element={<PermissionDenied />} />
             </>
             )
          }

             
{
             specificRole==="SuperiorUser"||specificRole==="HeadTeacher" ? (
             <>
              <Route path="students" element={<Students />} /> 
              <Route path="studentsInfo" element={<StudentInfo />} />
              <Route path="studentsDetails/:studentId" element={<StudentDetails />} />
              <Route path="feesDetails/:studentId" element={<FeesDetail />} />
              <Route path="updateStudent" element={<UpdateStudent />} /> 
              <Route path="deleteStudent" element={<DeleteStudent />} />  
              <Route path="schoolfees" element={<MainFees />} /> 
              <Route path="teachers" element={<Teachers />} /> 
              <Route path="updateteacher" element={<UpdateTeacher />} /> 
              
             </>
             ):(
             <>
              <Route path="*" element={<PermissionDenied />} />
             </>
             )
          }

          
          
          
          
          
          
          
          
          {
             specificRole==="SuperiorUser"? (
             <>
              <Route path="pass" element={<Pass />} />  
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