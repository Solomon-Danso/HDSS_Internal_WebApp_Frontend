import React, { useEffect, useState } from "react";

import { useNavigate } from 'react-router-dom'
import { colors } from "../Designs/Colors";
import {  DashboardNav,
    DashIcon,
    DashIconMenu,
    DashIconSep,
    IconDashHome,
    IconDashLogoutNav,
    IconDashPayment,
    IconDashResources,
    IconDashSettings,
   } from "../Designs/Card/Dashboard";
import { apiServer } from "../Constants /Endpoints";

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

 

  const [SchoolData, SetSchoolData] = useState({})
  useEffect(()=>{
    fetch(apiServer+"api/Setup/GetSchoolData")
    .then(res=>res.json())
    .then(data=>SetSchoolData(data))
    .catch(error=>console.error(error))
    },[])

  return (
    <DashboardNav>
      <DashIcon
        src={apiServer+SchoolData.logo}
        alt="icon"
        onClick={() => navigate("/dashboard")}
      />
       <DashIconMenu onClick={openfunction}/>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: colors.body,
            borderRadius: 15,
            padding: 7,
          }}
        >
          <DashIconSep
            title="Dashboard"
            active={page === "dashboard" ? true : false}
            
          >
            <DashIconMenu
              onClick={openfunction}
              color={page === "dashboard" ? colors.primary : "white"}
            />
          </DashIconSep>
          <DashIconSep
            title="Shop"
            active={page === "shop" ? true : false}
            onClick={() => navigate("/dashboard")}
          >
            <IconDashHome
              title="Shop"
              onClick={() => navigate("/dashboard/shop")}
              color={page === "shop" ? colors.primary : "white"}
            />
          </DashIconSep>
          <DashIconSep
            title="Events"
            active={page === "event" ? true: false}
            onClick={() => navigate("/dashboard")}
          >
            <IconDashResources
              title="Events"
              onClick={() => navigate("/dashboard/events")}
              color={page === "event" ?  colors.primary : "white"}
            />
          </DashIconSep>
          <DashIconSep
            title="Payments"
            active={page === "payment" ? true: false}
            onClick={() => navigate("/dashboard")}
          >
            <IconDashPayment
              title="Payment"
              onClick={() => navigate("/dashboard/payment")}
              color={page === "payment" ?  colors.primary : "white"}
            />
          </DashIconSep>
          <DashIconSep
            title="Settings"
            active={page === "settings" ? true : false}
            onClick={() => navigate("/dashboard")}
          >
            <IconDashSettings
              title="Settings"
              onClick={() => navigate("/dashboard/settings")}
              color={page === "settings" ?  colors.primary : "white"}
            />
          </DashIconSep>
        </div>
      </div>
      <IconDashLogoutNav 
        onClick={() => {
          sessionStorage.clear();
          navigate("/");
      }}
            
      title="Logout" />
    </DashboardNav>
  );
};

export default Navigation;
