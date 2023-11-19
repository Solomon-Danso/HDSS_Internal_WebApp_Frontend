import React, { useEffect, useRef, useState} from 'react'
import { AboutHeader, AboutHeader2, AdmitButton2, AdmitStudentCard2, AdmitStudentCard3, CardTextHeader, FeesIcons, FeesRow, FormInputSearch, FormInputStudent3, FormInputStudent4, FormInputStudent6, FormLable, FormLoaders, MenuCard, NewStudentListCard2, PaySelector, SelectForStudent, SelectStageButton, StudCenter, StudRight, StudentInfoCard, StudentInfoCard2, StudentListResult,MovieCard, MovieBText, QuizSText } from '../../Designs/Styles/Profile'
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
  },);


  

  const [QuizGroup, setQuizGroup] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    // Fetch quiz questions data
    const URL = `api/StudentApp/ViewTestnQuizAllQuestion?level=${userInfo.level}&quizid=${Id}&studentId=${userInfo.studentId}`;
    fetch(apiServer + URL)
      .then((response) => response.json())
      .then((data) => setQuizGroup(data))
      .catch((err) => console.error(err));
  }, [userInfo.level, userInfo.studentId]);

  // Function to handle moving to the next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < QuizGroup.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Function to handle moving to the previous question
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };






const formatDateTime = (dateTime) => {
   
    const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(dateTime).toLocaleString('en-US', options);
  };



  




  return (
  

<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '1rem' }}>
        {QuizGroup.length > 0 &&
          QuizGroup.map((data, index) => (
            <MovieCard key={index} style={{ display: index === currentQuestionIndex ? 'block' : 'none' }}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <QuizSText>{data.question}</QuizSText>
              </div>
              {/* Render options as radio buttons */}
              {['optionA', 'optionB', 'optionC', 'optionD', 'optionE'].map((optionKey) => (
                data[optionKey] && (
                  <div key={optionKey} style={{ display: 'flex', flexDirection: 'row' }}>
                    <input type="radio" name="options" value={optionKey} />
                    <QuizSText>{data[optionKey]}</QuizSText>
                  </div>
                )
              ))}
            </MovieCard>
          ))}
      </div>

      {/* Next and Previous buttons for navigation */}
      <div>
        <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
          Previous
        </button>
        <button onClick={handleNextQuestion} disabled={currentQuestionIndex === QuizGroup.length - 1}>
          Next
        </button>
      </div>
    </div>





  )
}

export default Video
