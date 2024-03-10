import React, { useEffect, useState } from 'react'
import { LoginPage,LoginWrap,LoginDiv,AppName, SchoolLogo, AppDesc, HDSS_Form, FormInput, HDSS_Label, Button } from '../Designs/Styles/Styles'
import student from "../Designs/Images/login.jpg"
import school from "../Designs/Images/download.png" 
import { colors } from '../Designs/Colors'
import { useNavigate } from 'react-router-dom'
import { Show } from '../Constants /Alerts'
import { apiServer,LoginEndpoint,Teacher,Student,Admin, apiMedia } from '../Constants /Endpoints'
import { AES, enc } from 'crypto-js';

const Login = () => {

  const navigate = useNavigate();
  const [userId, setuserId] = useState("");
  const [userPassword, setuserPassword] = useState("")

  

  
  const [SchoolData, SetSchoolData] = useState({})

useEffect(()=>{
fetch(apiServer+"ViewSchoolData")
.then(res=>res.json())
.then(data=>SetSchoolData(data))
.catch(error=>console.error(error))
},[])


const handleSubmit = async (event) => {
  event.preventDefault();
    
  Show.showLoading("Processing Data");
    try {
      const formData = new FormData();

      formData.append("UserId",userId )
      formData.append("Password",userPassword )



  
      const response = await fetch(apiServer+"LogIn", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
  
      if (response.ok) {
        
        Show.hideLoading();

        Show.Success("Login Successfull ");
          sessionStorage.setItem("userDataEnc", AES.encrypt(JSON.stringify(data.message), '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK').toString()); 
          
          if(data.message.PasswordReset=0){
            alert("Reset your password")

          }
          else{

            if(data.message.PrimaryRole === "student"){
              navigate("/student");
            }
            else{
             
              navigate("/admin");
            }

          }
          


        
      } else {
        Show.Attention(data.message);
      }
    } catch (error) {

      Show.Attention("An error has occurred");
    }

}



  return (
   <LoginPage>

<LoginWrap>

<LoginDiv background={colors.primary} flex={0.55} hide={true}>
      
      <img
        src={apiMedia+SchoolData.CompanyLogo}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 1,   
          top:0,
          bottom:0
        }}
        alt="Introduction"
      />
     
    </LoginDiv>



        <LoginDiv background={"white"} flex={0.45} hide={false}>
      
        <SchoolLogo
            src={apiMedia+SchoolData.CompanyLogo}
            alt="icon"
            style={{ width: 65, height: 65 }}
          />
          <AppDesc style={{ color: "black", marginTop: 20, marginBottom: 50 }}>
            Sign in to you account
          </AppDesc>

          <HDSS_Form
          onSubmit={handleSubmit}
          style={{ fontSize: 12 }}
          >
            <HDSS_Label>ID Number *</HDSS_Label>
           
                <FormInput
                  type="text"
                  required
                  placeholder="XXXXX"
                  onChange={(e) => setuserId(e.target.value)}
                  style={{ marginBottom: 25 }}
                />

          <HDSS_Label>Password *</HDSS_Label>
           
           <FormInput
             type="password"
             required
             placeholder="....."
             onChange={(e) => setuserPassword(e.target.value)}
             style={{ marginBottom: 25 }}
           />

        

          <Button
          background={colors.primary}
          color="white"
          border={colors.primary}
          style={{ marginTop: 25, width: "100%", }}
          type="submit"
          >

          Sign in
          </Button>

          </HDSS_Form>




          <p style={{ textAlign: "center", fontSize: 30, color: "gray", marginTop:"10vh"}}>
          {SchoolData.CompanyName}
          </p>
          <p style={{ textAlign: "center", fontSize: 10, color: "gray", bottom:0}}>
          © {new Date().getFullYear()} All rights
            reserved. version 1.0
          </p>


        </LoginDiv>

      

</LoginWrap>





   </LoginPage>
  )
}

export default Login