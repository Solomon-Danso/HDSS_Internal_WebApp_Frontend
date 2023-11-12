import React, { useEffect, useState, useRef } from 'react'
import { AdmitButton2, AddGrpCard, AddGrpCard2, AddGrpRow, FeesIconM, FeesIconN, FeesIcons, FeesRow, FormInputGrpName, FormInputStudent6, FormInputStudentM, FormLable, FormLoaders, NewStudentListCard2, PaySelector, SelectForStudent, SelectStageButton, StudCenter, StudRight, StudentInfoCard, StudentInfoCard2, StudentListResult, AddGrpBtn, ChatUploader } from '../../Designs/Styles/Profile'

import {   ViewTeachers, apiServer } from '../../Constants /Endpoints'
import { Show } from '../../Constants /Alerts'

import { AES, enc } from 'crypto-js';
import { MdAddAPhoto, MdTitle } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import { ChatImage, ChatImagePreview, ChatImageUpload, ChatUploads, HeaderCard } from '../../Designs/Styles/HyChat'
import { BsArrowLeft, BsFillSendCheckFill } from 'react-icons/bs'
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


      
      const [f, sf] = useState("")

      const navigate = useNavigate();

      const studentDetails = async () => {
        //event.preventDefault();
    
       Show.showLoading("Processing Data");
    const URL = `api/HyChat/Document?ID=${userInfo.studentId}&GID=${Id}`

        try {
          const formData = new FormData();
          
           formData.append("File",f)
          
      
          const response = await fetch(apiServer + URL, {
            method: "POST",
           
            body: formData,
          });
          if (response.ok) {
           Show.hideLoading();
          
            navigate(`/HyChat/${Id}`)
            
          } else {
            Show.Attention("All fields are required");
          }
        } catch (err) {
          Show.Attention("An error has occurred");
        }
      };
    

    
    const {Id} = useParams();


   

  return (
    <div>
      <HeaderCard  onClick = {()=>{navigate(`/HyChat/${Id}`)}}>
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

<ChatUploader
        type="file"
        required
        placeholder="Select only PDF files"
        accept=".pdf, .docs, .txt, .md, .docx "
        onChange={(e) => sf(e.target.files[0])}
       
        />

<div style={{width:"10%",paddingTop:"1.5rem",paddingRight:"0.5rem"}} onClick={()=>{studentDetails()}}><BsFillSendCheckFill/></div>


</AddGrpRow>






      </AddGrpCard>










    </div>
  )
}

export default StudentInfo
