import React, { useEffect, useState } from 'react'
import {  CardText,  NewStudentListCard2,  SelectStageButton,} from '../../../Designs/Styles/Profile'
import { apiServer } from '../../../Constants /Endpoints'
import { colors } from '../../../Designs/Colors'

import { AES, enc } from 'crypto-js';

import "../../../Designs/Card/DuesTable.scss";
import "../../../Designs/Card/PendingRegistrations.scss";

import { Show } from '../../../Constants /Alerts'






export const SubjectTeachersCard = ({ data,index }) => {
   
   const specificRole="SuperiorUser"


 
     

        const [userInfo, setUserInfo] = useState({});

      useEffect(() => {
        const encryptedData = sessionStorage.getItem("userDataEnc");
        const encryptionKey = '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK';
        const decryptedData = AES.decrypt(encryptedData, encryptionKey);
        const decryptedString = decryptedData.toString(enc.Utf8);
        const parsedData = JSON.parse(decryptedString);
          setUserInfo(parsedData);
      }, []);


      const deleteDetails = async (event) => {
        Show.showLoading("Removing Teacher ")
        const URL=`api/LMS/deleteTeacherFromClass?Id=${data.id}&SID=${userInfo.staffID}`
      
        try {
          const response = await fetch(apiServer + URL, {
            method: "DELETE",
          });
          if (response.ok) {

            Show.hideLoading()
            Show.Success("Teacher removed successfully");
            window.location.reload();

            
          } else {
            Show.Attention("Teacher not found");
          }
        } catch (err) {
          Show.Attention("An error has occurred");
        }
      };







  return (
    <>
    <NewStudentListCard2 >
    <CardText>{index+1}</CardText>
     <CardText>{data?.subjectName}</CardText>
     <CardText>{data?.className}</CardText>
     <CardText>{data?.staffID}</CardText>
     <CardText>{data?.staffName}</CardText>
     <CardText>{data?.dateAssigned}</CardText>
    

{
  specificRole==="SuperiorUser"||specificRole==="HeadTeacher"?(<>
  
  <SelectStageButton
     background={colors.darkBlue}
     color="white"
     border={colors.darkBlue}
     onClick={()=>{
        deleteDetails()
     }}
     >
       {"Remove"}
     </SelectStageButton>

  </>):(<></>)
}




     </NewStudentListCard2 >




    </>
  )
}
