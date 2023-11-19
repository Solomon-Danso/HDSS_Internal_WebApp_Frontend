import React, { useEffect, useState } from 'react'
import { AdmitButton2, FormInputStudent, FormInputStudent4, FormInputStudent6, FormLable, FormTextAreaNotes, GradeInput, HeaderTitle, OptionButton, OptionInput, PaySelector, QuestionInput, SelectForStudent, SelectForStudentRel } from '../../../Designs/Styles/Profile'
import { colors } from '../../../Designs/Colors'
import { apiServer } from '../../../Constants /Endpoints'
import { AES,enc } from 'crypto-js'
import StudentTableRow from './StudyStudentRow'; // Adjust the path accordingly
import { HeaderText } from '../../../Designs/Styles/HyChat'
import { Show } from '../../../Constants /Alerts'
import { Table } from 'semantic-ui-react'
import { DashSearchContainer, IconDashRight } from '../../../Designs/Card/Dashboard'
import { HiBadgeCheck } from 'react-icons/hi'
import AnimateHeight from 'react-animate-height'


const StudyStudentMarks = () => {

    const [userInfo, setUserInfo] = useState({});
    const [drop, setDrop] = useState(false);
    const [submit, setSubmit] = useState(false);

    useEffect(() => {
      const encryptedData = sessionStorage.getItem("userDataEnc");
      const encryptionKey = '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK';
      const decryptedData = AES.decrypt(encryptedData, encryptionKey);
      const decryptedString = decryptedData.toString(enc.Utf8);
      const parsedData = JSON.parse(decryptedString);
        setUserInfo(parsedData);
    }, []);

    const [theClass2, setTheClass2] = useState([])

    useEffect(() => {
        if(userInfo.staffID){
         
            const URL=`api/LMS/ViewTeacherClass?ID=${userInfo.staffID}`
            fetch(apiServer + URL)
              .then(response => response.json()) // Parse the response as JSON
              .then(data => setTheClass2(data))
              .catch(error => console.error(error));
        }
      
      }, [userInfo.staffID]);
  
      const [theClass, setTheClass] = useState([])
      useEffect(() => {
        if(userInfo.staffID){
         
            const URL=`api/LMS/ViewTeacherSubject?ID=${userInfo.staffID}`
            fetch(apiServer + URL)
              .then(response => response.json()) // Parse the response as JSON
              .then(data => setTheClass(data))
              .catch(error => console.error(error));
        }
      
      }, [userInfo.staffID]);


      const [AcaYear, setAcaYear] = useState([])
      const [AcaTerm, setAcaTerm] = useState([])
      
      useEffect(() => {
         
              const URL=`api/LMS/ViewAcademicYear`
      
              fetch(apiServer + URL)
                .then(response => response.json()) // Parse the response as JSON
                .then(data => setAcaYear(data))
                .catch(error => console.error(error));
          
        
        }, []);
      
        useEffect(() => {
         
          const URL=`api/LMS/ViewAcademicTerm`
      
          fetch(apiServer + URL)
            .then(response => response.json()) // Parse the response as JSON
            .then(data => setAcaTerm(data))
            .catch(error => console.error(error));
      
      
      }, []);


     
      
const [rowList, setRowValues] = useState([
        { studentId: '', studentName: '', classScore: '', examScore: '' }
      ]);
      
      

      
      
      
const [level, setLevel] = useState("")
const [subject, setsubject] = useState("")



const [studentList, setStudentList] = useState([]);
const [stuId, setstuId] = useState("")

useEffect(()=>{
  if(level){

      const URL = `api/Grade/ClassList?Level=${level}`
      fetch(apiServer+URL)
      .then(res=>res.json())
      .then(data=>{
        
        setStudentList(data)
        setstuId(data.studentId)
      })
      .catch(err => console.error(err))

  }
 
},[level])

const [question, setQuestion] = useState("")
const [optionA, setOptionA] = useState("")
const [optionB, setOptionB] = useState("")
const [optionC, setOptionC] = useState("")
const [optionD, setOptionD] = useState("")
const [optionE, setOptionE] = useState("")
const [answer, setAnswer] = useState("")
const [status, setStatus] = useState("")
const [deadline, setdeadline] = useState("")
const [duration, setduration] = useState(0)
const [designatedMarks, setdesignatedMarks] = useState(0)

const handleSubmit = async (event) => {
    event.preventDefault();

   Show.showLoading("Processing Data");
const URL=`api/StudentApp/UploadTestnQuiz?Level=${level}&Subject=${subject}&Status=${status}&StaffID=${userInfo.staffID}`
if(status==="New"){
    try {
        const response = await fetch(apiServer + URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set the Content-Type header
          },
          
          body: JSON.stringify({
              subject,
              level,
              question,
              optionA,
              optionB,
              optionC,
              optionD,
              optionE,
              answer,
              deadline,
              duration,
              designatedMarks
          }),
        });
        const data = await response.text();
        if (response.ok) {
         Show.hideLoading();
         Show.Success(data)
          window.location.reload()
          
        } else {
          Show.Attention(data);
        }
      } catch (err) {
        Show.Attention("An error has occurred");
      }          
}
else{
    try {
        const response = await fetch(apiServer + URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set the Content-Type header
          },
          
          body: JSON.stringify({
              subject,
              level,
              question,
              optionA,
              optionB,
              optionC,
              optionD,
              optionE,
              answer,
              duration,
              designatedMarks
          }),
        });
        const data = await response.text();
        if (response.ok) {
         Show.hideLoading();
         Show.Success(data)
          window.location.reload()
          
        } else {
          Show.Attention(data);
        }
      } catch (err) {
        Show.Attention("An error has occurred");
      }
}   


};


