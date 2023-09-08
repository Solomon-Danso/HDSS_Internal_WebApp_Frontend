import React, { useEffect, useRef, useState } from 'react'
import { Admission, apiServer,RegisterStudent, ViewClasses } from '../../Constants /Endpoints'
import { AdmitStudentCard, AdmitStudentRole, FormLable, HeaderTitle, MainTitle,FormInputStudent, SelectStage, SelectForStudent, FormTextAreaStudent, SelectStageButton, AdmitButton, SelectForStudentRel, CardImage} from '../../Designs/Styles/Profile'
import { colors } from '../../Designs/Colors'
import { Show } from '../../Constants /Alerts'
import jsPDF from 'jspdf';
import logo from '../../Designs/Images/1.jpg'

import ReceiptTemplate from './ReceiptTemplate'
import { ContentContainer, Paragraph } from '../../Designs/Styles/Letter'



const Students = () => {



    const [firstName, setFirstname] = useState("")
    const [otherName, setOtherName] = useState("")
    const [lastName, setLastName] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [gender, setGender] = useState("")
    const [hometown, setHometown] = useState("")
    const [location,setLocation] = useState("")
    const [country, setCountry] = useState("")
    const [fatherName, setfatherName] = useState("")
    const [fatherOccupation, setfatherOccupation] = useState("")
    const [motherName, setmotherName] = useState("")
    const [motherOccupation, setmotherOccupation] = useState("")
    const [guardianName, setGuardianName] = useState("")
    const [guardianOccupation, setguardianOccupation] = useState("")
    const [medicalIInformation, setmedicalIInformation] = useState("")
    const [religion, setreligion] = useState("")
    
    const [studentPhoneNumber, setStudentPhoneNumber] = useState("")
    const [studentEmail, setStudentEmail] = useState("")

    const [parentPhoneNumber, setparentPhoneNumber] = useState("")
    const [parentAltphoneNumber, setParentAltphoneNumber] = useState("")
    const [level, setlevel] = useState("")
    const [profilePic, setProfilePic] = useState("")
    const [emgCntName, setEmgContName] = useState("")
    const [emgPhone, setEmgPhone] = useState("")
    const [emgAltPhone, setEmgAltPhone] = useState("")
    const [RelWithChild, setRelWithChild] = useState("")
    const [parentDigitalAddress, setParentDigitalAddress] = useState("")
    const [parentEmail, setParentEmail] = useState("")
    const [parentLocation, setParentLocation] = useState("")
    const [parentreligion, setParentReligion] = useState("")

  
    const receiptTemplateRef = useRef(null);

    const handleGeneratePdf = () => {
      let pdfDownloadComplete = false; // Flag to track PDF download
    
      // Function to reload the page after PDF download is complete
      const reloadPage = () => {
        if (pdfDownloadComplete) {
          window.location.reload();
        } else {
          setTimeout(reloadPage, 100); // Check again after 100 milliseconds
        }
      };
    
      // Add a 5-second delay before generating PDF
      setTimeout(() => {
        const doc = new jsPDF({
          format: "a4",
          unit: "px"
        });
    
        // Adding the fonts
        // doc.setFont("Inter-Regular", "normal");
    
        doc.html(receiptTemplateRef.current, {
          async callback(doc) {
            doc.save(firstName+"-"+otherName+"-"+lastName+".pdf");
            //pdfDownloadComplete = true; // Set the flag to true after download
          }
        });
        Show.hideLoading();
        Show.Success("Student Admitted Successfully");
        
        // Start the process of reloading the page after download
        reloadPage();
      }, 20000); // 5000 milliseconds (5 seconds)
    };
    
  const [student, setStudent] = useState({})


    const handlesubmit = async (event) => {
        event.preventDefault();
      
        if (!profilePic) {
          Show.Attention("Please select a picture");
          return;
        }

       
      
        try {
          const formData = new FormData();
          formData.append("File", profilePic);
          formData.append("FirstName", firstName);
          formData.append("OtherName", otherName);
          formData.append("LastName", lastName);
          formData.append("DateOfBirth", dateOfBirth);
          formData.append("Gender", gender);
          formData.append("HomeTown", hometown);
          formData.append("Location", location);
          formData.append("Country", country);
          formData.append("FathersName", fatherName);
          formData.append("FatherOccupation", fatherOccupation);
          formData.append("MothersName", motherName);
          formData.append("MotherOccupation", motherOccupation);
          formData.append("GuardianName", guardianName);
          formData.append("GuardianOccupation", guardianOccupation);
          formData.append("MedicalIInformation", medicalIInformation);
          formData.append("Religion", religion);
          formData.append("Email", studentEmail);
          formData.append("PhoneNumber", studentPhoneNumber);
          formData.append("EmergencyContactName", emgCntName);
          formData.append("EmergencyPhoneNumber", emgPhone);
          formData.append("EmergencyAlternatePhoneNumber", emgAltPhone);
          formData.append("RelationshipWithChild", RelWithChild);
          formData.append("Level", level);
          formData.append("ParentDigitalAddress", parentDigitalAddress);
          formData.append("ParentEmail", parentEmail);
          formData.append("ParentReligion", parentreligion);
          formData.append("ParentLocation", parentLocation);
          formData.append("AlternatePhoneNumber",parentAltphoneNumber );
          formData.append("ParentPhoneNumber", parentPhoneNumber);



         Show.showLoading("Processing Data")
          
      
          const response = await fetch(apiServer + RegisterStudent, {
            method: "POST",
            body: formData,
          });

          const data = await response.json();
      
          if (response.ok) {
           AdmissionLetter(data.studentId)
           
            
           
            //navigate("/dashboard/profile");
            //window.location.reload();
          } else {
            Show.Attention("Student Admission Failed");
          }
        } catch (error) {
          Show.Attention("Student Admission Failed");
        }
      };
    
const [theClass, setTheClass] = useState([])

useEffect(() => {
    fetch(apiServer + ViewClasses)
      .then(response => response.json()) // Parse the response as JSON
      .then(data => setTheClass(data))
      .catch(error => console.error(error));
  }, []);
  

  const AdmissionLetter = async (studentId) => {
  
 
   try {
     
 
     const response = await fetch(apiServer + Admission+studentId, {
       method: "POST",
       
     });

     const data = await response.json();
 
     if (response.ok) {
       setStudent(data);
       handleGeneratePdf()
       //window.location.reload();
       
     } else {
       Show.Attention("Error printing AdmissionLetter");
     }
   } catch (error) {
     Show.Attention("Error printing AdmissionLetter");
   }
 };

 const link = apiServer+student.logo


  
    return (
      <>

     
          <div ref={receiptTemplateRef} style={{width:"1px",height:"1px"}}>
          <ContentContainer >
         
          <CardImage src={logo} /> 
    <Paragraph>{student.paragraph1}</Paragraph>
    <Paragraph>{student.paragraph2}</Paragraph>
    <Paragraph>{student.paragraph3}</Paragraph>
    <Paragraph>{student.paragraph4}</Paragraph>
    <Paragraph>{student.paragraph5}</Paragraph>
    <Paragraph>{student.paragraph6}</Paragraph>
  </ContentContainer>
               
      
         </div>

         <CardImage src={link} />
        
    <Paragraph>{student.paragraph1}</Paragraph>
    <Paragraph>{student.paragraph2}</Paragraph>
    <Paragraph>{student.paragraph3}</Paragraph>
    <Paragraph>{student.paragraph4}</Paragraph>
    <Paragraph>{student.paragraph5}</Paragraph>
    <Paragraph>{student.paragraph6}</Paragraph>

          
        
       
        
        

     
 


    <form
    onSubmit={handlesubmit}
    >
     < AdmitStudentCard>
     <MainTitle>Add Student Form</MainTitle>
     <hr/>
     <HeaderTitle>Student Information</HeaderTitle>

    <AdmitStudentRole>
    <div>
        <FormLable>First Name</FormLable>
        <FormInputStudent
        type="text"
        required
        placeholder=""
        onChange={(e) => setFirstname(e.target.value)}
       
        />
     </div>
     <div>
        <FormLable>Other Name</FormLable>
        <FormInputStudent
        type="text"
        
        placeholder=""
        onChange={(e) => setOtherName(e.target.value)}
       
        />
     </div>
     <div>
        <FormLable>Last Name</FormLable>
        <FormInputStudent
        type="text"
        required
        placeholder=""
        onChange={(e) => setLastName(e.target.value)}
       
        />
     </div>

     <div>
        <FormLable>Date of Birth</FormLable>
        <FormInputStudent
        type="date"
        required
        placeholder="Isaac"
        onChange={(e) => setDateOfBirth(e.target.value)}
       
        />
     </div>


    </AdmitStudentRole>

    <AdmitStudentRole>
    <div>
    <FormLable>Gender</FormLable>
    <SelectForStudent
    background={colors.darkBlue}
    color="white"
    border={colors.darkBlue}
    onChange={(e) => setGender(e.target.value)}
    >
    <option >Please select a gender</option>
    <option>Male</option>
    <option>Female</option>
    </SelectForStudent>
        
     </div>

     <div>
        <FormLable>Location</FormLable>
        <FormInputStudent
        type="text"
        required
        placeholder=""
        onChange={(e) => setLocation(e.target.value)}
       
        />
     </div>

     <div>
        <FormLable>HomeTown</FormLable>
        <FormInputStudent
        type="text"
        required
        placeholder=""
        onChange={(e) => setHometown(e.target.value)}
       
        />
     </div>

     <div>
        <FormLable>Country</FormLable>
        <FormInputStudent
        type="text"
        required
        placeholder=""
        onChange={(e) => setCountry(e.target.value)}
       
        />
     </div>

 

    </AdmitStudentRole>

    <AdmitStudentRole>
   
     <div>
        <FormLable>Religion</FormLable>
        <FormInputStudent
        type="text"
        
        placeholder=""
        onChange={(e) => setreligion(e.target.value)}
       
        />
     </div>

     <div>
        <FormLable>Email</FormLable>
        <FormInputStudent
        type="emal"
        
        placeholder=""
        onChange={(e) => setStudentEmail(e.target.value)}
       
        />
     </div>

     <div>
        <FormLable>Phone</FormLable>
        <FormInputStudent
        type="text"
        
        placeholder=""
        onChange={(e) => setStudentPhoneNumber(e.target.value)}
       
        />
     </div>

     <div>
    <FormLable>Class</FormLable>
    <SelectForStudent
    background={colors.darkBlue}
    color="white"
    border={colors.darkBlue}
    onChange={(e) => setlevel(e.target.value)}
    >
    <option >Please select a class</option>
    
    {theClass.length > 0 &&
    theClass.map((data) => (
      <option key={data.id}>{data.className}</option>
    ))}

    </SelectForStudent>
        
     </div>




    </AdmitStudentRole>

    <AdmitStudentRole>


     <div>
        <FormLable>Upload Student Photo</FormLable>
        <FormInputStudent
        type="file"
        required
        placeholder=""
        onChange={(e) => setProfilePic(e.target.files[0])}
       
        />
     </div>

     <div>
        <FormLable>Medical Information</FormLable>
        <FormTextAreaStudent
        type="text"
        required
        placeholder=""
        onChange={(e) => setmedicalIInformation(e.target.value)}
       
        />
     </div>



    </AdmitStudentRole>
  
     
     </AdmitStudentCard>

     < AdmitStudentCard>
    

     <HeaderTitle>Parent Information</HeaderTitle>

    <AdmitStudentRole>
    <div>
        <FormLable>Father Name</FormLable>
        <FormInputStudent
        type="text"
        required
        placeholder=""
        onChange={(e) => setfatherName(e.target.value)}
       
        />
     </div>
     <div>
        <FormLable>Mother Name</FormLable>
        <FormInputStudent
        type="text"
        
        placeholder=""
        onChange={(e) => setmotherName(e.target.value)}
       
        />
     </div>
     <div>
        <FormLable>Father Occupation</FormLable>
        <FormInputStudent
        type="text"
        required
        placeholder=""
        onChange={(e) => setfatherOccupation(e.target.value)}
       
        />
     </div>

     <div>
        <FormLable>Mother Occupation</FormLable>
        <FormInputStudent
        type="text"
        required
        placeholder=""
        onChange={(e) => setmotherOccupation(e.target.value)}
       
        />
     </div>


    </AdmitStudentRole>

    <AdmitStudentRole>
    <div>
        <FormLable>Guardian Name</FormLable>
        <FormInputStudent
        type="text"
      
        placeholder=""
        onChange={(e) => setGuardianName(e.target.value)}
       
        />
     </div>
     <div>
        <FormLable>Guardian Occupation</FormLable>
        <FormInputStudent
        type="text"
        placeholder=""
        onChange={(e) => setguardianOccupation(e.target.value)}
       
        />
     </div>
     <div>
        <FormLable>Location</FormLable>
        <FormInputStudent
        type="text"
        required
        placeholder=""

        onChange={(e) => setParentLocation(e.target.value)}
       
        />
     </div>

     <div>
        <FormLable>Digital Address</FormLable>
        <FormInputStudent
        type="text"
        required
        placeholder=""
        onChange={(e) => setParentDigitalAddress(e.target.value)}
       
        />
     </div>


    </AdmitStudentRole>

    <AdmitStudentRole>
   
     <div>
        <FormLable>Religion</FormLable>
        <FormInputStudent
        type="text"
        
        placeholder=""
        onChange={(e) => setParentReligion(e.target.value)}
       
        />
     </div>

     <div>
        <FormLable>Email</FormLable>
        <FormInputStudent
        type="text"
        
        placeholder=""
        onChange={(e) => setParentEmail(e.target.value)}
       
        />
     </div>

     <div>
        <FormLable>Phone</FormLable>
        <FormInputStudent
        type="text"
        required
        placeholder=""
        onChange={(e) => setparentPhoneNumber(e.target.value)}
       
        />
     </div>

     <div>
        <FormLable>Alternate Phone Number</FormLable>
        <FormInputStudent
        type="text"
        
        placeholder=""
        onChange={(e) => setParentAltphoneNumber(e.target.value)}
       
        />
     </div>

    </AdmitStudentRole>
 
     
     </AdmitStudentCard>

     < AdmitStudentCard>
    

    <HeaderTitle>Emergency Information</HeaderTitle>




   <AdmitStudentRole>
  
    <div>
       <FormLable>Emergency Contact Name</FormLable>
       <FormInputStudent
       type="text"
       
       placeholder=""
       onChange={(e) => setEmgContName(e.target.value)}
      
       />
    </div>

    <div>
       <FormLable>Phone Number</FormLable>
       <FormInputStudent
       type="text"
       
       placeholder=""
       onChange={(e) => setEmgPhone(e.target.value)}
      
       />
    </div>

    <div>
       <FormLable>Alternate Phone Number</FormLable>
       <FormInputStudent
       type="text"
       required
       placeholder=""
       onChange={(e) => setEmgAltPhone(e.target.value)}
      
       />
    </div>

    <div>
       <FormLable>Relationship With Child</FormLable>
       <SelectForStudentRel
    background={colors.darkBlue}
    color="white"
    border={colors.darkBlue}
    onChange={(e) => setRelWithChild(e.target.value)}
    >
    <option >Please select </option>
    <option>Son</option>
    <option>Daughter</option>
    <option>Nephew</option>
    <option>Niece</option>
    <option>Grand Son</option>
    <option>Grand Daughter</option>
    <option>Brother</option>
    <option>Sister</option>
    <option>Cousin</option>
    <option>Care Taker</option>

    </SelectForStudentRel>
    </div>

   </AdmitStudentRole>

    
    </AdmitStudentCard>







     <AdmitStudentRole>
<AdmitButton
        background={colors.lightgreen}
        color="white"
        border={colors.maingreen}
        
        type="submit">Admit Student
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