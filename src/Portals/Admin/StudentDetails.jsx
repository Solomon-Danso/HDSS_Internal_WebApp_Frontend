import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ViewOneStudent, apiMedia, apiServer } from '../../Constants /Endpoints';
import { AboutHeader, BiggerImage, FormInputStudent, FormLable, HomeCardTextEvent, StudDetailData, StudDetailField, StudDetailRow, StudDetails, StudLeft, StudRight } from '../../Designs/Styles/Profile';
import { AES,enc } from 'crypto-js';
import { Show } from '../../Constants /Alerts';

const StudentDetails = () => {
    const { studentId } = useParams();
    const [theStudent, setTheStudent] = useState([])
    const [userInfo, setUserInfo] = useState({});
    const navigate = useNavigate()

    useEffect(() => {
      try{
        const encryptedData = sessionStorage.getItem("userDataEnc");
        const encryptionKey = '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK';
        const decryptedData = AES.decrypt(encryptedData, encryptionKey);
        const decryptedString = decryptedData.toString(enc.Utf8);
        const parsedData = JSON.parse(decryptedString);
          setUserInfo(parsedData);
      }catch(e){
        navigate("/")
        window.location.reload();
      }
    
    }, []);


           

      const thelink = apiMedia+theStudent?.ProfilePic

      const getOrdinalSuffix = (day) => {
        if (day >= 11 && day <= 13) {
          return "th";
        }
        switch (day % 10) {
          case 1:
            return "st";
          case 2:
            return "nd";
          case 3:
            return "rd";
          default:
            return "th";
        }
      };

      const formatMonthAbbreviation = (month) => {
        const months = [
          "Jan.", "Feb.", "Mar.", "Apr.",
          "May", "Jun.", "Jul.", "Aug.",
          "Sep.", "Oct.", "Nov.", "Dec."
        ];
        return months[month];
      };
      
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
      
        const formattedDate = `${day}${getOrdinalSuffix(day)} ${formatMonthAbbreviation(month)} ${year}`;
      
        return formattedDate;
      };


      const CompanyId = userInfo.CompanyId;
      const UserId = userInfo.UserId;
       

    useEffect(()=>{
      if(CompanyId!==undefined && UserId!==undefined){
        LoadStudent()
      }

    },[CompanyId,UserId ])
    
  
      const LoadStudent = async () => {
     
          
        Show.showLoading("Loading Students....");

        if(CompanyId!==undefined && UserId!==undefined){


          try {
            const formData = new FormData();
      
            formData.append("CompanyId", userInfo.CompanyId);
        formData.append("SenderId", userInfo.UserId);
      
      const url = `GetStudent/${studentId}/${CompanyId}/${UserId}`
        
            const response = await fetch(apiServer+url, {
              method: "GET",
            
            });
      
            const data = await response.json();
        
            if (response.ok) {
              
              Show.hideLoading();
      
              setTheStudent(data)
      
      
              
            } else {
              Show.Attention(data.message);
            }
          } catch (error) {
      
            Show.Attention(error.message);
          }
          
        } else{
          alert("CompanyId is undefined")
        }
        

      
      }

    

  return (


    <StudDetails>
        <StudLeft>
    <h2>  {theStudent?.LastName}, {theStudent?.FirstName} {theStudent?.OtherName}  </h2>
            <BiggerImage src={thelink}/>
        </StudLeft>

        <StudRight>
        <AboutHeader>About Me</AboutHeader><br/>

        <StudDetailRow>
        <StudDetailField>Student Id:</StudDetailField>
        <StudDetailData>{theStudent?.StudentId}</StudDetailData>
        </StudDetailRow>
        
        <StudDetailRow>
        <StudDetailField>Name:</StudDetailField>
        <StudDetailData>{theStudent?.LastName}, {theStudent?.FirstName} {theStudent?.OtherName}</StudDetailData>
        </StudDetailRow>

        <StudDetailRow>
        <StudDetailField>Gender:</StudDetailField>
        <StudDetailData>{theStudent?.Gender}</StudDetailData>
        </StudDetailRow>

        <StudDetailRow>
        <StudDetailField>Father Name:</StudDetailField>
        <StudDetailData>{theStudent?.FathersName}</StudDetailData>
        </StudDetailRow>
        <StudDetailRow>
        <StudDetailField>Mother Name:</StudDetailField>
        <StudDetailData>{theStudent?.MothersName}</StudDetailData>
        </StudDetailRow>

        <StudDetailRow>
        <StudDetailField>Date Of Birth:</StudDetailField>
        <StudDetailData>{formatDate(theStudent?.DateOfBirth)}</StudDetailData>
        </StudDetailRow>

        <StudDetailRow>
        <StudDetailField>Religion:</StudDetailField>
        <StudDetailData>{theStudent?.Religion}</StudDetailData>
        </StudDetailRow>

        <StudDetailRow>
        <StudDetailField>Father Occupation:</StudDetailField>
        <StudDetailData>{theStudent?.FatherOccupation}</StudDetailData>
        </StudDetailRow>

        <StudDetailRow>
        <StudDetailField>Location:</StudDetailField>
        <StudDetailData>{theStudent?.Location}, {theStudent?.ParentDigitalAddress}</StudDetailData>
        </StudDetailRow>


        <StudDetailRow>
        <StudDetailField>Class:</StudDetailField>
        <StudDetailData>{theStudent?.Level}</StudDetailData>
        </StudDetailRow>

        <StudDetailRow>
        <StudDetailField>Emergency Name:</StudDetailField>
        <StudDetailData>{theStudent?.EmergencyContactName}</StudDetailData>
        </StudDetailRow>

        <StudDetailRow>
        <StudDetailField>Emergency Phone 1:</StudDetailField>
        <StudDetailData>{theStudent?.EmergencyPhoneNumber}</StudDetailData>
        </StudDetailRow>

        <StudDetailRow>
        <StudDetailField>Emergency Phone 2:</StudDetailField>
        <StudDetailData>{theStudent?.EmergencyAlternatePhoneNumber}</StudDetailData>
        </StudDetailRow>

        </StudRight>
        
    </StudDetails>

  )
}

export default StudentDetails