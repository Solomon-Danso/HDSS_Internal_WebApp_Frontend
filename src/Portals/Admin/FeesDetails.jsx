import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { PayFees, PaymentHis, ViewOneStudent, apiServer } from '../../Constants /Endpoints';
import { AboutHeader, AdmitButton2, AdmitStudentCard, AdmitStudentCard2, AdmitStudentRole, BiggerImage, BiggerImage2, CardTextActionHeader, CardTextBillHeader, CardTextCreditHeader, CardTextDateHeader, CardTextHeader, CardTextPayHeader, FeesIcons, FeesRow, FormInputStudent, FormInputStudent2, FormInputStudent3, FormInputStudent4, FormLable, HomeCardTextEvent, NewStudentListCard2, PaySelector, SelectForStudentRel, StudDetailData, StudDetailField, StudDetailRow, StudDetails, StudLeft, StudRight } from '../../Designs/Styles/Profile';
import { colors } from '../../Designs/Colors';
import { Show } from '../../Constants /Alerts';
import { MdPerson } from "react-icons/md";
import {HiIdentification } from "react-icons/hi";
import {BsMortarboard} from "react-icons/bs";
import {GiMoneyStack,GiTakeMyMoney } from "react-icons/gi";
import {RiSecurePaymentFill } from "react-icons/ri";
import { AES, enc } from 'crypto-js';
import {FaGooglePay } from "react-icons/fa";



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

      useEffect(() => {
        fetch(apiServer + ViewOneStudent+studentId)
          .then(response => response.json()) // Parse the response as JSON
          .then(data => setTheStudent(data))
          .catch(error => console.error(error));
      }, []);

      useEffect(() => {
        fetch(apiServer + PaymentHis+studentId)
          .then(response => response.json()) // Parse the response as JSON
          .then(data => setHis(data))
          .catch(error => console.error(error));
      }, []);

      const [userInfo, setUserInfo] = useState({});

      useEffect(() => {
        const encryptedData = sessionStorage.getItem("userDataEnc");
        const encryptionKey = '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK';
        const decryptedData = AES.decrypt(encryptedData, encryptionKey);
        const decryptedString = decryptedData.toString(enc.Utf8);
        const parsedData = JSON.parse(decryptedString);
          setUserInfo(parsedData);
      }, []);
    
const [amount,setAmount] = useState(0)
const [paymentMethod,setPaymentMethod] = useState("")
const [action,setAction] = useState("")


