import React, { useEffect, useState } from 'react'
import { CardText, CardTextHeader, ChartsCard, EventCard, FormLoaders, HomeBanner, HomeCard, HomeCardColumn, HomeCardNumber, HomeCardText, HomeIcon, HomeStudentForm, HomeStudentSelect, NewStudentListCard, NewStudentListCard2, SelectForStudent, SelectStage, SelectStageButton, StudentCardText, StudentInfoCard, StudentListBanner, StudentListResult } from '../../Designs/Styles/Profile'
import { colors } from "../../Designs/Colors"
import { HiOutlineUserGroup,HiIdentification } from "react-icons/hi";
import { useNavigate } from 'react-router-dom'
import { AES, enc } from 'crypto-js';
import { BiSolidGroup } from "react-icons/bi";
import { BsPersonFillAdd,BsFillTelephoneOutboundFill,BsCameraFill } from "react-icons/bs";
import { FaMoneyBillAlt,FaBirthdayCake,FaUserGraduate } from "react-icons/fa";
import FeesBarChart from "./FeesBarCharts"
import FeesLineChart from "./FeesLineChart"
import { RiParentFill } from "react-icons/ri";
import EventCalendar from './EventCalender';
import { CountParents, CountStudents, CountTeachers, TheClassStudent, ViewClasses, apiServer } from '../../Constants /Endpoints';
import { Show } from '../../Constants /Alerts';
import StudentListCard from "./StudentListCard"
import { MyStudentCard } from './MyStudentCard';



