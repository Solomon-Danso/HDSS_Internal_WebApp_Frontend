import React, { useEffect, useState } from "react";
import {
  IconDashReceipt,
  IconDashTour,
  DashSearchContainer,
  IconDashContact,
  IconDashLocation,
  IconDashAcademic,
  IconDashEContacts,
  IconDashHistory,
  IconDashEContacts2,
} from "../../Designs/Styles/Profile";
import {
  ProfileCoverContainer,
  ProfileCoverImg,
  ProfileDivLeft,
  ProfileIfoContainer,
  ProfileImgUser,
  ProfileImgUserDefault,
  ProfileInfoSub,
  
  ProfileName,
  ProfileSchoolCourse,
  ProfileSchoolTitleHome,
  ProfileSectionCard,
  ProfileType,
} from "../../Designs/Styles/Profile";
import { TbSchool } from "react-icons/tb";
import { HiLocationMarker } from "react-icons/hi";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { colors } from '../../Designs/Colors';
import { GlobalDashButton } from "../../Designs/Styles/Global";

import { Navigate, useNavigate, useParams } from "react-router-dom";
import { FaUniversity } from "react-icons/fa";
import { AES, enc } from 'crypto-js';
import logo from "../../Designs/Images/2.jpg"
import background from "../../Designs/Images/background.jpg"
import { apiMedia, apiServer } from "../../Constants /Endpoints";
import { Show } from "../../Constants /Alerts";

