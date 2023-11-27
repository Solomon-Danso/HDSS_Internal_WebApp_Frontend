import React, { useEffect, useState } from 'react'
import { Table } from 'semantic-ui-react'
import { HeaderText } from '../../Designs/Styles/HyChat'
import { apiServer } from '../../Constants /Endpoints'
import { AES, enc } from 'crypto-js'
import { AssSolUpBut, AssignSolnUpload, AssignmentInfoCard, FeesIconsS, FeesRow, LiveVideoCard, MovieSText } from '../../Designs/Styles/Profile'
import { colors } from '../../Designs/Colors'
import { BsBook, BsFillCalendarDateFill } from 'react-icons/bs'
import { HiOutlineAcademicCap } from 'react-icons/hi'
import { MdOutlineGrade, MdTitle } from 'react-icons/md'
import { FaRankingStar } from 'react-icons/fa6'
import { MenuButtonIcon } from '../../Designs/Styles/Styles'
import { RiVideoUploadLine } from 'react-icons/ri'
import { AiOutlineCalendar } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'




const GradeBook = ({data}) => {



    const formatDateTime = (dateTime) => {
   
        const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
        return new Date(dateTime).toLocaleString('en-US', options);
      };


    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
      const encryptedData = sessionStorage.getItem("userDataEnc");
      const encryptionKey = '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK';
      const decryptedData = AES.decrypt(encryptedData, encryptionKey);
      const decryptedString = decryptedData.toString(enc.Utf8);
      const parsedData = JSON.parse(decryptedString);
        setUserInfo(parsedData);
    }, []);
  

const [grade, setGrades] = useState([])

useEffect(()=>{
    const URL = `api/StudentApp/GetGradeBook?studentId=${userInfo.studentId}`;
    fetch(apiServer+URL)
    .then(res => res.json())
    .then(data=>setGrades(data))
    .catch(err => console.error(err))

},)

const navigate = useNavigate()



  return (
 
<LiveVideoCard onClick={()=>{navigate(data.videoCallUrl)}}>
 

  
 <div style={{display:"flex", flexDirection:"row"}}>
         <MenuButtonIcon ><MdTitle/></MenuButtonIcon>
         <MovieSText >{data.subject} </MovieSText>
 </div>

 <div style={{display:"flex", flexDirection:"row"}}>
         <MenuButtonIcon ><RiVideoUploadLine/></MenuButtonIcon>
         <MovieSText >{formatDateTime(data.startDate)} </MovieSText>
</div>

<div style={{display:"flex", flexDirection:"row"}}>
         <MenuButtonIcon ><HiOutlineAcademicCap/></MenuButtonIcon>
         <MovieSText >{data.academicTerm} </MovieSText>
</div>


<div style={{display:"flex", flexDirection:"row"}}>
         <MenuButtonIcon ><AiOutlineCalendar/></MenuButtonIcon>
         <MovieSText >{data.academicYear} </MovieSText>
</div>

</LiveVideoCard>



  )
}

export default GradeBook