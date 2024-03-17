import React, { useEffect, useState } from 'react'
import { AboutHeader, AboutHeader2, AdmitButton2, AdmitStudentCard2, AdmitStudentCard3, CardTextHeader, CardTextHeader2, FeesIcons, FeesRow, FormInputSearch, FormInputStudent3, FormInputStudent4, FormLoaders, FormTextAreaNotes, NewStudentListCard2, PaySelector, SelectForStudent, SelectStageButton, StudCenter, StudRight, StudentInfoCard, StudentInfoCard2, StudentListResult } from '../../Designs/Styles/Profile'
import  {ViewAnnoucementCard}  from './ViewAnnoucementCard'

import { SearchClass, ViewClasses, ViewTeachers, apiServer } from '../../Constants /Endpoints'
import { Show } from '../../Constants /Alerts'
import { colors } from '../../Designs/Colors'

import {HiIdentification, HiOutlineAcademicCap } from "react-icons/hi";
import {BsBook, BsCalendar2Date, BsMortarboard} from "react-icons/bs";
import { AES, enc } from 'crypto-js';


const StudentInfo = () => {


 
    
      const [theClass, setTheClass] = useState([])

     


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

    
     
      useEffect(() => {
        
            const URL=`api/LMS/GetannoucementForStudent`

            fetch(apiServer + URL)
              .then(response => response.json()) // Parse the response as JSON
              .then(data => setTheClass(data))
              .catch(error => console.error(error));
        
      
      }, []);
     
       const specificRole="SuperiorUser"


    

 



  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    }}>





<StudentInfoCard2 >









<StudentListResult>

{
  isMobile?(
  <>
  {theClass.length > 0 &&
    theClass.map((data,index) => (
      <ViewAnnoucementCard data={data} key={index} index={index} />
    ))}
  </>):(<div style={{display:"flex",flexDirection:"row",flexWrap:"wrap", gap:"1rem"}}>
  {theClass.length > 0 &&
    theClass.map((data,index) => (
      <ViewAnnoucementCard data={data} key={index} index={index} />
    ))}
  </div>)
}




</StudentListResult>



</StudentInfoCard2>


    </div>
  )
}

export default StudentInfo