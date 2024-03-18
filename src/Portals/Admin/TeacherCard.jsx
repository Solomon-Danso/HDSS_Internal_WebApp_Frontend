import React, { useState } from 'react'
import { CardImage, CardText, NewStudentListCard, SelectStageButton } from '../../Designs/Styles/Profile'
import { apiServer,apiMedia } from '../../Constants /Endpoints'
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
    const thelink = apiMedia+data?.ProfilePic

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
     <CardText>{data?.StaffId}</CardText>
     <CardImage src={thelink}/>
     <CardText>{data?.LastName}, {data?.FirstName} {data?.OtherName} </CardText>
     <CardText>{data?.Gender}</CardText>
     <CardText> {formatDate(data?.DateOfBirth)}</CardText>
     <CardText> {data?.Position}</CardText>
     <CardText> {data?.PhoneNumber}</CardText>
     <CardText> {data?.Email}</CardText>
     <SelectStageButton
     background={colors.darkBlue}
     color="white"
     border={colors.darkBlue}
     onClick={(e)=>{
        navigate(`/admin/teacherDetails/${data?.StaffId}`)
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
