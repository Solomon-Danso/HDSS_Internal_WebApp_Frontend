import React, { useState } from 'react'
import { CardImage, CardImageM, CardText, CardTextM, NewStudentListCard, SelectStageButton } from '../../Designs/Styles/Profile'
import { apiServer } from '../../Constants /Endpoints'
import { colors } from '../../Designs/Colors'
import AnimateHeight from 'react-animate-height'


import "../../Designs/Card/DuesTable.scss";
import "../../Designs/Card/PendingRegistrations.scss";

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




export const MyStudentCardM = ({ data }) => {
    const thelink = apiServer+data?.profilePic

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
 
     <CardImageM src={thelink}/>
     <CardTextM>{data?.lastName}, {data?.firstName} {data?.otherName} </CardTextM>

     
     <SelectStageButton
     background={colors.darkBlue}
     color="white"
     border={colors.darkBlue}
     onClick={(e)=>{
        setDropper(!dropper)
     }}
     >
       {dropper?"View Less":"View More"}
     </SelectStageButton>


    </NewStudentListCard>

    <AnimateHeight height={dropper ? "auto" : 0}>
    <PendingFullContainer>
                <PendingFullDiv width={0.7} direction="row">
                <span style={{ flex: 1, paddingLeft: 10 }}>
                    <Eachrow
                        title = {"Student Id"}
                        content = {data?.studentId}
                    />
                  <Eachrow
                    title="Student Name"
                    content={
                        <div>
                        {data?.lastName}, {data?.firstName} {data?.otherName}
                        </div>
                    }
                    />

                    <Eachrow
                        title = {"Date Of Birth"}
                        content = {formatDate(data?.dateOfBirth)}
                    />
                    <Eachrow
                        title="Gender"
                        content= {data?.gender}
                        />

                    <Eachrow
                        title = {"Home Town"}
                        content = {data?.homeTown}
                    />
                    <Eachrow
                        title = {"Location"}
                        content = {data?.location}
                    />
                    <Eachrow
                        title = {"Country"}
                        content = {data?.country}
                    />

                        <Eachrow
                        title = {"Student Email"}
                        content = {data?.email}
                    />
                    <Eachrow
                        title = {"Student Phone Number"}
                        content = {data?.phoneNumber}
                    />

                    <Eachrow
                        title = {"Father Name"}
                        content = {data?.fathersName}
                    />
                    <Eachrow
                        title = {"Father Occupation"}
                        content = {data?.fatherOccupation}
                    />
                    <Eachrow
                        title = {"Mother Name"}
                        content = {data?.mothersName}
                    />
                    <Eachrow
                        title = {"Mother Occupation"}
                        content = {data?.motherOccupation}
                    />
                    <Eachrow
                        title = {"Guardian Name"}
                        content = {data?.guardianName}
                    />
                    <Eachrow
                        title = {"Guardian Occupation"}
                        content = {data?.guardianOccupation}
                    />
                    <Eachrow
                        title = {"Parent Current Location"}
                        content = {data?.parentLocation}
                    />
                    <Eachrow
                        title = {"Parent Digital Address"}
                        content = {data?.parentDigitalAddress}
                    />
                     <Eachrow
                        title = {"Parent Religion"}
                        content = {data?.parentReligion}
                    />
                    <Eachrow
                        title = {"Parent Email"}
                        content = {data?.parentEmail}
                    />
                    <Eachrow
                        title = {"Emergency Contact Name"}
                        content = {data?.emergencyContactName}
                    />
                    <Eachrow
                        title = {"Emergency Phone Number"}
                        content = {data?.emergencyPhoneNumber}
                    />
               
               <Eachrow
                        title = {"Emergency Alternate PhoneNumber"}
                        content = {data?.emergencyAlternatePhoneNumber}
                    />
                    <Eachrow
                        title = {"Relationship With Child"}
                        content = {data?.relationshipWithChild}
                    />
                    <Eachrow
                        title = {"Student Religion"}
                        content = {data?.religion}
                    />
                    <Eachrow
                        title = {"Parent Location"}
                        content = {data?.parentLocation}
                    />
                    <Eachrow
                        title = {"Parent Phone Number"}
                        content = {data?.parentPhoneNumber}
                    />
                     <Eachrow
                        title = {"Alternate Phone Number"}
                        content = {data?.alternatePhoneNumber}
                    />
                    <Eachrow
                        title = {"Medical Information"}
                        content = {data?.medicalIInformation}
                    />
                    <Eachrow
                        title = {"Current Class"}
                        content = {data?.level}
                    />
                    <Eachrow
                        title = {"Amount Owing"}
                        content = {data?.amountOwing}
                    /> <Eachrow
                    title = {"Credit Amount"}
                    content = {data?.creditAmount}
                />
                <Eachrow
                    title = {"Admission Date"}
                    content = {data?.admissionDate}
                />
                 <Eachrow
                    title = {"School Bank Account"}
                    content = {data?.schoolBankAccount}
                />


               


                





                </span>
                </PendingFullDiv>
            </PendingFullContainer>
        </AnimateHeight>


    </>
  )
}
