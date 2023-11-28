import React, { useEffect, useState } from 'react'
import { AboutHeader, AboutHeader2, AdmitButton2, AdmitStudentCard2, AdmitStudentCard3,  NotesInfoCard, CardTextHeader, CardTextHeader2, FeesIconsS, FeesRow, FormInputSearch, FormInputStudent3, NoteSubject, FormLoaders, FormTextAreaNotes, NewStudentListCard2, PaySelectorN, SelectForStudent, SelectStageButton, StudCenter, StudRight, StudentInfoCard, StudentInfoCard2, StudentListResult, AddNotes, MovieCard, MovieSText, FeesIconN2 } from '../../Designs/Styles/Profile'

import { SearchClass, ViewClasses, ViewTeachers, apiServer } from '../../Constants /Endpoints'
import { Show } from '../../Constants /Alerts'

import {HiIdentification, HiOutlineAcademicCap } from "react-icons/hi";
import {BsArrowLeft, BsBook, BsCalendar2Date, BsMortarboard} from "react-icons/bs";
import { AES, enc } from 'crypto-js';
import {FaGooglePay } from "react-icons/fa";
import AnimateHeight from 'react-animate-height'
import { AiOutlineCalendar, AiOutlineNotification } from 'react-icons/ai'
import { MdTitle } from 'react-icons/md'
import { colors } from '../../Designs/Colors'
import { GiNotebook } from 'react-icons/gi';
import { MenuButtonIcon } from '../../Designs/Styles/Styles';
import { RiVideoUploadLine } from 'react-icons/ri';
import Beauty from '../../Designs/Images/beauty.jpg'
import { HeaderCard } from '../../Designs/Styles/HyChat';
import { useNavigate } from 'react-router-dom';


const StudentInfo = () => {


    const playAudio = (audioSrc, audioElement) => {
        if (audioElement.paused) {
          audioElement.src = audioSrc;
          audioElement.play();
        } else {
          audioElement.pause();
        }
      };
      
      // Initialize an audio element
      const audioElement = new Audio();
    
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
        if(userInfo.studentId){
            const URL=`api/LMS/viewAllSubject`

            fetch(apiServer + URL)
              .then(response => response.json()) // Parse the response as JSON
              .then(data => setTheClass(data))
              .catch(error => console.error(error));
        }
      
      }, [userInfo.studentId]);
     
      const [specificRole, setspecificRole] = useState("");


    useEffect(() => {
      const spRole =  AES.decrypt(sessionStorage.getItem("SpecificRole"), '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK').toString(enc.Utf8);
      setspecificRole(spRole);
      
    }, []);

      const studentDetails = async (event) => {
        event.preventDefault();
    
       Show.showLoading("Processing Data");
    const URL=`api/StudentApp/AddStudentNotes?SID=${userInfo.studentId}`

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
              notes:b

            }),
          });
          const data = await response.text();
          if (response.ok) {
           Show.hideLoading();
           Show.Success(data)
            window.location.reload()
            
          } else {
            Show.Attention(data);
          }
        } catch (err) {
          Show.Attention("An error has occurred");
        }
      };


      const deleteNotes = async (NId) => {
       
    
       Show.showLoading("Processing Data");
      const URL = `api/StudentApp/DeleteOneNotesForAStudent?ID=${NId}&StudentId=${userInfo.studentId}`
        try {
          const response = await fetch(apiServer + URL, {
            method: "DELETE",
            
          });
          const data = await response.text();
          if (response.ok) {
           Show.hideLoading();
           Show.Success(data)
            window.location.reload()
            
          } else {
            Show.Attention(data);
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


const [notes, setNotes] = useState([])

useEffect(() => {
    if(userInfo.studentId){
        const URL=`api/StudentApp/ViewAllNotesForAStudent?StudentID=${userInfo.studentId}`

        fetch(apiServer + URL)
          .then(response => response.json()) // Parse the response as JSON
          .then(data => setNotes(data))
          .catch(error => console.error(error));
    }
  
  }, [userInfo.studentId]);


const navigate = useNavigate(); 



  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    }}>
        <HeaderCard  onClick = {()=>{navigate("/student")}}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '0.5rem',
          
          
        }}>
          <FeesIconN2>
          <BsArrowLeft/>
          </FeesIconN2>

          <div style={{
            padding:'0.6rem',
          }}>Home</div>


        </div>
      </HeaderCard>

