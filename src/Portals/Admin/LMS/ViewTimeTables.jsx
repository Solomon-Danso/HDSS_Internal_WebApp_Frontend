import React, { useEffect, useState } from 'react'
import { AboutHeader, AboutHeader2, AdmitButton2, AdmitStudentCard2, AdmitStudentCard3, CardTextHeader, FeesIcons, FeesRow, FormInputSearch, FormInputStudent3, FormInputStudent4, FormInputStudent6, FormLable, FormLoaders, NewStudentListCard2, PaySelector, SelectForStudent, SelectStageButton, StudCenter, StudRight, StudentInfoCard, StudentInfoCard2, StudentListResult } from '../../../Designs/Styles/Profile'
import  {ViewTimeTablesCard}  from './ViewTimeTablesCard'

import { apiServer } from '../../../Constants /Endpoints'
import { Show } from '../../../Constants /Alerts'
import { colors } from '../../../Designs/Colors'

import {BsBook} from "react-icons/bs";
import { AES, enc } from 'crypto-js';

import { BiBookReader } from 'react-icons/bi'


const StudentInfo = () => {


    const [studentList, setStudentList] = useState([])
      const [closeOther, setCloseOther] = useState(false)
    const [searchResult, setSearchResult] = useState(false)
    const [searchTerm, setSearchTerm] = useState()

    const [theClass2, setTheClass2] = useState([])

     const specificRole="SuperiorUser"


    
    

     

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
          const URL = `api/Admin/SearchTimeTable?searchTerm=${searchTerm}&StaffID=${userInfo.staffID}`
          try {
            const response = await fetch(apiServer + URL, {
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

     
      const [subj, setSubJ] = useState([])

      useEffect(() => {
        if(userInfo.staffID){
         
            const URL=`api/StudentApp/ViewAllTimeTableTeachers?ID=${userInfo.staffID}`
           fetch(apiServer + URL)
              .then(response => response.json()) // Parse the response as JSON
              .then(data => setTheClass(data))
              .catch(error => console.error(error));
        }
      
      }, [userInfo.staffID]);

      useEffect(() => {
        if(userInfo.staffID){
         
            const URL=`api/StudentApp/GetTeacherClass?ID=${userInfo.staffID}`
            fetch(apiServer + URL)
              .then(response => response.json()) // Parse the response as JSON
              .then(data => setTheClass2(data))
              .catch(error => console.error(error));
        }
      
      }, [userInfo.staffID]);
  



      const [c, sc] = useState("")
 const [d,sd] = useState("")
     


 const studentDetails = async () => {
  

  const URL = `api/AllGetters/viewTimeTables?Level=${c}`;

  try {
    const response = await fetch(apiServer + URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json(); 
      Show.hideLoading();
      setSubJ(data);
    } else {
     
    
    }
  } catch (err) {
   
    Show.Attention("An error has occurred.");
  }
};

useEffect(()=>{
    studentDetails()  
},[c])
    
   

  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    }}>







<StudentInfoCard2 >
  <div style={{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    width:"100%",

  }}>

<FeesRow>
<FeesIcons>
<BiBookReader color={colors.icon}/>
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



  </div>

<FormLoaders onSubmit={(e) => e.preventDefault()}>
          <FormInputSearch
            //background={colors.darkBlue}
        
            border={colors.darkBlue}
            placeholder="Live Search Using Class, Class Teacher, Staff ID, Date Assigned"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ '::placeholder': { color: 'white' } }}
          />
          
 </FormLoaders>

<NewStudentListCard2 >

<CardTextHeader>S/N</CardTextHeader>
<CardTextHeader>TimeTable</CardTextHeader>
<CardTextHeader>Class</CardTextHeader>
<CardTextHeader>Academic Year</CardTextHeader>
<CardTextHeader>Academic Term</CardTextHeader>
<CardTextHeader>Date Uploaded</CardTextHeader>
{
  specificRole==="SuperiorUser"||specificRole==="HeadTeacher"||specificRole==="Teacher"?(<>
  <CardTextHeader>Action</CardTextHeader>
  </>):(<></>)
}


</NewStudentListCard2>


{searchResult && (
          <StudentListResult>
            {studentList.length > 0 &&
              studentList.map((data, index) => <ViewTimeTablesCard data={data} key={index} index={index}/>)}
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
      <ViewTimeTablesCard data={data} key={index} index={index} />
    ))}

</StudentListResult>

  
  </>)  
}



</StudentInfoCard2>


    </div>
  )
}

export default StudentInfo