import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { PayFees, PaymentHis, ViewOneStudent, apiServer } from '../../Constants /Endpoints';
import { AboutHeader, AdmitButton2, AdmitStudentCard, AdmitStudentCard2, AdmitStudentRole, BiggerImage, BiggerImage2, CardTextActionHeader, CardTextBillHeader, CardTextCreditHeader, CardTextDateHeader, CardTextHeader, CardTextPayHeader, FeesIcons, FeesRow, FormInputStudent, FormInputStudent2, FormInputStudent3, FormInputStudent4, FormLable, HomeCardTextEvent, NewStudentListCard2, StudDetailData, StudDetailField, StudDetailRow, StudDetails, StudLeft, StudRight } from '../../Designs/Styles/Profile';
import { colors } from '../../Designs/Colors';
import { Show } from '../../Constants /Alerts';
import { MdAttachMoney,MdOutlineSportsSoccer,MdLocalLibrary,MdCastForEducation,MdPerson,MdOutlineHealthAndSafety } from "react-icons/md";
import {HiIdentification } from "react-icons/hi";
import {BsMortarboard} from "react-icons/bs";
import {GiMoneyStack,GiTakeMyMoney } from "react-icons/gi";



const StudentDetails = () => {
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


const [amount,setAmount] = useState(0)


const studentDetails = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(apiServer + PayFees + studentId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header
        },
        body: JSON.stringify({ amount }),
      });
  
      if (response.ok) {
        Show.Success("Payment made successfully");
        window.location.reload();
      } else {
        Show.Attention("Student not found");
      }
    } catch (err) {
      Show.Attention("An error has occurred");
    }
  };
  

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