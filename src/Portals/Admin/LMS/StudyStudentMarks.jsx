import React, { useEffect, useState } from 'react'
import { FormInputStudent, FormInputStudent4, FormInputStudent6, GradeInput, PaySelector, SelectForStudent, SelectForStudentRel } from '../../../Designs/Styles/Profile'
import { colors } from '../../../Designs/Colors'
import { apiServer } from '../../../Constants /Endpoints'
import { AES,enc } from 'crypto-js'
import { Table } from 'semantic-ui-react'
import { HeaderText } from '../../../Designs/Styles/HyChat'


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


      const [studentList, setStudentList] = useState([]);
      const [c,sc]= useState("")
      useEffect(()=>{
        if(c){

            const URL = `api/Grade/ClassList?Level=${c}`
            fetch(apiServer+URL)
            .then(res=>res.json())
            .then(data=>setStudentList(data))
            .catch(err => console.error(err))

        }
       
      },[c])
      



  return (
    <div>
<div style={{display:"flex", flexDirection:"row", justifyContent:'space-evenly', width:'100%' }}>
<PaySelector
    background={colors.card}
    color="white"
    border={colors.darkBlue}
    onChange={(e) => sc(e.target.value)}
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
    //onChange={(e) => sd(e.target.value)}
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
    //onChange={(e) => sa(e.target.value)}
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
    //onChange={(e) => sb(e.target.value)}
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

                    <Table.Cell>
                    <HeaderText>Position</HeaderText>
                       
                    </Table.Cell>

                    <Table.Cell>
                    <HeaderText> Comment</HeaderText>
                    </Table.Cell>



                </Table.Row>

            </Table.Header>

            <Table.Body>
{
studentList.length>0&&
studentList.map((data, index)=>(
    <Table.Row>
<Table.Cell>
<HeaderText>{data.studentId}</HeaderText>


</Table.Cell>

<Table.Cell>
<HeaderText>{data.firstName} {data.otherName} {data.lastName} </HeaderText>
</Table.Cell>



    <Table.Cell> 
       
   <GradeInput
   type="number"
   //value={theStudent?.studentId}
   //onChange={(e) => se(e.target.value)}
   required
   />
   
   </Table.Cell>

   <Table.Cell> 
       
   <GradeInput
   type="number"
   //value={theStudent?.studentId}
   //onChange={(e) => se(e.target.value)}
   required
   />
   
   </Table.Cell>

   <Table.Cell>

   </Table.Cell>

   <Table.Cell>
    
    </Table.Cell>

      </Table.Row>
))

}


    



            </Table.Body>
</Table>




    </div>
  )
}

export default StudyStudentMarks