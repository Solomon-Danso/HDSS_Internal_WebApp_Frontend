import React, { useEffect, useState } from 'react'
import { AdmitButton2, AdmitStudentCard2, FeesIcons, FeesRow, FormInputStudent4, FormInputStudent6, FormLable, FormLoaders, NewStudentListCard2, PaySelector, SelectForStudent, SelectStageButton, StudCenter, StudRight, StudentInfoCard, StudentInfoCard2, StudentListResult } from '../../Designs/Styles/Profile'

import {   ViewTeachers, apiServer } from '../../Constants /Endpoints'
import { Show } from '../../Constants /Alerts'
import { colors } from '../../Designs/Colors'


import { AES, enc } from 'crypto-js';
import { MdTitle } from 'react-icons/md'
import { RiVideoUploadLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { AiOutlinePicture } from 'react-icons/ai'

const StudentInfo = () => {



    const [theClass2, setTheClass2] = useState([])

    const [specificRole, setspecificRole] = useState("");


    useEffect(() => {
      const spRole =  AES.decrypt(sessionStorage.getItem("SpecificRole"), '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK').toString(enc.Utf8);
      setspecificRole(spRole);
      
    }, []);
    

     


      const [theStudents, setTheStudents] = useState([])
      const [theClass, setTheClass] = useState([])



   

      const [userInfo, setUserInfo] = useState({});

      useEffect(() => {
        const encryptedData = sessionStorage.getItem("userDataEnc");
        const encryptionKey = '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK';
        const decryptedData = AES.decrypt(encryptedData, encryptionKey);
        const decryptedString = decryptedData.toString(enc.Utf8);
        const parsedData = JSON.parse(decryptedString);
          setUserInfo(parsedData);
      }, []);


      const [e,se] = useState("")
      const [f, sf] = useState("")

      const navigate = useNavigate();

      const studentDetails = async (event) => {
        event.preventDefault();
    
       Show.showLoading("Processing Data");
    const URL=`api/HyChat/CreateGroup?ID=${userInfo.studentId}`
   

        try {
          const formData = new FormData();
          
           formData.append("Picture",f)
           formData.append("GroupName",e)
      
          const response = await fetch(apiServer + URL, {
            method: "POST",
           
            body: formData,
          });
          if (response.ok) {
           Show.hideLoading();
           Show.Success("Group Created Successfully")
            navigate("/HyChat")
            
          } else {
            Show.Attention("All fields are required");
          }
        } catch (err) {
          Show.Attention("An error has occurred");
        }
      };
      const [dropper, setDropper] = useState(false)

  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    }}>



<StudCenter>
        

        <form onSubmit={studentDetails}>
    < AdmitStudentCard2>
    
    <div>

 

<FeesRow>
<FeesIcons>
<AiOutlinePicture color={colors.icon}/>
</FeesIcons>

<FormInputStudent6
        type="file"
        required
        placeholder="Select only PDF files"
        accept="image/*"
        onChange={(e) => sf(e.target.files[0])}
       
        />


</FeesRow>

<FeesRow>

<FeesIcons >
<MdTitle  color={colors.icon}/>
</FeesIcons>
  
    <FormInputStudent4
    type="text"
    //value={theStudent?.studentId}
    placeholder="Group Name"
    onChange={(e) => se(e.target.value)}
   required
    />

    </FeesRow>



 <AdmitButton2
        background={colors.lightgreen}
        color="white"
        border={colors.maingreen}
        
        type="submit">Create 
        </AdmitButton2>


       
       
       
        
        
        
     </div>
  
    
    </AdmitStudentCard2>    
    </form>
        </StudCenter>






    </div>
  )
}

export default StudentInfo