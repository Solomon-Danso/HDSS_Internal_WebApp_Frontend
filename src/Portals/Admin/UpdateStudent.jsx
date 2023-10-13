import React, { useEffect, useState } from 'react'
import { apiServer,RegisterStudent, UpdateStudent, ViewClasses, ViewOneStudent } from '../../Constants /Endpoints'
import { AdmitStudentCard, AdmitStudentRole, FormLable, HeaderTitle, MainTitle,FormInputStudent, SelectStage, SelectForStudent, FormTextAreaStudent, SelectStageButton, AdmitButton, SelectForStudentRel, AdmitButton2, FormInputStudent2} from '../../Designs/Styles/Profile'
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

    const [student, setStudent] = useState([])
    const [studentId, setStudentId] = useState("")


    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
      const encryptedData = sessionStorage.getItem("userDataEnc");
      const encryptionKey = '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK';
      const decryptedData = AES.decrypt(encryptedData, encryptionKey);
      const decryptedString = decryptedData.toString(enc.Utf8);
      const parsedData = JSON.parse(decryptedString);
        setUserInfo(parsedData);
    }, []);

      const studentDetails = async (event) => {
        event.preventDefault();
        try {
         const URL = `api/students/getSpecificUser?StudentId=${studentId}&ID=${userInfo.staffID}`
          const response = await fetch(apiServer + URL, {
            method: "GET",
          });
          const data = await response.json();
          if (response.ok) {
            setStudent([data]);
            setFirstname(data.firstName);
            setLastName(data.lastName);
            setOtherName(data.otherName);
            setDateOfBirth(data.dateOfBirth);
            setGender(data.gender);
            setLocation(data.location);
            setHometown(data.homeTown);
            setCountry(data.country)
            setreligion(data.religion)
            setStudentEmail(data.email)
            setStudentPhoneNumber(data.phoneNumber)
            setlevel(data.level)
            setmedicalIInformation(data.medicalIInformation)
            setfatherName(data.fathersName)
            setmotherName(data.mothersName)
            setfatherOccupation(data.fatherOccupation)
            setmotherOccupation(data.motherOccupation)
            setGuardianName(data.guardianName)
            setguardianOccupation(data.guardianOccupation)
            setParentDigitalAddress(data.parentDigitalAddress)
            setParentReligion(data.parentReligion)
            setParentEmail(data.parentEmail)
            setparentPhoneNumber(data.parentPhoneNumber)
            setParentAltphoneNumber(data.alternatePhoneNumber)
            setEmgPhone(data.emergencyPhoneNumber)
            setEmgContName(data.emergencyContactName)
            setEmgAltPhone(data.emergencyAlternatePhoneNumber)
            setRelWithChild(data.relationshipWithChild)

            
            Show.Success("Student information loaded successfully");
            
          } else {
            Show.Attention("Student not found");
          }
        } catch (err) {
          Show.Attention("An error has occurred");
        }
      };
      


  
    const handlesubmit = async (event) => {
        event.preventDefault();
      
      
        try {
          const formData = new FormData();
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

          

          
      
          const response = await fetch(apiServer + UpdateStudent + studentId, {
            method: "POST",
            body: formData,
          });
      
          if (response.ok) {
            Show.Success("Student Admitted Successfully");
            //navigate("/dashboard/profile");
            window.location.reload();
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
  



  
    return (
        <>
         <form onSubmit={studentDetails}>
    < AdmitStudentCard>
    
    <div>
        <FormLable>Enter Student Id</FormLable>
        <AdmitStudentRole>
        <FormInputStudent2
        type="text"
        
        placeholder="35678"
        onChange={(e) => setStudentId(e.target.value)}
       
        />
         <AdmitButton2
        background={colors.lightgreen}
        color="white"
        border={colors.maingreen}
        
        type="submit">Search
        </AdmitButton2>
        </AdmitStudentRole>
     </div>
  
    
    </AdmitStudentCard>    
    </form>


{
    student.map((data)=>(
        <>
        
        <form
    onSubmit={handlesubmit}
    >
     < AdmitStudentCard>
     <MainTitle>Update Student Information</MainTitle>
     <hr/>
     <HeaderTitle>Student Information</HeaderTitle>

    <AdmitStudentRole>
    <div>
        <FormLable>First Name</FormLable>
        <FormInputStudent
        type="text"
        
        placeholder=""
        value={firstName}
        onChange={(e) => setFirstname(e.target.value)}
       
        />
     </div>
     <div>
        <FormLable>Other Name</FormLable>
        <FormInputStudent
        type="text"
        value={otherName}
        placeholder=""
        onChange={(e) => setOtherName(e.target.value)}
       
        />
     </div>
     <div>
        <FormLable>Last Name</FormLable>
        <FormInputStudent
        type="text"
        
        placeholder=""
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
       
        />
     </div>

     <div>
        <FormLable>Date of Birth</FormLable>
        <FormInputStudent
        type="date"
        
        placeholder="Isaac"
        value={dateOfBirth}
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
    value={gender}
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
        
        placeholder=""
        value={location}
        onChange={(e) => setLocation(e.target.value)}
       
        />
     </div>

     <div>
        <FormLable>HomeTown</FormLable>
        <FormInputStudent
        type="text"
        
        placeholder=""
        value={hometown}
        onChange={(e) => setHometown(e.target.value)}
       
        />
     </div>

     <div>
        <FormLable>Country</FormLable>
        <FormInputStudent
        type="text"
        
        placeholder=""
        value={country}
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
        value={religion}
        onChange={(e) => setreligion(e.target.value)}
       
        />
     </div>

     <div>
        <FormLable>Email</FormLable>
        <FormInputStudent
        type="emal"
        value={studentEmail}
        placeholder=""
        onChange={(e) => setStudentEmail(e.target.value)}
       
        />
     </div>

     <div>
        <FormLable>Phone</FormLable>
        <FormInputStudent
        type="text"
        value={studentPhoneNumber}
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
    value={level}
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
        <FormLable>Medical Information</FormLable>
        <FormTextAreaStudent
        type="text"
        
        placeholder=""
        onChange={(e) => setmedicalIInformation(e.target.value)}
        value={medicalIInformation}
        
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
        
        placeholder=""
        value={fatherName}
        onChange={(e) => setfatherName(e.target.value)}
       
        />
     </div>
     <div>
        <FormLable>Mother Name</FormLable>
        <FormInputStudent
        type="text"
        value={motherName}
        placeholder=""
        onChange={(e) => setmotherName(e.target.value)}
       
        />
     </div>
     <div>
        <FormLable>Father Occupation</FormLable>
        <FormInputStudent
        type="text"
        
        placeholder=""
        value={fatherOccupation }
        onChange={(e) => setfatherOccupation(e.target.value)}
       
        />
     </div>

     <div>
        <FormLable>Mother Occupation</FormLable>
        <FormInputStudent
        type="text"
        
        placeholder=""
        onChange={(e) => setmotherOccupation(e.target.value)}
        value={motherOccupation }
        />
     </div>


    </AdmitStudentRole>

    <AdmitStudentRole>
    <div>
        <FormLable>Guardian Name</FormLable>
        <FormInputStudent
        type="text"
       
        value={guardianName}
        placeholder=""
        onChange={(e) => setGuardianName(e.target.value)}
       
        />
     </div>
     <div>
        <FormLable>Guardian Occupation</FormLable>
        <FormInputStudent
        type="text"
        placeholder="" 
        value={guardianOccupation}
        onChange={(e) => setguardianOccupation(e.target.value)}
       
        />
     </div>
     <div>
        <FormLable>Location</FormLable>
        <FormInputStudent
        type="text"
        
        placeholder=""
        value={parentLocation}
        onChange={(e) => setParentLocation(e.target.value)}
       
        />
     </div>

     <div>
        <FormLable>Digital Address</FormLable>
        <FormInputStudent
        type="text"
        
        placeholder=""
        value={parentDigitalAddress  }
        onChange={(e) => setParentDigitalAddress(e.target.value)}
       
        />
     </div>


    </AdmitStudentRole>

    <AdmitStudentRole>
   
     <div>
        <FormLable>Religion</FormLable>
        <FormInputStudent
        type="text"
        value={parentreligion  }
        placeholder=""
        onChange={(e) => setParentReligion(e.target.value)}
       
        />
     </div>

     <div>
        <FormLable>Email</FormLable>
        <FormInputStudent
        type="text"
        value={parentEmail  }
        placeholder=""
        onChange={(e) => setParentEmail(e.target.value)}
       
        />
     </div>

     <div>
        <FormLable>Phone</FormLable>
        <FormInputStudent
        type="text"
        
        placeholder=""
        value={parentPhoneNumber }
        onChange={(e) => setparentPhoneNumber(e.target.value)}
       
        />
     </div>

     <div>
        <FormLable>Alternate Phone Number</FormLable>
        <FormInputStudent
        type="text"
        value={parentAltphoneNumber}
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
       value={emgCntName}
       placeholder=""
       onChange={(e) => setEmgContName(e.target.value)}
      
       />
    </div>

    <div>
       <FormLable>Phone Number</FormLable>
       <FormInputStudent
       type="text"
       value={emgPhone}
       placeholder=""
       onChange={(e) => setEmgPhone(e.target.value)}
      
       />
    </div>

    <div>
       <FormLable>Alternate Phone Number</FormLable>
       <FormInputStudent
       type="text"
       
       placeholder=""
       value={emgAltPhone}
       onChange={(e) => setEmgAltPhone(e.target.value)}
      
       />
    </div>

    <div>
       <FormLable>Relationship With Child</FormLable>
       <SelectForStudentRel
    background={colors.darkBlue}
    color="white"
    border={colors.darkBlue}
    value={RelWithChild}
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
        
        type="submit">Update Student
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
    ))
}

  

    </>
  )
}

export default Students