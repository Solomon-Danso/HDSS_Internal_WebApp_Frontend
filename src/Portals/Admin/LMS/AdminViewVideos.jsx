import React, { useEffect, useState } from 'react'
import { AboutHeader, AboutHeader2, AdmitButton2, AdmitStudentCard2, AdmitStudentCard3, CardTextHeader, FeesIcons, FeesRow, FormInputSearch, FormInputStudent3, FormInputStudent4, FormInputStudent6, FormLable, FormLoaders, NewStudentListCard2, PaySelector, SelectForStudent, SelectStageButton, StudCenter, StudRight, StudentInfoCard, StudentInfoCard2, StudentListResult } from '../../../Designs/Styles/Profile'
import  {ViewVideosCard}  from './ViewVideosCard'

import {  SearchVideos, SearchSubject, SubTeacher,ViewClasses,ViewStudents, ViewTeachers, apiServer } from '../../../Constants /Endpoints'
import { Show } from '../../../Constants /Alerts'
import { colors } from '../../../Designs/Colors'

import {BsBook, BsCalendar2Date, BsMortarboard} from "react-icons/bs";
import { AES, enc } from 'crypto-js';
import {FaGooglePay } from "react-icons/fa";
import AnimateHeight from 'react-animate-height'
import {GiTeacher } from "react-icons/gi";
import {LuSchool } from "react-icons/lu";
import {HiOutlineAcademicCap } from "react-icons/hi";
import { MdTitle } from 'react-icons/md'
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
          const URL = `api/Admin/AdminSearchVideos?searchTerm=${searchTerm}`
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
         
            const URL=`api/LMS/viewAllSubject`
            fetch(apiServer + URL)
              .then(response => response.json()) // Parse the response as JSON
              .then(data => setTheClass(data))
              .catch(error => console.error(error));
        }
      
      }, [userInfo.staffID]);

      useEffect(() => {
   
        fetch(apiServer + ViewClasses)
          .then(response => response.json()) // Parse the response as JSON
          .then(data => setTheClass2(data))
          .catch(error => console.error(error));
      }, []);



      const [c, sc] = useState("")
 const [d,sd] = useState("")
     


 const studentDetails = async () => {
  Show.showLoading("Processing Data");

  const URL = `api/AllGetters/viewVideos?Sub=${d}&Level=${c}`;

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
     
      Show.Attention("An error occurred while fetching data.");
    }
  } catch (err) {
   
    Show.Attention("An error has occurred.");
  }
};

    
   

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


    <FeesRow>
<FeesIcons>
<BsBook color={colors.icon}/>
</FeesIcons>
       <PaySelector
    background={colors.darkBlue}
    color="white"
    border={colors.darkBlue}
    onChange={(e) => sd(e.target.value)}
    required
    >
        <option>Select A Subject</option>
   {theClass.length > 0 &&
    theClass.map((data) => (
      <option key={data.id}>{data.subjectName}</option>
    ))}

    </PaySelector>
</FeesRow>

<AdmitButton2
        background={colors.lightgreen}
        color="white"
        border={colors.maingreen}
        onClick={()=>{
          studentDetails()
        }}
        >Submit
        </AdmitButton2>

  </div>

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
<CardTextHeader>Subject</CardTextHeader>
<CardTextHeader>Video</CardTextHeader>
<CardTextHeader>Title</CardTextHeader>
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
              studentList.map((data, index) => <ViewVideosCard data={data} key={index} index={index}/>)}
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
      <ViewVideosCard data={data} key={index} index={index} />
    ))}

</StudentListResult>

  
  </>)  
}



</StudentInfoCard2>


    </div>
  )
}

export default StudentInfo