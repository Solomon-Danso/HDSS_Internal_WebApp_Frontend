import React, { useEffect, useState } from 'react'
import { CardTextHeader, FormInputSearch, FormLoaders, NewStudentListCard2, SelectForStudent, SelectStageButton, StudentInfoCard, StudentInfoCard2, StudentListResult } from '../../Designs/Styles/Profile'
import { MyStudentCard } from './MyStudentCard2'
import { SearchStudent, SearchTeacher, TheClassStudent, ViewClasses, ViewStudents, ViewTeachers, apiServer } from '../../Constants /Endpoints'
import { Show } from '../../Constants /Alerts'
import { colors } from '../../Designs/Colors'
import { AES,enc } from 'crypto-js'
import {TeacherCard} from "./TeacherCard"
import { useNavigate } from 'react-router-dom'

const StudentInfo = () => {

    const navigate = useNavigate()
    const [studentList, setStudentList] = useState([])
  
    const [closeOther, setCloseOther] = useState(false)
    const [searchResult, setSearchResult] = useState(false)
    const [searchTerm, setSearchTerm] = useState()
  
    useEffect(() => {
        // Function to fetch search results based on searchTerm
        const fetchSearchResults = async () => {
          if (searchTerm === '') {
            setStudentList([]); // Clear the list if search term is empty
            setSearchResult(false);
            setCloseOther(false)
            return;
          }
    
          //Show.showLoading('Processing Data');
          try {
            const response = await fetch(apiServer + SearchTeacher + searchTerm, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            });
    
            const data = await response.json();
    
            if (response.ok) {
              Show.hideLoading();
              setSearchResult(true);
              setStudentList(data);
              setCloseOther(true)
            } else {
              //Show.Attention('No Result Found');
              setSearchResult(false);
              setCloseOther(false)
              setStudentList([]);
            }
          } catch (error) {
            //Show.Attention('No Result Found');
            setSearchResult(false);
            setStudentList([]);
          }
        };
    
        fetchSearchResults(); // Call the function when searchTerm changes
      }, [searchTerm]);
      
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
  

  

      const CompanyId = userInfo.CompanyId;
      const UserId = userInfo.UserId;
       

    useEffect(()=>{
      if(CompanyId!==undefined && UserId!==undefined){
        LoadStudent()
      }

    },[CompanyId,UserId ])
    
  
      const LoadStudent = async () => {
     
          
        Show.showLoading("Loading Staff Members....");

        if(CompanyId!==undefined && UserId!==undefined){


          try {
            const formData = new FormData();
      
            formData.append("CompanyId", userInfo.CompanyId);
        formData.append("SenderId", userInfo.UserId);
      
      
        
            const response = await fetch(apiServer+"GetStaffMemberssInASchool", {
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
          Show.Attention("CompanyId is undefined")
        }
        

      
      }



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
    <div>

<StudentInfoCard2 >

<FormLoaders onSubmit={(e) => e.preventDefault()}>
          <FormInputSearch
            //background={colors.darkBlue}
        
            border={colors.darkBlue}
            placeholder="Search Using Ids, Firstname, Lastname and Position"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ '::placeholder': { color: 'white' } }}
          />
          
 </FormLoaders>

<NewStudentListCard2 >

<CardTextHeader>ID</CardTextHeader>
<CardTextHeader>Photo</CardTextHeader>
<CardTextHeader>Teacher Name</CardTextHeader>
<CardTextHeader>Gender</CardTextHeader>
<CardTextHeader>DateOfBirth</CardTextHeader>
<CardTextHeader>Position</CardTextHeader>
<CardTextHeader>Phone</CardTextHeader>
<CardTextHeader>Email</CardTextHeader>
<CardTextHeader>Action</CardTextHeader>


</NewStudentListCard2>


{searchResult && (
          <StudentListResult>
            {studentList.length > 0 &&
              studentList.map((data, index) => <TeacherCard data={data} key={index} />)}
          </StudentListResult>
        )}









{
  closeOther? (
  <>
  
  </>
  ):(
  
  <>
  
  <StudentListResult>
{theStudents.length > 0 &&
    theStudents.map((data,index) => (
      <TeacherCard data={data} key={index}  />
    ))}

</StudentListResult>

  
  </>)  
}



</StudentInfoCard2>


    </div>
  )
}

export default StudentInfo