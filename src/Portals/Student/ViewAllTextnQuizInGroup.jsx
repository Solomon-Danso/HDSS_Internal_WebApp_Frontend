import React, { useEffect, useRef, useState} from 'react'
import { AboutHeader, AboutHeader2, QuizButton, AdmitStudentCard2, AdmitStudentCard3, CardTextHeader, FeesIcons, FeesRow, FormInputSearch, FormInputStudent3, FormInputStudent4, FormInputStudent6, FormLable, FormLoaders, MenuCard, NewStudentListCard2, PaySelector, SelectForStudent, SelectStageButton, StudCenter, StudRight, StudentInfoCard, StudentInfoCard2, StudentListResult,MovieCard, MovieBText, QuizSText, RadioSelect, QuizSMark } from '../../Designs/Styles/Profile'
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
import { useNavigate, useParams } from 'react-router-dom';
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


const navigate = useNavigate()
const {Id} = useParams()

  useEffect(() => {
    const URL = `api/StudentApp/ViewTestnQuizAllQuestion?level=${userInfo.level}&quizid=${Id}&studentId=${userInfo.studentId}`;
   
        fetch(apiServer + URL) 
        .then((response) => response.json())
        .then((data) => setQuizGroup(data))
        .catch((err) => console.error(err));
    

    
  },[userInfo.level,Id,userInfo.studentId]);


  

  const [QuizGroup, setQuizGroup] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);


  // Function to handle moving to the next question
  const handleNextQuestion = async (qid) => {

    const URL=`api/StudentApp/TestnQuizMarking?questionId=${qid}&quizid=${Id}&studentId=${userInfo.studentId}&answer=${answer}`

    try {
        const response = await fetch(apiServer + URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set the Content-Type header
          },
          
          
        });
        const data = await response.text();
        if (response.ok) {
            if (currentQuestionIndex < QuizGroup.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
              }
              else if (currentQuestionIndex === QuizGroup.length - 1){
                  navigate("/student/testnquizzes")
                  window.location.reload()
          
              }
          
        } else {
          Show.Attention(data);
        }
      } catch (err) {
        Show.Attention("An error has occurred");
      }


   
       
    
  };

  // Function to handle moving to the previous question
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };






const [answer, setAnswer] = useState("")

const [theTimer, setTheTimer] = useState({})

useEffect(() => {
    const fetchData = async () => {
      const URL = `api/StudentApp/GetTimer?QuizId=${Id}&StudentId=${userInfo.studentId}`;
      try {
        const response = await fetch(apiServer + URL);
        const data = await response.json();
        if(data.timeLeft<1){
            navigate("/student/testnquizzes")
        }
        setTheTimer(data);
       
      } catch (error) {
        console.error(error);
      }
    };

   fetchData()
  },);





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


<div>
    You have {theTimer.timeLeft} {theTimer.timeLeft<2?"minute":"minutes"} left
</div>



{QuizGroup.length > 0 &&
    QuizGroup.map((data, index) => (
<MovieCard key={index} style={{ display: index === currentQuestionIndex ? 'block' : 'none' }}
>

<QuizSMark>[{data.designatedMarks}{" "}{data.designatedMarks>1?<>marks</>:<>mark</>} ] </QuizSMark>

  <div style={{display:"flex", flexDirection:"row"}}>
          <QuizSText >{data.question} </QuizSText>
            </div>

  <div style={{display:"flex", flexDirection:"column", padding:"1rem"}}>
          
  {
   data.optionA.length<1?(<></>):(
    <div style={{display:"flex", flexDirection:"row"}}>
  <RadioSelect
              type="radio"
              name="options"
              value="A"
              
              onChange={(e)=>setAnswer(e.target.value)}
            />
          <QuizSText >{data.optionA} </QuizSText>
</div>
   ) 
}

{
   data.optionB.length<1?(<></>):(
    <div style={{display:"flex", flexDirection:"row"}}>
  <RadioSelect
              type="radio"
              name="options"
              value="B"
              onChange={(e)=>setAnswer(e.target.value)}
            />
          <QuizSText >{data.optionB} </QuizSText>
</div>
   ) 
}

{
   data.optionC.length<1?(<></>):(
    <div style={{display:"flex", flexDirection:"row"}}>
  <RadioSelect
              type="radio"
              name="options"
              value="C"
              onChange={(e)=>setAnswer(e.target.value)}
            />
          <QuizSText >{data.optionC} </QuizSText>
</div>
   ) 
}


{
   data.optionD.length<1?(<></>):(
    <div style={{display:"flex", flexDirection:"row"}}>
  <RadioSelect
              type="radio"
              name="options"
              value="D"
              onChange={(e)=>setAnswer(e.target.value)}
            />
          <QuizSText >{data.optionD} </QuizSText>
</div>
   ) 
}


{
   data.optionE.length<1?(<></>):(
    <div style={{display:"flex", flexDirection:"row"}}>
  <RadioSelect
              type="radio"
              name="options"
              value="E"
              
              onChange={(e)=>setAnswer(e.target.value)}
            />
          <QuizSText >{data.optionE} </QuizSText>
</div>
   ) 
}



  </div>



<div style={{display:"flex", flexDirection:"row", justifyContent:'space-between'}}>


        <QuizButton
        background={colors.mainsecondgreen}
        color="white"
        border={colors.maingreen}
        onClick={()=>{
            handleNextQuestion(data.questionId)
        }}
        >{
            currentQuestionIndex === QuizGroup.length - 1?"Submit":"Next" 
        }
        </QuizButton>
       
       
      </div>












</MovieCard>

    ))}







</div>















    
    
    </div>
  )
}

export default Video
