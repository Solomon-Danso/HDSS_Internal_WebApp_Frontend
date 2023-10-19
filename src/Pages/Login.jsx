import React, { useEffect, useState } from 'react'
import { LoginPage,LoginWrap,LoginDiv,AppName, SchoolLogo, AppDesc, HDSS_Form, FormInput, HDSS_Label, Button } from '../Designs/Styles/Styles'
import student from "../Designs/Images/login.jpg"
import school from "../Designs/Images/download.png" 
import { colors } from '../Designs/Colors'
import { useNavigate } from 'react-router-dom'
import { Show } from '../Constants /Alerts'
import { apiServer,LoginEndpoint,Teacher,Student,Admin } from '../Constants /Endpoints'
import { AES, enc } from 'crypto-js';

const Login = () => {

  const navigate = useNavigate();
  const [userId, setuserId] = useState("");
  const [userPassword, setuserPassword] = useState("")
  const [Teach, setTeach] = useState("")
  const [admin, setadmin] = useState("")
  
  useEffect(() => {
    fetch(apiServer+Teacher, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text(); 
      })
      .then((data) => setTeach(data))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  useEffect(() => {
    fetch(apiServer+Admin, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text(); 
      })
      .then((data) => setadmin(data))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  
  

const handleSubmit = async (event) => {
  event.preventDefault();
    
  Show.showLoading("Processing Data");
    try {

  
      const response = await fetch(apiServer+LoginEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({userId, userPassword})
      });

      const data = await response.json();
  
      if (response.ok) {
        
        Show.hideLoading();

        Show.Success("Login Successfull ");
          sessionStorage.setItem("userDataEnc", AES.encrypt(JSON.stringify(data), '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK').toString()); 
        sessionStorage.setItem("SpecificRole", AES.encrypt(data.specificRole, '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK').toString()); 
       
        if(data.role === "Admin"){
          navigate("/admin");
        }
        else if(data.role === "Teacher"){
          navigate("/teacher");
        }
        else{
          navigate("/");
        }
        
      } else {
        Show.Attention("Login Failed");
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
        src={student}
        style={{
          width: "100%",
          height: "90%",
          borderRadius: 10,
          marginBottom: 10,
          top:0
        }}
        alt="Introduction"
      />
      <AppName style={{ textAlign: "center", color: "white"}}>
        CROSSHILL INT. SCH
        <br />
        <span style={{ fontWeight: "bold" }}>(CIS)</span><br/>
      </AppName>
    </LoginDiv>



        <LoginDiv background={"white"} flex={0.45} hide={false}>
      
        <SchoolLogo
            src={school}
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

          <div
                  style={{
                    display: "flex",
                    justifyContent: 'flex-end',
                    marginTop: 5,
                    marginBottom: 30,
                    flexWrap: "wrap",
                    width: "100%",
                  }}
                >
                
                  <button
                    onClick={() => navigate("/resetpassword")}
                    style={{
                      fontSize: 11,
                      color: colors.primary,
                      textDecoration: "underline",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                    type="button"
                  >
                    Forgot Password?
                  </button>
                </div>

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




          <p style={{ textAlign: "center", fontSize: 10, color: "gray", marginTop:"10vh"}}>
            Hydot School System © {new Date().getFullYear()} All rights
            reserved.
          </p>
          <p style={{ textAlign: "center", fontSize: 10, color: "gray" }}>
            v.1.1.1
          </p>


        </LoginDiv>

      

</LoginWrap>





   </LoginPage>
  )
}

export default Login