import React, { useEffect, useState } from 'react'
import { AdmitButton, AdmitButton3, AdmitStudentCard, AdmitStudentRole, CardTextHeader, FormInputStudent, FormLable, HeaderTitle, MainTitle, NewStudentListCard2, StudentInfoCard2, StudentListResult } from '../../Designs/Styles/Profile'
import { colors } from '../../Designs/Colors'
import { AES, enc } from 'crypto-js'
import { useNavigate } from 'react-router-dom'
import { Show } from '../../Constants /Alerts'
import { apiServer } from '../../Constants /Endpoints'
import { TransportCard } from './TransportCard'

const Transport = () => {
    const navigate = useNavigate()
  const [StudentId, setStudentId] = useState("")
  const [Location, setLocation] = useState("")
  const [TransportFare, setTransportFare] = useState()
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
          formData.append("TransportFare", TransportFare);

          if(!StudentId){
            Show.Attention("StudentId cannot be empty")
            return
          }

          if(!Location){
            Show.Attention("Location cannot be null")
            return
          }

          if(!TransportFare){
            Show.Attention("Transport Fare cannot be null")
            return
          }
          

         Show.showLoading("Processing Data")
          
      
          const response = await fetch(apiServer + "AddStudentToTransportList", {
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
    
    
      
          const response = await fetch(apiServer+"GetAllTransportUsers", {
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
     
     
     < AdmitStudentCard>
     <MainTitle>Add Student Form</MainTitle>
     <hr/>
     <HeaderTitle>Add Student To Transport List</HeaderTitle>

    <AdmitStudentRole>
    <div>
        <FormLable>Student ID</FormLable>
        <FormInputStudent
        type="text"
        required
        placeholder=""
        onChange={(e) => setStudentId(e.target.value)}
       
        />
     </div>
     <div>
        <FormLable>Location</FormLable>
        <FormInputStudent
        type="text"
        
        placeholder=""
        onChange={(e) => setLocation(e.target.value)}
       
        />
     </div>
     <div>
        <FormLable>Transport Fare</FormLable>
        <FormInputStudent
        type="number"
        required
        placeholder=""
        onChange={(e) => setTransportFare(e.target.value)}
       
        />
     </div>

     <AdmitButton
        background={colors.lightgreen}
        color="white"
        border={colors.maingreen}
        onClick={()=>{handlesubmit()}}
       >Add Student
    </AdmitButton>


    </AdmitStudentRole>

     
     </AdmitStudentCard>

     <StudentInfoCard2 >
 


<NewStudentListCard2 >

<CardTextHeader>ID</CardTextHeader>
<CardTextHeader>Photo</CardTextHeader>
<CardTextHeader>Student Name</CardTextHeader>
<CardTextHeader>Class</CardTextHeader>
<CardTextHeader>Contact Name</CardTextHeader>
<CardTextHeader>Contact Phone</CardTextHeader>
<CardTextHeader>Alt Phone number</CardTextHeader>
<CardTextHeader>Location</CardTextHeader>
  
  {
    checkRole("SuperAdmin")||checkRole("HeadTeacher")?( <CardTextHeader>Action</CardTextHeader>):(<></>)
  }

  
  


</NewStudentListCard2>










<StudentListResult>
{theStudents.length > 0 &&
    theStudents.map((data,index) => (
      <TransportCard data={data} key={index}  />
    ))}

</StudentListResult>



</StudentInfoCard2>




    </div>
  )
}

export default Transport
