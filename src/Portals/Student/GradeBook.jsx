import React, { useEffect, useState } from 'react'
import { Table } from 'semantic-ui-react'
import { HeaderText } from '../../Designs/Styles/HyChat'
import { apiServer } from '../../Constants /Endpoints'
import { AES, enc } from 'crypto-js'
import { AssSolUpBut, AssignSolnUpload, AssignmentInfoCard, FeesIconsS, FeesRow } from '../../Designs/Styles/Profile'
import { colors } from '../../Designs/Colors'
import { BsBook, BsFillCalendarDateFill } from 'react-icons/bs'
import { HiOutlineAcademicCap } from 'react-icons/hi'
import { MdOutlineGrade } from 'react-icons/md'
import { FaRankingStar } from 'react-icons/fa6'




const GradeBook = () => {

    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
      const encryptedData = sessionStorage.getItem("userDataEnc");
      const encryptionKey = '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK';
      const decryptedData = AES.decrypt(encryptedData, encryptionKey);
      const decryptedString = decryptedData.toString(enc.Utf8);
      const parsedData = JSON.parse(decryptedString);
        setUserInfo(parsedData);
    }, []);
  

const [grade, setGrades] = useState([])

useEffect(()=>{
    const URL = `api/StudentApp/GetGradeBook?studentId=${userInfo.studentId}`;
    fetch(apiServer+URL)
    .then(res => res.json())
    .then(data=>setGrades(data))
    .catch(err => console.error(err))

},)




  return (
    <div style={{display:'flex', flexDirection:'row',flexWrap:'wrap'}}>


{
            grade.length>0&&grade.map((data)=>(
                < AssignmentInfoCard>
    
                <div>
            
                <FeesRow>
            <FeesIconsS>
            <BsBook color={colors.icon}/>
            </FeesIconsS>
                   <HeaderText>{data.subjectName}</HeaderText>
            </FeesRow>
            
            <FeesRow>
            <FeesIconsS>
            <MdOutlineGrade color={colors.icon}/>
            </FeesIconsS>
                   <HeaderText>{data.marksObtained}{"/"}{data.totalObtained}</HeaderText>
            </FeesRow>

            <FeesRow>
            <FeesIconsS>
            <FaRankingStar color={colors.icon}/>
            </FeesIconsS>
                   <HeaderText>{data.position}</HeaderText>
            </FeesRow>
            <FeesRow>
            <FeesIconsS>
            <BsFillCalendarDateFill color={colors.icon}/>
            </FeesIconsS>
                   <HeaderText>{data.dateUploaded}</HeaderText>
            </FeesRow>
            
        
                    
                    
                 </div>
              
                
                </AssignmentInfoCard>  
                
            ))
        }




    </div>
  )
}

export default GradeBook