<AboutHeader2
     background={colors.red}
     color="white"
     border={colors.darkBlue}

     onClick={(e)=>{
        setDropper(!dropper)
     }}
     >
       {dropper?"Minimize":"Add Notes"}
     </AboutHeader2> <br/>
     <AnimateHeight height={dropper ? "auto" : 0}>

     <StudCenter>
        

        <form onSubmit={studentDetails}>
    <  NotesInfoCard>
    
    <div>

    <FeesRow>
<FeesIconsS>
<BsCalendar2Date color={colors.icon}/>
</FeesIconsS>
       <PaySelectorN
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

    </PaySelectorN>
</FeesRow>


<FeesRow>
<FeesIconsS>
<HiOutlineAcademicCap color={colors.icon}/>
</FeesIconsS>
       <PaySelectorN
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

    </PaySelectorN>
</FeesRow>


<FeesRow>
<FeesIconsS>
<BsBook color={colors.icon}/>
</FeesIconsS>
       <PaySelectorN
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

    </PaySelectorN>
</FeesRow>


        <FeesRow>

    <FeesIconsS >
    <GiNotebook  color={colors.icon}/>
    </FeesIconsS>
      
        <FormTextAreaNotes
        type="text"
        //value={theStudent?.studentId}
        placeholder="Type your notes here..."
        onChange={(e) => sb(e.target.value)}
       
        />

        </FeesRow>

  




 <AddNotes
        background={colors.lightgreen}
        color="white"
        border={colors.maingreen}
        
        type="submit">ADD 
        </AddNotes>


       
       
       
        
        
        
     </div>
  
    
    </ NotesInfoCard>    
    </form>
        </StudCenter>

     </AnimateHeight>


<StudentInfoCard2 >











