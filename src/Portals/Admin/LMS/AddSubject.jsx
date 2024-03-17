import React, { useEffect, useState } from 'react'
import { AboutHeader, AboutHeader2, AdmitButton2, AdmitStudentCard2, AdmitStudentCard3, CardTextHeader2, FeesIcons, FeesRow, FormInputSearch, FormInputStudent3, FormInputStudent4, FormLoaders, NewStudentListCard2, PaySelector, SelectForStudent, SelectStageButton, StudCenter, StudRight, StudentInfoCard, StudentInfoCard2, StudentListResult } from '../../../Designs/Styles/Profile'
import  {AddSubjectCard}  from './AddSubjectCard'

import { SearchClass, ViewClasses, ViewTeachers, apiServer } from '../../../Constants /Endpoints'
import { Show } from '../../../Constants /Alerts'
import { colors } from '../../../Designs/Colors'

import {HiIdentification } from "react-icons/hi";
import {BsBook, BsMortarboard} from "react-icons/bs";
import { AES, enc } from 'crypto-js';
import {FaGooglePay } from "react-icons/fa";
import AnimateHeight from 'react-animate-height'

const StudentInfo = () => {


 
    
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

      const [subjectName,sa] = useState("")
     
      useEffect(() => {
        if(userInfo.staffID){
            const URL=`api/LMS/viewAllSubject`

            fetch(apiServer + URL)
              .then(response => response.json()) // Parse the response as JSON
              .then(data => setTheClass(data))
              .catch(error => console.error(error));
        }
      
      }, [userInfo.staffID]);
     
       const specificRole="SuperiorUser"


    

      const studentDetails = async (event) => {
        event.preventDefault();
    
       Show.showLoading("Processing Data");
    const URL=`api/LMS/AddSubject?ID=${userInfo.staffID}`

        try {
          const response = await fetch(apiServer + URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Set the Content-Type header
            },
            body: JSON.stringify({subjectName }),
          });
          if (response.ok) {
           Show.hideLoading();
           Show.Success("Subject Added Successfully")
            window.location.reload()
            
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

{
  specificRole==="SuperiorUser"||specificRole==="HeadTeacher"?(<>
  
  <AboutHeader2
     background={colors.red}
     color="white"
     border={colors.darkBlue}

     onClick={(e)=>{
        setDropper(!dropper)
     }}
     >
       {dropper?"Minimize":"Add A Subject"}
     </AboutHeader2> <br/>
     <AnimateHeight height={dropper ? "auto" : 0}>

     <StudCenter>
        

        <form onSubmit={studentDetails}>
    < AdmitStudentCard2>
    
    <div>
        <FeesRow>

    <FeesIcons >
    <BsBook  color={colors.icon}/>
    </FeesIcons>
      
        <FormInputStudent4
        type="text"
        //value={theStudent?.studentId}
        placeholder="Subject"
        onChange={(e) => sa(e.target.value)}
       
        />

        </FeesRow>




 <AdmitButton2
        background={colors.lightgreen}
        color="white"
        border={colors.maingreen}
        
        type="submit">ADD 
        </AdmitButton2>


       
       
       
        
        
        
     </div>
  
    
    </AdmitStudentCard2>    
    </form>
        </StudCenter>

     </AnimateHeight>
  </>):(<></>)
}



<StudentInfoCard2 >


<NewStudentListCard2 >

<CardTextHeader2>S/N</CardTextHeader2>
<CardTextHeader2>Subject</CardTextHeader2>
<CardTextHeader2>Date Added</CardTextHeader2>
{
  specificRole==="SuperiorUser"||specificRole==="HeadTeacher"?(<>
  <CardTextHeader2>Action</CardTextHeader2>
  </>):(<></>)
}



</NewStudentListCard2>










<StudentListResult>
{theClass.length > 0 &&
    theClass.map((data,index) => (
      <AddSubjectCard data={data} key={index} index={index} />
    ))}

</StudentListResult>



</StudentInfoCard2>


    </div>
  )
}

export default StudentInfo