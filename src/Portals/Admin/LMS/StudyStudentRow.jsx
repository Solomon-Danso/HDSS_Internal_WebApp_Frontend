import React, { useEffect, useRef, useState } from 'react';
import { Table } from 'semantic-ui-react';
import { GradeInput, OptionButton } from '../../../Designs/Styles/Profile';
import { GradeImage, HeaderText, HeaderTextG } from '../../../Designs/Styles/HyChat';
import { apiServer } from '../../../Constants /Endpoints';
import { Show } from '../../../Constants /Alerts';
import { AES, enc } from 'crypto-js';
import { colors } from '../../../Designs/Colors';

const StudentTableRow = ({ data, level, subject, year, term,count,setCount}) => {
 





  const [classScore, setClassScore] = useState("")
  const [examsScore, setExamsScore] = useState("")
  const [average, setAverage] = useState("")
  const [position, setPosition] = useState("")



const [userInfo, setUserInfo] = useState({});

useEffect(() => {
  const encryptedData = sessionStorage.getItem("userDataEnc");
  const encryptionKey = '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK';
  const decryptedData = AES.decrypt(encryptedData, encryptionKey);
  const decryptedString = decryptedData.toString(enc.Utf8);
  const parsedData = JSON.parse(decryptedString);
    setUserInfo(parsedData);
}, []);


const [nowRun, setNowRun] = useState(false);
const timerRef = useRef(null);

const updateData = () => {
  const URL = `api/Grade/ViewSingleSubjectGradeStudent?StudentId=${data.studentId}&Year=${year}&Term=${term}&Level=${level}&Subject=${subject}`;

  fetch(apiServer + URL)
    .then((res) => res.json())
    .then((kofi) => {
      setClassScore(kofi.classScore || '');
      setExamsScore(kofi.examScore || '');
      setAverage(kofi.average || '');
      setPosition(kofi.position || '');
    })
    .catch((err) => {
      console.error(err);
      setClassScore('');
      setExamsScore('');
      setAverage('');
      setPosition('');
    });
};




const handleSubmit = async () => {
  

  try {
    const studentData = data; // Define a local variable 'studentData' from the 'data' prop

    const response = await fetch(apiServer + `api/Grade/UploadResult?SID=${userInfo.staffID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentId: studentData.studentId,
        studentName: `${studentData.firstName} ${studentData.lastName} ${studentData.lastName}`,
        classScore: classScore||0,
        examScore: examsScore||0,
        level: level,
        subject: subject,
        academicYear: year,
        academicTerm: term,
      }),
    });

    const kofi = await response.text();

    if (response.ok) {
      setCount(count+1)
    } else {
      Show.Attention(kofi);
    }
  } catch (error) {
    Show.Attention("An error has occurred");
  }
};



  useEffect(() => {
    // Fetch initial data when the user visits the page
    updateData();
  }, [data, year, level, subject, term,count]);






  







  

  return (
    <Table.Row>
                
                    <Table.Cell>
                        <HeaderText>{data.studentId}</HeaderText>
                        
                    </Table.Cell>
                    <Table.Cell>
                        <GradeImage
                      src={apiServer+data.profilePic}
                         />
                        
                    </Table.Cell>

                    <Table.Cell>
                    <HeaderText>{data.firstName} {data.otherName} {data.lastName}</HeaderText>
                    
                    </Table.Cell>

                    <Table.Cell>
                    <HeaderTextG>
                    
                    <GradeInput
                    type="number"
                    step="0.01"
                    name="classScore"
                    value={classScore}

                    onChange={(e) => setClassScore(e.target.value)}
                    max="50"  // Set the maximum value to 100
                    required
                    />
                    
                    </HeaderTextG>
                       
                    </Table.Cell>

                    <Table.Cell>
                    <HeaderTextG>

                    <GradeInput
                    type="number"
                    step="0.01"
                    name="classScore"
                    value = {examsScore}
                    onChange={(e) => setExamsScore(e.target.value)}
                    max="50"  // Set the maximum value to 100
                    required
                    />
                    
                    </HeaderTextG>
                   
                    </Table.Cell>

                    <Table.Cell>
                    <HeaderTextG>{average}</HeaderTextG>
                   
                    </Table.Cell>

                    <Table.Cell>
                    <HeaderTextG>{position}</HeaderTextG>
                   
                    </Table.Cell>

                    <Table.Cell>

                    <OptionButton
            background={colors.lightgreen}
            color="white"
            border={colors.maingreen}
            onClick={handleSubmit}
            >ADD</OptionButton>

                    </Table.Cell>


                </Table.Row>

  );
};

export default StudentTableRow;
