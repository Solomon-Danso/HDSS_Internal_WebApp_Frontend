import React, { useEffect, useState } from 'react'
import { apiServer,DeleteStudentApi,RegisterStudent, UpdateStudent, ViewClasses, ViewOneStudent } from '../../Constants /Endpoints'
import { AdmitStudentCard, AdmitStudentRole, FormLable, HeaderTitle, MainTitle,FormInputStudent, SelectStage, SelectForStudent, FormTextAreaStudent, SelectStageButton, AdmitButton, SelectForStudentRel, AdmitButton2, FormInputStudent2} from '../../Designs/Styles/Profile'
import { colors } from '../../Designs/Colors'
import { Show } from '../../Constants /Alerts'
import { useNavigate } from 'react-router-dom'
import { AES, enc } from 'crypto-js'


const DeleteStudent = () => {

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
    }catch(e){
      navigate("/")
      window.location.reload();
    }
  
  }, []);

const [studentId, setStudentId] = useState()
const CompanyId = userInfo.CompanyId;
const SenderId = userInfo.UserId;

    const studentDetails = async (event) => {
        event.preventDefault();
        const url = `DeleteStudent/${studentId}/${CompanyId}/${SenderId}`
        try {
          const response = await fetch(apiServer + url, {
            method: "DELETE",
          });
          if (response.ok) {

            
            Show.Success("Student deleted successfully");
            window.location.reload();
            
          } else {
            Show.Attention("Student not found");
          }
        } catch (err) {
          Show.Attention("An error has occurred");
        }
      };
    



  return (
    <>
    <form onSubmit={studentDetails}>
    < AdmitStudentCard>
    
    <div>
        <FormLable>Enter Student Id</FormLable>
        <AdmitStudentRole>
        <FormInputStudent2
        type="text"
        
        placeholder="35678"
        onChange={(e) => setStudentId(e.target.value)}
       
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