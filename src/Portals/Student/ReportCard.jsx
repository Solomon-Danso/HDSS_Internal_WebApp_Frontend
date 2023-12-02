import React, { useEffect, useState } from 'react'
import { Container, GInfoMiniRow, GInfoRow, GeneralInfoContainer, HomeContainer, PerformanceInfoContainer, PerformanceRow, PerformanceText, RSchoolName, RSchoolNameS, RStudCenter } from '../../Designs/Styles/Letter'
import { apiServer } from '../../Constants /Endpoints'
import { RSSchoolLogo, RSchoolLogo, SchoolLogo } from '../../Designs/Styles/Styles'
import { StudCenter } from '../../Designs/Styles/Profile'
import { AES, enc } from 'crypto-js'
import { colors } from '../../Designs/Colors'
import { Table } from 'semantic-ui-react'
import { HeaderText } from '../../Designs/Styles/HyChat'

const Reportrblue = () => {


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

    



    const handlePrint = () => {
        window.print(); // Initiates the browser's print functionality
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


    const [StudentCounter, setStudentCounter] = useState(0)
    useEffect(()=>{
        fetch(apiServer+"api/Grade/StudentCounters?Level="+userInfo.level)
        .then(res=>res.json())
        .then(data=>setStudentCounter(data))
        .catch(error=>console.error(error))
        },[userInfo.level])


    const [TermResult, setTermResult] = useState([])
    
    useEffect(()=>{
        if(userInfo&&ReportData){
        const URL = `api/Grade/ViewTermGrades?StudentId=${userInfo.studentId}&Year=${ReportData.academicYear}&Term=${ReportData.academicTerm}&Level=${userInfo.level}`
            fetch(apiServer+URL)
        .then(res=>res.json())
        .then(data=>setTermResult(data))
        .catch(error=>console.error(error))
        }
        
        },[userInfo, ReportData])


        const [attn, setAttn] = useState(0);
        const [out,setOut] = useState(0)
        const [cond, setCond] = useState("")
        const [attit, setAttit] = useState("")
        const [interest, setInterest] = useState("")
        const [classTRemarks, setClassTRemarks] = useState("")
        const [teacherName, setTeacherName] = useState("")
        
        useEffect(()=>{
          const URL =   `api/Grade/GetTermReportOnReload?Level=${userInfo.level}&SID=${userInfo.studentId}`
          fetch(apiServer+URL)
          .then(res=>res.json())
          .then(kofi=>{
            setAttn(kofi.attendance)
            setOut(kofi.outOf)
            setCond(kofi.conduct)
            setAttit(kofi.attitude)
            setInterest(kofi.interest)
            setClassTRemarks(kofi.classTeacherRemarks)
            setTeacherName(kofi.teacherName)

          })
          .catch(error=>console.error(error))



        },[userInfo])
        
 







  return (
    <Container>
         
        


<HomeContainer >
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
      src={apiServer + userInfo.profilePic}
      alt="icon"
      style={{ marginTop:"-15rem", padding:'1rem' }}
    />
  </div>
</RStudCenter>

<GeneralInfoContainer>
<GInfoRow>

<GInfoMiniRow>
<div>StudentID: </div>
<div style={{color:`${colors.rblue}`, fontWeight:"bold"}}>{userInfo.studentId}</div>
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
<div style={{color:`${colors.rblue}`, fontWeight:"bold"}}>{userInfo.firstName}{" "}{userInfo.otherName}{" "}{userInfo.lastName}</div>
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
<div style={{color:`${colors.rblue}`, fontWeight:"bold"}}>{userInfo.level}</div>
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


<PerformanceInfoContainer>


<GInfoRow>

<GInfoMiniRow>
<div>Attendance: </div>
<div style={{color:`${colors.rblue}`, fontWeight:"bold"}}>{attn}</div>
</GInfoMiniRow>

<GInfoMiniRow>
<div>Out of: </div>
<div style={{color:`${colors.rblue}`, fontWeight:"bold"}}>{out}</div>
</GInfoMiniRow>

<GInfoMiniRow>
<div>Promoted To: </div>
<div style={{color:`${colors.mainred}`, fontWeight:"bold"}}>Basic 9</div>
</GInfoMiniRow>

</GInfoRow>
<br/>
<GInfoRow>

<GInfoMiniRow>
<div>Conduct: </div>
<div style={{color:`${colors.rblue}`, fontWeight:"bold"}}>{cond}</div>
</GInfoMiniRow>


</GInfoRow>

<GInfoRow>

<GInfoMiniRow>
<div>Attitude: </div>
<div style={{color:`${colors.rblue}`, fontWeight:"bold"}}>{attit}</div>
</GInfoMiniRow>

</GInfoRow>

<GInfoRow>

<GInfoMiniRow>
<div>Interest: </div>
<div style={{color:`${colors.rblue}`, fontWeight:"bold"}}>{interest}</div>
</GInfoMiniRow>

</GInfoRow>
<GInfoRow>

<GInfoMiniRow>
<div>Class Teacher Remarks: </div>
<div style={{color:`${colors.rblue}`, fontWeight:"bold"}}>{classTRemarks}</div>
</GInfoMiniRow>

</GInfoRow>
<br/>

<GInfoRow>

<GInfoMiniRow>
<div>Headteacher's Signature : </div>
<div style={{color:`${colors.rblue}`, fontWeight:"bold"}}>..............................................................................................</div>
</GInfoMiniRow>

</GInfoRow>

<GInfoMiniRow>
<div style={{color:`${colors.rblue}`, fontWeight:"bold"}}>This report was prepared by {teacherName} (Class Teacher)</div>
</GInfoMiniRow>


</PerformanceInfoContainer>



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









</HomeContainer>

    </Container>
  )
}

export default Reportrblue