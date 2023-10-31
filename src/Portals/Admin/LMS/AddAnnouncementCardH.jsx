import React, { useEffect, useState } from 'react'
import { AdmitButton2, AdmitStudentCard2, CardImage, CardText, FeesIcons, FeesRow, FormInputStudent4, FormTextAreaNotes, NewStudentListCard, PaySelector, SelectForStudent, SelectForStudentRel, SelectStageButton, StudCenter } from '../../../Designs/Styles/Profile'
import { ViewClasses, ViewTeachers, apiServer } from '../../../Constants /Endpoints'
import { colors } from '../../../Designs/Colors'
import AnimateHeight from 'react-animate-height'
import { MdPerson, MdTitle } from "react-icons/md";
import {HiIdentification, HiOutlineAcademicCap } from "react-icons/hi";
import {GiTeacher } from "react-icons/gi";
import {CiLocationOn} from "react-icons/ci";
import {BiCodeBlock} from "react-icons/bi";

import {BsCalendar2Date, BsMortarboard} from "react-icons/bs";
import { AES, enc } from 'crypto-js';
import {FaGooglePay } from "react-icons/fa";
import "../../../Designs/Card/DuesTable.scss";
import "../../../Designs/Card/PendingRegistrations.scss";

import { Show } from '../../../Constants /Alerts'
import { AiOutlineNotification } from 'react-icons/ai'






export const AddAnnoucementCard = ({ data,index }) => {
   

    const [a,sa] = useState("")
    const [b,sb] = useState("")
    const [c, sc] = useState("")
const [d,sd] = useState("")

        const [userInfo, setUserInfo] = useState({});

      useEffect(() => {
        const encryptedData = sessionStorage.getItem("userDataEnc");
        const encryptionKey = '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK';
        const decryptedData = AES.decrypt(encryptedData, encryptionKey);
        const decryptedString = decryptedData.toString(enc.Utf8);
        const parsedData = JSON.parse(decryptedString);
          setUserInfo(parsedData);
      }, []);
      const [theStudents, setTheStudents] = useState([])

      useEffect(() => {
        fetch(apiServer + ViewTeachers+userInfo.staffID)
          .then(response => response.json()) // Parse the response as JSON
          .then(data => setTheStudents(data))
          .catch(error => console.error(error));
      }, [userInfo.staffID]);

      const deleteDetails = async (event) => {
        Show.showLoading("Deleting Annoucement")
        const URL = `api/LMS/DeleteannoucementForHOD?TheId=${data.theId}&SID=${userInfo.staffID}`
        try {
          const response = await fetch(apiServer + URL, {
            method: "DELETE",
          });
          if (response.ok) {

            Show.hideLoading()
            Show.Success("Annoucement deleted successfully");
            window.location.reload();

            
          } else {
            Show.Attention("Annoucement not found");
          }
        } catch (err) {
          Show.Attention("An error has occurred");
        }
      };


      const studentDetails = async () => {
    
    
       Show.showLoading("Processing Data");
    const URL = `api/LMS/UpdateannoucementForHOD?TheId=${data.theId}&SID=${userInfo.staffID}`
        try {
          const response = await fetch(apiServer + URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Set the Content-Type header
            },
            body: JSON.stringify({
              academicYear:c,
              academicTerm:d,
              subject:a,
              content:b

            }),
          
          });
    
          const data = await response.text()
          if (response.ok) {
           Show.hideLoading();
           Show.Success("Annoucement Updated Successfully")
            window.location.reload()
            
          } else {
            Show.Attention("All fields are required");
          }
        } catch (err) {
          Show.Attention("An error has occurred");
        }
      };

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
{
   specificRole==="SuperiorUser"||specificRole==="HeadTeacher"?(<>
   
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
   </>):(<></>)
}
    
    


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
    value={c}
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
    onChange={(e) => sd(e.target.value)}
    required
    value={d}
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
    value={a}
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
    value={b}
    placeholder="content"
    onChange={(e) => sb(e.target.value)}
   
    />

    </FeesRow>


<div
style={{
    display: 'flex',
    flexDirection:'row',
    justifyContent: 'space-between'
}}
>
<AdmitButton2
   background={colors.lightgreen}
   color="white"
   border={colors.maingreen}
   
   onClick={()=>{
    studentDetails()
  }}
  
  >Update
   </AdmitButton2>

   <AdmitButton2
   background={colors.lightred}
   color="white"
   border={colors.mainred}
   
   onClick={()=>{
    deleteDetails()
  }}
   >Delete
   </AdmitButton2>

</div>



  
  
  
   
   
   
</div>


</AdmitStudentCard2>    

   </StudCenter>

</AnimateHeight>


    </>
  )
}
