import React, { useEffect, useState } from 'react'
import { AboutHeader, AboutHeader2, AdmitButton2, AdmitStudentCard2, AdmitStudentCard3, CardTextHeader, CardTextHeader2, FeesIcons, FeesRow, FormInputSearch, FormInputStudent3, FormInputStudent4, FormLoaders, FormTextAreaNotes, NewStudentListCard2, PaySelector, SelectForStudent, SelectStageButton, StudCenter, StudRight, StudentInfoCard, StudentInfoCard2, StudentListResult } from '../../../Designs/Styles/Profile'
import  {AddAnnoucementCard}  from './AddAnnoucementCard'

import { SearchClass, ViewClasses, ViewTeachers, apiServer } from '../../../Constants /Endpoints'
import { Show } from '../../../Constants /Alerts'
import { colors } from '../../../Designs/Colors'

import {HiIdentification, HiOutlineAcademicCap } from "react-icons/hi";
import {BsBook, BsCalendar2Date, BsMortarboard} from "react-icons/bs";
import { AES, enc } from 'crypto-js';
import {FaGooglePay } from "react-icons/fa";
import AnimateHeight from 'react-animate-height'
import { AiOutlineNotification } from 'react-icons/ai'
import { MdTitle } from 'react-icons/md'

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

    
     
      useEffect(() => {
        if(userInfo.staffID){
            const URL=`api/LMS/GetannoucementForStudent`

            fetch(apiServer + URL)
              .then(response => response.json()) // Parse the response as JSON
              .then(data => setTheClass(data))
              .catch(error => console.error(error));
        }
      
      }, [userInfo.staffID]);
     
      const [specificRole, setspecificRole] = useState("");


    useEffect(() => {
      const spRole =  AES.decrypt(sessionStorage.getItem("SpecificRole"), '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK').toString(enc.Utf8);
      setspecificRole(spRole);
      
    }, []);

      const studentDetails = async (event) => {
        event.preventDefault();
    
       Show.showLoading("Processing Data");
    const URL=`api/LMS/AddannoucementForStudent?SID=${userInfo.staffID}`

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
          if (response.ok) {
           Show.hideLoading();
           Show.Success("Annoucement Uploaded Successfully")
            window.location.reload()
            
          } else {
            Show.Attention("All fields are required");
          }
        } catch (err) {
          Show.Attention("An error has occurred");
        }
      };
      const [dropper, setDropper] = useState(false)

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
       {dropper?"Minimize":"Add Student Annoucement"}
     </AboutHeader2> <br/>
     <AnimateHeight height={dropper ? "auto" : 0}>

     <StudCenter>
        

        <form onSubmit={studentDetails}>
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
        //value={theStudent?.studentId}
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
        //value={theStudent?.studentId}
        placeholder="content"
        onChange={(e) => sb(e.target.value)}
       
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

<CardTextHeader>S/N</CardTextHeader>
<CardTextHeader>Title</CardTextHeader>
<CardTextHeader>Academic Year</CardTextHeader>
<CardTextHeader>Academic Term</CardTextHeader>
<CardTextHeader>Date Added</CardTextHeader>
{
   specificRole==="SuperiorUser"||specificRole==="HeadTeacher"?(<>
   
   <CardTextHeader>Action</CardTextHeader>
   </>):(<></>)
}

</NewStudentListCard2>










<StudentListResult>
{theClass.length > 0 &&
    theClass.map((data,index) => (
      <AddAnnoucementCard data={data} key={index} index={index} />
    ))}

</StudentListResult>



</StudentInfoCard2>


    </div>
  )
}

export default StudentInfo