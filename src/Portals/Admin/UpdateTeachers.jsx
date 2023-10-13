import React, { useEffect, useState } from 'react'
import { apiServer,RegisterStudent, UpdateStudent, ViewClasses, ViewOneStudent } from '../../Constants /Endpoints'
import { AdmitStudentCard, AdmitStudentRole, FormLable, HeaderTitle, MainTitle,FormInputStudent, SelectStage, SelectForStudent, FormTextAreaStudent, SelectStageButton, AdmitButton, SelectForStudentRel, AdmitButton2, FormInputStudent2} from '../../Designs/Styles/Profile'
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
    
    const [student, setStudent] = useState([])
    const [studentId, setStudentId] = useState("")




      const studentDetails = async (event) => {
        event.preventDefault();
        
        const url = `api/Teacher/viewTeacher?StaffId=${studentId}&ID=${userInfo.staffID}` 

        try {
          const response = await fetch(apiServer + url, {
            method: "GET",
          });
          console.log(apiServer + url)
          const data = await response.json();
          if (response.ok) {
            setStudent([data]);
            sa(data.title)
            sb(data.firstName)
            sc(data.otherName)
            sd(data.lastName)
            se(data.dateOfBirth)
            sf(data.gender)
            sg(data.maritalStatus)
            sh(data.location)
            si(data.country)
            sj(data.email)
            sk(data.phoneNumber)
            sm(data.healthStatus)
            sn(data.education)
            sp(data.teachingExperience)
            sr(data.taxNumber)
            ss(data.ssnitNumber)
            st(data.emergencyContacts)
            su(data.emergencyPhone)
            sv(data.salary)
            sw(data.position)
            sx(data.reportingTime)
            
            Show.Success("Teacher information loaded successfully");
            
          } else {
            Show.Attention("Teacher not found");
          }
        } catch (err) {
          Show.Attention(err);
        }
      };
      
      const [userInfo, setUserInfo] = useState({});

      useEffect(() => {
        const encryptedData = sessionStorage.getItem("userDataEnc");
        const encryptionKey = '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK';
        const decryptedData = AES.decrypt(encryptedData, encryptionKey);
        const decryptedString = decryptedData.toString(enc.Utf8);
        const parsedData = JSON.parse(decryptedString);
          setUserInfo(parsedData);
      }, []);
  
    const handlesubmit = async (event) => {
        event.preventDefault();
      
      
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
            
            formData.append("HealthStatus", m);
            formData.append("Education", n);
           
            formData.append("TeachingExperience", p);
  
           
  
            formData.append("TaxNumber", r);
            formData.append("SSNITNumber", s);
            formData.append("EmergencyContacts", t);
            formData.append("EmergencyPhone", u);
  
            formData.append("Salary", v);
            formData.append("Position", w);
            formData.append("ReportingTime", x);
          
  
          

const url = `api/Teacher/updateTeacher?StaffId=${studentId}&ID=${userInfo.staffID}`          
      
          const response = await fetch(apiServer + url, {
            method: "POST",
            body: formData,
          });
      
          if (response.ok) {
            Show.Success("Teacher Updated Successfully");
            //navigate("/dashboard/profile");
            window.location.reload();
          } else {
            Show.Attention("Teacher Update Failed");
          }
        } catch (error) {
          Show.Attention("Student Update Failed");
        }
      };
    
const [theClass, setTheClass] = useState([])

useEffect(() => {
    fetch(apiServer + ViewClasses)
      .then(response => response.json()) // Parse the response as JSON
      .then(data => setTheClass(data))
      .catch(error => console.error(error));
  }, []);
  

console.log(u)

  
    return (
        <>
         <form onSubmit={studentDetails}>
    < AdmitStudentCard>
    
    <div>
        <FormLable>Enter Teacher Id</FormLable>
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
     <MainTitle>Update Teacher Form</MainTitle>
     <hr/>
     <HeaderTitle>Teacher Information</HeaderTitle>

    <AdmitStudentRole>
    <div>
    <FormLable>Title</FormLable>
    <SelectForStudent
    background={colors.darkBlue}
    color="white"
    border={colors.darkBlue}
    value={a}
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
        value={b}
        onChange={(e) => sb(e.target.value)}
       
        />
     </div>
     <div>
        <FormLable>Other Name</FormLable>
        <FormInputStudent
        type="text"
        value={c}
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
        value={d}
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
        
        value={e}
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
    value={f}
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
    value={g}
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
        value={h}
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
        value={i}
        />
     </div>

     <div>
        <FormLable>Email</FormLable>
        <FormInputStudent
        type="text"
        value={j}
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
        value={k}
        />
     </div>
    
    
    </AdmitStudentRole>

    <AdmitStudentRole>


   



     <div>
        <FormLable>Medical Information</FormLable>
        <FormTextAreaStudent
        type="text"
        value={m}
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
    value={n}
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
    <FormLable>Teaching Experience</FormLable>
    <SelectForStudent
    background={colors.darkBlue}
    color="white"
    border={colors.darkBlue}
    onChange={(e) => sp(e.target.value)}
    value={p}
    >
  
  <option >None</option>
  <option >Less than 1 year</option>
  <option >1-3 years</option>
  <option >3-5 years</option>
  <option >5-9 years</option>
   <option>10 years or more</option> 
    
    </SelectForStudent>
        
     </div>


</AdmitStudentRole>

<AdmitStudentRole>

<div>
        <FormLable>Tax Number</FormLable>
        <FormInputStudent
        type="text"
        value={r}
        placeholder=""
        onChange={(e) => sr(e.target.value)}
       
        />
     </div>

     <div>
        <FormLable>SSNIT Number</FormLable>
        <FormInputStudent
        type="text"
        value={s}
        placeholder=""
        onChange={(e) => ss(e.target.value)}
       
        />
     </div>

     <div>
       <FormLable>Emergency Contact Name</FormLable>
       <FormInputStudent
       type="text"
       value={t}
       placeholder=""
       onChange={(e) => st(e.target.value)}
      
       />
    </div>

    <div>
       <FormLable>Emergency Phone Number</FormLable>
       <FormInputStudent
       type="text"
       value={u}
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
       value={v}
       placeholder=""
       onChange={(e) => sv(e.target.value)}
      
       />
    </div>

    <div>
       <FormLable>Position</FormLable>
       <FormInputStudent
       type="text"
       value={w}
       placeholder=""
       onChange={(e) => sw(e.target.value)}
      
       />
    </div>

    <div>
       <FormLable>Reporting Time</FormLable>
       <FormInputStudent
       type="time"
       value={x}
       placeholder=""
       onChange={(e) => sx(e.target.value)}
      
       />
    </div>





</AdmitStudentRole>


</AdmitStudentCard>





     <AdmitStudentRole>
<AdmitButton
        background={colors.lightgreen}
        color="white"
        border={colors.maingreen}
        
        type="submit">Update Teacher
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