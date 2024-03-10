import React, { useEffect, useState } from 'react'
import { AboutHeader, AboutHeader2, AdmitButton2, AdmitStudentCard2, AdmitStudentCard3, CardTextHeader, FeesIcons, FeesRow, FormInputSearch, FormInputStudent3, FormInputStudent4, FormLoaders, NewStudentListCard2, PaySelector, SelectForStudent, SelectStageButton, StudCenter, StudRight, StudentInfoCard, StudentInfoCard2, StudentListResult } from '../../../Designs/Styles/Profile'
import  {ClassCard}  from './ClassCard'

import { SearchClass, SearchStudent, TheClassStudent, ViewClasses, ViewStudents, ViewTeachers, apiServer } from '../../../Constants /Endpoints'
import { Show } from '../../../Constants /Alerts'
import { colors } from '../../../Designs/Colors'
import { MdPerson } from "react-icons/md";
import {HiIdentification } from "react-icons/hi";
import {BsMortarboard} from "react-icons/bs";
import { AES, enc } from 'crypto-js';
import {FaGooglePay } from "react-icons/fa";
import AnimateHeight from 'react-animate-height'
import {GiTeacher } from "react-icons/gi";
import {CiLocationOn} from "react-icons/ci";
import {BiCodeBlock} from "react-icons/bi";
const StudentInfo = () => {


    const [studentList, setStudentList] = useState([])
    const [specificClass, setSpecificClass] = useState("")
    const [closeOther, setCloseOther] = useState(false)
    const [searchResult, setSearchResult] = useState(false)
    const [searchTerm, setSearchTerm] = useState()

    const [specificRole, setspecificRole] = useState("");


 
  
 
    useEffect(() => {
        // Function to fetch search results based on searchTerm
        const fetchSearchResults = async () => {
          if (searchTerm === '') {
            setStudentList([]); // Clear the list if search term is empty
            setSearchResult(false);
            setCloseOther(false)
            return;
          }
    
          //Show.showLoading('Processing Data');
          try {
            const response = await fetch(apiServer + SearchClass + searchTerm, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            });
    
            const data = await response.json();
    
            if (response.ok) {
              Show.hideLoading();
              setSearchResult(true);
              setStudentList(data);
              setCloseOther(true)
            } else {
              //Show.Attention('No Result Found');
              setSearchResult(false);
              setCloseOther(false)
              setStudentList([]);
            }
          } catch (error) {
            //Show.Attention('No Result Found');
            setSearchResult(false);
            setStudentList([]);
          }
        };
    
        fetchSearchResults(); // Call the function when searchTerm changes
      }, [searchTerm]);

      const [theStudents, setTheStudents] = useState([])
      const [theClass, setTheClass] = useState([])

      useEffect(() => {
   
        fetch(apiServer + ViewClasses)
          .then(response => response.json()) // Parse the response as JSON
          .then(data => setTheClass(data))
          .catch(error => console.error(error));
      }, []);


      const [userInfo, setUserInfo] = useState({});

      useEffect(() => {
        const encryptedData = sessionStorage.getItem("userDataEnc");
        const encryptionKey = '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK';
        const decryptedData = AES.decrypt(encryptedData, encryptionKey);
        const decryptedString = decryptedData.toString(enc.Utf8);
        const parsedData = JSON.parse(decryptedString);
          setUserInfo(parsedData);
      }, []);

      const [className,sa] = useState("")
      const [classCode,sb] = useState("")
      const [campus,sc] = useState("")
      const [classTeacher,sd] = useState("")

      useEffect(() => {
        fetch(apiServer + ViewTeachers+userInfo.staffID)
          .then(response => response.json()) // Parse the response as JSON
          .then(data => setTheStudents(data))
          .catch(error => console.error(error));
      }, [userInfo.staffID]);

     
  

      const studentDetails = async (event) => {
        event.preventDefault();
    
       Show.showLoading("Processing Data");
    const URL=`api/LMS/AddClass?ID=${userInfo.staffID}`

        try {
          const response = await fetch(apiServer + URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Set the Content-Type header
            },
            body: JSON.stringify({className,classCode,campus,classTeacher }),
          });
          const data = await response.text();
          if (response.ok) {
           Show.hideLoading();
           Show.Success("Class Added Successfully")
            window.location.reload()
            
          } else {
            Show.Attention(data);
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
       {dropper?"Minimize":"Add A Class"}
     </AboutHeader2> <br/>
     <AnimateHeight height={dropper ? "auto" : 0}>

     <StudCenter>
        

        <form onSubmit={studentDetails}>
    < AdmitStudentCard2>
    
    <div>
        <FeesRow>

    <FeesIcons >
    <HiIdentification  color={colors.icon}/>
    </FeesIcons>
      
        <FormInputStudent4
        type="text"
        //value={theStudent?.studentId}
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
    required
    >
        <option>Select A Teacher</option>
   {theStudents.length > 0 &&
    theStudents.map((data) => (
      <option key={data.id} value={data.staffID}>{data.title}{" "}{data.firstName}{" "} {data.otherName}{" "}{data.lastName}</option>
    ))}

    </PaySelector>
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

<FormLoaders onSubmit={(e) => e.preventDefault()}>
          <FormInputSearch
            //background={colors.darkBlue}
        
            border={colors.darkBlue}
            placeholder="Live Search Using Class, Campus, Class Teacher, Class Code"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ '::placeholder': { color: 'white' } }}
          />
          
 </FormLoaders>

<NewStudentListCard2 >

<CardTextHeader>S/N</CardTextHeader>
<CardTextHeader>Class</CardTextHeader>
<CardTextHeader>Campus</CardTextHeader>
<CardTextHeader>Class Code</CardTextHeader>
<CardTextHeader>Student</CardTextHeader>
<CardTextHeader>Class Teacher</CardTextHeader>
{
   specificRole==="SuperiorUser"||specificRole==="HeadTeacher"?(<>
   
   <CardTextHeader>Action</CardTextHeader>
   </>):(<></>)
}

</NewStudentListCard2>


{searchResult && (
          <StudentListResult>
            {studentList.length > 0 &&
              studentList.map((data, index) => <ClassCard data={data} key={index} index={index}/>)}
          </StudentListResult>
        )}









{
  closeOther? (
  <>
  
  </>
  ):(
  
  <>
  
  <StudentListResult>
{theClass.length > 0 &&
    theClass.map((data,index) => (
      <ClassCard data={data} key={index} index={index} />
    ))}

</StudentListResult>

  
  </>)  
}



</StudentInfoCard2>


    </div>
  )
}

export default StudentInfo