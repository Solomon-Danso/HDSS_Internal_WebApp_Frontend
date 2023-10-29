import React, { useEffect, useRef, useState} from 'react'
import { AboutHeader, AboutHeader2, AdmitButton2, AdmitStudentCard2, AdmitStudentCard3, CardTextHeader, FeesIcons, FeesRow, FormInputSearch, FormInputStudent3, FormInputStudent4, FormInputStudent6, FormLable, FormLoaders, MenuCard, NewStudentListCard2, PaySelector, SelectForStudent, SelectStageButton, StudCenter, StudRight, StudentInfoCard, StudentInfoCard2, StudentListResult,MovieCard, MovieBText, MovieSText } from '../../Designs/Styles/Profile'
import { AES,enc } from 'crypto-js';
import { apiServer } from '../../Constants /Endpoints'
import { Show } from '../../Constants /Alerts'
import { colors } from '../../Designs/Colors'
import { MenuButtonIcon, MenuButtonLink } from '../../Designs/Styles/Styles';
import { MdTitle } from 'react-icons/md';
import { HiOutlineAcademicCap } from 'react-icons/hi';
import { RiVideoUploadLine } from 'react-icons/ri';
import { BsCalendar2Date } from 'react-icons/bs';
import { AiOutlineCalendar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';



const Video = ({subject}) => {

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

const [videoList, setVideoList] = useState([])

const navigate = useNavigate()

  useEffect(() => {
    const URL = `api/StudentApp/Video?SID=${userInfo.studentId}&ClassName=${userInfo.level}&Subject=${subject}`;
    fetch(apiServer + URL, { credentials: 'include' }) // Include credentials
      .then((response) => response.json())
      .then((data) => setVideoList(data))
      .catch((err) => console.error(err));
  }, [subject, userInfo.studentId, userInfo.level]);
  


  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
  }}>
    
    
    <FormLoaders onSubmit={(e) => e.preventDefault()}>
          <FormInputSearch
            //background={colors.darkBlue}
        
            border={colors.darkBlue}
            placeholder="Live Search Using Class, Subject, Class Teacher, Staff ID, Date Assigned"
            //onChange={(e) => setSearchTerm(e.target.value)}
            style={{ '::placeholder': { color: 'white' } }}
          />
          
 </FormLoaders>

<div style={{
  display:'flex',
  flexDirection:'row',
  flexWrap:'wrap',
  gap:'1rem'
}}>

{videoList.length > 0 &&
    videoList.map((data) => (
<MovieCard>
  <video width="100%" height="70%" top="0px" onClick={()=>{
    navigate(`video/${data.id}/${data.title}`)
  }}>
    <source src={apiServer + data.slidePath} type="video/mp4" />

    Your browser does not support the video tag.
  </video>

  
  <div style={{display:"flex", flexDirection:"row"}}>
          <MenuButtonIcon ><MdTitle/></MenuButtonIcon>
          <MovieSText >{data.title} </MovieSText>
  </div>

  <div style={{display:"flex", flexDirection:"row"}}>
          <MenuButtonIcon ><RiVideoUploadLine/></MenuButtonIcon>
          <MovieSText >{data.dateAdded} </MovieSText>
</div>

<div style={{display:"flex", flexDirection:"row"}}>
          <MenuButtonIcon ><HiOutlineAcademicCap/></MenuButtonIcon>
          <MovieSText >{data.academicTerm} </MovieSText>
</div>


<div style={{display:"flex", flexDirection:"row"}}>
          <MenuButtonIcon ><AiOutlineCalendar/></MenuButtonIcon>
          <MovieSText >{data.academicYear} </MovieSText>
</div>

</MovieCard>

    ))}

</div>



    
    
    </div>
  )
}

export default Video
