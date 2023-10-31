import React, { useEffect, useState } from 'react'
import { AdmitButton2, AdmitStudentCard2, CardImage, CardText, FeesIcons, FeesRow, FormInputStudent4, FormTextAreaNotes, NewStudentListCard, PaySelector, SelectForStudent, SelectForStudentRel, SelectStageButton, StudCenter } from '../../Designs/Styles/Profile'
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
    <NewStudentListCard>
    <CardText>{index+1}</CardText>
     <CardText>{data?.subject}</CardText>
     <CardText>{data?.academicYear}</CardText>
     <CardText>{data?.academicTerm}</CardText>

<CardText>{data?.dateAdded}</CardText>
<SelectStageButton
     background={colors.darkBlue}
     color="white"
     border={colors.darkBlue}
     onClick={(e)=>{
        setDropper(!dropper)
     }}
     >
       {dropper?"View Less":"View More"}
     </SelectStageButton>
    
    


    </NewStudentListCard>

    <AnimateHeight height={dropper ? "auto" : 0}>

    <StudCenter>
   


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
       onChange={(e) => sc(e.target.value)}
       value={data.academicYear}
       disabled
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
       onChange={(e) => sd(e.target.value)}
       disabled
       value={data.academicTerm}
       >
           <option>Academic Term</option>
      {AcaTerm.length > 0 &&
       AcaTerm.map((data) => (
         <option key={data.id}>{data.academicTerm}</option>
       ))}
   
       </PaySelector>
   </FeesRow>
   
   
   
   
   <FeesRow>
   
   <FeesIcons >
   <MdTitle  color={colors.icon}/>
   </FeesIcons>
     
       <FormInputStudent4
       type="text"
       value={data.subject}
       placeholder="Title"
       onChange={(e) => sa(e.target.value)}
       
       />
   
       </FeesRow>
   
   
   
       <FeesRow>
   
   <FeesIcons >
   <AiOutlineNotification  color={colors.icon}/>
   </FeesIcons>
     
       <FormTextAreaNotes
       type="text"
       value={data.content}
       placeholder="content"
       onChange={(e) => sb(e.target.value)}
      
       />
   
       </FeesRow>
   
   
   
   
     
     
     
      
      
      
   </div>
   
   
   </AdmitStudentCard2>    
   
      </StudCenter>

</AnimateHeight>


    </>
  )
}
