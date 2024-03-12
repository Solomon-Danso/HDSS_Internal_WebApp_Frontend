import React, { useEffect, useState } from "react";

import { useNavigate } from 'react-router-dom'
import { colors } from "../Designs/Colors";
import {  DashboardNav} from "../Designs/Card/Dashboard";
import { apiMedia, apiServer } from "../Constants /Endpoints";
import { CgMenuGridO } from "react-icons/cg";
import { HomeUserPic, MenuButtonIcon, NavButtonIcon } from "../Designs/Styles/Styles";
import { CNavText, CText } from "../Designs/Styles/Dashboard";
import { GiTeacher } from "react-icons/gi";
import { FaHome } from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";
import { AES, enc } from "crypto-js";

const Navigation = ({  page, openfunction }) => {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
   
     window.addEventListener("resize", handleResize);
    handleResize();
  }, []);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

 

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




      const profilePic = apiMedia+userInfo.ProfilePic

      const [selectedButton, setSelectedButton] = useState(null);
      

      const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);
       
    };

  return (
   <DashboardNav>
   
    <div

      className="navButton"
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                       
            }}
            onClick={() => handleButtonClick("Menu")}
        >
            <NavButtonIcon onClick={openfunction} style={{color: selectedButton === "Menu" ? `${colors.maingreen}` : `${colors.icon}`,}}> <CgMenuGridO /></NavButtonIcon>
            <CNavText style={{color: selectedButton === "Menu" ? `${colors.maingreen}` : `${colors.icon}`,}}>Menu</CNavText>
    </div>


    <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                            
            }}
            onClick={() => handleButtonClick("Class")}
        >
            <NavButtonIcon onClick={openfunction} style={{color: selectedButton === "Class" ? `${colors.maingreen}` : `${colors.icon}`,}}> <GiTeacher /> </NavButtonIcon>
            <CNavText style={{color: selectedButton === "Class" ? `${colors.maingreen}` : `${colors.icon}`,}}>Class</CNavText>
    </div>



    <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: selectedButton === "Profile" ? "goldenrod" : "transparent",
                
            }}
           
        >
            <HomeUserPic src={profilePic}/>
    </div>

    <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                       
            }}
            onClick={() => handleButtonClick("Chat")}
        >
            <NavButtonIcon onClick={openfunction} style={{color: selectedButton === "Chat" ? `${colors.maingreen}` : `${colors.icon}`,}}> <BsChatDots /> </NavButtonIcon>
            <CNavText style={{color: selectedButton === "Chat" ? `${colors.maingreen}` : `${colors.icon}`,}}>Chat</CNavText>
    </div>


    <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
               
            }}
            onClick={() => handleButtonClick("Home")}
        >
            <NavButtonIcon onClick={openfunction} style={{color: selectedButton === "Home" ? `${colors.maingreen}` : `${colors.icon}`,}}> <FaHome /></NavButtonIcon>
            <CNavText style={{color: selectedButton === "Home" ? `${colors.maingreen}` : `${colors.icon}`,}}>Home</CNavText>
    </div>


   </DashboardNav>

  );
};

export default Navigation;