const Home = () => {
  
  const navigate = useNavigate();
  const [specificRole, setspecificRole] = useState("");
  const [role, setrole] = useState("");

  useEffect(() => {
    const spRole =  AES.decrypt(sessionStorage.getItem("SpecificRole"), '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK').toString(enc.Utf8);
    setspecificRole(spRole);
    
  }, []);


  const [studentList, setStudentList] = useState([])
  const [specificClass, setSpecificClass] = useState("")


  const handleStudentDataSubmit = async (event) => {
    event.preventDefault();
      
    Show.showLoading("Processing Data");
      try {
  
    
        const response = await fetch(apiServer + TheClassStudent+specificClass, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },

        });
  
        const data = await response.json();
    
        if (response.ok) {
          
          Show.hideLoading();
         // Show.Success("Login Successfull ");
          setStudentList(data);
               
        } else {
          Show.Attention("Login Failed");
        }
      } catch (error) {
  
        Show.Attention(error);
      }
  
  }
  



  const [theClass, setTheClass] = useState([])

  useEffect(() => {
      fetch(apiServer + ViewClasses)
        .then(response => response.json()) // Parse the response as JSON
        .then(data => setTheClass(data))
        .catch(error => console.error(error));
    }, []);
  

    const [StudentCount, setStudentCount] = useState([])

    useEffect(() => {
        fetch(apiServer + CountStudents)
          .then(response => response.json()) // Parse the response as JSON
          .then(data => setStudentCount(data))
          .catch(error => console.error(error));
      }, []);

      const [TeacherCount, setTeacherCount] = useState([])

      useEffect(() => {
          fetch(apiServer + CountTeachers)
            .then(response => response.json()) // Parse the response as JSON
            .then(data => setTeacherCount(data))
            .catch(error => console.error(error));
        }, []);

        const [ParentCount, setParentCount] = useState([])

        useEffect(() => {
            fetch(apiServer + CountParents)
              .then(response => response.json()) // Parse the response as JSON
              .then(data => setParentCount(data))
              .catch(error => console.error(error));
          }, []);
  




  return (
<>
<HomeBanner>
{
   specificRole==="SuperiorUser"||specificRole==="HeadTeacher"?(
    <>
    <HomeCard onClick={() => { navigate("/admin/studentsInfo") }}>
    <HomeCardColumn>
    <HomeIcon color={colors.green}> <HiOutlineUserGroup/> </HomeIcon>
    <HomeCardText>Students</HomeCardText>
    </HomeCardColumn>

    <hr/>

    <HomeCardNumber> {StudentCount}</HomeCardNumber>
    </HomeCard>

    </>
   ):(
    <></>
   )
}

{
   specificRole==="SuperiorUser"||specificRole==="HeadTeacher"?(
    <>
    <HomeCard onClick={() => { navigate("/admin/teacherinfo") }}>
    <HomeCardColumn>
    <HomeIcon color={colors.blue}> <BiSolidGroup/> </HomeIcon>
    <HomeCardText>Teachers</HomeCardText>
    </HomeCardColumn>

    <hr/>

    <HomeCardNumber> {TeacherCount}</HomeCardNumber>
    </HomeCard>

    </>
   ):(
    <></>
   )
}

{
   specificRole==="SuperiorUser"||specificRole==="HeadTeacher"?(
    <>
    <HomeCard onClick={() => { navigate("/admin/test") }}>
    <HomeCardColumn>
    <HomeIcon color={colors.deepyellow}> <BsPersonFillAdd/> </HomeIcon>
    <HomeCardText>Parents</HomeCardText>
    </HomeCardColumn>

    <hr/>

    <HomeCardNumber> {ParentCount}</HomeCardNumber>
    </HomeCard>

    </>
   ):(
    <></>
   )
}

{
   specificRole==="SuperiorUser"||specificRole==="SchoolDirector"?(
    <>
    <HomeCard onClick={() => { navigate("/admin/test") }}>
    <HomeCardColumn>
    <HomeIcon color={colors.aqua}> <FaMoneyBillAlt/> </HomeIcon>
    <HomeCardText>Total Earnings</HomeCardText>
    </HomeCardColumn>

    <hr/>

    <HomeCardNumber> 99456</HomeCardNumber>
    </HomeCard>

    </>
   ):(
    <></>
   )
}

</HomeBanner>

{
  specificRole==="SuperiorUser"||specificRole==="SchoolDirector"?(
  <>
 <HomeBanner>

<ChartsCard><FeesBarChart/></ChartsCard>

<ChartsCard><FeesLineChart/> </ChartsCard>
  
</HomeBanner> 
  
  </>
  ):(
  <>
  </>)
}


{
   specificRole==="SuperiorUser"||specificRole==="HeadTeacher"?(<>
   <StudentInfoCard >

<FormLoaders onSubmit={handleStudentDataSubmit}>
<SelectForStudent
background={colors.darkBlue}
color="white"
border={colors.darkBlue}
onChange={(e)=>setSpecificClass(e.target.value)}
>
<option >Please select a class</option>
{theClass.length > 0 &&
    theClass.map((data) => (
      <option key={data.id}>{data.className}</option>
    ))}
</SelectForStudent>
<SelectStageButton  
background={colors.darkBlue}
color="white"
border={colors.darkBlue}
type="submit">Load
</SelectStageButton>


</FormLoaders>

<NewStudentListCard2 >

<CardTextHeader>ID</CardTextHeader>
<CardTextHeader>Photo</CardTextHeader>
<CardTextHeader>Student Name</CardTextHeader>
<CardTextHeader>Gender</CardTextHeader>
<CardTextHeader>DateOfBirth</CardTextHeader>
<CardTextHeader>Class</CardTextHeader>
<CardTextHeader>Contact Name</CardTextHeader>
<CardTextHeader>Contact Phone</CardTextHeader>
<CardTextHeader>Action</CardTextHeader>


</NewStudentListCard2>


<StudentListResult>
{studentList.length > 0 &&
    studentList.map((data,index) => (
      <MyStudentCard data={data} key={index}  />
    ))}

</StudentListResult>













</StudentInfoCard>



   
   </>):(<></>)
}


<br/>

<EventCard>  
  <EventCalendar/>
 
 </EventCard>






</>
  )
}

export default Home