const studentDetails = async (event) => {
    event.preventDefault();

   Show.showLoading("Processing Data");

    const URL = `api/Accounting/PayFees?StudentId=${studentId}&StaffId=${userInfo.staffID}`
    try {
      const response = await fetch(apiServer + URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header
        },
        body: JSON.stringify({ amount,paymentMethod,action }),
      });
      const data = await response.json();
      if (response.ok) {
        handleGeneratePDF(data.transactionId)
        
        
      } else {
        Show.Attention("All fields are required");
      }
    } catch (err) {
      Show.Attention("An error has occurred");
    }
  };
  

      const thelink = apiServer+theStudent?.profilePic

     

     
      
     
    

  return (
<>

    <StudDetails>
        <StudLeft>
    <h2>  {theStudent?.lastName}, {theStudent?.firstName} {theStudent?.otherName}  </h2>
            <BiggerImage2 src={thelink}/>
        </StudLeft>

        <StudRight>
        <AboutHeader>School Fees</AboutHeader><br/>

        <form onSubmit={studentDetails}>
    < AdmitStudentCard2>
    
    <div>
        <FeesRow>

    <FeesIcons >
    <HiIdentification  color={colors.icon}/>
    </FeesIcons>
      
        <FormInputStudent3
        type="text"
        value={theStudent?.studentId}
        placeholder="Student Id"
        disabled
        //onChange={(e) => setStudentId(e.target.value)}
       
        />

        </FeesRow>

        <FeesRow>

<FeesIcons>
<MdPerson color={colors.icon}/>
</FeesIcons>
  
<FormInputStudent3
            type="text"
         placeholder="Student Name"
         value={`${theStudent?.lastName || ''}, ${theStudent?.firstName || ''} ${theStudent?.otherName || ''}`}
         disabled
        />

    </FeesRow>




    <FeesRow>

<FeesIcons>
<BsMortarboard color={colors.icon}/>
</FeesIcons>
  
 
<FormInputStudent3
        type="text"
        value={theStudent?.level}
        placeholder="Student Id"
        disabled
        //onChange={(e) => setStudentId(e.target.value)}
       
        />

    </FeesRow>
 

    <FeesRow>

<FeesIcons>
<GiMoneyStack color={colors.icon}/>
</FeesIcons>
  
<FormInputStudent3
  type="text"
  value={
    theStudent?.balance > 0
      ? `Amount Owing: ${theStudent?.balance}`
      : `Total Credit: ${theStudent?.balance*-1}`
  }
  placeholder="Balance"
  disabled
  //onChange={(e) => setStudentId(e.target.value)}
/>


    </FeesRow>


<FeesRow>
<FeesIcons>
<FaGooglePay color={colors.icon}/>
</FeesIcons>
       <PaySelector
    background={colors.darkBlue}
    color="white"
    border={colors.darkBlue}
    onChange={(e) => setPaymentMethod(e.target.value)}
    required
    >
    <option  >Payment Method </option>
    <option>Mobile Money</option>
    <option>Bank Transfer</option>
    <option>Cash</option>
    </PaySelector>
</FeesRow>

<FeesRow>
<FeesIcons>
<RiSecurePaymentFill color={colors.icon}/>
</FeesIcons>
       <PaySelector
    background={colors.darkBlue}
    color="white"
    border={colors.darkBlue}
    onChange={(e) => setAction(e.target.value)}
    required
    >
    <option >Payment Type</option>
    <option>Admission Fees</option>
    <option>Tuition Fees</option>
    <option>Other Fees</option>
    </PaySelector>
</FeesRow>



    <FeesRow>

<FeesIcons>
<GiTakeMyMoney color={colors.icon}/>
</FeesIcons>
  
<FormInputStudent4
        type="number"
        //value={theStudent?.balance}
        placeholder="Enter Payment Amount"
        
        onChange={(e) => setAmount(e.target.value)}
       
        />    </FeesRow>
 
 <AdmitButton2
        background={colors.lightgreen}
        color="white"
        border={colors.maingreen}
        
        type="submit">Pay
        </AdmitButton2>


       
       
       
        
        
        
     </div>
  
    
    </AdmitStudentCard2>    
    </form>
        </StudRight>



        
    </StudDetails>

    <NewStudentListCard2 >

<CardTextHeader>Opening Balance</CardTextHeader>
<CardTextHeader>Amount Paid</CardTextHeader>
<CardTextHeader>Closing Balance</CardTextHeader>
<CardTextHeader>Bill</CardTextHeader>
<CardTextHeader>Action </CardTextHeader>
<CardTextHeader>Academic Year</CardTextHeader>
<CardTextHeader>Academic Term</CardTextHeader>
<CardTextHeader>Level</CardTextHeader>
<CardTextHeader>Date </CardTextHeader>


</NewStudentListCard2>

{
    His.map((data)=>(
        <NewStudentListCard2 >

        <CardTextHeader>
        {
   data?.openingBalance > 0
      ? <CardTextBillHeader>{data?.openingBalance}</CardTextBillHeader>
      : <CardTextCreditHeader>{data?.openingBalance*-1}</CardTextCreditHeader>  
  }
        
        </CardTextHeader>
        <CardTextHeader>
        {
   data?.transaction > 0
      ? <CardTextPayHeader>{data?.transaction}</CardTextPayHeader>
      : <CardTextHeader>{data?.transaction}</CardTextHeader>  
  }
        
        </CardTextHeader>
        <CardTextHeader>
        {
   data?.closingBalance > 0
      ? <CardTextBillHeader>{data?.closingBalance}</CardTextBillHeader>
      : <CardTextCreditHeader>{data?.closingBalance*-1}</CardTextCreditHeader>  
  }
        </CardTextHeader>
        <CardTextBillHeader>{data?.bills}</CardTextBillHeader>
        <CardTextActionHeader>{data?.action}</CardTextActionHeader>
        <CardTextHeader>{data?.academicYear}</CardTextHeader>
        <CardTextHeader>{data?.academicTerm}</CardTextHeader>
        <CardTextHeader>{data?.level}</CardTextHeader>
        <CardTextDateHeader>{data?.transactionDate}</CardTextDateHeader>
        
      
        </NewStudentListCard2>
    ))
}



</>
  )
}

export default StudentDetails