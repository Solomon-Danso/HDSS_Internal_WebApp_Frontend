import React, { useEffect, useState } from 'react'
import { CText, CTextLarge, CardImageDiv, CardRow, CardTextDiv, LargeCard, MediumCard, StatBigText, StatCard, StatIcon, StatSmallText, StatText } from '../../Designs/Styles/Dashboard'
import { apiServer } from '../../Constants /Endpoints';
import { AES, enc } from 'crypto-js';
import { Button } from '../../Designs/Styles/Styles';
import { colors } from '../../Designs/Colors';
import { useNavigate } from 'react-router-dom'
import {HiOutlineShoppingCart} from 'react-icons/hi';
import {MdOutlineSell} from 'react-icons/md';
import {RiGroupLine} from 'react-icons/ri';
import {GiMoneyStack,GiSurferVan} from "react-icons/gi";


const Home = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const encryptedData = sessionStorage.getItem("userDataEnc");
    const encryptionKey = '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK';
    const decryptedData = AES.decrypt(encryptedData, encryptionKey);
    const decryptedString = decryptedData.toString(enc.Utf8);
    const parsedData = JSON.parse(decryptedString);
      setUserInfo(parsedData);
  }, []);
  const profilePic = apiServer+userInfo.profilePicture
  console.log(userInfo)

  function Greeting() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    let greeting;
  
    if (currentHour < 12) {
      greeting = "Good morning";
    } else if (currentHour < 18) {
      greeting = "Good afternoon";
    } else {
      greeting = "Good evening";
    }
  
    return greeting;
  }


  const formatNumber = (number) => {
    if (number >= 1000000000000000) {
      return (number / 1000000000000000).toFixed(3) + 'Q';
    } else if (number >= 1000000000000) {
      return (number / 1000000000000).toFixed(3) + 'T';
    } else if (number >= 1000000000) {
      return (number / 1000000000).toFixed(3) + 'B';
    } else if (number >= 1000000) {
      return (number / 1000000).toFixed(3) + 'M';
    } else if (number >= 1000) {
      return (number / 1000).toFixed(3) + 'K';
    }
    return number.toString();
  };
  


  return (
    <>
    <CardRow>

        <MediumCard>
            <CardTextDiv>
                <div>
                {Greeting()},<br/> {userInfo.fullName}
                </div> <br/>
          
                <div>
            <CText>
            Staff ID: 
            </CText>&nbsp;
           {userInfo.staffId}
           </div> 

           <div>
            <CText>
            Email: 
            </CText>&nbsp;
           {userInfo.email}
           </div> 

           <div>
            <CText>
            Phone:
            </CText>
           {userInfo.phoneNumber}
           </div> 

           <Button
          background={colors.ctext}
          color="white"
          border={colors.body}
          style={{ marginTop: 25, width: "100%", }}
          onClick={() => { navigate("/dashboard/profile") }}
          radius={"10px"}
          >

          View Profile
          </Button>
            </CardTextDiv>

            <CardImageDiv
            src={profilePic}
            />
        </MediumCard>


        <LargeCard>
            <CardRow><CTextLarge>Statistics</CTextLarge></CardRow>
            <CardRow>

            <StatCard onClick={()=>{navigate("/dashboard/Sales")}}>
            <StatIcon background = {colors.lightblue} color={colors.ctext}>  <MdOutlineSell size={30}/> </StatIcon>

            <StatText>
            <StatBigText>{formatNumber(230000)}</StatBigText>
            <StatSmallText>sales</StatSmallText>

            </StatText>

            </StatCard>

            <StatCard onClick={()=>{navigate("/dashboard/Customers")}}>
            <StatIcon background = {colors.lightgreen} color={colors.maingreen}>  <RiGroupLine size={30}/> </StatIcon>

            <StatText>
            <StatBigText>{formatNumber(8549)}</StatBigText>
            <StatSmallText>Customers</StatSmallText>

            </StatText>

            </StatCard>

            <StatCard onClick={()=>{navigate("/dashboard/Products")}}>
            <StatIcon background = {colors.lightred} color={colors.mainred}>  <HiOutlineShoppingCart size={30}/> </StatIcon>

            <StatText>
            <StatBigText>{formatNumber(98765)}</StatBigText>
            <StatSmallText>Products</StatSmallText>

            </StatText>

            </StatCard>

            <StatCard onClick={()=>{navigate("/dashboard/Account")}}>
            <StatIcon background = {colors.lightsecondgreen} color={colors.mainsecondgreen}>  <GiMoneyStack size={30}/> </StatIcon>

            <StatText>
            <StatBigText>{formatNumber(9876529)}</StatBigText>
            <StatSmallText>Revenue</StatSmallText>

            </StatText>

            </StatCard>


            </CardRow>

        </LargeCard>

    </CardRow>
    
    
    
    </>
  )
}

export default Home