const handle = (e) => {
  const inputValue = e.target.value.toUpperCase(); // Convert input to uppercase
  const pattern = /^[A-E]$/; // Regular expression pattern for A to E

  if (inputValue.trim() === '') {
    // Notify the user if the input is empty
   Show.Attention('Please input an answer.');
  } else if (pattern.test(inputValue)) {
    setAnswer(inputValue); // Set the answer state if input is valid
  } else {
    setAnswer(''); // Clear the answer state if input is invalid
  }
};





  return (
    <div>
<div style={{display:"flex", flexDirection:"row", justifyContent:'space-evenly', width:'100%' }}>

<PaySelector
    background={colors.card}
    color="white"
    border={colors.darkBlue}
    onChange={(e) => setStatus(e.target.value)}
    required
    >
        <option>Select A Mode</option>
  
      <option value={"New"}>New Quiz</option>
      <option value={"Existing"}>Add To An Existing Quiz</option>
    

</PaySelector>

<PaySelector
    background={colors.card}
    color="white"
    border={colors.darkBlue}
    onChange={(e) => setLevel(e.target.value)}
    required
    >
        <option>Select A Class</option>
   {theClass2.length > 0 &&
    theClass2.map((data) => (
      <option key={data.id}>{data.className}</option>
    ))}

</PaySelector>

    <PaySelector
    background={colors.card}
    color="white"
    border={colors.darkBlue}
    onChange={(e) => setsubject(e.target.value)}
    required
    >
        <option>Select A Subject</option>
   {theClass.length > 0 &&
    theClass.map((data) => (
      <option key={data.id}>{data.subjectName}</option>
    ))}

    </PaySelector>

</div>

<div>
<DashSearchContainer style={{ margin: "10px 0", padding: 5, flexDirection: "column", border: "1px solid rgba(0, 0, 0, 0.09)", backgroundColor: "#f8f8fa", fontSize: 14,  }}>
      <div style={{ borderTop: "1px solid #2D334A", marginTop: 20 }}>
         
            <QuestionInput
              placeholder="Type Your Question"
              style={{ width: "100%", marginBottom: 0 }}
              required
              onChange={(e)=>setQuestion(e.target.value)}
             
            />
        
        </div>
    </DashSearchContainer>

</div>


      <div style={{ borderTop: "1px solid #2D334A", marginTop: 20,flexDirection: "row",display:"flex", gap:"1rem" }}>
            <OptionButton
            background={colors.card}
            color="white"
            border={colors.lightgreen}
            >A</OptionButton>
            <OptionInput
              placeholder=""
              style={{ width: "100%", marginBottom: 0 }}
              required
              onChange={(e)=>setOptionA(e.target.value)}
             
            />
    
        </div>

        <div style={{ borderTop: "1px solid #2D334A", marginTop: 20,flexDirection: "row",display:"flex", gap:"1rem" }}>
            <OptionButton
            background={colors.card}
            color="white"
            border={colors.lightgreen}
            >B</OptionButton>
            <OptionInput
              placeholder=""
              style={{ width: "100%", marginBottom: 0 }}
              required
              onChange={(e)=>setOptionB(e.target.value)}
             
            />
    
        </div>

        <div style={{ borderTop: "1px solid #2D334A", marginTop: 20,flexDirection: "row",display:"flex", gap:"1rem" }}>
            <OptionButton
            background={colors.card}
            color="white"
            border={colors.lightgreen}
            >C</OptionButton>
            <OptionInput
              placeholder=""
              style={{ width: "100%", marginBottom: 0 }}
              required
              onChange={(e)=>setOptionC(e.target.value)}
             
            />
    
        </div>

        <div style={{ borderTop: "1px solid #2D334A", marginTop: 20,flexDirection: "row",display:"flex", gap:"1rem" }}>
            <OptionButton
            background={colors.card}
            color="white"
            border={colors.lightgreen}
            >D</OptionButton>
            <OptionInput
              placeholder=""
              style={{ width: "100%", marginBottom: 0 }}
              required
              onChange={(e)=>setOptionD(e.target.value)}
             
            />
    
        </div>

        <div style={{ borderTop: "1px solid #2D334A", marginTop: 20,flexDirection: "row",display:"flex", gap:"1rem" }}>
            <OptionButton
            background={colors.card}
            color="white"
            border={colors.lightgreen}
            >E</OptionButton>
            <OptionInput
              placeholder=""
              style={{ width: "100%", marginBottom: 0 }}
              required
              onChange={(e)=>setOptionE(e.target.value)}
             
            />
    
        </div>
<br/>
        <div style={{ borderTop: "1px solid #2D334A", marginTop: 20,flexDirection: "row",display:"flex", gap:"1rem" }}>
            <OptionButton
            background={colors.mainsecondgreen}
            color="white"
            border={colors.mainsecondgreen}
            >ANS</OptionButton>
            <OptionInput
              placeholder="Type correct option Alphabet eg. A or B "
              style={{ width: "100%", marginBottom: 0 }}
              required
              value={answer}
              onChange={handle}
             
            />
    

        </div>

<br/>

<div style={{display:"flex", flexDirection:"row", justifyContent:'space-evenly', width:'100%' }}>
{
    status==="New"?(
    <>
    <div >
<FormLable>Deadline</FormLable>
        <FormInputStudent
        type="datetime-local"
        required
        placeholder="Isaac"
        onChange={(e) => setdeadline(e.target.value)}
       
        />
</div>

<div>
<FormLable>Duration (*in minutes*)</FormLable>
        <FormInputStudent
        type="number"
        required
        placeholder="30"
        onChange={(e) => setduration(e.target.value)}
       
        />
</div>
    
    </>):(<></>)
}



<div>
<FormLable>Marks</FormLable>
        <FormInputStudent
        type="number"
        required
        placeholder="2"
        onChange={(e) => setdesignatedMarks(e.target.value)}
       
        />
</div>



</div>
<br/>



<AdmitButton2
        background={colors.lightgreen}
        color="white"
        border={colors.maingreen}
        onClick={handleSubmit}
        >Submit
        </AdmitButton2>







    </div>
  )
}

export default StudyStudentMarks