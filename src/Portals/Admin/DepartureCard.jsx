import React, { useEffect, useState } from 'react'
import { AdmitButton3, AdmitStudentCard, AdmitStudentRole, CardImage, CardText, FormInputStudent, FormLable, HeaderTitle, MainTitle, NewStudentListCard, SelectStageButton } from '../../Designs/Styles/Profile'
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




export const DepartureCard = ({ data }) => {
    const navigate = useNavigate();
    const thelink = apiMedia+data?.StudentPic

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
const dropperFunc = ()=>{
    setDropper(!dropper)
}

 const specificRole="SuperiorUser"
 const [userInfo, setUserInfo] = useState({});
 const [Location, setLocation] = useState("")
 const [DepartureFare, setDepartureFare] = useState("")


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

    const StudentId = data?.StudentId;

    const [latitude, setLatitude] = useState("")
    const [longtitude, setLongtitude] = useState("")
 
     useEffect(()=>{
         navigator.geolocation?.getCurrentPosition(
             (position) => {
                 setLatitude(position.coords.latitude) ;
                 setLongtitude(position.coords.longitude) ;
                      },
             (error) => {
               console.error("Error getting location:", error);
             }
           );
     },[])


    const handlesubmit = async () => {


        const companyId = userInfo.CompanyId;
        const senderId  = userInfo.UserId;
      
       
         try {
           const formData = new FormData();
           formData.append("CompanyId", companyId);
           formData.append("SenderId", senderId);
           formData.append("StudentId", StudentId);
         
           formData.append("DepartureLatitude", latitude);
           formData.append("DepartureLongtitude", longtitude);
 
 
          
           
 
          Show.showLoading("Processing Data")
           
       
           const response = await fetch(apiServer + "Departure", {
             method: "POST",
             body: formData,
           });
         
           const data = await response.json()
       
           if (response.ok) {
             Show.hideLoading();
             
             Show.Success(data.message)
             window.location.reload()
           } else {
             Show.Attention(data.message);
           }
         } catch (error) {
           Show.Attention(error.message);
         }
       };




  return (
    <>
    <NewStudentListCard>
     <CardText>{data?.StudentId}</CardText>
     <CardImage src={thelink}/>
     <CardText>{data?.StudentName}</CardText>
     <CardText> {data?.StudentLevel}</CardText>
     <CardText> {data?.ParentName}</CardText>
     <CardText> {data?.ParentContact}</CardText>
     <CardText> {data?.ParentAltContact}</CardText>
    

     {
   checkRole("SuperAdmin")|| checkRole("Departure")|| checkRole("HeadTeacher")?(<>
   
       
   <SelectStageButton
     background={colors.darkBlue}
     color="white"
     border={colors.darkBlue}
     onClick={(e)=>{
        handlesubmit()
     }}
     >
        Admit
     </SelectStageButton>
   </>):(<></>)
}



    </NewStudentListCard>




    </>
  )
}
