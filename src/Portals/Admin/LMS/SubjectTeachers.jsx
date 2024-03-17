import React, { useEffect, useState } from 'react'
import { AboutHeader, AboutHeader2, AdmitButton2, AdmitStudentCard2, AdmitStudentCard3, CardTextHeader, FeesIcons, FeesRow, FormInputSearch, FormInputStudent3, FormInputStudent4, FormLoaders, NewStudentListCard2, PaySelector, SelectForStudent, SelectStageButton, StudCenter, StudRight, StudentInfoCard, StudentInfoCard2, StudentListResult } from '../../../Designs/Styles/Profile'
import  {SubjectTeachersCard}  from './SubjectTeachersCard'

import { SearchClass, SearchStudent, SearchSubject, SubTeacher,ViewClasses,ViewStudents, ViewTeachers, apiServer } from '../../../Constants /Endpoints'
import { Show } from '../../../Constants /Alerts'
import { colors } from '../../../Designs/Colors'

import {BsMortarboard} from "react-icons/bs";
import { AES, enc } from 'crypto-js';
import {FaGooglePay } from "react-icons/fa";
import AnimateHeight from 'react-animate-height'
import {GiTeacher } from "react-icons/gi";
import {LuSchool } from "react-icons/lu";

const StudentInfo = () => {


    const [studentList, setStudentList] = useState([])
      const [closeOther, setCloseOther] = useState(false)
    const [searchResult, setSearchResult] = useState(false)
    const [searchTerm, setSearchTerm] = useState()

    const [theClass2, setTheClass2] = useState([])

     const specificRole="SuperiorUser"


    
    

      useEffect(() => {
   
        fetch(apiServer + ViewClasses)
          .then(response => response.json()) // Parse the response as JSON
          .then(data => setTheClass2(data))
          .catch(error => console.error(error));
      }, []);
  
 
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
            const response = await fetch(apiServer + SearchSubject + searchTerm, {
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
      const [staffName,sb] = useState("")
      const [className, sc] = useState("")


      useEffect(() => {
        fetch(apiServer + ViewTeachers+userInfo.staffID)
          .then(response => response.json()) // Parse the response as JSON
          .then(data => setTheStudents(data))
          .catch(error => console.error(error));
      }, [userInfo.staffID]);

      const [subj, setSubJ] = useState([])
      useEffect(() => {
        if(userInfo.staffID){
            const URL=`api/LMS/AllSubjectTeachers`

            fetch(apiServer + URL)
              .then(response => response.json()) // Parse the response as JSON
              .then(data => setSubJ(data))
              .catch(error => console.error(error));
        }
      
      }, [userInfo.staffID]);

      useEffect(() => {
        if(userInfo.staffID){
            const URL=`api/LMS/viewAllSubject?ID=${userInfo.staffID}`

            fetch(apiServer + URL)
              .then(response => response.json()) // Parse the response as JSON
              .then(data => setTheClass(data))
              .catch(error => console.error(error));
        }
      
      }, [userInfo.staffID]);
  

      const studentDetails = async (event) => {
        event.preventDefault();
    
       Show.showLoading("Processing Data");
    const URL=`api/LMS/AddTeacherToSubject?ID=${userInfo.staffID}`

        try {
          const response = await fetch(apiServer + URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Set the Content-Type header
            },
            body: JSON.stringify({subjectName,staffName,className }),
          });
          if (response.ok) {
           Show.hideLoading();
           Show.Success("Teacher Assigned Successfully")
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
       {dropper?"Minimize":"Add A Subject Teacher"}
     </AboutHeader2> <br/>
     <AnimateHeight height={dropper ? "auto" : 0}>

     <StudCenter>
        

        <form onSubmit={studentDetails}>
    < AdmitStudentCard2>
    
    <div>

    <FeesRow>
<FeesIcons>
<LuSchool color={colors.icon}/>
</FeesIcons>
       <PaySelector
    background={colors.darkBlue}
    color="white"
    border={colors.darkBlue}
    onChange={(e) => sc(e.target.value)}
    required
    >
        <option>Select A Class</option>
   {theClass2.length > 0 &&
    theClass2.map((data) => (
      <option key={data.id}>{data.className}</option>
    ))}

    </PaySelector>
</FeesRow>


    <FeesRow>
<FeesIcons>
<BsMortarboard color={colors.icon}/>
</FeesIcons>
       <PaySelector
    background={colors.darkBlue}
    color="white"
    border={colors.darkBlue}
    onChange={(e) => sa(e.target.value)}
    required
    >
        <option>Select A Subject</option>
   {theClass.length > 0 &&
    theClass.map((data) => (
      <option key={data.id}>{data.subjectName}</option>
    ))}

    </PaySelector>
</FeesRow>
 

<FeesRow>
<FeesIcons>
<GiTeacher color={colors.icon}/>
</FeesIcons>
       <PaySelector
    background={colors.darkBlue}
    color="white"
    border={colors.darkBlue}
    onChange={(e) => sb(e.target.value)}
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
            placeholder="Live Search Using Class, Subject, Class Teacher, Staff ID, Date Assigned"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ '::placeholder': { color: 'white' } }}
          />
          
 </FormLoaders>

<NewStudentListCard2 >

<CardTextHeader>S/N</CardTextHeader>
<CardTextHeader>Subject Name</CardTextHeader>
<CardTextHeader>Class Name</CardTextHeader>
<CardTextHeader>Staff ID</CardTextHeader>
<CardTextHeader>Teacher Name</CardTextHeader>
<CardTextHeader>Date Assigned</CardTextHeader>
{
  specificRole==="SuperiorUser"||specificRole==="HeadTeacher"?(<>
  <CardTextHeader>Action</CardTextHeader>
  </>):(<></>)
}


</NewStudentListCard2>


{searchResult && (
          <StudentListResult>
            {studentList.length > 0 &&
              studentList.map((data, index) => <SubjectTeachersCard data={data} key={index} index={index}/>)}
          </StudentListResult>
        )}









{
  closeOther? (
  <>
  
  </>
  ):(
  
  <>
  
  <StudentListResult>
{subj.length > 0 &&
    subj.map((data,index) => (
      <SubjectTeachersCard data={data} key={index} index={index} />
    ))}

</StudentListResult>

  
  </>)  
}



</StudentInfoCard2>


    </div>
  )
}

export default StudentInfo