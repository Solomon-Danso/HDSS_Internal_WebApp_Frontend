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


    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
      const encryptedData = sessionStorage.getItem("userDataEnc");
      const encryptionKey = '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK';
      const decryptedData = AES.decrypt(encryptedData, encryptionKey);
      const decryptedString = decryptedData.toString(enc.Utf8);
      const parsedData = JSON.parse(decryptedString);
        setUserInfo(parsedData);
    }, []);



  return (
    <Container>
<HomeContainer>
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
    <RSchoolNameS>Terminal Report</RSchoolNameS>
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
<div style={{color:`${colors.rblue}`, fontWeight:"bold"}}>24</div>
</GInfoMiniRow>


<GInfoMiniRow>
<div>Vacation Date: </div>
<div style={{color:`${colors.rblue}`, fontWeight:"bold"}}>8th December, 2023</div>
</GInfoMiniRow>


</GInfoRow>

<GInfoRow>

<GInfoMiniRow>
<div>Student Name: </div>
<div style={{color:`${colors.rblue}`, fontWeight:"bold"}}>{userInfo.firstName}{" "}{userInfo.otherName}{" "}{userInfo.lastName}</div>
</GInfoMiniRow>

<GInfoMiniRow>
<div>Year: </div>
<div style={{color:`${colors.rblue}`, fontWeight:"bold"}}>2023-2024</div>
</GInfoMiniRow>

<GInfoMiniRow>
<div>Reopening Date: </div>
<div style={{color:`${colors.rblue}`, fontWeight:"bold"}}>10th January, 2023</div>
</GInfoMiniRow>

</GInfoRow>

<GInfoRow>

<GInfoMiniRow>
<div>Stage: </div>
<div style={{color:`${colors.rblue}`, fontWeight:"bold"}}>{userInfo.level}</div>
</GInfoMiniRow>

<GInfoMiniRow>
<div>Term: </div>
<div style={{color:`${colors.rblue}`, fontWeight:"bold"}}>3</div>
</GInfoMiniRow>

<GInfoMiniRow>
<div>Position: </div>
<div style={{color:`${colors.mainred}`, fontWeight:"bold"}}>1st out of 24 students</div>
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
   
    
    <tr>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>Mathematics</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>85</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>90</td>
      <td style={{ border: "1px solid black",color:`${colors.mainred}`,textAlign:"center", fontWeight:800 }}>175</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>1</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>Level 1 A</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>Advance</td>
    </tr>

    <tr>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>Mathematics</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>85</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>90</td>
      <td style={{ border: "1px solid black",color:`${colors.mainred}`,textAlign:"center", fontWeight:800 }}>175</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>1</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>Level 1 A</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>Advance</td>
    </tr>

    <tr>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>Mathematics</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>85</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>90</td>
      <td style={{ border: "1px solid black",color:`${colors.mainred}`,textAlign:"center", fontWeight:800 }}>175</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>1</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>Level 1 A</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>Advance</td>
    </tr>

    <tr>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>Mathematics</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>85</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>90</td>
      <td style={{ border: "1px solid black",color:`${colors.mainred}`,textAlign:"center", fontWeight:800 }}>175</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>1</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>Level 1 A</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>Advance</td>
    </tr>

    <tr>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>Mathematics</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>85</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>90</td>
      <td style={{ border: "1px solid black",color:`${colors.mainred}`,textAlign:"center", fontWeight:800 }}>175</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>1</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>Level 1 A</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>Advance</td>
    </tr>

    <tr>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>Mathematics</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>85</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>90</td>
      <td style={{ border: "1px solid black",color:`${colors.mainred}`,textAlign:"center", fontWeight:800 }}>175</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>1</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>Level 1 A</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>Advance</td>
    </tr>

    <tr>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>Mathematics</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>85</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>90</td>
      <td style={{ border: "1px solid black",color:`${colors.mainred}`,textAlign:"center", fontWeight:800 }}>175</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>1</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>Level 1 A</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>Advance</td>
    </tr>

    <tr>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>Mathematics</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>85</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>90</td>
      <td style={{ border: "1px solid black",color:`${colors.mainred}`,textAlign:"center", fontWeight:800 }}>175</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>1</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>Level 1 A</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>Advance</td>
    </tr>

    <tr>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>Mathematics</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>85</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>90</td>
      <td style={{ border: "1px solid black",color:`${colors.mainred}`,textAlign:"center", fontWeight:800 }}>175</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>1</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>Level 1 A</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>Advance</td>
    </tr>

    <tr>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>Mathematics</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>85</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>90</td>
      <td style={{ border: "1px solid black",color:`${colors.mainred}`,textAlign:"center", fontWeight:800 }}>175</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>1</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>Level 1 A</td>
      <td style={{ border: "1px solid black",color:`${colors.rcolor}`,textAlign:"center" }}>Advance</td>
    </tr>




  </tbody>
</table>


<PerformanceInfoContainer>


<GInfoRow>

<GInfoMiniRow>
<div>Attendance: </div>
<div style={{color:`${colors.rblue}`, fontWeight:"bold"}}>55</div>
</GInfoMiniRow>

<GInfoMiniRow>
<div>Out of: </div>
<div style={{color:`${colors.rblue}`, fontWeight:"bold"}}>56</div>
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
<div style={{color:`${colors.rblue}`, fontWeight:"bold"}}>Respectful and Obidient</div>
</GInfoMiniRow>


</GInfoRow>

<GInfoRow>

<GInfoMiniRow>
<div>Attitude: </div>
<div style={{color:`${colors.rblue}`, fontWeight:"bold"}}>Hardworking</div>
</GInfoMiniRow>

</GInfoRow>

<GInfoRow>

<GInfoMiniRow>
<div>Interest: </div>
<div style={{color:`${colors.rblue}`, fontWeight:"bold"}}>Science and Mathematics</div>
</GInfoMiniRow>

</GInfoRow>
<GInfoRow>

<GInfoMiniRow>
<div>Class Teacher Remarks: </div>
<div style={{color:`${colors.rblue}`, fontWeight:"bold"}}>Can do better than this with encouragement from parent</div>
</GInfoMiniRow>

</GInfoRow>
<br/><br/>
<GInfoRow>

<GInfoMiniRow>
<div>Headteacher's Signature : </div>
<div style={{color:`${colors.rblue}`, fontWeight:"bold"}}>..............................................................................................</div>
</GInfoMiniRow>

</GInfoRow>

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