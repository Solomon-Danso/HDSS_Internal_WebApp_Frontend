import React, { useState } from 'react'
import { CardImage, CardText, NewStudentListCard, SelectStageButton } from '../../Designs/Styles/Profile'
import { apiServer } from '../../Constants /Endpoints'
import { colors } from '../../Designs/Colors'
import AnimateHeight from 'react-animate-height'
import "../../Designs/Card/DuesTable.scss";
import "../../Designs/Card/PendingRegistrations.scss";
import { useNavigate } from 'react-router-dom'
import {
  PendingFullContainer,
  PendingFullDiv,
} from "../../Designs/Card/PendingRegistrations";


const Eachrow = (rowdata) =>(
    <div
        style={{
            display: "flex",
            borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
            marginBottom: 5,
        }}
    >
        <div style={{ flex: 0.3, color: "gray" }}>{rowdata?.title}</div>
        <div style={{ flex: 0.7, paddingLeft: 3 }}>{rowdata?.content}</div>
    </div>
)




export const TeacherCard = ({ data }) => {
    const navigate = useNavigate();
    const thelink = apiServer+data?.filePath

    const getOrdinalSuffix = (day) => {
        if (day >= 11 && day <= 13) {
          return "th";
        }
        switch (day % 10) {
          case 1:
            return "st";
          case 2:
            return "nd";
          case 3:
            return "rd";
          default:
            return "th";
        }
      };

      const formatMonthAbbreviation = (month) => {
        const months = [
          "Jan.", "Feb.", "Mar.", "Apr.",
          "May", "Jun.", "Jul.", "Aug.",
          "Sep.", "Oct.", "Nov.", "Dec."
        ];
        return months[month];
      };
      
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
      
        const formattedDate = `${day}${getOrdinalSuffix(day)} ${formatMonthAbbreviation(month)} ${year}`;
      
        return formattedDate;
      };
      
const [dropper, setDropper] = useState(false)



  return (
    <>
    <NewStudentListCard>
     <CardText>{data?.staffID}</CardText>
     <CardImage src={thelink}/>
     <CardText>{data?.lastName}, {data?.firstName} {data?.otherName} </CardText>
     <CardText>{data?.gender}</CardText>
     <CardText> {formatDate(data?.dateOfBirth)}</CardText>
     <CardText> {data?.position}</CardText>
     <CardText> {data?.phoneNumber}</CardText>
     <CardText> {data?.email}</CardText>
     <SelectStageButton
     background={colors.darkBlue}
     color="white"
     border={colors.darkBlue}
     onClick={(e)=>{
        navigate(`/admin/teacherDetails/${data?.staffID}`)
     }}
     >
       View Details
     </SelectStageButton>


    </NewStudentListCard>

    <AnimateHeight height={dropper ? "auto" : 0}>
    <PendingFullContainer>
                <PendingFullDiv width={0.7} direction="row">
                <span style={{ flex: 1, paddingLeft: 10 }}>
                    <Eachrow
                        title = {"Student Id"}
                        content = {data?.staffID}
                    />
                 

               


                





                </span>
                </PendingFullDiv>
            </PendingFullContainer>
        </AnimateHeight>


    </>
  )
}
