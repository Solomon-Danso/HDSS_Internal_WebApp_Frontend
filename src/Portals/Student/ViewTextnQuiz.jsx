import React, { useEffect, useRef, useState} from 'react'
import { AboutHeader, AboutHeader2, AdmitButton2, AdmitStudentCard2, AdmitStudentCard3, CardTextHeader, FeesIcons, FeesRow, FormInputSearch, FormInputStudent3, FormInputStudent4, FormInputStudent6, FormLable, FormLoaders, MenuCard, NewStudentListCard2, PaySelector, SelectForStudent, SelectStageButton, StudCenter, StudRight, StudentInfoCard, StudentInfoCard2, StudentListResult,MovieCard, MovieBText, MovieSText } from '../../Designs/Styles/Profile'
import { AES,enc } from 'crypto-js';
import { apiServer } from '../../Constants /Endpoints'
import { Show } from '../../Constants /Alerts'
import { colors } from '../../Designs/Colors'
import { MenuButtonIcon, MenuButtonLink } from '../../Designs/Styles/Styles';
import { MdTitle } from 'react-icons/md';
import { HiOutlineAcademicCap } from 'react-icons/hi';
import { RiEyeLine, RiVideoUploadLine } from 'react-icons/ri';
import { BsCalendar2Date } from 'react-icons/bs';
import { AiOutlineCalendar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { GoDownload } from 'react-icons/go';
import { GiDuration, GiTimeBomb } from 'react-icons/gi';



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

const [QuizGroup, setQuizGroup] = useState([])

const navigate = useNavigate()

  useEffect(() => {
    const URL = `api/StudentApp/ViewTestnQuiz?level=${userInfo.level}&studentId=${userInfo.studentId}`;
    
    fetch(apiServer + URL) 
      .then((response) => response.json())
      .then((data) => setQuizGroup(data))
      .catch((err) => console.error(err));
  },);
  

const formatDateTime = (dateTime) => {
   
    const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(dateTime).toLocaleString('en-US', options);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
  }}>
    

<div style={{
  display:'flex',
  flexDirection:'row',
  flexWrap:'wrap',
  gap:'1rem'
}}>



{QuizGroup.length > 0 &&
    QuizGroup.map((data, index) => (
<MovieCard key={index}
onClick={()=>{navigate(`/student/testnquizzes/${data.quizId}`)}}
>

  
  <div style={{display:"flex", flexDirection:"row"}}>
          <MenuButtonIcon ><MdTitle/></MenuButtonIcon>
          <MovieSText >{data.subject} </MovieSText>
  </div>

  <div style={{display:"flex", flexDirection:"row"}}>
          <MenuButtonIcon ><GiTimeBomb color={colors.icon}/></MenuButtonIcon>
          <MovieSText >{formatDateTime(data.deadline)} </MovieSText>
</div>

<div style={{display:"flex", flexDirection:"row"}}>
          <MenuButtonIcon ><GiDuration/></MenuButtonIcon>
          <MovieSText >{data.duration} minutes</MovieSText>
</div>


</MovieCard>

    ))}



</div>















    
    
    </div>
  )
}

export default Video
