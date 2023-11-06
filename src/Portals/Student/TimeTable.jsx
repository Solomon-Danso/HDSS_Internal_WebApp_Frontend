import { AES,enc } from 'crypto-js';
import React, { useEffect, useState } from 'react';

import { apiServer } from '../../Constants /Endpoints';
import { CardImage2, CardImage3 } from '../../Designs/Styles/Profile';
import ttable from "../../Designs/Images/timetable.jpg"

const TimeTable = () => {


    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
      const encryptedData = sessionStorage.getItem("userDataEnc");
      const encryptionKey = '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK';
      const decryptedData = AES.decrypt(encryptedData, encryptionKey);
      const decryptedString = decryptedData.toString(enc.Utf8);
      const parsedData = JSON.parse(decryptedString);
        setUserInfo(parsedData);
    }, []);

const [timetable, setTimeTable] = useState([])


    useEffect(() => {
        if(userInfo.studentId&&userInfo.level){
         
            const URL=`api/StudentApp/TimeTable?SID=${userInfo.studentId}&ClassName=${userInfo.level}`
            fetch(apiServer + URL)
              .then(response => response.json()) // Parse the response as JSON
              .then(data => setTimeTable(data))
              .catch(error => console.error(error));
        }
      
      }, [userInfo.studentId,userInfo.level]);


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
        <>

      

          {timetable.length > 0 && (
            timetable.map((data, index) => (
              <div key={index}>
                {
            isMobile?(
            <>
            
            <a href={apiServer + data.slidePath} target="_blank">
             <CardImage3 src={ttable} />
    </a>
            </>):(<>
                <iframe
                  title={`PDF Viewer ${index}`}
                  src={apiServer + data.slidePath}
                  width="1000px"
                  height="850px"
                />
         
            
            </>)
        }

              </div>
            
            ))
          )}
        </>
      );
    };
  
  
  export default TimeTable;
  