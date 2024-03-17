import React, { useEffect, useState } from 'react'
import { CardImage, CardText, NewStudentListCard, SelectStageButton } from '../../Designs/Styles/Profile'
import { apiMedia, apiServer } from '../../Constants /Endpoints'
import { colors } from '../../Designs/Colors'
import AnimateHeight from 'react-animate-height'
import "../../Designs/Card/DuesTable.scss";
import "../../Designs/Card/PendingRegistrations.scss";
import { useNavigate } from 'react-router-dom'
import {
  PendingFullContainer,
  PendingFullDiv,
} from "../../Designs/Card/PendingRegistrations";
import { AES,enc } from 'crypto-js'
import { Show } from '../../Constants /Alerts'


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




export const MyStudentCard = ({ data }) => {
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

 const specificRole="SuperiorUser"
 const [userInfo, setUserInfo] = useState({});

      useEffect(() => {
      try{
  
        const encryptedData = sessionStorage.getItem("userDataEnc");
        const encryptionKey = '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK';
        const decryptedData = AES.decrypt(encryptedData, encryptionKey);
        const decryptedString = decryptedData.toString(enc.Utf8);
        const parsedData = JSON.parse(decryptedString);
          setUserInfo(parsedData);
  
          
  
      }catch(e){
        navigate("/")
        window.location.reload()
      }
     
    }, []);


 const [RoleList, setRoleList] = useState([])
      useEffect(()=>{
        handleRoles()
      
      },[userInfo])
      
      
      
      const handleRoles = async () => {
       
       
          try {
            const formData = new FormData();
      
            const CompanyId = userInfo.CompanyId;
            const UserId = userInfo.UserId;
          
            formData.append("CompanyId",CompanyId)
            formData.append("UserId",UserId)
      
        
            const response = await fetch(apiServer+"ViewUserDetailedRole", {
              method: "POST",
              body: formData
            });
      
            const data = await response.json();
        
            if (response.ok) {
              
             
              setRoleList(data)
              
            } else {
            
            }
          } catch (error) {
      
            Show.Attention("An error has occurred");
            navigate("/")
            window.location.reload()
          }
      
      }


    const checkRole = (role) => {
      return RoleList.includes(role);
    };




  return (
    <>
    <NewStudentListCard>
     <CardText>{data?.StudentId}</CardText>
     <CardImage src={thelink}/>
     <CardText>{data?.LastName}, {data?.FirstName} {data?.OtherName} </CardText>
     <CardText>{data?.Gender}</CardText>
     <CardText> {formatDate(data?.DateOfBirth)}</CardText>
     <CardText> {data?.Level}</CardText>
     <CardText> {data?.EmergencyContactName}</CardText>
     <CardText> {data?.EmergencyPhoneNumber}</CardText>

     {
   checkRole("SuperAdmin")|| checkRole("HeadTeacher")?(<>
   
       
   <SelectStageButton
     background={colors.darkBlue}
     color="white"
     border={colors.darkBlue}
     onClick={(e)=>{
        navigate(`/admin/studentsDetails/${data?.StudentId}`)
     }}
     >
       View Details
     </SelectStageButton>
   </>):(<></>)
}



    </NewStudentListCard>

    <AnimateHeight height={dropper ? "auto" : 0}>
    <PendingFullContainer>
                <PendingFullDiv width={0.7} direction="row">
                <span style={{ flex: 1, paddingLeft: 10 }}>
                    <Eachrow
                        title = {"Student Id"}
                        content = {data?.StudentId}
                    />
                  <Eachrow
                    title="Student Name"
                    content={
                        <div>
                        {data?.LastName}, {data?.FirstName} {data?.OtherName}
                        </div>
                    }
                    />

                    <Eachrow
                        title = {"Date Of Birth"}
                        content = {formatDate(data?.DateOfBirth)}
                    />
                    <Eachrow
                        title="Gender"
                        content= {data?.Gender}
                        />

                    <Eachrow
                        title = {"Home Town"}
                        content = {data?.HomeTown}
                    />
                    <Eachrow
                        title = {"Location"}
                        content = {data?.Location}
                    />
                    <Eachrow
                        title = {"Country"}
                        content = {data?.Country}
                    />

                        <Eachrow
                        title = {"Student Email"}
                        content = {data?.Email}
                    />
                    <Eachrow
                        title = {"Student Phone Number"}
                        content = {data?.PhoneNumber}
                    />

                    <Eachrow
                        title = {"Father Name"}
                        content = {data?.FathersName}
                    />
                    <Eachrow
                        title = {"Father Occupation"}
                        content = {data?.FatherOccupation}
                    />
                    <Eachrow
                        title = {"Mother Name"}
                        content = {data?.MothersName}
                    />
                    <Eachrow
                        title = {"Mother Occupation"}
                        content = {data?.MotherOccupation}
                    />
                    <Eachrow
                        title = {"Guardian Name"}
                        content = {data?.GuardianName}
                    />
                    <Eachrow
                        title = {"Guardian Occupation"}
                        content = {data?.GuardianOccupation}
                    />
                    <Eachrow
                        title = {"Parent Current Location"}
                        content = {data?.ParentLocation}
                    />
                    <Eachrow
                        title = {"Parent Digital Address"}
                        content = {data?.ParentDigitalAddress}
                    />
                     <Eachrow
                        title = {"Parent Religion"}
                        content = {data?.ParentReligion}
                    />
                    <Eachrow
                        title = {"Parent Email"}
                        content = {data?.ParentEmail}
                    />
                    <Eachrow
                        title = {"Emergency Contact Name"}
                        content = {data?.EmergencyContactName}
                    />
                    <Eachrow
                        title = {"Emergency Phone Number"}
                        content = {data?.EmergencyPhoneNumber}
                    />
               
               <Eachrow
                        title = {"Emergency Alternate PhoneNumber"}
                        content = {data?.EmergencyAlternatePhoneNumber}
                    />
                    <Eachrow
                        title = {"Relationship With Child"}
                        content = {data?.RelationshipWithChild}
                    />
                    <Eachrow
                        title = {"Student Religion"}
                        content = {data?.Religion}
                    />
                    <Eachrow
                        title = {"Parent Location"}
                        content = {data?.ParentLocation}
                    />
                    <Eachrow
                        title = {"Parent Phone Number"}
                        content = {data?.ParentPhoneNumber}
                    />
                     <Eachrow
                        title = {"Alternate Phone Number"}
                        content = {data?.AlternatePhoneNumber}
                    />
                    <Eachrow
                        title = {"Medical Information"}
                        content = {data?.MedicalIInformation}
                    />
                    <Eachrow
                        title = {"Current Class"}
                        content = {data?.Level}
                    />
                    <Eachrow
                        title = {"Amount Owing"}
                        content = {data?.AmountOwing}
                    /> <Eachrow
                    title = {"Credit Amount"}
                    content = {data?.CreditAmount}
                />
                <Eachrow
                    title = {"Admission Date"}
                    content = {data?.AdmissionDate}
                />
                 <Eachrow
                    title = {"School Bank Account"}
                    content = {data?.SchoolBankAccount}
                />


               


                





                </span>
                </PendingFullDiv>
            </PendingFullContainer>
        </AnimateHeight>


    </>
  )
}
