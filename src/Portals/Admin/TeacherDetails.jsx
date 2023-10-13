import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ViewOneStudent, apiServer } from '../../Constants /Endpoints';
import { AboutHeader, BiggerImage, BiggerImage2, BiggerImage3, BiggerImage4, FormInputStudent, FormLable, HomeCardTextEvent, StudDetailData, StudDetailField, StudDetailRow, StudDetails, StudLeft, StudRight } from '../../Designs/Styles/Profile';
import { AES,enc } from 'crypto-js';
import { Document, Page } from 'react-pdf';

const StudentDetails = () => {
    const { teacherId } = useParams();
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
        const url = `api/Teacher/getOneTeacher?StaffID=${teacherId}&ID=${userInfo.staffID}`

        fetch(apiServer + url)
          .then(response => response.json()) // Parse the response as JSON
          .then(data => setTheStudent(data))
          .catch(error => console.error(error));
      }, [teacherId, userInfo.staffID]);
           

      const thelink = apiServer+theStudent?.filePath

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

<div style={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
}}>
    <StudDetails>
        <StudLeft>
    <h2>  {theStudent?.lastName}, {theStudent?.firstName} {theStudent?.otherName}  </h2>
            <BiggerImage3 src={thelink}/>
        </StudLeft>

        <StudRight>
        <AboutHeader>About Me</AboutHeader><br/>

        <StudDetailRow>
        <StudDetailField>Staff Id:</StudDetailField>
        <StudDetailData>{theStudent?.staffID}</StudDetailData>
        </StudDetailRow>

        <StudDetailRow>
        <StudDetailField>Title:</StudDetailField>
        <StudDetailData>{theStudent?.title}</StudDetailData>
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
        <StudDetailField>Marital Status:</StudDetailField>
        <StudDetailData>{theStudent?.maritalStatus}</StudDetailData>
        </StudDetailRow>
        <StudDetailRow>
        <StudDetailField>Location:</StudDetailField>
        <StudDetailData>{theStudent?.location}</StudDetailData>
        </StudDetailRow>

        <StudDetailRow>
        <StudDetailField>Date Of Birth:</StudDetailField>
        <StudDetailData>{formatDate(theStudent?.dateOfBirth)}</StudDetailData>
        </StudDetailRow>

        <StudDetailRow>
        <StudDetailField>Country:</StudDetailField>
        <StudDetailData>{theStudent?.country}</StudDetailData>
        </StudDetailRow>


        <StudDetailRow>
        <StudDetailField>Location:</StudDetailField>
        <StudDetailData>{theStudent?.location}, {theStudent?.parentDigitalAddress}</StudDetailData>
        </StudDetailRow>


        <StudDetailRow>
        <StudDetailField>Education Level:</StudDetailField>
        <StudDetailData>{theStudent?.education}</StudDetailData>
        </StudDetailRow>

        <StudDetailRow>
        <StudDetailField>Teaching Experience:</StudDetailField>
        <StudDetailData>{theStudent?.teachingExperience}</StudDetailData>
        </StudDetailRow>

        <StudDetailRow>
        <StudDetailField>Tax Number:</StudDetailField>
        <StudDetailData>{theStudent?.taxNumber}</StudDetailData>
        </StudDetailRow>

        <StudDetailRow>
        <StudDetailField>SSNIT Number:</StudDetailField>
        <StudDetailData>{theStudent?.ssnitNumber}</StudDetailData>
        </StudDetailRow>


        <StudDetailRow>
        <StudDetailField>Health Status:</StudDetailField>
        <StudDetailData>{theStudent?.healthStatus}</StudDetailData>
        </StudDetailRow>

        <StudDetailRow>
        <StudDetailField>Emergency Contacts:</StudDetailField>
        <StudDetailData>{theStudent?.emergencyContacts}</StudDetailData>
        </StudDetailRow>



        <StudDetailRow>
        <StudDetailField>Emergency Phone :</StudDetailField>
        <StudDetailData>{theStudent?.emergencyPhone}</StudDetailData>
        </StudDetailRow>

        <StudDetailRow>
        <StudDetailField>Salary:</StudDetailField>
        <StudDetailData>{theStudent?.salary}</StudDetailData>
        </StudDetailRow>



        <StudDetailRow>
        <StudDetailField>Position:</StudDetailField>
        <StudDetailData>{theStudent?.position}</StudDetailData>
        </StudDetailRow>

        <StudDetailRow>
        <StudDetailField>Employment Date:</StudDetailField>
        <StudDetailData>{theStudent?.startDate}</StudDetailData>
        </StudDetailRow>




        </StudRight>



        
    </StudDetails>
    
    
    <StudDetails>
    <StudLeft>
        
    <iframe
          title="PDF Viewer"
          src={apiServer + theStudent.certPath}
          width="850px"
          height="850px"
        />
        
    </StudLeft> 

    <StudRight>
<BiggerImage4 src={apiServer + theStudent.idCards}/>
    </StudRight>
    </StudDetails>
    
    </div>
  )
}

export default StudentDetails