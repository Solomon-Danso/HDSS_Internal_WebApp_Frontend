import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { PayFees, PaymentHis, ViewOneStudent, apiServer } from '../../Constants /Endpoints';
import { AboutHeader, AdmitButton2, AdmitStudentCard, AdmitStudentCard2, AdmitStudentRole, AssignmentInfoCard, BiggerImage, BiggerImage2, CardTextActionHeader, CardTextBillHeader, CardTextCreditHeader, CardTextDateHeader, CardTextHeader, CardTextPayHeader, FeesIcons, FeesIconsS, FeesRow, FormInputStudent, FormInputStudent2, FormInputStudent3, FormInputStudent4, FormLable, HomeCardTextEvent, NewStudentListCard2, PaySelector, SelectForStudentRel, StudDetailData, StudDetailField, StudDetailRow, StudDetails, StudLeft, StudRight } from '../../Designs/Styles/Profile';
import { colors } from '../../Designs/Colors';
import { Show } from '../../Constants /Alerts';
import { MdPerson } from "react-icons/md";
import {HiIdentification } from "react-icons/hi";
import {BsMortarboard} from "react-icons/bs";
import {GiMoneyStack,GiTakeMyMoney } from "react-icons/gi";
import {RiSecurePaymentFill } from "react-icons/ri";
import { AES, enc } from 'crypto-js';
import {FaGooglePay } from "react-icons/fa";
import { HeaderText } from '../../Designs/Styles/HyChat';



const StudentDetails = () => {


  const handleGeneratePDF = async (PayId) => {
    try {
     
      const URL = `api/ThePDFS/FeesPayment?Id=${theStudent.studentId}&PayId=${PayId}`
      // Send a request to the backend to generate the PDF
      const response = await fetch(apiServer + URL, {
        method: 'GET',
      });
  
      if (response.ok) {
        // Convert the response to a blob
        const blob = await response.blob();
  
        // Create a URL for the blob
        const url = window.URL.createObjectURL(blob);
  
        // Create an anchor element to trigger the download
        const a = document.createElement('a');
        a.href = url;
        a.download = `${theStudent?.firstName}_${theStudent?.lastName}.pdf`
        document.body.appendChild(a);
        a.click();
  
        // Clean up the URL and remove the anchor element
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        


      } else {
        // Handle HTTP error responses
        console.error('HTTP Error:', response.status, response.statusText);
      }
    } catch (error) {
      // Handle other errors (e.g., network issues)
      console.error('Error generating PDF:', error);
    } finally {
      Show.hideLoading();
      Show.Success("Payment made successfully");
            window.location.reload();
    }
  };
  



    const { studentId } = useParams();
    const [theStudent, setTheStudent] = useState([])
    const [His, setHis] = useState([])

     

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
        fetch(apiServer + PaymentHis+userInfo.studentId)
          .then(response => response.json()) // Parse the response as JSON
          .then(data => setHis(data))
          .catch(error => console.error(error));
      }, [userInfo.studentId]);
     

     
      
     
    

  return (
<>




{
    His.map((data)=>(
        




        < AssignmentInfoCard>
    
    <div>

    <FeesRow>
<FeesIconsS>
<CardTextHeader>Opening Balance</CardTextHeader>
</FeesIconsS>
       <HeaderText> {
   data?.openingBalance > 0
      ? <CardTextBillHeader>{data?.openingBalance}</CardTextBillHeader>
      : <CardTextCreditHeader>{data?.openingBalance*-1}</CardTextCreditHeader>  
  }
  </HeaderText>
</FeesRow>




<FeesRow>
<FeesIconsS>
<CardTextHeader>Amount Paid</CardTextHeader>
</FeesIconsS>


       <HeaderText> {
   data?.transaction > 0
      ? <CardTextPayHeader>{data?.transaction}</CardTextPayHeader>
      : <CardTextHeader>{data?.transaction}</CardTextHeader>  
  }
  </HeaderText>
</FeesRow>


<FeesRow>
<FeesIconsS>
<CardTextHeader>Closing Balance</CardTextHeader>
</FeesIconsS>
       <HeaderText>{
   data?.closingBalance > 0
      ? <CardTextBillHeader>{data?.closingBalance}</CardTextBillHeader>
      : <CardTextCreditHeader>{data?.closingBalance*-1}</CardTextCreditHeader>  
  }
  </HeaderText>
</FeesRow>



<FeesRow>
<FeesIconsS>
<CardTextHeader>Bills</CardTextHeader>
</FeesIconsS>
       <HeaderText>{data?.bills}</HeaderText>
</FeesRow>


<FeesRow>
<FeesIconsS>
<CardTextHeader>Action </CardTextHeader>
</FeesIconsS>
       <HeaderText>{data?.action}</HeaderText>
</FeesRow>



<FeesRow>
<FeesIconsS>
<CardTextHeader>Academic Year</CardTextHeader>
</FeesIconsS>
       <HeaderText>{data?.academicYear}</HeaderText>
</FeesRow>

<FeesRow>
<FeesIconsS>
<CardTextHeader>Academic Term</CardTextHeader>
</FeesIconsS>
       <HeaderText>{data?.academicTerm}</HeaderText>
</FeesRow>

<FeesRow>
<FeesIconsS>
<CardTextHeader>Level</CardTextHeader>
</FeesIconsS>
       <HeaderText>{data?.level}</HeaderText>
</FeesRow>

<FeesRow>
<FeesIconsS>
<CardTextHeader>Date</CardTextHeader>
</FeesIconsS>
       <HeaderText>{data?.transactionDate}</HeaderText>
</FeesRow>   
        
        
     </div>
  
    
    </AssignmentInfoCard>  




      
      



    ))
}



</>
  )
}

export default StudentDetails