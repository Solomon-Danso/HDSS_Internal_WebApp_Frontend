import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Table } from 'semantic-ui-react'
import { HeaderCard, HeaderText } from '../../Designs/Styles/HyChat'
import { apiServer } from '../../Constants /Endpoints'
import { AES,enc } from 'crypto-js'
import { AdmitButton2, AssSolUpBut, AssignSolnUpload, AssignmentInfoCard, FeesIconN2, FeesIconsS, FeesRow, FormInputStudent4, FormInputStudent6, PaySelector } from '../../Designs/Styles/Profile'
import { BsArrowLeft, BsBook, BsCalendar2Date } from 'react-icons/bs'
import { colors } from '../../Designs/Colors'
import { IoBookSharp } from 'react-icons/io5'
import { MdStickyNote2, MdTitle } from 'react-icons/md'
import { BiBookReader } from 'react-icons/bi'
import { HiOutlineAcademicCap } from 'react-icons/hi'
import { GiTeacher, GiTimeBomb } from 'react-icons/gi'
import { Show } from '../../Constants /Alerts'

const AssignmentSolution = () => {
    const {Id} = useParams();
const [assign, setAssign] = useState({});
const [userInfo, setUserInfo] = useState({});

useEffect(() => {
  const encryptedData = sessionStorage.getItem("userDataEnc");
  const encryptionKey = '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK';
  const decryptedData = AES.decrypt(encryptedData, encryptionKey);
  const decryptedString = decryptedData.toString(enc.Utf8);
  const parsedData = JSON.parse(decryptedString);
    setUserInfo(parsedData);
}, []);



const [isMobile, setIsMobile] = useState(false);
   
  
useEffect(() => {
  
   window.addEventListener("resize", handleResize);
  handleResize();

}, []);

//choose the screen size
const handleResize = () => {
  if (window.innerWidth < 768) {
    setIsMobile(true);
  } else {
    setIsMobile(false);
  }
};

const formatDateTime = (dateTime) => {
   
    const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(dateTime).toLocaleString('en-US', options);
  };


useEffect(() => {
  const URL = `api/StudentApp/AssignmentDetails?SID=${userInfo.studentId}&ID=${Id}`;
  if(userInfo.studentId&& Id){

    fetch(apiServer + URL) // Include credentials
    .then((response) => response.json())
    .then((data) => setAssign(data))
    .catch((err) => console.error(err));

  }
  
  
}, [ userInfo.studentId, Id]);



const navigate = useNavigate()

const [f,sf] = useState("")

const studentSolutions = async (event) => {
    event.preventDefault();

   Show.showLoading("Processing Data");
const URL=`api/LMS/AssignmentSolution?SID=${userInfo.studentId}&QuestionId=${Id}`


    try {
      const formData = new FormData();

       formData.append("Slide",f)
  
      const response = await fetch(apiServer + URL, {
        method: "POST",
       
        body: formData,
      });
      const data = await response.text();
      if (response.ok) {
       Show.hideLoading();
       Show.Success(data)
       navigate("/student/assignments")
        window.location.reload()
        
      } else {
        Show.Attention(data);
      }
    } catch (err) {
      Show.Attention("An error has occurred");
    }
  };




  return (
    <div>
         <HeaderCard  onClick = {()=>{navigate("/student/assignments")}}>
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
          }}>Back</div>


        </div>
      </HeaderCard>



<form onSubmit={studentSolutions}>
    < AssignmentInfoCard>
    
    <div>

    <FeesRow>
<FeesIconsS>
<BsBook color={colors.icon}/>
</FeesIconsS>
       <HeaderText>{assign.subjectName}</HeaderText>
</FeesRow>


<FeesRow>
<FeesIconsS>
<MdTitle color={colors.icon}/>
</FeesIconsS>
       <HeaderText>{assign.title}</HeaderText>
</FeesRow>


<FeesRow>
<FeesIconsS>
<HiOutlineAcademicCap color={colors.icon}/>
</FeesIconsS>
       <HeaderText>{assign.academicTerm}</HeaderText>
</FeesRow>

<FeesRow>
<FeesIconsS>
<BsCalendar2Date color={colors.icon}/>
</FeesIconsS>
       <HeaderText>{assign.academicYear}</HeaderText>
</FeesRow>


<FeesRow>
<FeesIconsS>
<GiTimeBomb color={colors.icon}/>
</FeesIconsS>
       <HeaderText>{formatDateTime(assign?.deadline)}</HeaderText>
</FeesRow>

<FeesRow>
<FeesIconsS>
<GiTeacher color={colors.icon}/>
</FeesIconsS>
       <HeaderText>{assign?.teacherName}</HeaderText>
</FeesRow>

<a href={apiServer+assign?.slidePath} style={{textDecoration:"none", color:`${colors.maingreen}`}} target="_blank" rel="noreferrer">
<FeesRow>
<FeesIconsS>
<MdStickyNote2 color={colors.icon}/>
</FeesIconsS>
       <HeaderText>Click me to view the assignment</HeaderText>
</FeesRow>

</a>




 


<FeesRow>
<FeesIconsS>
<IoBookSharp color={colors.icon}/>
</FeesIconsS>

<AssignSolnUpload
        type="file"
        required
        placeholder="Select only PDF files"
        accept=".pdf, .docs, .txt, .md, .docx "
        onChange={(e) => sf(e.target.files[0])}
       
        />


</FeesRow>




 <AssSolUpBut
        background={colors.lightgreen}
        color="white"
        border={colors.maingreen}
        
        type="submit">Submit
        </AssSolUpBut>


       
       
       
        
        
        
     </div>
  
    
    </AssignmentInfoCard>    
    </form>


    </div>
  )
}

export default AssignmentSolution