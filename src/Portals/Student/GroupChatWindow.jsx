import { AES,enc } from 'crypto-js'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiServer } from '../../Constants /Endpoints'

const GroupChatWindow = () => {
    const {Id} = useParams()
    const [grp, SetGrp] = useState({})

    const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const encryptedData = sessionStorage.getItem('userDataEnc');
    const encryptionKey = '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK';
    const decryptedData = AES.decrypt(encryptedData, encryptionKey);
    const decryptedString = decryptedData.toString(enc.Utf8);
    const parsedData = JSON.parse(decryptedString);
    setUserInfo(parsedData);
  }, []);


    useEffect(() => {
      //const URL = `api/StudentApp/SingleVideo?SID=${userInfo.studentId}&Id=${Id}`;
      const URL = `api/HyChat/GroupInfo?ID=${Id}`
      if (Id) {
        fetch(apiServer + URL)
          .then((response) => response.json())
          .then((data) => SetGrp(data))
          .catch((err) => console.error(err));
      }
    }, [Id]);
  
    const [isMobile, setIsMobile] = useState(false);
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
 
    
  return (
    <div>GroupChatWindow for {grp.groupName}</div>
  )
}

export default GroupChatWindow