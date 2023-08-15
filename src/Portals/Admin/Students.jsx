import React from 'react'
import { Student } from '../../Constants /Endpoints'
import { AdmitStudentCard, AdmitStudentRole, FormLable, HeaderTitle, MainTitle,FormInputStudent, SelectStage, SelectForStudent, FormTextAreaStudent, SelectStageButton} from '../../Designs/Styles/Profile'
import { colors } from '../../Designs/Colors'

const Students = () => {
  return (
    <>
     < AdmitStudentCard>
     <MainTitle>Add Student Form</MainTitle>
     <hr/>
     <HeaderTitle>Student Information</HeaderTitle>

    <AdmitStudentRole>
    <div>
        <FormLable>First Name</FormLable>
        <FormInputStudent
        type="text"
        required
        placeholder=""
        //onChange={(e) => setTitle(e.target.value)}
       
        />
     </div>
     <div>
        <FormLable>Other Name</FormLable>
        <FormInputStudent
        type="text"
        
        placeholder=""
        //onChange={(e) => setTitle(e.target.value)}
       
        />
     </div>
     <div>
        <FormLable>Last Name</FormLable>
        <FormInputStudent
        type="text"
        required
        placeholder=""
        //onChange={(e) => setTitle(e.target.value)}
       
        />
     </div>

     <div>
        <FormLable>Date of Birth</FormLable>
        <FormInputStudent
        type="date"
        required
        placeholder="Isaac"
        //onChange={(e) => setTitle(e.target.value)}
       
        />
     </div>


    </AdmitStudentRole>

    <AdmitStudentRole>
    <div>
    <FormLable>Gender</FormLable>
    <SelectForStudent
    background={colors.darkBlue}
    color="white"
    border={colors.darkBlue}
    >
    <option>Please select a gender</option>
    <option>Male</option>
    <option>Female</option>
    </SelectForStudent>
        
     </div>

     <div>
        <FormLable>Location</FormLable>
        <FormInputStudent
        type="text"
        required
        placeholder=""
        //onChange={(e) => setTitle(e.target.value)}
       
        />
     </div>

     <div>
        <FormLable>HomeTown</FormLable>
        <FormInputStudent
        type="text"
        required
        placeholder=""
        //onChange={(e) => setTitle(e.target.value)}
       
        />
     </div>

     <div>
        <FormLable>Country</FormLable>
        <FormInputStudent
        type="text"
        required
        placeholder=""
        //onChange={(e) => setTitle(e.target.value)}
       
        />
     </div>



    </AdmitStudentRole>

    <AdmitStudentRole>
   
     <div>
        <FormLable>Religion</FormLable>
        <FormInputStudent
        type="text"
        
        placeholder=""
        //onChange={(e) => setTitle(e.target.value)}
       
        />
     </div>

     <div>
        <FormLable>Email</FormLable>
        <FormInputStudent
        type="text"
        
        placeholder=""
        //onChange={(e) => setTitle(e.target.value)}
       
        />
     </div>

     <div>
        <FormLable>Phone</FormLable>
        <FormInputStudent
        type="text"
        
        placeholder=""
        //onChange={(e) => setTitle(e.target.value)}
       
        />
     </div>

     <div>
    <FormLable>Class</FormLable>
    <SelectForStudent
    background={colors.darkBlue}
    color="white"
    border={colors.darkBlue}
    >
    <option>Please select a class</option>
    <option>Basic 4A</option>
    <option>Basic 4B</option>
    </SelectForStudent>
        
     </div>




    </AdmitStudentRole>

    <AdmitStudentRole>


     <div>
        <FormLable>Upload Student Photo</FormLable>
        <FormInputStudent
        type="file"
        required
        placeholder=""
        //onChange={(e) => setTitle(e.target.value)}
       
        />
     </div>

     <div>
        <FormLable>Medical Information</FormLable>
        <FormTextAreaStudent
        type="text"
        required
        placeholder=""
        //onChange={(e) => setTitle(e.target.value)}
       
        />
     </div>



    </AdmitStudentRole>
  
     
     </AdmitStudentCard>

     < AdmitStudentCard>
    

     <HeaderTitle>Parent Information</HeaderTitle>

    <AdmitStudentRole>
    <div>
        <FormLable>Father Name</FormLable>
        <FormInputStudent
        type="text"
        required
        placeholder=""
        //onChange={(e) => setTitle(e.target.value)}
       
        />
     </div>
     <div>
        <FormLable>Mother Name</FormLable>
        <FormInputStudent
        type="text"
        
        placeholder=""
        //onChange={(e) => setTitle(e.target.value)}
       
        />
     </div>
     <div>
        <FormLable>Father Occupation</FormLable>
        <FormInputStudent
        type="text"
        required
        placeholder=""
        //onChange={(e) => setTitle(e.target.value)}
       
        />
     </div>

     <div>
        <FormLable>Mother Occupation</FormLable>
        <FormInputStudent
        type="text"
        required
        placeholder=""
        //onChange={(e) => setTitle(e.target.value)}
       
        />
     </div>


    </AdmitStudentRole>

    <AdmitStudentRole>
    <div>
        <FormLable>Guardian Name</FormLable>
        <FormInputStudent
        type="text"
      
        placeholder=""
        //onChange={(e) => setTitle(e.target.value)}
       
        />
     </div>
     <div>
        <FormLable>Guardian Occupation</FormLable>
        <FormInputStudent
        type="text"
        placeholder=""
        //onChange={(e) => setTitle(e.target.value)}
       
        />
     </div>
     <div>
        <FormLable>Location</FormLable>
        <FormInputStudent
        type="text"
        required
        placeholder=""
        //onChange={(e) => setTitle(e.target.value)}
       
        />
     </div>

     <div>
        <FormLable>Digital Address</FormLable>
        <FormInputStudent
        type="text"
        required
        placeholder=""
        //onChange={(e) => setTitle(e.target.value)}
       
        />
     </div>


    </AdmitStudentRole>

    <AdmitStudentRole>
   
     <div>
        <FormLable>Religion</FormLable>
        <FormInputStudent
        type="text"
        
        placeholder=""
        //onChange={(e) => setTitle(e.target.value)}
       
        />
     </div>

     <div>
        <FormLable>Email</FormLable>
        <FormInputStudent
        type="text"
        
        placeholder=""
        //onChange={(e) => setTitle(e.target.value)}
       
        />
     </div>

     <div>
        <FormLable>Phone</FormLable>
        <FormInputStudent
        type="text"
        required
        placeholder=""
        //onChange={(e) => setTitle(e.target.value)}
       
        />
     </div>

     <div>
        <FormLable>Alternate Phone Number</FormLable>
        <FormInputStudent
        type="text"
        
        placeholder=""
        //onChange={(e) => setTitle(e.target.value)}
       
        />
     </div>

    </AdmitStudentRole>
    
     
     </AdmitStudentCard>

     <AdmitStudentRole>
<SelectStageButton  
        background={colors.darkBlue}
        color="white"
        border={colors.darkBlue}
        type="submit">Admit Student
</SelectStageButton>

<SelectStageButton  
        background={colors.red}
        color="white"
        border={colors.darkBlue}
        onClick={(e)=>window.location.reload()}
        type="submit">Reset 
        </SelectStageButton>

</AdmitStudentRole>
    </>
  )
}

export default Students