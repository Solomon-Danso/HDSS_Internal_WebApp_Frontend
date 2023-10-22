import React, { useEffect, useRef, useState } from 'react'
import { Admission, apiServer,RegisterStudent, ViewClasses,AcaTerm,AcaYear, TestPdf } from '../../Constants /Endpoints'
import { AdmitStudentCard, AdmitStudentRole, FormLable, HeaderTitle, MainTitle,FormInputStudent, SelectStage, SelectForStudent, FormTextAreaStudent, SelectStageButton, AdmitButton, SelectForStudentRel, CardImage} from '../../Designs/Styles/Profile'
import { colors } from '../../Designs/Colors'
import { Show } from '../../Constants /Alerts'

import { AES,enc } from 'crypto-js'



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
   const [academicTerm, setAcademicTerm] = useState("")
   const [academicYear, setAcademicYear] = useState("")
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
      const response = await fetch(apiServer + TestPdf+Id, {
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
        a.download = `${fn}_${mn}_${ln}.pdf`
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
      Show.Success("Student Admitted Successfully");
       window.location.reload();
            
    }
  };
  



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
          formData.append("theAcademicYear",academicYear );
          formData.append("theAcademicTerm", academicTerm);



         Show.showLoading("Processing Data")
          
      
          const response = await fetch(apiServer + RegisterStudent+userInfo.staffID, {
            method: "POST",
            body: formData,
          });

          const data = await response.json();
      
          if (response.ok) {
          handleGeneratePDF(data.studentId, data.firstName, data.otherName, data.lastName)
           
            
           
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
const [theYear, setTheYear] = useState([])
const [theTerm, setTheTerm] = useState([])

useEffect(() => {
   
    fetch(apiServer + ViewClasses)
      .then(response => response.json()) // Parse the response as JSON
      .then(data => setTheClass(data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
   fetch(apiServer + AcaYear)
     .then(response => response.json()) // Parse the response as JSON
     .then(data => setTheYear(data))
     .catch(error => console.error(error));
 }, []);

 useEffect(() => {
   fetch(apiServer + AcaTerm)
     .then(response => response.json()) // Parse the response as JSON
     .then(data => setTheTerm(data))
     .catch(error => console.error(error));
 }, []);
  
 console.log(theTerm)







  
    return (
      <>

     

        
          
 


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


     <div>
    <FormLable>Academic Year</FormLable>
    <SelectForStudent
    background={colors.darkBlue}
    color="white"
    border={colors.darkBlue}
    onChange={(e) => setAcademicYear(e.target.value)}
    >
    <option >Please select a year</option>
    
    {theYear.length > 0 &&
    theYear.map((data) => (
      <option key={data.id}>{data.academicYear}</option>
    ))}

    </SelectForStudent>
        
     </div>

     <div>
    <FormLable>Academic Term</FormLable>
    <SelectForStudent
    background={colors.darkBlue}
    color="white"
    border={colors.darkBlue}
    onChange={(e) => setAcademicTerm(e.target.value)}
    >
    <option >Please select a Term</option>
    
    {theTerm.length > 0 &&
    theTerm.map((data) => (
      <option key={data.id}>{data.academicTerm}</option>

    ))}

    </SelectForStudent>
        
     </div>

    
 

    </AdmitStudentRole>

    <AdmitStudentRole>
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

   
     <div>
        <FormLable>Religion</FormLable>
        <FormInputStudent
        type="text"
        
        placeholder=""
        onChange={(e) => setreligion(e.target.value)}
       
        />
     </div>

    
    
    </AdmitStudentRole>

    <AdmitStudentRole>


     <div>
        <FormLable>Upload Student Photo</FormLable>
        <FormInputStudent
        type="file"
        required
        placeholder=""
        accept=".jpg, .png, .jpeg, .ico"
        onChange={(e) => setProfilePic(e.target.files[0])}
       
        />
     </div>

     <div>
        <FormLable>Email</FormLable>
        <FormInputStudent
        type="email"
        
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