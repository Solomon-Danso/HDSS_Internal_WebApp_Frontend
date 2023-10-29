import React, { useEffect, useRef, useState } from 'react'
import { Admission, apiServer,RegisterStudent, ViewClasses,AcaTerm,AcaYear, TestPdf, RegisterTeacher, Appointment } from '../../Constants /Endpoints'
import { AdmitStudentCard, AdmitStudentRole, FormLable, HeaderTitle, MainTitle,FormInputStudent, SelectStage, SelectForStudent, FormTextAreaStudent, SelectStageButton, AdmitButton, SelectForStudentRel, CardImage} from '../../Designs/Styles/Profile'
import { colors } from '../../Designs/Colors'
import { Show } from '../../Constants /Alerts'

import { AES,enc } from 'crypto-js'



const Students = () => {

const [a,sa] = useState("")
const [b,sb] = useState("")
const [c,sc] = useState("")
const [d,sd] = useState("")
const [e,se] = useState("")
const [f,sf] = useState("")
const [g,sg] = useState("")
const [h,sh] = useState("")
const [i,si] = useState("")
const [j,sj] = useState("")
const [k,sk] = useState("")
const [l,sl] = useState("")
const [m,sm] = useState("")
const [n,sn] = useState("")
const [o,so] = useState("")
const [p,sp] = useState("")
const [q,sq] = useState("")
const [r,sr] = useState("")
const [s,ss] = useState("")
const [t,st] = useState("")
const [u,su] = useState("")
const [v,sv] = useState("")
const [w,sw] = useState("")
const [x,sx] = useState("")
const [y,sy] = useState("")
   
   
   const [userInfo, setUserInfo] = useState({});

   useEffect(() => {
     const encryptedData = sessionStorage.getItem("userDataEnc");
     const encryptionKey = '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK';
     const decryptedData = AES.decrypt(encryptedData, encryptionKey);
     const decryptedString = decryptedData.toString(enc.Utf8);
     const parsedData = JSON.parse(decryptedString);
       setUserInfo(parsedData);
   }, []);

   
  
  const handleGeneratePDF = async (Id, fn,mn,ln) => {
    try {
   
      // Send a request to the backend to generate the PDF
      const response = await fetch(apiServer + Appointment+Id, {
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
        a.download = `${fn} ${mn} ${ln}.pdf`
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
      Show.Success("Teacher Admitted Successfully");
      window.location.reload();
    
            
    }
  };
  



    const handlesubmit = async (event) => {
        event.preventDefault();
      
        if (!l) {
          Show.Attention("Please select a picture");
          return;
        }

        if (!o||!q) {
            Show.Attention("Please select a document");
            return;
          }
  

       
      
        try {
            
          const formData = new FormData();
         
          formData.append("Title", a);
          formData.append("FirstName", b);
          formData.append("OtherName", c);
          formData.append("LastName", d);
          formData.append("DateOfBirth", e);
          formData.append("Gender", f);
          formData.append("MaritalStatus", g);
          formData.append("Location", h);
          formData.append("Country", i);
          formData.append("Email", j);
          formData.append("PhoneNumber", k);
          formData.append("File", l);

          formData.append("HealthStatus", m);
          formData.append("Education", n);
          formData.append("CertFile", o);
          formData.append("TeachingExperience", p);

          formData.append("IdCardsFile", q);

          formData.append("TaxNumber", r);
          formData.append("SSNITNumber", s);
          formData.append("EmergencyContacts", t);
          formData.append("EmergencyPhone", u);

          formData.append("Salary", v);
          formData.append("Position", w);
          formData.append("ReportingTime", x);
          formData.append("StartDate", y);

          
         Show.showLoading("Processing Data")
          
      
          const response = await fetch(apiServer + RegisterTeacher+userInfo.staffID, {
            method: "POST",
            body: formData,
          });

          const data = await response.json();
      
          if (response.ok) {
          handleGeneratePDF(data.staffID, data.firstName, data.otherName, data.lastName)
           
            
           
            //navigate("/dashboard/profile");
            //window.location.reload();
          } else {
            Show.Attention("Teacher Admission Failed");
          }
        } catch (error) {
            console.error("Error:", error);
          Show.Attention("Teacher Admission Error");
        }
      };







  
    return (
      <>

     

        
          
 


    <form
    onSubmit={handlesubmit}
    >
     < AdmitStudentCard>
     <MainTitle>Add Teacher Form</MainTitle>
     <hr/>
     <HeaderTitle>Teacher Information</HeaderTitle>

    <AdmitStudentRole>
    <div>
    <FormLable>Title</FormLable>
    <SelectForStudent
    background={colors.darkBlue}
    color="white"
    border={colors.darkBlue}
    onChange={(e) => sa(e.target.value)}
    >
  
    <option>Please select a title</option>
    <option>Mr.</option>
    <option>Mrs.</option>
    <option>Ms.</option>
    <option>Dr.</option>
    <option>Prof.</option>
    <option>Rev.</option>
    <option>Eng.</option>
    <option>Atty.</option>
    <option>Capt.</option>
    <option>Col.</option>
    <option>Cmdr.</option>
    <option>Chief</option>
    <option>Dir.</option>
    <option>Gen.</option>
    <option>Lt.</option>
    <option>Maj.</option>
    <option>Prin.</option>
    <option>Pres.</option>
    <option>Sec.</option>
    <option>Sgt.</option>


    
    </SelectForStudent>
        
     </div>
    <div>
        <FormLable>First Name</FormLable>
        <FormInputStudent
        type="text"
        required
        placeholder=""
        onChange={(e) => sb(e.target.value)}
       
        />
     </div>
     <div>
        <FormLable>Other Name</FormLable>
        <FormInputStudent
        type="text"
        
        placeholder=""
        onChange={(e) => sc(e.target.value)}
       
        />
     </div>
     <div>
        <FormLable>Last Name</FormLable>
        <FormInputStudent
        type="text"
        required
        placeholder=""
        onChange={(e) => sd(e.target.value)}
       
        />
     </div>

   

    </AdmitStudentRole>

    <AdmitStudentRole>
    <div>
        <FormLable>Date of Birth</FormLable>
        <FormInputStudent
        type="date"
        required
        placeholder="Isaac"
        onChange={(e) => se(e.target.value)}
       
        />
     </div>

    <div>
    <FormLable>Gender</FormLable>
    <SelectForStudent
    background={colors.darkBlue}
    color="white"
    border={colors.darkBlue}
    onChange={(e) => sf(e.target.value)}
    >
    <option >Please select a gender</option>
    <option>Male</option>
    <option>Female</option>
    </SelectForStudent>
        
     </div>

     <div>
    <FormLable>Marital Status</FormLable>
    <SelectForStudent
    background={colors.darkBlue}
    color="white"
    border={colors.darkBlue}
    onChange={(e) => sg(e.target.value)}
    >
    <option >Please select a marital status</option>
    <option>Single</option>
    <option>Married</option>
    <option>Divorced</option>
    <option>Widowed</option>
    <option>Separated</option>
    </SelectForStudent>
        
     </div>

     <div>
        <FormLable>Location</FormLable>
        <FormInputStudent
        type="text"
        required
        placeholder=""
        onChange={(e) => sh(e.target.value)}
       
        />
     </div>

    
 

    </AdmitStudentRole>

    <AdmitStudentRole>
    <div>
        <FormLable>Country</FormLable>
        <FormInputStudent
        type="text"
        required
        placeholder=""
        onChange={(e) => si(e.target.value)}
       
        />
     </div>

     <div>
        <FormLable>Email</FormLable>
        <FormInputStudent
        type="text"
        
        placeholder=""
        onChange={(e) => sj(e.target.value)}
       
        />
     </div>

     <div>
        <FormLable>Phone</FormLable>
        <FormInputStudent
        type="text"
        required
        placeholder=""
        onChange={(e) => sk(e.target.value)}
       
        />
     </div>

   
     <div>
        <FormLable>Upload Teacher Photo</FormLable>
        <FormInputStudent
        type="file"
        required
        placeholder=""
        onChange={(e) => sl(e.target.files[0])}
       
        />
     </div>
    
    
    </AdmitStudentRole>

    <AdmitStudentRole>


   



     <div>
        <FormLable>Medical Information</FormLable>
        <FormTextAreaStudent
        type="text"
        
        placeholder=""
        onChange={(e) => sm(e.target.value)}
       
        />
     </div>



    </AdmitStudentRole>
  
     
     </AdmitStudentCard>

<AdmitStudentCard>
<HeaderTitle>Teacher Qualifications and Identifications</HeaderTitle>

<AdmitStudentRole>
<div>
    <FormLable>Education Level</FormLable>
    <SelectForStudent
    background={colors.darkBlue}
    color="white"
    border={colors.darkBlue}
    onChange={(e) => sn(e.target.value)}
    >
  
  <option>Please select the highest level of education</option>
    <option>No formal education</option>
    <option>Primary education</option>
    <option>Secondary education</option>
    <option>High school diploma or equivalent</option>
    <option>Associate's degree</option>
    <option>Bachelor's degree</option>
    <option>Master's degree</option>
    <option>Doctoral degree</option>
    <option>Other</option>
    
    
    </SelectForStudent>
        
     </div>
     <div>
        <FormLable>Upload Certificate </FormLable>
        <FormInputStudent
        type="file"
        required
        placeholder=""
        accept=".pdf"
        onChange={(e) => so(e.target.files[0])}
       
        />
     </div>

     <div>
    <FormLable>Teaching Experience</FormLable>
    <SelectForStudent
    background={colors.darkBlue}
    color="white"
    border={colors.darkBlue}
    onChange={(e) => sp(e.target.value)}
    >
  
  <option >None</option>
  <option >Less than 1 year</option>
  <option >1-3 years</option>
  <option >3-5 years</option>
  <option >5-9 years</option>
   <option>10 years or more</option> 
    
    </SelectForStudent>
        
     </div>
     <div>
        <FormLable>Upload ID</FormLable>
        <FormInputStudent
        type="file"
        required
        placeholder=""
        onChange={(e) => sq(e.target.files[0])}
       
        />
     </div>


</AdmitStudentRole>

<AdmitStudentRole>

<div>
        <FormLable>Tax Number</FormLable>
        <FormInputStudent
        type="text"
        
        placeholder=""
        onChange={(e) => sr(e.target.value)}
       
        />
     </div>

     <div>
        <FormLable>SSNIT Number</FormLable>
        <FormInputStudent
        type="text"
        
        placeholder=""
        onChange={(e) => ss(e.target.value)}
       
        />
     </div>

     <div>
       <FormLable>Emergency Contact Name</FormLable>
       <FormInputStudent
       type="text"
       
       placeholder=""
       onChange={(e) => st(e.target.value)}
      
       />
    </div>

    <div>
       <FormLable>Phone Number</FormLable>
       <FormInputStudent
       type="text"
       
       placeholder=""
       onChange={(e) => su(e.target.value)}
      
       />
    </div>


</AdmitStudentRole>



</AdmitStudentCard>

<AdmitStudentCard>

<HeaderTitle>Appointment Details</HeaderTitle>
<AdmitStudentRole>
 <div>
       <FormLable>Salary</FormLable>
       <FormInputStudent
       type="text"
       
       placeholder=""
       onChange={(e) => sv(e.target.value)}
      
       />
    </div>

    <div>
       <FormLable>Position</FormLable>
       <FormInputStudent
       type="text"
       
       placeholder=""
       onChange={(e) => sw(e.target.value)}
      
       />
    </div>

    <div>
       <FormLable>Reporting Time</FormLable>
       <FormInputStudent
       type="time"
       
       placeholder=""
       onChange={(e) => sx(e.target.value)}
      
       />
    </div>

    <div>
       <FormLable>Start Date</FormLable>
       <FormInputStudent
       type="text"
       
       placeholder=""
       onChange={(e) => sy(e.target.value)}
      
       />
    </div>




</AdmitStudentRole>


</AdmitStudentCard>






     <AdmitStudentRole>
<AdmitButton
        background={colors.lightgreen}
        color="white"
        border={colors.maingreen}
        
        type="submit">Employ Teacher
</AdmitButton>

<AdmitButton  
        background={colors.mainred}
        color="white"
        border={colors.lightred}
        onClick={(e)=>window.location.reload()}
        type="submit">Reset 
</AdmitButton>

</AdmitStudentRole>
    </form>
    </>
  )
}


export default Students