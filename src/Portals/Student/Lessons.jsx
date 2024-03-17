import React, { useEffect, useState } from 'react'
import { AboutHeader, AboutHeader2, AdmitButton2, AdmitStudentCard2, AdmitStudentCard3, CardTextHeader, FeesIcons, FeesIconsS, FeesRow, FormInputSearch, FormInputStudent3, FormInputStudent4, FormInputStudent6, FormLable, FormLoaders, NewStudentListCard2, PaySelector, PaySelectorS, SelectForStudent, SelectStageButton, StudCenter, StudRight, StudentInfoCard, StudentInfoCard2, StudentListResult } from '../../Designs/Styles/Profile'
import  Video  from './Video'
import  Audio  from './Audio'
import  Picture  from './Picture'
import  Slide  from './Slide'
import  Book  from './Book'

import { apiServer } from '../../Constants /Endpoints'
import { Show } from '../../Constants /Alerts'
import { colors } from '../../Designs/Colors'

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
        
         
            const URL=`api/LMS/viewAllSubjectStudent?ClassName=${userInfo.level}&ID=${userInfo.studentId}`
            fetch(apiServer + URL)
              .then(response => response.json()) // Parse the response as JSON
              .then(data => setTheClass(data))
              .catch(error => console.error(error));
       
      
      }, [userInfo]);
     
      

  



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
    
const [video, setvideo] = useState(false);
const [audio, setaudio] = useState(false);
const [picture, setpicture] = useState(false);
const [slide, setslide] = useState(false);
const [book, setbook] = useState(false);

const [videoList, setvideoList] = useState([]);
const [audioList, setaudioList] = useState([]);
const [pictureList, setpictureList] = useState([]);
const [slideList, setslideList] = useState([]);

const TheFalser = () =>{
    setvideo(false)
    setaudio(false)
    setpicture(false)
    setslide(false)
    setbook(false)
}

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




const VideoFunction =  async () => {
    const URL=`api/StudentApp/Video?SID=${userInfo.studentId}&ClassName=${userInfo.level}&Subject=${d}`
      Show.showLoading("Loading Videos")

    try {
      const response = await fetch(apiServer + URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json(); // Parsing the JSON data

      if (data && data.length > 0) {
        Show.hideLoading();
        setvideoList(data);
        TheFalser();
        setvideo(true);
      } else {
        TheFalser();
      }
    } catch (err) {
      Show.Attention("An error has occurred.");
    }

}

const BookFunction =  async () => {
  const URL=`api/StudentApp/Book?SID=${userInfo.studentId}&ClassName=${userInfo.level}&Subject=${d}`
    Show.showLoading("Loading Books")

  try {
    const response = await fetch(apiServer + URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json(); // Parsing the JSON data

    if (data && data.length > 0) {
      Show.hideLoading();
      setvideoList(data);
      TheFalser();
      setbook(true);
    } else {
      TheFalser();
    }
  } catch (err) {
    Show.Attention("An error has occurred.");
  }

}



const AudioFunction =  async () => {
    const URL=`api/StudentApp/Audio?SID=${userInfo.studentId}&ClassName=${userInfo.level}&Subject=${d}`
      Show.showLoading("Loading Audios")

    try {
      const response = await fetch(apiServer + URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json(); // Parsing the JSON data

      if (data && data.length > 0) {
        Show.hideLoading();
        setaudioList(data);
        TheFalser();
        setaudio(true);
      } else {
        TheFalser();
      }
    } catch (err) {
      Show.Attention("An error has occurred.");
    }

}


const PictureFunction =  async () => {
    const URL=`api/StudentApp/Picture?SID=${userInfo.studentId}&ClassName=${userInfo.level}&Subject=${d}`
      Show.showLoading("Loading Pictures")

    try {
      const response = await fetch(apiServer + URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json(); // Parsing the JSON data

      if (data && data.length > 0) {
        Show.hideLoading();
        setpictureList(data);
        TheFalser();
        setpicture(true);
      } else {
        TheFalser();
      }
    } catch (err) {
      Show.Attention("An error has occurred.");
    }

}

const SlideFunction =  async () => {
    const URL=`api/StudentApp/Slide?SID=${userInfo.studentId}&ClassName=${userInfo.level}&Subject=${d}`
      Show.showLoading("Loading Slides")

    try {
      const response = await fetch(apiServer + URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json(); // Parsing the JSON data

      if (data && data.length > 0) {
        Show.hideLoading();
        setslideList(data);
        TheFalser();
        setslide(true);
      } else {
        TheFalser();
      }
    } catch (err) {
      Show.Attention("An error has occurred.");
    }

}





    
                
useEffect(()=>{
    if(c==="Video"){
        VideoFunction();
    }
    else if(c==="Audio"){
        AudioFunction();
    }

    else if(c==="Picture"){
        PictureFunction();
    }
    else if(c==="Slide"){
        SlideFunction();
    }
    else if(c==="Book"){
      BookFunction();
  }
    else if(c==="Select Resource"){
        Show.Attention("Please select a resource")
    }


},[d,c])






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

{
    isMobile?(
    <>
    <FeesRow>
<FeesIconsS>
<BsBook color={colors.icon}/>
</FeesIconsS>
       <PaySelectorS
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

    </PaySelectorS>
</FeesRow>


<FeesRow>
<FeesIconsS>
<BiBookReader color={colors.icon}/>
</FeesIconsS>
       <PaySelectorS
    background={colors.darkBlue}
    color="white"
    border={colors.darkBlue}
    onChange={(e) => sc(e.target.value)}
    required
    >
        <option >Select Resource</option>
        <option>Video</option>
        <option>Audio</option>
        <option>Picture</option>
        <option>Slide</option>
        <option>Book</option>
        
    

    </PaySelectorS>
</FeesRow>
    </>):(
    <>
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
        <option >Select Resource</option>
        <option>Video</option>
        <option>Audio</option>
        <option>Picture</option>
        <option>Slide</option>
        <option>Book</option>
        
    

    </PaySelector>
</FeesRow>
    </>)
}



  </div>










{
    video?(
    <>
 
 {
    isMobile?(
    <>
   <Video subject={d}/>
    </>
    ):(
    <>
    <Video subject={d}/>
    </>)
 }
    
    
    </>):(<></>)
}

{
    audio?(
    <>
 
 {
    isMobile?(
    <>
    <Audio subject={d}/>
    </>
    ):(
    <>
    <Audio subject={d}/>
    </>)
 }
    
    </>):(<></>)
}

{
    picture?(
    <>
 
 {
    isMobile?(
    <>
    <Picture subject={d}/>
    </>
    ):(
    <>
    <Picture subject={d}/>
    </>)
 }
    
    </>):(<></>)
}

{
    slide?(
    <>
 
 {
    isMobile?(
    <>
   <Slide subject={d}/>
    </>
    ):(
    <>
    <Slide subject={d}/>
    </>)
 }
    
    </>):(<></>)
}

{
    book?(
    <>
 
 {
    isMobile?(
    <>
   <Book subject={d}/>
    </>
    ):(
    <>
    <Book subject={d}/>
    </>)
 }
    
    </>):(<></>)
}








</StudentInfoCard2>


    </div>
  )
}

export default StudentInfo