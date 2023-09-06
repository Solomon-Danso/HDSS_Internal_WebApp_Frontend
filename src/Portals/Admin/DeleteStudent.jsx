import React, { useEffect, useState } from 'react'
import { apiServer,DeleteStudentApi,RegisterStudent, UpdateStudent, ViewClasses, ViewOneStudent } from '../../Constants /Endpoints'
import { AdmitStudentCard, AdmitStudentRole, FormLable, HeaderTitle, MainTitle,FormInputStudent, SelectStage, SelectForStudent, FormTextAreaStudent, SelectStageButton, AdmitButton, SelectForStudentRel, AdmitButton2, FormInputStudent2} from '../../Designs/Styles/Profile'
import { colors } from '../../Designs/Colors'
import { Show } from '../../Constants /Alerts'


const DeleteStudent = () => {

const [studentId, setStudentId] = useState()

    const studentDetails = async (event) => {
        event.preventDefault();
        try {
          const response = await fetch(apiServer + DeleteStudentApi + studentId, {
            method: "DELETE",
          });
          if (response.ok) {

            
            Show.Success("Student deleted successfully");
            window.location.reload();
            
          } else {
            Show.Attention("Student not found");
          }
        } catch (err) {
          Show.Attention("An error has occurred");
        }
      };
    



  return (
    <>
    <form onSubmit={studentDetails}>
    < AdmitStudentCard>
    
    <div>
        <FormLable>Enter Student Id</FormLable>
        <AdmitStudentRole>
        <FormInputStudent2
        type="text"
        
        placeholder="35678"
        onChange={(e) => setStudentId(e.target.value)}
       
        />
         <AdmitButton2
        background={colors.lightred}
        color="white"
        border={colors.mainred}
        
        type="submit">Delete
        </AdmitButton2>
        </AdmitStudentRole>
     </div>
  
    
    </AdmitStudentCard>    
    </form>

    
    </>
  )
}

export default DeleteStudent