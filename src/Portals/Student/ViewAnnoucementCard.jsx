import React, { useEffect, useState } from 'react'
import { AdmitButton2, AdmitStudentCard2, AssignmentInfoCard, CardImage, CardText, CardTextBillHeader, CardTextCreditHeader, CardTextHeader, CardTextPayHeader, FeesIcons, FeesIconsS, FeesRow, FormInputStudent4, FormTextAreaNotes, NewStudentListCard, PaySelector, SelectForStudent, SelectForStudentRel, SelectStageButton, StudCenter } from '../../Designs/Styles/Profile'
import { ViewClasses, ViewTeachers, apiServer } from '../../Constants /Endpoints'
import { colors } from '../../Designs/Colors'
import AnimateHeight from 'react-animate-height'
import { MdPerson, MdTitle } from "react-icons/md";
import {HiIdentification, HiOutlineAcademicCap } from "react-icons/hi";
import {GiTeacher } from "react-icons/gi";
import {CiLocationOn} from "react-icons/ci";
import {BiCodeBlock} from "react-icons/bi";

import {BsCalendar2Date, BsMortarboard} from "react-icons/bs";
import { AES, enc } from 'crypto-js';
import {FaGooglePay } from "react-icons/fa";
import "../../Designs/Card/DuesTable.scss";
import "../../Designs/Card/PendingRegistrations.scss";

import { Show } from '../../Constants /Alerts'
import { AiOutlineNotification } from 'react-icons/ai'
import { HeaderText } from '../../Designs/Styles/HyChat'






export const ViewAnnoucementCard = ({ data,index }) => {
   
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








  
      
  

      
const [dropper, setDropper] = useState(false)

useEffect(()=>{
  sa(data?.subject)
  sb(data?.content)
  sc(data?.academicYear)
  sd(data?.academicTerm)
},[])

const [specificRole, setspecificRole] = useState("");


useEffect(() => {
  const spRole =  AES.decrypt(sessionStorage.getItem("SpecificRole"), '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK').toString(enc.Utf8);
  setspecificRole(spRole);
  
}, []);








  return (
    <>


< AssignmentInfoCard>
    
<div>

<FeesRow>
<FeesIconsS>
<CardTextHeader><BsCalendar2Date color={colors.icon}/></CardTextHeader>
</FeesIconsS>
   <HeaderText>{data.academicYear}
</HeaderText>
</FeesRow>




<FeesRow>
<FeesIconsS>
<CardTextHeader><HiOutlineAcademicCap color={colors.icon}/></CardTextHeader>
</FeesIconsS>


   <HeaderText> {data.academicTerm}
</HeaderText>
</FeesRow>


<FeesRow>
<FeesIconsS>
<MdTitle  color={colors.icon}/>
</FeesIconsS>
   <HeaderText>{data.subject}
</HeaderText>
</FeesRow>



<FeesRow>
<FeesIconsS>
<AiOutlineNotification  color={colors.icon}/>
</FeesIconsS>
   <HeaderText>{data?.content}</HeaderText>
</FeesRow>

  
<FeesRow>
<FeesIconsS>
<CardTextHeader><BsCalendar2Date color={colors.icon}/></CardTextHeader>
</FeesIconsS>
   <HeaderText>{data.dateAdded}
</HeaderText>
</FeesRow>
    
    
 </div>


</AssignmentInfoCard>  


    </>
  )
}
