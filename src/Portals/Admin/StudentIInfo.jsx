import React, { useEffect, useState } from 'react'
import { CardTextHeader, FormInputSearch, FormLoaders, NewStudentListCard2, SelectForStudent, SelectStageButton, StudentInfoCard, StudentInfoCard2, StudentListResult } from '../../Designs/Styles/Profile'
import { MyStudentCard } from './MyStudentCard2'
import { SearchStudent, TheClassStudent, ViewClasses, ViewStudents, apiServer } from '../../Constants /Endpoints'
import { Show } from '../../Constants /Alerts'
import { colors } from '../../Designs/Colors'
import { AES,enc } from 'crypto-js'
import { useNavigate } from 'react-router-dom'

const StudentInfo = () => {

  const navigate = useNavigate()

    const [studentList, setStudentList] = useState([])
    const [specificClass, setficClass] = useState("")
    const [closeOther, setCloseOther] = useState(false)
    const [searchResult, setSearchResult] = useState(false)
    const [searchTerm, setSearchTerm] = useState()

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
            const response = await fetch(apiServer + SearchStudent + searchTerm, {
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
      
      
        
            const response = await fetch(apiServer+"GetStudentInASchool", {
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
            placeholder="Search Using Ids, Firstname, Lastname and Class"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ '::placeholder': { color: 'white' } }}
          />
          
 </FormLoaders>

<NewStudentListCard2 >

<CardTextHeader>ID</CardTextHeader>
<CardTextHeader>Photo</CardTextHeader>
<CardTextHeader>Student Name</CardTextHeader>
<CardTextHeader>Gender</CardTextHeader>
<CardTextHeader>DateOfBirth</CardTextHeader>
<CardTextHeader>Class</CardTextHeader>
<CardTextHeader>Contact Name</CardTextHeader>
<CardTextHeader>Contact Phone</CardTextHeader>
  
  {
    checkRole("SuperAdmin")||checkRole("HeadTeacher")?( <CardTextHeader>Action</CardTextHeader>):(<></>)
  }

  
  


</NewStudentListCard2>


{searchResult && (
          <StudentListResult>
            {studentList.length > 0 &&
              studentList.map((data, index) => <MyStudentCard data={data} key={index} />)}
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
      <MyStudentCard data={data} key={index}  />
    ))}

</StudentListResult>

  
  </>)  
}



</StudentInfoCard2>


    </div>
  )
}

export default StudentInfo