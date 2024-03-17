import React, { useEffect, useState } from 'react'
import {  CardImage, CardImage2, CardText,  NewStudentListCard,  NewStudentListCard2,  SelectStageButton,} from '../../../Designs/Styles/Profile'
import { apiServer } from '../../../Constants /Endpoints'
import { colors } from '../../../Designs/Colors'
import pdf from '../../../Designs/Images/headphone.png'
import { AES, enc } from 'crypto-js';

import "../../../Designs/Card/DuesTable.scss";
import "../../../Designs/Card/PendingRegistrations.scss";

import { Show } from '../../../Constants /Alerts'






export const UploadAudioCard = ({ data,index }) => {
   
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
        Show.showLoading("Removing Audio ")
        const URL=`api/LMS/deleteAudios?Id=${data.id}&SID=${userInfo.staffID}`
      
        try {
          const response = await fetch(apiServer + URL, {
            method: "DELETE",
          });
          if (response.ok) {

            Show.hideLoading()
            Show.Success("Audio removed successfully");
            window.location.reload();

            
          } else {
            Show.Attention("Audio not found");
          }
        } catch (err) {
          Show.Attention("An error has occurred");
        }
      };







  return (
    <>
    <NewStudentListCard >
    <CardText>{index+1}</CardText>
     <CardText>{data?.subjectName}</CardText>
     <a href={apiServer + data.slidePath} target="_blank">
    <CardImage2 src={pdf} />
    </a>

     <CardText>{data?.title}</CardText>
     <CardText>{data?.className}</CardText>
     <CardText>{data?.academicYear}</CardText>
     <CardText>{data?.academicTerm}</CardText>
     <CardText>{data?.dateAdded}</CardText>
    

{
  specificRole==="SuperiorUser"||specificRole==="HeadTeacher"||specificRole==="Teacher"?(<>
  
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




     </NewStudentListCard >






    </>
  )
}
