import React, { useEffect, useState } from 'react'
import { AdmitButton2, AdmitStudentCard2, CardImage, CardText2, FeesIcons, FeesRow, FormInputStudent4, NewStudentListCard, NewStudentListCard2, PaySelector, SelectForStudent, SelectForStudentRel, SelectStageButton, StudCenter } from '../../../Designs/Styles/Profile'
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






export const AddSubjectCard = ({ data,index }) => {
   

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
        Show.showLoading("Deleting Subject")
        const URL=`api/LMS/DeleteSubject?Id=${data.id}&SID=${userInfo.staffID}`
      
        try {
          const response = await fetch(apiServer + URL, {
            method: "DELETE",
          });
          if (response.ok) {

            Show.hideLoading()
            Show.Success("Subject deleted successfully");
            window.location.reload();

            
          } else {
            Show.Attention("Subject not found");
          }
        } catch (err) {
          Show.Attention("An error has occurred");
        }
      };



      



  return (
    <>
    <NewStudentListCard2 >
    <CardText2>{index+1}</CardText2>
     <CardText2>{data?.subjectName}</CardText2>
     <CardText2>{data?.dateAdded}</CardText2>
    
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
       {"Delete"}
     </SelectStageButton>
</>):(<></>)
}



     </NewStudentListCard2 >




    </>
  )
}
