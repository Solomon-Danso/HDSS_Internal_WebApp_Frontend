import React, { useEffect, useRef, useState} from 'react'
import { AboutHeader, AboutHeader2, AdmitButton2, AdmitStudentCard2, AdmitStudentCard3, CardTextHeader, FeesIcons, FeesRow, FormInputSearch, FormInputStudent3, FormInputStudent4, FormInputStudent6, FormLable, FormLoaders, MenuCard, NewStudentListCard2, PaySelector, SelectForStudent, SelectStageButton, StudCenter, StudRight, StudentInfoCard, StudentInfoCard2, StudentListResult,MovieCard, MovieBText, MovieSText } from '../../Designs/Styles/Profile'
import { AES,enc } from 'crypto-js';
import { apiServer } from '../../Constants /Endpoints'
import { Show } from '../../Constants /Alerts'
import { colors } from '../../Designs/Colors'
import { MenuButtonIcon, MenuButtonLink } from '../../Designs/Styles/Styles';
import { MdOutlineHeadset, MdTitle } from 'react-icons/md';
import { HiOutlineAcademicCap } from 'react-icons/hi';
import { RiEyeLine, RiVideoUploadLine } from 'react-icons/ri';
import { BsBook, BsCalendar2Date } from 'react-icons/bs';
import { AiOutlineCalendar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { GoDownload } from 'react-icons/go';
import Beauty from '../../Designs/Images/stuassi.jpg'
import { GiTimeBomb } from 'react-icons/gi';


const Slide = () => {

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

const [AssignList, setAssignList] = useState([])

const navigate = useNavigate()

  useEffect(() => {
    const URL = `api/StudentApp/Assignment?SID=${userInfo.studentId}&ClassName=${userInfo.level}`;
    if(userInfo.studentId&& userInfo.level){

      fetch(apiServer + URL) // Include credentials
      .then((response) => response.json())
      .then((data) => setAssignList(data))
      .catch((err) => console.error(err));

    }
    
      
  }, [ userInfo.studentId, userInfo.level]);
  

  const [studentList, setStudentList] = useState([])
  const [closeOther, setCloseOther] = useState(false)
const [searchResult, setSearchResult] = useState(false)
const [searchTerm, setSearchTerm] = useState()


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
    const URL = `api/Admin/StudentSearchAssignment?searchTerm=${searchTerm}&ClassName=${userInfo.level}`
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
    
    
    <FormLoaders onSubmit={(e) => e.preventDefault()}>
          <FormInputSearch
            //background={colors.darkBlue}
        
            border={colors.darkBlue}
            placeholder="Search for anything..."
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ '::placeholder': { color: 'white' } }}
          />
          
 </FormLoaders>

<div style={{
  display:'flex',
  flexDirection:'row',
  flexWrap:'wrap',
  gap:'1rem'
}}>




{searchResult && (
          <>
          {studentList.length > 0 &&
    studentList.map((data) => (
<MovieCard onClick={()=>{
   navigate(`/student/assignments/${data.id}`)
  }}>
 
    <img src={Beauty} width="100%" height="55%" top="0px" alt={"Click Me"}/>
   

    <div style={{display:"flex", flexDirection:"row"}}>
          <MenuButtonIcon ><BsBook/></MenuButtonIcon>
          <MovieSText >{data?.subjectName} </MovieSText>
  </div>
  
  <div style={{display:"flex", flexDirection:"row"}}>
          <MenuButtonIcon ><MdTitle/></MenuButtonIcon>
          <MovieSText >{data?.title} </MovieSText>
  </div>

  <div style={{display:"flex", flexDirection:"row"}}>
          <MenuButtonIcon ><GiTimeBomb/></MenuButtonIcon>
          <MovieSText >{formatDateTime(data?.deadline)} </MovieSText>
</div>

<div style={{display:"flex", flexDirection:"row"}}>
          <MenuButtonIcon ><HiOutlineAcademicCap/></MenuButtonIcon>
          <MovieSText >{data?.academicTerm} </MovieSText>
</div>


<div style={{display:"flex", flexDirection:"row"}}>
          <MenuButtonIcon ><AiOutlineCalendar/></MenuButtonIcon>
          <MovieSText >{data?.academicYear} </MovieSText>
</div>

</MovieCard>

    ))}
          </>
        )}


{
  closeOther? (
  <>
  
  </>
  ):(
  
  <>
  
  {AssignList.length > 0 &&
    AssignList.map((data) => (
<MovieCard onClick={()=>{
   navigate(`/student/assignments/${data.id}`)
  }}>
 
    <img src={Beauty} width="100%" height="55%" top="0px" alt={"Click Me"}/>
   

    <div style={{display:"flex", flexDirection:"row"}}>
          <MenuButtonIcon ><BsBook/></MenuButtonIcon>
          <MovieSText >{data?.subjectName} </MovieSText>
  </div>
  
  <div style={{display:"flex", flexDirection:"row"}}>
          <MenuButtonIcon ><MdTitle/></MenuButtonIcon>
          <MovieSText >{data?.title} </MovieSText>
  </div>

  <div style={{display:"flex", flexDirection:"row"}}>
          <MenuButtonIcon ><GiTimeBomb/></MenuButtonIcon>
          <MovieSText >{formatDateTime(data?.deadline)} </MovieSText>
</div>

<div style={{display:"flex", flexDirection:"row"}}>
          <MenuButtonIcon ><HiOutlineAcademicCap/></MenuButtonIcon>
          <MovieSText >{data?.academicTerm} </MovieSText>
</div>


<div style={{display:"flex", flexDirection:"row"}}>
          <MenuButtonIcon ><AiOutlineCalendar/></MenuButtonIcon>
          <MovieSText >{data?.academicYear} </MovieSText>
</div>

</MovieCard>

    ))}

  
  </>)  
}



</div>















    
    
    </div>
  )
}

export default Slide