<StudentListResult>
{notes.length > 0 &&
    notes.map((data,index) => (
      <>
      {
        data.resourceType==="Video"?(
        <>
        <MovieCard>
  <video width="100%" height="70%" top="0px" controls >
    <source src={data.resourceUrl} type="video/mp4" />

    Your browser does not support the video tag.
  </video>

  <div style={{display:"flex", flexDirection:"row"}}>
          <MenuButtonIcon ><BsBook/></MenuButtonIcon>
          <MovieSText >{data.subject} </MovieSText>
</div>



<div style={{display:"flex", flexDirection:"row"}}>
          <MenuButtonIcon ><HiOutlineAcademicCap/></MenuButtonIcon>
          <MovieSText >{data.academicTerm} </MovieSText>
</div>



<div style={{display:"flex", flexDirection:"row"}}>
          <MenuButtonIcon ><AiOutlineCalendar/></MenuButtonIcon>
          <MovieSText >{data.academicYear} </MovieSText>
</div>

<div style={{display:"flex", flexDirection:"row"}}>
          <MenuButtonIcon ><GiNotebook/></MenuButtonIcon>
          <FormTextAreaNotes
        type="text"
        value={data.notes}
      
       
        />
</div>

  
<div style={{display:"flex", flexDirection:"row"}}>
          <MenuButtonIcon ><AiOutlineCalendar/></MenuButtonIcon>
          <MovieSText >{data.dateAdded} </MovieSText>
</div> 

<AddNotes
        background={colors.mainred}
        color="white"
        border={colors.maingreen}
        onClick={()=>{
            deleteNotes(data.id)
        }}
        >Delete 
</AddNotes>
</MovieCard>
        </>):""
      }

{
        data.resourceType==="Typed Notes"?(
        <>
        <MovieCard>


  <div style={{display:"flex", flexDirection:"row"}}>
          <MenuButtonIcon ><BsBook/></MenuButtonIcon>
          <MovieSText >{data.subject} </MovieSText>
</div>

<div style={{display:"flex", flexDirection:"row"}}>
          <MenuButtonIcon ><HiOutlineAcademicCap/></MenuButtonIcon>
          <MovieSText >{data.academicTerm} </MovieSText>
</div>



<div style={{display:"flex", flexDirection:"row"}}>
          <MenuButtonIcon ><AiOutlineCalendar/></MenuButtonIcon>
          <MovieSText >{data.academicYear} </MovieSText>
</div>

<div style={{display:"flex", flexDirection:"row"}}>
          <MenuButtonIcon ><GiNotebook/></MenuButtonIcon>
          <FormTextAreaNotes
        type="text"
        value={data.notes}
      
       
        />
</div>

  
<div style={{display:"flex", flexDirection:"row"}}>
          <MenuButtonIcon ><AiOutlineCalendar/></MenuButtonIcon>
          <MovieSText >{data.dateAdded} </MovieSText>
</div> 

<AddNotes
        background={colors.mainred}
        color="white"
        border={colors.maingreen}
        onClick={()=>{
            deleteNotes(data.id)
        }}
        >Delete 
</AddNotes>

</MovieCard>
        </>):""
      }

{
        data.resourceType==="Audio"?(
        <>
        <MovieCard>
        <img src={Beauty} width="100%" height="55%" top="0px" alt={"Click Me"}
        
        onClick={()=>{
            playAudio(data.resourceUrl, audioElement);
         }}
        />
 


  <div style={{display:"flex", flexDirection:"row"}}>
          <MenuButtonIcon ><BsBook/></MenuButtonIcon>
          <MovieSText >{data.subject} </MovieSText>
</div>

<div style={{display:"flex", flexDirection:"row"}}>
          <MenuButtonIcon ><HiOutlineAcademicCap/></MenuButtonIcon>
          <MovieSText >{data.academicTerm} </MovieSText>
</div>



<div style={{display:"flex", flexDirection:"row"}}>
          <MenuButtonIcon ><AiOutlineCalendar/></MenuButtonIcon>
          <MovieSText >{data.academicYear} </MovieSText>
</div>

<div style={{display:"flex", flexDirection:"row"}}>
          <MenuButtonIcon ><GiNotebook/></MenuButtonIcon>
          <FormTextAreaNotes
        type="text"
        value={data.notes}
      
       
        />
</div>

  
<div style={{display:"flex", flexDirection:"row"}}>
          <MenuButtonIcon ><AiOutlineCalendar/></MenuButtonIcon>
          <MovieSText >{data.dateAdded} </MovieSText>
</div> 

<AddNotes
        background={colors.mainred}
        color="white"
        border={colors.maingreen}
        onClick={()=>{
            deleteNotes(data.id)
        }}
        >Delete 
</AddNotes>

</MovieCard>
        </>):""
      }

{
        data.resourceType==="Picture"?(
        <>
        <MovieCard>
        <img src={data.resourceUrl} width="100%" height="55%" top="0px" alt={"Click Me"}
        
        />
 


  <div style={{display:"flex", flexDirection:"row"}}>
          <MenuButtonIcon ><BsBook/></MenuButtonIcon>
          <MovieSText >{data.subject} </MovieSText>
</div>

<div style={{display:"flex", flexDirection:"row"}}>
          <MenuButtonIcon ><HiOutlineAcademicCap/></MenuButtonIcon>
          <MovieSText >{data.academicTerm} </MovieSText>
</div>



<div style={{display:"flex", flexDirection:"row"}}>
          <MenuButtonIcon ><AiOutlineCalendar/></MenuButtonIcon>
          <MovieSText >{data.academicYear} </MovieSText>
</div>

<div style={{display:"flex", flexDirection:"row"}}>
          <MenuButtonIcon ><GiNotebook/></MenuButtonIcon>
          <FormTextAreaNotes
        type="text"
        value={data.notes}
      
       
        />
</div>

  
<div style={{display:"flex", flexDirection:"row"}}>
          <MenuButtonIcon ><AiOutlineCalendar/></MenuButtonIcon>
          <MovieSText >{data.dateAdded} </MovieSText>
</div> 

<AddNotes
        background={colors.mainred}
        color="white"
        border={colors.maingreen}
        onClick={()=>{
            deleteNotes(data.id)
        }}
        >Delete 
</AddNotes>

</MovieCard>
        </>):""
      }
      
      
      
      </>
    ))}

</StudentListResult>



</StudentInfoCard2>


    </div>
  )
}

export default StudentInfo