import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ViewOneStudent, apiServer } from '../../Constants /Endpoints';
import { AboutHeader, BiggerImage, FormInputStudent, FormLable, HomeCardTextEvent, StudDetailData, StudDetailField, StudDetailRow, StudDetails, StudLeft, StudRight } from '../../Designs/Styles/Profile';
import { AES,enc } from 'crypto-js';

const StudentDetails = () => {
    const { studentId } = useParams();
    const [theStudent, setTheStudent] = useState([])
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
      const encryptedData = sessionStorage.getItem("userDataEnc");
      const encryptionKey = '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK';
      const decryptedData = AES.decrypt(encryptedData, encryptionKey);
      const decryptedString = decryptedData.toString(enc.Utf8);
      const parsedData = JSON.parse(decryptedString);
        setUserInfo(parsedData);
    }, []);


      useEffect(() => {
        fetch(apiServer + ViewOneStudent+studentId+"&ID="+userInfo.staffID)
          .then(response => response.json()) // Parse the response as JSON
          .then(data => setTheStudent(data))
          .catch(error => console.error(error));
      }, [studentId, userInfo.staffID]);
           

      const thelink = apiServer+theStudent?.profilePic

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
    

  return (


    <StudDetails>
        <StudLeft>
    <h2>  {theStudent?.lastName}, {theStudent?.firstName} {theStudent?.otherName}  </h2>
            <BiggerImage src={thelink}/>
        </StudLeft>

        <StudRight>
        <AboutHeader>About Me</AboutHeader><br/>

        <StudDetailRow>
        <StudDetailField>Student Id:</StudDetailField>
        <StudDetailData>{theStudent?.studentId}</StudDetailData>
        </StudDetailRow>
        
        <StudDetailRow>
        <StudDetailField>Name:</StudDetailField>
        <StudDetailData>{theStudent?.lastName}, {theStudent?.firstName} {theStudent?.otherName}</StudDetailData>
        </StudDetailRow>

        <StudDetailRow>
        <StudDetailField>Gender:</StudDetailField>
        <StudDetailData>{theStudent?.gender}</StudDetailData>
        </StudDetailRow>

        <StudDetailRow>
        <StudDetailField>Father Name:</StudDetailField>
        <StudDetailData>{theStudent?.fathersName}</StudDetailData>
        </StudDetailRow>
        <StudDetailRow>
        <StudDetailField>Mother Name:</StudDetailField>
        <StudDetailData>{theStudent?.mothersName}</StudDetailData>
        </StudDetailRow>

        <StudDetailRow>
        <StudDetailField>Date Of Birth:</StudDetailField>
        <StudDetailData>{formatDate(theStudent?.dateOfBirth)}</StudDetailData>
        </StudDetailRow>

        <StudDetailRow>
        <StudDetailField>Religion:</StudDetailField>
        <StudDetailData>{theStudent?.religion}</StudDetailData>
        </StudDetailRow>

        <StudDetailRow>
        <StudDetailField>Father Occupation:</StudDetailField>
        <StudDetailData>{theStudent?.fatherOccupation}</StudDetailData>
        </StudDetailRow>

        <StudDetailRow>
        <StudDetailField>Location:</StudDetailField>
        <StudDetailData>{theStudent?.location}, {theStudent?.parentDigitalAddress}</StudDetailData>
        </StudDetailRow>


        <StudDetailRow>
        <StudDetailField>Class:</StudDetailField>
        <StudDetailData>{theStudent?.level}</StudDetailData>
        </StudDetailRow>

        <StudDetailRow>
        <StudDetailField>Emergency Name:</StudDetailField>
        <StudDetailData>{theStudent?.emergencyContactName}</StudDetailData>
        </StudDetailRow>

        <StudDetailRow>
        <StudDetailField>Emergency Phone 1:</StudDetailField>
        <StudDetailData>{theStudent?.emergencyPhoneNumber}</StudDetailData>
        </StudDetailRow>

        <StudDetailRow>
        <StudDetailField>Emergency Phone 2:</StudDetailField>
        <StudDetailData>{theStudent?.emergencyAlternatePhoneNumber}</StudDetailData>
        </StudDetailRow>

        </StudRight>
        
    </StudDetails>

  )
}

export default StudentDetails