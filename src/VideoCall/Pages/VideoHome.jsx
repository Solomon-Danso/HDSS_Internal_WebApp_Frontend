import React, { useEffect, useState } from 'react'
import { AboutHeader, AboutHeader2, AdmitButton2, AdmitStudentCard2, AdmitStudentCard3, CardTextHeader, FeesIcons, FeesRow, FormInputSearch, FormInputStudent3, FormInputStudent4, FormInputStudent6, FormLable, FormLoaders, NewStudentListCard2, PaySelector, SelectForStudent, SelectStageButton, StudCenter, StudRight, StudentInfoCard, StudentInfoCard2, StudentListResult, VideoListResult } from '../../Designs/Styles/Profile'
import VideoCard from "./VideoCard"
import {  FrontendServer, SearchSlides, SearchSubject, SubTeacher,ViewClasses,ViewStudents, ViewTeachers, apiServer } from '../../Constants /Endpoints'
import { Show } from '../../Constants /Alerts'
import { colors } from '../../Designs/Colors'

import {BsBook, BsCalendar2Date, BsMortarboard} from "react-icons/bs";
import { AES, enc } from 'crypto-js';
import {FaGooglePay } from "react-icons/fa";
import AnimateHeight from 'react-animate-height'
import {GiTeacher, GiTimeBomb } from "react-icons/gi";
import {LuSchool } from "react-icons/lu";
import {HiOutlineAcademicCap } from "react-icons/hi";
import { MdTitle } from 'react-icons/md'
import { BiBookReader } from 'react-icons/bi'
import { FormInputEvent2 } from '../../Designs/Styles/Styles'


const StudentInfo = () => {


    const [studentList, setStudentList] = useState([])
    const [closeOther, setCloseOther] = useState(false)
    const [searchResult, setSearchResult] = useState(false)
    const [searchTerm, setSearchTerm] = useState()

    const [theClass2, setTheClass2] = useState([])

     const specificRole="SuperiorUser"


    
    

     

    useEffect(() => {
        // Function to fetch search results based on searchTerm
        const fetchSearchResults = async () => {
          if (searchTerm === '') {
            setStudentList([]); // Clear the list if search term is empty
            setSearchResult(false);
            setCloseOther(false)
            return;
          }
    
          //Show.showLoading('Processing Data');
          const URL = `api/Admin/SearchAssignments?searchTerm=${searchTerm}&StaffID=${userInfo.staffID}`
          try {
            const response = await fetch(apiServer + URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            });
    
            const data = await response.json();
    
            if (response.ok) {
              Show.hideLoading();
              setSearchResult(true);
              setStudentList(data);
              setCloseOther(true)
            } else {
              //Show.Attention('No Result Found');
              setSearchResult(false);
              setCloseOther(false)
              setStudentList([]);
            }
          } catch (error) {
            //Show.Attention('No Result Found');
            setSearchResult(false);
            setStudentList([]);
          }
        };
    
        fetchSearchResults(); // Call the function when searchTerm changes
      }, [searchTerm]);

      const [theStudents, setTheStudents] = useState([])
      const [theClass, setTheClass] = useState([])



   

      const [userInfo, setUserInfo] = useState({});

      useEffect(() => {
        const encryptedData = sessionStorage.getItem("userDataEnc");
        const encryptionKey = '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK';
        const decryptedData = AES.decrypt(encryptedData, encryptionKey);
        const decryptedString = decryptedData.toString(enc.Utf8);
        const parsedData = JSON.parse(decryptedString);
          setUserInfo(parsedData);
      }, []);

     


const [level, setLevel] = useState("")


      useEffect(() => {
        fetch(apiServer + ViewTeachers+userInfo.staffID)
          .then(response => response.json()) // Parse the response as JSON
          .then(data => setTheStudents(data))
          .catch(error => console.error(error));
      }, [userInfo.staffID]);

      const [subj, setSubJ] = useState([])
      useEffect(() => {
        if(level){
          //const URL=`api/LMS/ViewAllAssignmentTeachers?ID=${userInfo.staffID}`
          const URL= `api/LMS/ViewAllVideoCalls?level=${level}` 
            fetch(apiServer + URL)
              .then(response => response.json()) // Parse the response as JSON
              .then(data => setSubJ(data))
              .catch(error => console.error(error));
        }
      
      }, [level]);
      
      

      useEffect(() => {
        if(userInfo.staffID){
         
            const URL=`api/LMS/ViewTeacherSubject?ID=${userInfo.staffID}`
            fetch(apiServer + URL)
              .then(response => response.json()) // Parse the response as JSON
              .then(data => setTheClass(data))
              .catch(error => console.error(error));
        }
      
      }, [userInfo.staffID]);

      useEffect(() => {
        if(userInfo.staffID){
         
            const URL=`api/LMS/ViewTeacherClass?ID=${userInfo.staffID}`
            fetch(apiServer + URL)
              .then(response => response.json()) // Parse the response as JSON
              .then(data => setTheClass2(data))
              .catch(error => console.error(error));
        }
      
      }, [userInfo.staffID]);
  
const [AcaYear, setAcaYear] = useState([])
const [AcaTerm, setAcaTerm] = useState([])

