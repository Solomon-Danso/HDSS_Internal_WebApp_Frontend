//export const apiServer = "http://10.42.0.1:5000/"
//export const apiServer = "http://192.168.189.18:5000/"
export const apiServer = "http://localhost:5000/"
export const LoginEndpoint = "api/Auth/Login"
export const Teacher = "api/Auth/Teacher"
export const Student = "api/Auth/Student"
export const Admin = "api/Auth/Admin"
export const Events = "api/Admin/ViewEvents"
export const AddEvents = "api/Admin/AddEvent"
export const DeleteEvents = "api/Admin/DeleteEvents?Id="
export const RegisterStudent = "api/students/registerStudent?ID="
export const RegisterTeacher = "api/Teacher/registerTeacher?ID="
export const ViewClasses = "api/LMS/viewAllClasses"
export const TheClassStudent = "api/students/getStudents?stage="
export const ViewStudents = "api/Admin/AllStudents"
export const CountStudents = "api/Admin/AllStudentsCount"
export const CountTeachers = "api/Admin/AllTeachersCount"
export const CountParents = "api/Admin/AllParentsCount"
export const SearchStudent = "api/Admin/Search?searchTerm="
export const SearchClass = "api/Admin/SearchClass?searchTerm="
export const SearchSubject = "api/Admin/SearchSubject?searchTerm="
export const SearchSlides = "api/Admin/SearchSlides?searchTerm="
export const SearchVideo = "api/Admin/SearchVideo?searchTerm="
export const StudentSearchVideo = "api/Admin/StudentSearchVideo?searchTerm="



export const SearchTeacher = "api/Admin/SearchTeacher?searchTerm="
export const ViewOneStudent = "api/students/getSpecificUser?StudentId=";
export const UpdateStudent = "api/students/updateStudent?Id="
export const DeleteStudentApi = "api/students/deleteSpecificUser?StudentId="
export const Admission = "api/Setup/AdmissionLetter?StudentId="
export const PayFees = "api/Accounting/PayFees?StudentId=&StaffId="
export const PaymentHis = "api/Accounting/PaymentHis?StudentId="
export const AcaYear = "api/LMS/ViewAcademicYear"
export const AcaTerm = "api/LMS/ViewAcademicTerm"
export const SubTeacher = "api/LMS/AllSubjectTeachers"
export const TestPdf = "api/ThePDFS/generator?Id="
export const Appointment = "api/ThePDFS/Appointment?Id="
export const ViewTeachers = "api/Teacher/getTeachers?SID="
export const Receipt = "api/ThePDFS/FeesPayment?Id=52056&PayId="




















