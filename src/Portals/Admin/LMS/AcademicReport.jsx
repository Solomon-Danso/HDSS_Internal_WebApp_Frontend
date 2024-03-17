import React, { useEffect, useState } from 'react'
import { AboutHeader, AboutHeader2, AdmitButton2, AdmitStudentCard2, AdmitStudentCard3, CardTextHeader, FeesIcons, FeesRow, FormInputSearch, FormInputStudent3, FormInputStudent4, FormInputStudent6, FormLable, FormLoaders, NewStudentListCard2, PaySelector, SelectForStudent, SelectStageButton, StudCenter, StudRight, StudentInfoCard, StudentInfoCard2, StudentListResult } from '../../../Designs/Styles/Profile'
import  {UploadTimeTableCard}  from './UploadTimeTableCard'

import {  SearchSlides, SearchSubject, SubTeacher,ViewClasses,ViewStudents, ViewTeachers, apiServer } from '../../../Constants /Endpoints'
import { Show } from '../../../Constants /Alerts'
import { colors } from '../../../Designs/Colors'

import {BsBook, BsCalendar2Date, BsMortarboard} from "react-icons/bs";
import { AES, enc } from 'crypto-js';
import {FaGooglePay } from "react-icons/fa";
import AnimateHeight from 'react-animate-height'
import {GiTeacher } from "react-icons/gi";
import {LuSchool } from "react-icons/lu";
import {HiOutlineAcademicCap } from "react-icons/hi";
import { MdTitle } from 'react-icons/md'
import { BiBookReader } from 'react-icons/bi'
import { RiVideoUploadLine } from 'react-icons/ri'
import { AiOutlineBook } from 'react-icons/ai'
import { IoBookSharp } from 'react-icons/io5'
import ReportCard from "./ReportCard"
import { useNavigate } from 'react-router-dom'

const StudentInfo = () => {

   

    const [studentList, setStudentList] = useState([])
    
    const [theClass2, setTheClass2] = useState([])

     const specificRole="SuperiorUser"


    
    

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLastStudent, setIsLastStudent] = useState(false);


    const goToNextStudent = (a, b, c, d, e, f, g) => {
      studentDetails(a, b, c, d, e, f, g);
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        if (newIndex < studentList.length) {
          setIsLastStudent(newIndex === studentList.length - 1);
          return newIndex;
        } else {
          setIsLastStudent(true);
          return prevIndex;
        }
      });
    };
  
    // Function to handle moving to the previous student
    const goToPreviousStudent = () => {
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex - 1;
        setIsLastStudent(false); // Moving to previous student, so not the last student anymore
        return newIndex >= 0 ? newIndex : prevIndex;
      });
    };
  
    // Function to handle the form submission for the last student
    const handleSubmit = () => {
      if (isLastStudent) {
        // Perform the submit action here
        
        window.location.reload(); // Reload the page after submission
      }
    };
  


   

      const [userInfo, setUserInfo] = useState({});

      useEffect(() => {
        const encryptedData = sessionStorage.getItem("userDataEnc");
        const encryptionKey = '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK';
        const decryptedData = AES.decrypt(encryptedData, encryptionKey);
        const decryptedString = decryptedData.toString(enc.Utf8);
        const parsedData = JSON.parse(decryptedString);
          setUserInfo(parsedData);
      }, []);

     


      useEffect(() => {
        if(userInfo.staffID){
         
            const URL=`api/StudentApp/GetTeacherClass?ID=${userInfo.staffID}`
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
 



useEffect(()=>{
    const URL=`api/students/getStudentsTeacher?stage=${c}&ID=${userInfo.staffID}`
    if(c&&userInfo){
        fetch(apiServer + URL)
        .then(response => response.json()) // Parse the response as JSON
        .then(data => setStudentList(data))
        .catch(error => console.error(error));
    }
   
},[c,userInfo])



const [attn, setAttn] = useState(0);
const [out,setOut] = useState(0)
const [conduct, setConduct] = useState("")
const [attitude, setAttitude] = useState("")
const [interest, setInterest] = useState("")
const [classTRemarks, setClassTRemarks] = useState("")





      const studentDetails = async (a,b,c,d,e,f,g) => {
        
    
      
    
    const URL = `api/Grade/TReportInfo?TID=${userInfo.staffID}&SID=${g}`

        if(a&&b&&c&&d&&e&&f){




          try {
         
           
      
       
      
            const response = await fetch(apiServer + URL, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(
                
                {
                
                  attendance: a,
                  outOf: b,
                  conduct: c,
                  attitude: d,
                  interest: e,
                  classTeacherRemarks: f,
                  
                }

                
                ),
            });
            if (response.ok) {
              goToNextStudent();
              handleSubmit();
              
            } else {
              Show.Attention("All fields are required");
            }
          } catch (err) {
            Show.Attention("An error has occurred");
          }





        }

        
      };






      const [dropper, setDropper] = useState(false)

      const navigate = useNavigate()

    






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
       {dropper?"Minimize":"Upload Academic Report"}
     </AboutHeader2> <br/>
     <AnimateHeight height={dropper ? "auto" : 0}>

     <StudCenter>
        

        
    < AdmitStudentCard2>
    
    <div>


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





       
       
       
        
        
        
     </div>
  
    
    </AdmitStudentCard2>    
 
        </StudCenter>

     </AnimateHeight>
  
   
   </>):(<></>)
}

{studentList.length > 0 && (
        <>
     
     <ReportCard
      data={studentList[currentIndex]}
      key={currentIndex}
      index={currentIndex}
      submitter={studentDetails}
      level={c}
      goToNextStudent={goToNextStudent} // Pass these props
      goToPreviousStudent={goToPreviousStudent}
      isLastStudent={isLastStudent}
      handleSubmit={handleSubmit}
    />
         
        </>
      )}


    </div>
  )
}

export default StudentInfo