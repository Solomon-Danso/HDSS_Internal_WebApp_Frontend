import React, { useEffect, useState } from 'react'
import { AdmitButton, AdmitButton3, AdmitStudentCard, AdmitStudentRole, CardTextHeader, FormInputStudent, FormLable, HeaderTitle, MainTitle, NewStudentListCard2, StudentInfoCard2, StudentListResult } from '../../Designs/Styles/Profile'
import { colors } from '../../Designs/Colors'
import { AES, enc } from 'crypto-js'
import { useNavigate } from 'react-router-dom'
import { Show } from '../../Constants /Alerts'
import { apiServer } from '../../Constants /Endpoints'
import { DestinationCard } from './DestinationCard'

const Destination = () => {
    const navigate = useNavigate()
  const [StudentId, setStudentId] = useState("")
  const [Location, setLocation] = useState("")
  const [DestinationFare, setDestinationFare] = useState()
  const [theStudents, setTheStudents] = useState([])

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

    const handlesubmit = async () => {


       const companyId = userInfo.CompanyId;
       const senderId  = userInfo.UserId;
      
        try {
          const formData = new FormData();
          formData.append("CompanyId", companyId);
          formData.append("SenderId", senderId);
          formData.append("StudentId", StudentId);
          formData.append("Location", Location);
          formData.append("DestinationFare", DestinationFare);

          if(!StudentId){
            Show.Attention("StudentId cannot be empty")
            return
          }

          if(!Location){
            Show.Attention("Location cannot be null")
            return
          }

          if(!DestinationFare){
            Show.Attention("Destination Fare cannot be null")
            return
          }
          

         Show.showLoading("Processing Data")
          
      
          const response = await fetch(apiServer + "AddStudentToDestinationList", {
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
    
    
      
          const response = await fetch(apiServer+"StudentToDestinationArrival", {
            method: "POST",
            body: formData
          });
    
          const data = await response.json();
      
          if (response.ok) {
            
            Show.hideLoading();
    
            setTheStudents(data)
    
    
            
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
  
  
  
  
    return (
    <div>
     

     <StudentInfoCard2 >
 


<NewStudentListCard2 >

<CardTextHeader>ID</CardTextHeader>
<CardTextHeader>Photo</CardTextHeader>
<CardTextHeader>Student Name</CardTextHeader>
<CardTextHeader>Class</CardTextHeader>
<CardTextHeader>Contact Name</CardTextHeader>
<CardTextHeader>Contact Phone</CardTextHeader>
<CardTextHeader>Alt Phone number</CardTextHeader>
  
  {
    checkRole("SuperAdmin")||checkRole("HeadTeacher")?( <CardTextHeader>Action</CardTextHeader>):(<></>)
  }

  
  


</NewStudentListCard2>










<StudentListResult>
{theStudents.length > 0 &&
    theStudents.map((data,index) => (
      <DestinationCard data={data} key={index}  />
    ))}

</StudentListResult>



</StudentInfoCard2>




    </div>
  )
}

export default Destination
