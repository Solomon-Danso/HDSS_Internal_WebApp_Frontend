import React, { useEffect, useState } from 'react'
import { BasicInfo, CoverImage, ProfileContainer, ProfileDiv, ProfileImage } from '../../Designs/Styles/Profile'
import { apiServer } from '../../Constants /Endpoints';
import { AES, enc } from 'crypto-js';
import { HomeDetailsGrouper, HomeUserName, HomeUserSpecificRole } from '../../Designs/Styles/Styles';


const Profile = () => {

    const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const encryptedData = sessionStorage.getItem("userDataEnc");
    const encryptionKey = '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK';
    const decryptedData = AES.decrypt(encryptedData, encryptionKey);
    const decryptedString = decryptedData.toString(enc.Utf8);
    const parsedData = JSON.parse(decryptedString);
      setUserInfo(parsedData);
  }, []);
  const profilePic = apiServer+userInfo.profilePicturePath

  return (
    <ProfileDiv>
      


    </ProfileDiv>
  )
}

export default Profile