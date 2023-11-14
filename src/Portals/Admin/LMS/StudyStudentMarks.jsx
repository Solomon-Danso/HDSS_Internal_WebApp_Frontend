import React, { useEffect, useState } from 'react'
import { AdmitButton2, FormInputStudent, FormInputStudent4, FormInputStudent6, GradeInput, PaySelector, SelectForStudent, SelectForStudentRel } from '../../../Designs/Styles/Profile'
import { colors } from '../../../Designs/Colors'
import { apiServer } from '../../../Constants /Endpoints'
import { AES,enc } from 'crypto-js'
import StudentTableRow from './StudyStudentRow'; // Adjust the path accordingly
import { HeaderText } from '../../../Designs/Styles/HyChat'
import { Show } from '../../../Constants /Alerts'
import { Table } from 'semantic-ui-react'


const StudyStudentMarks = () => {

    const [userInfo, setUserInfo] = useState({});

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
      
      
      const handleChangeX = (event, indx, namex) => {
        let newFormValues = [...rowList];
      
        // Ensure that the object structure matches the initial state
        if (!newFormValues[indx]) {
          newFormValues[indx] = { studentId: '', studentName: '', classScore: '', examScore: '' };
        }
      
        if (namex === 'classScore' || namex === 'examScore') {
          // Handle numeric fields
          newFormValues[indx][namex] = parseFloat(event.target.value);
          
        } else if (namex === 'studentId' || namex === 'studentName') {
          // Handle studentId and studentName
          newFormValues[indx][namex] = event.target.value;
        }
      
        setRowValues(newFormValues);
      };
      
      
      
const [level, setLevel] = useState("")
const [subject, setsubject] = useState("")
const [academicYear, setacademicYear] = useState("")
const [academicTerm, setacademicTerm] = useState("")


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


const handleSubmit = async (event) => {
  event.preventDefault();

  try {

 

    const requestDataArray = rowList.map((row) => {
      return {
        studentId: row.studentId,
        studentName: row.studentName,
        classScore: row.classScore,
        examScore: row.examScore,
        level: level,
        subject: subject,
        academicYear: academicYear,
        academicTerm: academicTerm, // Update this with the actual userCompanyId if needed
      };
    });

    const requests = requestDataArray.map(async (requestData) => {
      try {
        const response = await fetch(apiServer + `api/Grade/UploadResult?SID=${userInfo.staffID}` , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        if (response.ok) {
          return 'Result submitted successfully';
        } else {
          throw new Error('Result submission failed');
        }
      } catch (error) {
        throw error;
      }
    });

    const responses = await Promise.all(requests);

    responses.forEach((response) => {
      if (response === 'Result submitted successfully') {
        Show.Success('Result submitted successfully');
        window.location.reload();
      } else {
        Show.Attention('Result submission failed');
      }
    });

    //setReload(true); // Reload the page or update the data as needed
  } catch (error) {
    Show.Attention(error);
  }
};








  return (
    <div>
<div style={{display:"flex", flexDirection:"row", justifyContent:'space-evenly', width:'100%' }}>
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

    <PaySelector
    background={colors.card}
    color="white"
    border={colors.darkBlue}
    onChange={(e) => setacademicYear(e.target.value)}
    required
    >
        <option>Academic Year</option>
   {AcaYear.length > 0 &&
    AcaYear.map((data) => (
      <option key={data.id}>{data.academicYear}</option>
    ))}

    </PaySelector>

    <PaySelector
    background={colors.card}
    color="white"
    border={colors.darkBlue}
    onChange={(e) => setacademicTerm(e.target.value)}
    required
    >
        <option>Academic Term</option>
   {AcaTerm.length > 0 &&
    AcaTerm.map((data) => (
      <option key={data.id}>{data.academicTerm}</option>
    ))}

    </PaySelector>

</div>

<Table style={{
        width:"100%",
        padding:"2rem"
    }} >
            <Table.Header>
                <Table.Row>
                    <Table.Cell>
                        <HeaderText>ID</HeaderText>
                        
                    </Table.Cell>

                    <Table.Cell>
                    <HeaderText>Student Name</HeaderText>
                    
                    </Table.Cell>

                    <Table.Cell>
                    <HeaderText>Class Score(100%)</HeaderText>
                       
                    </Table.Cell>

                    <Table.Cell>
                    <HeaderText>Exams Score (100%)</HeaderText>
                   
                    </Table.Cell>

                   


                </Table.Row>

            </Table.Header>

           

            <Table.Body>
  {studentList.length > 0 &&
    studentList.map((data, idx) => (
      <StudentTableRow
        key={idx}
        data={data}
        idx={idx}
        handleChangeX={handleChangeX}
      />
    ))}
</Table.Body>





</Table>


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