useEffect(() => {
   
        const URL=`api/LMS/ViewAcademicYear`

        fetch(apiServer + URL)
          .then(response => response.json()) // Parse the response as JSON
          .then(data => setAcaYear(data))
          .catch(error => console.error(error));
    
  
  }, []);

  useEffect(() => {
   
    const URL=`api/LMS/ViewAcademicTerm`

    fetch(apiServer + URL)
      .then(response => response.json()) // Parse the response as JSON
      .then(data => setAcaTerm(data))
      .catch(error => console.error(error));


}, []);

 const [a,sa] = useState("")
      const [b,sb] = useState("")
      const [c, sc] = useState("")
 const [d,sd] = useState("")
     
      const [g, sg] = useState("")

      const studentDetails = async (event) => {
        event.preventDefault();
    
       Show.showLoading("Processing Data");
    //const URL=`api/LMS/UploadAssignment?ID=${userInfo.staffID}`
      const URL = `api/LMS/ScheduleVideoCall?StaffID=${userInfo.staffID}&apiServer=${FrontendServer}`

        try {
          
      
          const response = await fetch(apiServer + URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
           
            body: JSON.stringify({
          
              level: c,
              academicYear: a,
              academicTerm: b,
              startDate:g,
              subject:d
            }),
          });
          const info = await response.text();
          if (response.ok) {
           Show.hideLoading();
           Show.Success(info)
            window.location.reload()
            
          } else {
            Show.Attention(info);
          }
        } catch (err) {
          Show.Attention(err);
        }
      };
      const [dropper, setDropper] = useState(false)

  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    }}>

{
   specificRole==="SuperiorUser"||specificRole==="HeadTeacher"||specificRole==="Teacher"?(<>
   
   <AboutHeader2
     background={colors.red}
     color="white"
     border={colors.darkBlue}

     onClick={(e)=>{
        setDropper(!dropper)
     }}
     >
       {dropper?"Minimize":"Schedule Video Call"}
     </AboutHeader2> <br/>
     <AnimateHeight height={dropper ? "auto" : 0}>

     <StudCenter>
        

        <form onSubmit={studentDetails}>
    < AdmitStudentCard2>
    
    <div>

    <FeesRow>
<FeesIcons>
<BsCalendar2Date color={colors.icon}/>
</FeesIcons>
       <PaySelector
    background={colors.darkBlue}
    color="white"
    border={colors.darkBlue}
    onChange={(e) => sa(e.target.value)}
    required
    >
        <option>Academic Year</option>
   {AcaYear.length > 0 &&
    AcaYear.map((data) => (
      <option key={data.id}>{data.academicYear}</option>
    ))}

    </PaySelector>
</FeesRow>


<FeesRow>
<FeesIcons>
<HiOutlineAcademicCap color={colors.icon}/>
</FeesIcons>
       <PaySelector
    background={colors.darkBlue}
    color="white"
    border={colors.darkBlue}
    onChange={(e) => sb(e.target.value)}
    required
    >
        <option>Academic Term</option>
   {AcaTerm.length > 0 &&
    AcaTerm.map((data) => (
      <option key={data.id}>{data.academicTerm}</option>
    ))}

    </PaySelector>
</FeesRow>


    <FeesRow>
<FeesIcons>
<BiBookReader color={colors.icon}/>
</FeesIcons>
       <PaySelector
    background={colors.darkBlue}
    color="white"
    border={colors.darkBlue}
    onChange={(e) => sc(e.target.value)}
    required
    >
        <option>Select A Class</option>
   {theClass2.length > 0 &&
    theClass2.map((data) => (
      <option key={data.id}>{data.className}</option>
    ))}

    </PaySelector>
</FeesRow>


    <FeesRow>
<FeesIcons>
<BsBook color={colors.icon}/>
</FeesIcons>
       <PaySelector
    background={colors.darkBlue}
    color="white"
    border={colors.darkBlue}
    onChange={(e) => sd(e.target.value)}
    required
    >
        <option>Select A Subject</option>
   {theClass.length > 0 &&
    theClass.map((data) => (
      <option key={data.id}>{data.subjectName}</option>
    ))}

    </PaySelector>
</FeesRow>
 


<FeesRow>

<FeesIcons >
<GiTimeBomb  color={colors.icon}/>
</FeesIcons>
  
<FormInputEvent2
        type="datetime-local"
        required
       
        onChange={(e) => sg(e.target.value)}
       
        />

</FeesRow>

  






 <AdmitButton2
        background={colors.lightgreen}
        color="white"
        border={colors.maingreen}
        
        type="submit">Upload
        </AdmitButton2>


       
       
       
        
        
        
     </div>
  
    
    </AdmitStudentCard2>    
    </form>
        </StudCenter>

     </AnimateHeight>
  
   
   </>):(<></>)
}






<StudentInfoCard2 >


<FeesRow>
<FeesIcons>
<BiBookReader color={colors.icon}/>
</FeesIcons>
       <PaySelector
    background={colors.darkBlue}
    color="white"
    border={colors.darkBlue}
    onChange={(e) => setLevel(e.target.value)}
    required
    >
        <option>Select A Class To View Video Call</option>
   {theClass2.length > 0 &&
    theClass2.map((data) => (
      <option key={data.id}>{data.className}</option>
    ))}

    </PaySelector>
</FeesRow>







{
  closeOther? (
  <>
  
  </>
  ):(
  
  <>
  
  <VideoListResult>
{subj.length > 0 &&
    subj.map((data,index) => (
      <VideoCard data={data} key={index} index={index} />
    ))}

</VideoListResult>

  
  </>)  
}



</StudentInfoCard2>


    </div>
  )
}

export default StudentInfo