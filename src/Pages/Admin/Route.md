
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="viewProfile" element={<Profile/>} />
          
          
          
          
          
          
          
          
          
          
          
          
          {
             specificRole==="SuperiorUser"||specificRole==="HeadTeacher" ? (
             <>
              <Route path="test" element={<Test />} />  
             </>
             ):(
             <>
              <Route path="*" element={<PermissionDenied />} />
             </>
             )
          }

             
{
             specificRole==="SuperiorUser"||specificRole==="HeadTeacher" ? (
             <>
              <Route path="students" element={<Students />} /> 
              <Route path="studentsInfo" element={<StudentInfo />} />
              <Route path="studentsDetails/:studentId" element={<StudentDetails />} />
              <Route path="teacherDetails/:teacherId" element={<TeacherDetails />} />
              <Route path="feesDetails/:studentId" element={<FeesDetail />} />
              <Route path="updateStudent" element={<UpdateStudent />} /> 
              <Route path="deleteStudent" element={<DeleteStudent />} />  
              <Route path="schoolfees" element={<MainFees />} /> 
              <Route path="teachers" element={<Teachers />} /> 
              <Route path="updateteacher" element={<UpdateTeacher />} /> 
              <Route path="teacherinfo" element={<TeacherInfo />} /> 
              <Route path="deleteteacher" element={<DeleteTeacher />} /> 
              <Route path="class" element={<Class />} /> 

             </>
             ):(
             <>
              <Route path="*" element={<PermissionDenied />} />
             </>
             )
          }

          
          
{
             specificRole==="SuperiorUser"||specificRole==="HeadTeacher"? (
             <>
              <Route path="students" element={<Students />} /> 
              <Route path="studentsInfo" element={<StudentInfo />} />
              <Route path="studentsDetails/:studentId" element={<StudentDetails />} />
              <Route path="class" element={<Class />} /> 
              <Route path="subjects" element={<AddSubject />} />
              <Route path="subjectteacher" element={<SubjectTeacher />} /> 
              <Route path="viewSlides" element={<ViewSlide />} />
              <Route path="viewAudios" element={<ViewAudio />} />
              <Route path="viewVideos" element={<ViewVideo />} />
              <Route path="viewPictures" element={<ViewPicture />} />
              <Route path="viewBooks" element={<ViewBooks />} />
              

             </>
             ):(
             <>
              <Route path="*" element={<PermissionDenied />} />
             </>
             )
          }          
          
          
          
          
          
          {
             specificRole==="SuperiorUser"? (
             <>
              <Route path="pass" element={<Pass />} />  
             </>
             ):(
             <>
             <Route path="*" element={<PermissionDenied />} />
             </>
             )
          }

   

    </Routes>