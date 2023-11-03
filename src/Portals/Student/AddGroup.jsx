import React, { useEffect, useState, useRef } from 'react'
import { AdmitButton2, AddGrpCard, AddGrpCard2, AddGrpRow, FeesIconM, FeesIconN, FeesIcons, FeesRow, FormInputGrpName, FormInputStudent6, FormInputStudentM, FormLable, FormLoaders, NewStudentListCard2, PaySelector, SelectForStudent, SelectStageButton, StudCenter, StudRight, StudentInfoCard, StudentInfoCard2, StudentListResult, AddGrpBtn } from '../../Designs/Styles/Profile'

import {   ViewTeachers, apiServer } from '../../Constants /Endpoints'
import { Show } from '../../Constants /Alerts'

import { AES, enc } from 'crypto-js';
import { MdAddAPhoto, MdTitle } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { ChatImage, ChatImagePreview, ChatImageUpload, HeaderCard } from '../../Designs/Styles/HyChat'
import { BsArrowLeft } from 'react-icons/bs'
import { colors } from '../../Designs/Colors';

const StudentInfo = () => {
  

  const [isMobile, setIsMobile] = useState(false);
  const [active, setActive] = useState(null);
  const fileInputRef = useRef();

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    setActive(1);
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
  


    const [theClass2, setTheClass2] = useState([])

    const [specificRole, setspecificRole] = useState("");


    useEffect(() => {
      const spRole =  AES.decrypt(sessionStorage.getItem("SpecificRole"), '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK').toString(enc.Utf8);
      setspecificRole(spRole);
      
    }, []);
    

     


      const [theStudents, setTheStudents] = useState([])
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


      const [e,se] = useState({})
      const [f, sf] = useState("")

      const navigate = useNavigate();

      const studentDetails = async () => {
        //event.preventDefault();
    
       Show.showLoading("Processing Data");
    const URL=`api/HyChat/CreateGroup?ID=${userInfo.studentId}`
   

        try {
          const formData = new FormData();
          
           formData.append("Picture",f)
           formData.append("GroupName",inputValue)
      
          const response = await fetch(apiServer + URL, {
            method: "POST",
           
            body: formData,
          });
          if (response.ok) {
           Show.hideLoading();
           Show.Success("Group Created Successfully")
            navigate("/HyChat")
            
          } else {
            Show.Attention("All fields are required");
          }
        } catch (err) {
          Show.Attention("An error has occurred");
        }
      };
    

      const [inputValue, setInputValue] = useState('');

      const handleInputChange = (e) => {
        const newValue = e.target.value;
        if (newValue.length <= 20) {
          setInputValue(newValue);
        }
      };

      const Preview = async () => {
      
    const URL=`api/HyChat/Previewer`
   

        try {
          const formData = new FormData();
          
           formData.append("Picture",f)
         
      
          const response = await fetch(apiServer + URL, {
            method: "POST",
           
            body: formData,
          });
          const data = await response.json();
          if (response.ok) {
          se(data)
            
          } else {
            Show.Attention("Couldnot preview the image");
          }
        } catch (err) {
         
        }
      };


    useEffect(()=>{
      Preview()
    },[f])

   

  return (
    <div>
      <HeaderCard  onClick = {()=>{navigate("/HyChat")}}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '1.5rem',
          
          
        }}>
          <FeesIconN>
          <BsArrowLeft/>
          </FeesIconN>

          <div style={{
            paddingTop:'0.7rem',
          }}>Back</div>


        </div>
      </HeaderCard>



      <AddGrpCard 
      >

<AddGrpRow>

{
  e.picture==null||e.picture===undefined?(


<ChatImageUpload onClick={()=>{
      handleIconClick()
    }}>
    <FeesIconN>
    <MdAddAPhoto/>
    </FeesIconN>

    <input
    type="file"
    required
    ref={fileInputRef}
    placeholder="Select only Image files"
    accept="image/*"
    onChange={(e) => sf(e.target.files[0])}
    style={{ display: 'none' }}
   
    />
     
    </ChatImageUpload>

  
  
  ):(
  <div onClick={()=>{
    handleIconClick()
  }}>
    
  <ChatImagePreview src={apiServer + e.picture} />     
  
  <input
  type="file"
  required
  ref={fileInputRef}
  placeholder="Select only Image files"
  accept="image/*"
  onChange={(e) => sf(e.target.files[0])}
  style={{ display: 'none' }}
 
  />
  
  </div>
  
  )
} 


    <div>
    <FormInputGrpName
    type="text"
    placeholder="Group Name"
    value={inputValue}
    onChange={handleInputChange}
    required
    maxLength="20"
  />
    </div>

    <div style={{
      fontSize:'1rem',
    }}>
    {inputValue.length}/20
    </div>


</AddGrpRow>






      </AddGrpCard>

<StudCenter>

<AddGrpBtn
    background={colors.lightgreen}
    color="white"
    border={colors.maingreen}
    onClick={()=>{
      studentDetails()
    }}
    >Create 
    </AddGrpBtn>



</StudCenter>









    </div>
  )
}

export default StudentInfo
