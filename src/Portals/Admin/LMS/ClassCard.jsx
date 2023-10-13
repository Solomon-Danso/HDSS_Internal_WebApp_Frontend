import React, { useEffect, useState } from 'react'
import { AdmitButton2, AdmitStudentCard2, CardImage, CardText, FeesIcons, FeesRow, FormInputStudent4, NewStudentListCard, PaySelector, SelectForStudent, SelectForStudentRel, SelectStageButton, StudCenter } from '../../../Designs/Styles/Profile'
import { ViewClasses, ViewTeachers, apiServer } from '../../../Constants /Endpoints'
import { colors } from '../../../Designs/Colors'
import AnimateHeight from 'react-animate-height'
import { MdPerson } from "react-icons/md";
import {HiIdentification } from "react-icons/hi";
import {GiTeacher } from "react-icons/gi";
import {CiLocationOn} from "react-icons/ci";
import {BiCodeBlock} from "react-icons/bi";

import {BsMortarboard} from "react-icons/bs";
import { AES, enc } from 'crypto-js';
import {FaGooglePay } from "react-icons/fa";
import "../../../Designs/Card/DuesTable.scss";
import "../../../Designs/Card/PendingRegistrations.scss";

import { Show } from '../../../Constants /Alerts'






export const ClassCard = ({ data,index }) => {
   

      const [className,sa] = useState("")
      const [classCode,sb] = useState("")
      const [campus,sc] = useState("")
      const [classTeacher, sd] = useState("");

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
        Show.showLoading("Deleting Class")
        const URL=`api/LMS/deleteClass?Id=${data.id}&SID=${userInfo.staffID}`
      
        try {
          const response = await fetch(apiServer + URL, {
            method: "DELETE",
          });
          if (response.ok) {

            Show.hideLoading()
            Show.Success("Class deleted successfully");
            window.location.reload();

            
          } else {
            Show.Attention("Class not found");
          }
        } catch (err) {
          Show.Attention("An error has occurred");
        }
      };


      const studentDetails = async (event) => {
     
    
       Show.showLoading("Processing Data");
    const URL=`api/LMS/UpdateClass?Id=${data.id}&SID=${userInfo.staffID}`

        try {
          const response = await fetch(apiServer + URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Set the Content-Type header
            },
            body: JSON.stringify({className,classCode,campus,classTeacher }),
          });
          if (response.ok) {
           Show.hideLoading();
           Show.Success("Class Added Successfully")
            window.location.reload()
            
          } else {
            Show.Attention("All fields are required");
          }
        } catch (err) {
          Show.Attention("An error has occurred");
        }
      };

      

      
const [dropper, setDropper] = useState(false)
const [countStudent, setCountStudent] = useState(0)

useEffect(() => {
  if (data?.className) {
    // Only run the effect if data?.className is available
    fetch(apiServer + "api/LMS/countStudentInClass?ClassN=" + data.className)
      .then((res) => res.json())
      .then((data) => setCountStudent(data))
      .catch((error) => console.error(error));
  }
}, [data?.className]);

useEffect(()=>{
  sa(data?.className)
  sb(data?.classCode)
  sc(data?.campus)
  sd(data?.classTeacher)
},[])



  return (
    <>
    <NewStudentListCard>
    <CardText>{index+1}</CardText>
     <CardText>{data?.className}</CardText>
     
     <CardText>{data?.campus}</CardText>
     <CardText>{data?.classCode}</CardText>
     <CardText>{countStudent}</CardText>

<CardText>{data?.classTeacher}</CardText>

    
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

<FeesIcons >
<HiIdentification  color={colors.icon}/>
</FeesIcons>
 
   <FormInputStudent4
   type="text"
   value={className}
   placeholder="Class"
  
   onChange={(e) => sa(e.target.value)}
  
   />

   </FeesRow>

   <FeesRow>

<FeesIcons>
<BiCodeBlock color={colors.icon}/>
</FeesIcons>

<FormInputStudent4
       type="text"
    placeholder="Class Code"
    value={classCode}
    onChange={(e) => sb(e.target.value)}
   />

</FeesRow>




<FeesRow>

<FeesIcons>
<CiLocationOn color={colors.icon}/>
</FeesIcons>


<FormInputStudent4
   type="text"
   //value={theStudent?.level}
   placeholder="Campus"
   value={campus}
   onChange={(e) => sc(e.target.value)}
   />

</FeesRow>

<FeesRow>
<FeesIcons>
<GiTeacher color={colors.icon}/>
</FeesIcons>
       <PaySelector
    background={colors.darkBlue}
    color="white"
    border={colors.darkBlue}
   
    onChange={(e) => sd(e.target.value)}
    
    >
        <option>Select A Teacher</option>
   {theStudents.length > 0 &&
    theStudents.map((data) => (
      <option key={data.id}>{data.title}{" "}{data.firstName}{" "} {data.otherName}{" "}{data.lastName}</option>
    ))}

    </PaySelector>
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
