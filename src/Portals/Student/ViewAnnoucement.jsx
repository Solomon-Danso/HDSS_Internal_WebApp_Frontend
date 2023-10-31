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

     




    
     
      useEffect(() => {
        
            const URL=`api/LMS/GetannoucementForStudent`

            fetch(apiServer + URL)
              .then(response => response.json()) // Parse the response as JSON
              .then(data => setTheClass(data))
              .catch(error => console.error(error));
        
      
      }, []);
     
      const [specificRole, setspecificRole] = useState("");


    useEffect(() => {
      const spRole =  AES.decrypt(sessionStorage.getItem("SpecificRole"), '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK').toString(enc.Utf8);
      setspecificRole(spRole);
      
    }, []);

 



  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    }}>





<StudentInfoCard2 >


<NewStudentListCard2 >

<CardTextHeader>S/N</CardTextHeader>
<CardTextHeader>Title</CardTextHeader>
<CardTextHeader>Academic Year</CardTextHeader>
<CardTextHeader>Academic Term</CardTextHeader>
<CardTextHeader>Date Added</CardTextHeader>
{
   specificRole==="SuperiorUser"||specificRole==="HeadTeacher"?(<>
   
   <CardTextHeader>Action</CardTextHeader>
   </>):(<></>)
}

</NewStudentListCard2>










<StudentListResult>
{theClass.length > 0 &&
    theClass.map((data,index) => (
      <ViewAnnoucementCard data={data} key={index} index={index} />
    ))}

</StudentListResult>



</StudentInfoCard2>


    </div>
  )
}

export default StudentInfo