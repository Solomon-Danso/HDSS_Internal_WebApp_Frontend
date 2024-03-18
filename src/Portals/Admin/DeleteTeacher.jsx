import React, { useEffect, useState } from 'react'
import { apiServer,DeleteStudentApi,RegisterStudent, UpdateStudent, ViewClasses, ViewOneStudent } from '../../Constants /Endpoints'
import { AdmitStudentCard, AdmitStudentRole, FormLable, HeaderTitle, MainTitle,FormInputStudent, SelectStage, SelectForStudent, FormTextAreaStudent, SelectStageButton, AdmitButton, SelectForStudentRel, AdmitButton2, FormInputStudent2} from '../../Designs/Styles/Profile'
import { colors } from '../../Designs/Colors'
import { Show } from '../../Constants /Alerts'
import {AES, enc} from 'crypto-js'
import { useNavigate } from 'react-router-dom'

const DeleteStudent = () => {

const [staffId, setStaffId] = useState()
const [userInfo, setUserInfo] = useState({});
const navigate = useNavigate()
   
    useEffect(() => {
      try{
        const encryptedData = sessionStorage.getItem("userDataEnc");
        const encryptionKey = '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK';
        const decryptedData = AES.decrypt(encryptedData, encryptionKey);
        const decryptedString = decryptedData.toString(enc.Utf8);
        const parsedData = JSON.parse(decryptedString);
          setUserInfo(parsedData);
      }
      catch(e){
navigate("/")
      }

    }, []);

    const CompanyId = userInfo.CompanyId;
const SenderId = userInfo.UserId;

    const studentDetails = async (event) => {
      const url = `DeleteStaffMembers/${staffId}/${CompanyId}/${SenderId}`
      event.preventDefault();
        try {
          const response = await fetch(apiServer + url, {
            method: "POST",
          });
          const data = await response.json()
          if (response.ok) {

            
            Show.Success(data.message);
            window.location.reload();
            
          } else {
            Show.Attention(data.message);
          }
        } catch (err) {
          Show.Attention(err.message);
        }
      };
    



  return (
    <>
    <form onSubmit={studentDetails}>
    < AdmitStudentCard>
    
    <div>
        <FormLable>Enter Staff Id</FormLable>
        <AdmitStudentRole>
        <FormInputStudent2
        type="text"
        
        placeholder="35678"
        onChange={(e) => setStaffId(e.target.value)}
       
        />
         <AdmitButton2
        background={colors.lightred}
        color="white"
        border={colors.mainred}
        
        type="submit">Delete
        </AdmitButton2>
        </AdmitStudentRole>
     </div>
  
    
    </AdmitStudentCard>    
    </form>

    
    </>
  )
}

export default DeleteStudent