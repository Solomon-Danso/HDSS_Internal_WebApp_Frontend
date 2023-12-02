import React, { useEffect, useState } from 'react'
import { Container, ContainerT, GInfoMiniRow, GInfoMiniRowT, GInfoRow, GeneralInfoContainer, HomeContainerT, PerformanceInfoContainer, PerformanceInfoContainerT, PerformanceRow, PerformanceText, RSchoolName, RSchoolNameS, RStudCenter } from '../../../Designs/Styles/Letter'
import { apiServer } from '../../../Constants /Endpoints'
import { RSSchoolLogo, RSchoolLogo, SchoolLogo } from '../../../Designs/Styles/Styles'
import { AdmitButton2, FormInputStudent4, PaySelector, RInput, RInputLong, StudCenter } from '../../../Designs/Styles/Profile'
import { AES, enc } from 'crypto-js'
import { colors } from '../../../Designs/Colors'

const Reportrblue = ({ data, submitter, level, goToNextStudent, goToPreviousStudent, isLastStudent, handleSubmit }) => {


    const [SchoolData, SetSchoolData] = useState({})

    useEffect(()=>{
    fetch(apiServer+"api/Setup/GetSchoolData")
    .then(res=>res.json())
    .then(data=>SetSchoolData(data))
    .catch(error=>console.error(error))
    },[])

    const [ReportData, SetReportData] = useState({})

    useEffect(()=>{
    fetch(apiServer+"api/Grade/GeneralInfo")
    .then(res=>res.json())
    .then(data=>SetReportData(data))
    .catch(error=>console.error(error))
    },[])

    

      const [conduct, setConduct] = useState([])

      useEffect(() => {
        fetch(apiServer + "api/Setup/ViewConducts")
          .then(response => response.json()) // Parse the response as JSON
          .then(data => setConduct(data))
          .catch(error => console.error(error));
      }, []);

      const [Attitude, setAttitude] = useState([])

      useEffect(() => {
        fetch(apiServer + "api/Setup/ViewAttitudes")
          .then(response => response.json()) // Parse the response as JSON
          .then(data => setAttitude(data))
          .catch(error => console.error(error));
      }, []);


    const [StudentCounter, setStudentCounter] = useState(0)
    useEffect(()=>{
        fetch(apiServer+"api/Grade/StudentCounters?Level="+data.level)
        .then(res=>res.json())
        .then(data=>setStudentCounter(data))
        .catch(error=>console.error(error))
        },[data.level])


    const [TermResult, setTermResult] = useState([])
    
    useEffect(()=>{
        if(data&&ReportData){
        const URL = `api/Grade/ViewTermGrades?StudentId=${data.studentId}&Year=${ReportData.academicYear}&Term=${ReportData.academicTerm}&Level=${data.level}`
            fetch(apiServer+URL)
        .then(res=>res.json())
        .then(data=>setTermResult(data))
        .catch(error=>console.error(error))
        }
        
        },[data, ReportData])


        const [attn, setAttn] = useState(0);
        const [out,setOut] = useState(0)
        const [cond, setCond] = useState("")
        const [attit, setAttit] = useState("")
        const [interest, setInterest] = useState("")
        const [classTRemarks, setClassTRemarks] = useState("")
        const [SId, setStudentId] = useState("")
        
        useEffect(()=>{
          const URL =   `api/Grade/GetTermReportOnReload?Level=${level}&SID=${data.studentId}`
          fetch(apiServer+URL)
          .then(res=>res.json())
          .then(kofi=>{
            setAttn(kofi.attendance)
            setOut(kofi.outOf)
            setCond(kofi.conduct)
            setAttit(kofi.attitude)
            setInterest(kofi.interest)
            setClassTRemarks(kofi.classTeacherRemarks)
            setStudentId(data.studentId)
          })
          .catch(error=>console.error(error))



        },[level,data])
        
        

       


  return (
    <>
    
    <ContainerT>

<HomeContainerT >
<RSchoolName> {SchoolData.schoolName}</RSchoolName>

<StudCenter>
<RSchoolLogo
    src={apiServer+SchoolData.logo}
    alt="icon"

 />

</StudCenter>

<RStudCenter style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <div>
    <RSchoolNameS>{SchoolData.location}</RSchoolNameS>
    <RSchoolNameS>Academic Report</RSchoolNameS>
  </div>

  <div style={{ alignSelf:"flex-end" }}>
    <RSSchoolLogo
      src={apiServer + data.profilePic}
      alt="icon"
      style={{ marginTop:"-15rem", padding:'1rem' }}
    />
  </div>
</RStudCenter>

<GeneralInfoContainer>
<GInfoRow>

<GInfoMiniRow>
<div>StudentID: </div>
<div style={{color:`${colors.rblue}`, fontWeight:"bold"}}>{data.studentId}</div>
</GInfoMiniRow>


<GInfoMiniRow>
<div>No. of Students: </div>
<div style={{color:`${colors.rblue}`, fontWeight:"bold"}}>{StudentCounter}</div>
</GInfoMiniRow>


<GInfoMiniRow>
<div>Vacation Date: </div>
<div style={{color:`${colors.rblue}`, fontWeight:"bold"}}>{ReportData.vacationDate}</div>
</GInfoMiniRow>


</GInfoRow>

<GInfoRow>

<GInfoMiniRow>
<div>Student Name: </div>
<div style={{color:`${colors.rblue}`, fontWeight:"bold"}}>{data.firstName}{" "}{data.otherName}{" "}{data.lastName}</div>
</GInfoMiniRow>

<GInfoMiniRow>
<div>Year: </div>
<div style={{color:`${colors.rblue}`, fontWeight:"bold"}}>{ReportData.academicYear}</div>
</GInfoMiniRow>

<GInfoMiniRow>
<div>Reopening Date: </div>
<div style={{color:`${colors.rblue}`, fontWeight:"bold"}}>{ReportData.reOpeningDate}</div>
</GInfoMiniRow>

</GInfoRow>

<GInfoRow>

<GInfoMiniRow>
<div>Stage: </div>
<div style={{color:`${colors.rblue}`, fontWeight:"bold"}}>{data.level}</div>
</GInfoMiniRow>

<GInfoMiniRow>
<div>Term: </div>
<div style={{color:`${colors.rblue}`, fontWeight:"bold"}}>{ReportData.academicTerm}</div>
</GInfoMiniRow>

<GInfoMiniRow>
<div>Position: </div>
<div style={{color:`${colors.mainred}`, fontWeight:"bold"}}>1st out of {StudentCounter} students</div>
</GInfoMiniRow>

</GInfoRow>




</GeneralInfoContainer>


<table style={{
    border: "2px solid black", // Change the border style to specify width, style, and color
    marginTop: "2rem",
    width: "100%",
    height: "auto",
    borderCollapse: "collapse", // Optional: Collapses the borders into a single border
}}>
  <thead>
    <tr>
      <th style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>Subject</th>
      <th style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>Class Score (50%)</th>
      <th style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>Exams Score (50%)</th>
      <th style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>Total Score (100%)</th>
      <th style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>Position</th>
      <th style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>Level & Grade</th>
      <th style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>Meaning/Remarks</th>
    </tr>
  </thead>
  
  <tbody>
   {
    TermResult.length>0
    &&TermResult.map((data) =>(
<>
<tr>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>{data.subject}</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>{data.classScore}</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>{data.examScore}</td>
      <td style={{ border: "1px solid black",color:`${colors.mainred}`,textAlign:"center", fontWeight:800 }}>{data.totalScore}</td>
      <td style={{ border: "1px solid black",color:`${colors.rblue}`,textAlign:"center" }}>{data.position}</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>{data.grade}</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>{data.comment}</td>
    </tr>
</>
    ))
   }
    
  


  </tbody>
</table>


<form >

<PerformanceInfoContainerT>


<GInfoRow>

<GInfoMiniRow>
<div>Attendance: </div>
<div style={{color:`${colors.rblue}`, fontWeight:"bold"}}>  
        <RInput
        type="number"
        value={attn}
       // placeholder="Title"
       onChange={(e) => setAttn(e.target.value)}
        required
        />
    </div>
</GInfoMiniRow>

<GInfoMiniRow>
<div>Out of: </div>
<div style={{color:`${colors.rblue}`, fontWeight:"bold"}}>
    <RInput
        type="number"
        value={out}
       // placeholder="Title"
        onChange={(e) => setOut(e.target.value)}
        required
        /></div>
</GInfoMiniRow>

<GInfoMiniRow>
<div>Promoted To: </div>
<div style={{color:`${colors.mainred}`, fontWeight:"bold"}}>Basic 9</div>
</GInfoMiniRow>

</GInfoRow>
<br/>
<GInfoRow>

<GInfoMiniRowT>
<div>Conduct: </div>
<div style={{color:`${colors.rblue}`, fontWeight:"bold"}}>
  <PaySelector
    background={colors.darkBlue}
    color="white"
    border={colors.darkBlue}
    value={cond}
    onChange={(e) => setCond(e.target.value)}
    required
    >
        <option>Select Conduct</option>
   {conduct.length > 0 &&
    conduct.map((data) => (
      <option key={data.id}>{data.addConducts}</option>
    ))}

    </PaySelector>
    
    </div>
</GInfoMiniRowT>


</GInfoRow>

<GInfoRow>

<GInfoMiniRowT>
<div>Attitude: </div>
<div style={{color:`${colors.rblue}`, fontWeight:"bold"}}>

<PaySelector
    background={colors.darkBlue}
    color="white"
    border={colors.darkBlue}
    value={attit}
    onChange={(e) => setAttit(e.target.value)}
    required
    >
        <option>Select Attitude</option>
   {Attitude.length > 0 &&
    Attitude.map((data) => (
      <option key={data.id}>{data.addAttitudes}</option>
    ))}

    </PaySelector>

</div>
</GInfoMiniRowT>

</GInfoRow>

<GInfoRow>

<GInfoMiniRowT>
<div>Interest: </div>
<div style={{color:`${colors.rblue}`, fontWeight:"bold"}}>

<RInputLong
        type="text"
        value={interest}
       // placeholder="Title"
       onChange={(e) => setInterest(e.target.value)}
        required
        />

</div>
</GInfoMiniRowT>

</GInfoRow>
<GInfoRow>

<GInfoMiniRowT>
<div>Class Teacher Remarks: </div>
<div style={{color:`${colors.rblue}`, fontWeight:"bold"}}>

<RInputLong
        type="text"
        value={classTRemarks}
       // placeholder="Title"
       onChange={(e) => setClassTRemarks(e.target.value)}
        required
        />

</div>
</GInfoMiniRowT>

</GInfoRow>
<br/>



</PerformanceInfoContainerT>

</form>





<table style={{
    border: "2px solid black",
    marginTop: "2rem",
    width: "100%",
    height: "auto",
    borderCollapse: "collapse",
}}>
  <thead>
    <tr>
      <th style={{ border: "1px solid black", color: `${colors.rcolor}`, textAlign: "center" }}>This Term Performance</th>
      <th style={{ border: "1px solid black", color: `${colors.rcolor}`, textAlign: "center" }}>Previous Term Performance</th>
      
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style={{ border: "1px solid black", color: `${colors.rcolor}`, textAlign: "center" }}> 
      <PerformanceRow> <PerformanceText>Total Raw Score: </PerformanceText> 791/1000  </PerformanceRow>
     
      <PerformanceRow> <PerformanceText>Student Average(%): </PerformanceText> 79.1  </PerformanceRow>  
      
      <PerformanceRow> <PerformanceText>Total Pass: </PerformanceText> 8  </PerformanceRow>
      
      <PerformanceRow> <PerformanceText>Total Failed: </PerformanceText> 2  </PerformanceRow> 
        
        
        </td>
      <td style={{  border: "1px solid black", color: `${colors.rcolor}`, textAlign: "center" }}>

      <PerformanceRow> <PerformanceText>Total Raw Score: </PerformanceText> 791/1000  </PerformanceRow>
     
      <PerformanceRow> <PerformanceText>Student Average(%): </PerformanceText> 79.1  </PerformanceRow>  
    
      <PerformanceRow> <PerformanceText>Total Pass: </PerformanceText> 8  </PerformanceRow>
     
      <PerformanceRow> <PerformanceText>Total Failed: </PerformanceText> 2  </PerformanceRow> 


      </td>
     
    </tr>





  </tbody>
</table>









</HomeContainerT>

    </ContainerT>
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <AdmitButton2
          background={colors.lightgreen}
          color="white"
          border={colors.maingreen}
          onClick={goToPreviousStudent}
          
          type="button"
        >
          Previous
        </AdmitButton2>

        <AdmitButton2
          background={colors.lightgreen}
          color="white"
          border={colors.maingreen}
          onClick={() => {
            goToNextStudent(attn,out,cond,attit,interest,classTRemarks,SId);
            handleSubmit();
          }}
          type="button"
        >
          {isLastStudent ? 'Submit' : 'Next'}
        </AdmitButton2>
      </div>

    
    </>

  )
}

export default Reportrblue