const Profile = () => {   

      const { studentId } = useParams();
      const [theStudent, setTheStudent] = useState([])
      const [userInfo, setUserInfo] = useState({});
      const navigate = useNavigate()

      const [SchoolData, SetSchoolData] = useState({})

      useEffect(()=>{
      fetch(apiServer+"ViewSchoolData")
      .then(res=>res.json())
      .then(data=>SetSchoolData(data))
      .catch(error=>console.error(error))
      },[])
  
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
          window.location.reload();
        }
      
      }, []);
  
  
             
  
        const thelink = apiMedia+theStudent?.ProfilePic
  
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

        function calculateAge(dateOfBirth) {
          const today = new Date();
          const birthDate = new Date(dateOfBirth);
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
          
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
              age--;
          }
          
          return age;
      }
      
  
  
        const CompanyId = userInfo.CompanyId;
        const UserId = userInfo.UserId;
         
  
      useEffect(()=>{
        if(CompanyId!==undefined && UserId!==undefined){
          LoadStudent()
        }
  
      },[CompanyId,UserId ])
      
    
        const LoadStudent = async () => {
       
            
          Show.showLoading("Loading Students....");
  
          if(CompanyId!==undefined && UserId!==undefined){
  
  
            try {
              const formData = new FormData();
        
              formData.append("CompanyId", userInfo.CompanyId);
          formData.append("SenderId", userInfo.UserId);
        
        const url = `GetStudent/${studentId}/${CompanyId}/${UserId}`
          
              const response = await fetch(apiServer+url, {
                method: "GET",
              
              });
        
              const data = await response.json();
          
              if (response.ok) {
                
                Show.hideLoading();
        
                setTheStudent(data)
        
        
                
              } else {
                Show.Attention(data.message);
              }
            } catch (error) {
        
              Show.Attention(error.message);
            }
            
          } else{
            alert("CompanyId is undefined")
          }
          
  
        
        }

        const [isMobile, setIsMobile] = useState(false);
  const [active, setActive] = useState(null);

  useEffect(() => {
    setActive(1);
     window.addEventListener("resize", handleResize);
    handleResize();

  }, []);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };
  
      
    

    return (
      <>
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
          <ProfileDivLeft>
          <ProfileSectionCard style={{ padding: 0, marginTop: 20 }}>
            <ProfileCoverContainer style={{ width: "100%", margin: 0 }}>
              <ProfileCoverImg
                src={logo}
              />
            
              <ProfileIfoContainer>
                
                <ProfileImgUser src={thelink} />
                
                <ProfileInfoSub>
                  
                  <ProfileName>
                  {theStudent?.LastName}, {theStudent?.FirstName} {theStudent?.OtherName}
                  </ProfileName>
                  <ProfileType> {theStudent.Level}</ProfileType>
                  <ProfileType>
                    <span style={{ color: colors.maingreen, fontWeight: "bold" }}>
                    {theStudent.Role}
                    </span>
                    , {theStudent.Gender}
                  </ProfileType>
                </ProfileInfoSub>
                <GlobalDashButton
                  background={"white"}
                  color="black"
                  border="#CDCDCD"
                  style={{ alignSelf: "flex-end" }}
                  onClick={() => navigate("/admin/updatestudent")}
                >
                  Edit
                </GlobalDashButton>
                {/* <ProfileIconEdit
              title="Edit profile"
              onClick={() => navigate("/dashboard/editprofile")}
            /> */}
              </ProfileIfoContainer>
            </ProfileCoverContainer>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginTop: 15,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  margin: 10,
                  marginTop: 20,
                  alignItems: "center",
                }}
              >
                <div style={{ marginRight: 10 }}>
                  
                  <img
                    alt="logo"
                    src={apiMedia+SchoolData.CompanyLogo}
                    width={35}
                    height={35}
                  />
                </div>
                <div>
                  <ProfileSchoolTitleHome>
                  {SchoolData.CompanyName}
                  </ProfileSchoolTitleHome>
                </div>
               
              </div>
              <ProfileSchoolCourse
                style={{
                  display: "flex",
                  paddingRight: 20,
                  alignItems: "center",
                }}
              >
                <FaUniversity
                  size={20}
                  color="grey"
                  style={{ marginRight: 5 }}
                />

               Level: {theStudent.Level}
              </ProfileSchoolCourse>

            </div>
            <div
              style={{
                display: "flex",
                padding: 15,
                flexWrap: "wrap",
                alignItems: "flex-end",
              }}
            >
              <div
                style={{
                  padding: 10,
                  border: "1px solid #E8E4E0",
                  borderRadius: 10,
                  width:isMobile?310:250,
                  marginTop: 20,
                  marginRight: 10,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <h5>Academic</h5>
                  <IconDashAcademic />
                </div>
                <p style={{ fontSize: 14, marginTop: 10, marginBottom: 5 }}>
                  Student no. <span style={{ fontWeight: "bold" }}>{theStudent.StudentId}</span>
                </p>
                <p style={{ fontSize: 14, marginTop: 10, marginBottom: 5 }}>
                  Admitted. <span style={{ fontWeight: "bold" }}>{formatDate(theStudent.created_at)}</span>
                </p>
                <p style={{ fontSize: 14, marginTop: 10, marginBottom: 5 }}>
                  Session.{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {theStudent.TheAcademicTerm}, {theStudent.TheAcademicYear}
                  </span>
                </p>
               
              </div>


              <div
                style={{
                  padding: 10,
                  backgroundColor: `${colors.card}`,
                  borderRadius: 10,
                  width:isMobile?310:250,
                  marginRight: 10,
                  marginTop: 20,
                  height: "max-content",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <h5>Contacts</h5>
                  <IconDashContact />
                </div>
                <p style={{ fontSize: 14, marginTop: 10, marginBottom: 5 }}>
                  {theStudent.Email}
                </p>
                <p style={{ fontSize: 14, marginTop: 10, marginBottom: 5 }}>
                  {theStudent.Phone}
                </p>
                
              </div>

              <div
                style={{
                  padding: 10,
                  backgroundColor: `${colors.card}`,
                  borderRadius: 10,
                  width:isMobile?310:250,
                  marginRight: 10,
                  marginTop: 20,
                  height: "max-content",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <h5>Personal Info</h5>
                  <IconDashContact />
                </div>
                <p style={{ fontSize: 14, marginTop: 10, marginBottom: 5 }}>
                  DOB: {formatDate(theStudent.DateOfBirth)}
                </p>
                <p style={{ fontSize: 14, marginTop: 10, marginBottom: 5 }}>
                  Age: {calculateAge(theStudent.DateOfBirth)} {calculateAge(theStudent.DateOfBirth)>1?<>years</>:<>year</>} old 
                </p>
                <p style={{ fontSize: 14, marginTop: 10, marginBottom: 5 }}>
                  Religion: {theStudent.Religion}
                </p>
                <p style={{ fontSize: 14, marginTop: 10, marginBottom: 5 }}>
                  Hometown: {theStudent.HomeTown}
                </p>
                <p style={{ fontSize: 14, marginTop: 10, marginBottom: 5 }}>
                  Location: {theStudent.Location}
                </p>
                
              </div>



              <div
                style={{
                  padding: 10,
                  border: "1px solid #E8E4E0",
                  borderRadius: 10,
                  width:isMobile?310:250,
                  marginTop: 20,
                  marginRight: 10,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <h5>Emergency</h5>
                  <IconDashEContacts />
                </div>
                <p style={{ fontSize: 14, marginTop: 10, marginBottom: 5 }}>
                  {theStudent.EmergencyContactName}
                </p>
                <p style={{ fontSize: 14, marginTop: 10, marginBottom: 5 }}>
                {theStudent.EmergencyPhoneNumber}
                </p>
                <p style={{ fontSize: 14, marginTop: 10, marginBottom: 5 }}>
                {theStudent.EmergencyAlternatePhoneNumber}
                </p>
               
              </div>
           
           
              <div
                style={{
                  padding: 10,
                  border: "1px solid #E8E4E0",
                  borderRadius: 10,
                  width:isMobile?310:250,
                  marginTop: 20,
                  marginRight: 10,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <h5>Parent Information</h5>
                  <IconDashEContacts2 />
                </div>
                <p style={{ fontSize: 14, marginTop: 10, marginBottom: 5 }}>
                 <b style={{ color:`${colors.maingreen}`}}>Father's Name:</b> <i>{theStudent.FathersName}</i>
                </p>
                <p style={{ fontSize: 14, marginTop: 10, marginBottom: 5 }}>
                <b style={{ color:`${colors.yellow}`}}> Father's Occupation:</b> <i>{theStudent.FatherOccupation}</i>
                </p>

                <p style={{ fontSize: 14, marginTop: 10, marginBottom: 5 }}>
                <b style={{ color:`${colors.mainsecondgreen}`}}> Mother's Name:</b> <i>{theStudent.MothersName}</i>
                </p>
                <p style={{ fontSize: 14, marginTop: 10, marginBottom: 5 }}>
                <b style={{ color:`${colors.aqua}`}}>Mother's Occupation:</b>  <i>{theStudent.MotherOccupation}</i>
                </p>
               
               
              </div>

           
           
           
           
            </div>




          </ProfileSectionCard>
          <ProfileSectionCard style={{ padding: 15, marginTop: 20 }}>
            <h5
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 15,
              }}
            >
              Internship History <IconDashHistory />
            </h5>
        {
          /*
          
           {
  dueData.map((data, index) => (
    <div
      key={index}
      style={{
        width: "max-content",
        borderTop: "1px solid rgba(0,0,0,0.2)",
        width: "100%",
        padding: "10px 0",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          alt="logo"
          src={logo}
          width={35}
          height={35}
          style={{ marginRight: 10 }}
        />
        {data.companyName}
      </div>
      <p style={{ fontSize: 14, marginTop: 10, marginBottom: 5 }}>
      Duration:{" "}
      <span style={{ fontWeight: "bold" }}>
        {new Date(data.startDate).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
        {" - "}
        {new Date(data.endDate).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </span>
    </p>
      <p style={{ fontSize: 14, marginTop: 10, marginBottom: 5 }}>
        Job Title: <span style={{ fontWeight: "bold" }}>{data.jobTitle}</span>
      </p>
      <p style={{ fontSize: 14, marginTop: 10, marginBottom: 5 }}>
        Loc: <span style={{ fontWeight: "bold" }}>{data.branch}, {data.digitalAddress}</span>
      </p>
    </div>
  ))
}


          */
        } 
        
                  
          </ProfileSectionCard>
          </ProfileDivLeft>
        </div>
      </>
    );
}

export default Profile