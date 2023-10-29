import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MovieCard, MovieBText, MovieSText, FormLable, FormTextAreaStudent, FormTextAreaNotes, AdmitButton2, AddNotes } from '../../Designs/Styles/Profile';

import { AES, enc } from 'crypto-js';
import { apiServer } from '../../Constants /Endpoints';
import { colors } from '../../Designs/Colors';
import { Show } from '../../Constants /Alerts';

const VideoWithNotes = (props) => {
  const { Id } = useParams();

  const [singleVid, setSingleVid] = useState({});
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
    const URL = `api/StudentApp/SingleVideo?SID=${userInfo.studentId}&Id=${Id}`;
    if (userInfo.studentId) {
      fetch(apiServer + URL)
        .then((response) => response.json())
        .then((data) => setSingleVid(data))
        .catch((err) => console.error(err));
    }
  }, [userInfo.studentId, Id]);

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


  const Adder = async () => {
    
   Show.showLoading("Processing Data");
const URL=`api/StudentApp/StudentNote?SID=${userInfo.studentId}`

    try {
      const response = await fetch(apiServer + URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header
        },
        body: JSON.stringify({
            resourceUrl:apiServer + singleVid.slidePath,
            resourceType:"Video",
            notes:a,
            subject:singleVid.subjectName,
            academicTerm:singleVid.academicTerm,
            academicYear:singleVid.academicYear,



        }),
      });
      const data = await response.text();
      if (response.ok) {
       Show.hideLoading();
       Show.Success("Notes Uploaded Successfully")
       sa("");
        
      } else {
        Show.Attention(data);
      }
    } catch (err) {
      Show.Attention("An error has occurred");
    }
  };

const [a,sa] = useState("")



  return (
    <>
   {
    isMobile?(<>
     {singleVid.slidePath != undefined && (
      
        <MovieCard>
          <video controls width="100%" height="70%" top="0px">
            <source src={apiServer + singleVid.slidePath} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <MovieBText>{singleVid.subjectName}</MovieBText>
          <MovieSText>{singleVid.title}</MovieSText>
         
          <div>
        
        <FormTextAreaNotes
        type="text"
        required
        placeholder="Type All Your Notes Here"
        //onChange={(e) => sa(e.target.value)}
       
        />
     </div>

     <AddNotes
        background={colors.lightgreen}
        color="white"
        border={colors.maingreen}
        onClick={()=>{
            Adder()
        }}
        >Upload
        </AddNotes>
        </MovieCard>

      
    

      
      )}
    
    
    </>):(<>
    
        {singleVid.slidePath != undefined && (
        <>
          <video controls width="100%" height="70%" top="0px">
            <source src={apiServer + singleVid.slidePath} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <MovieBText>{singleVid.subjectName}</MovieBText>
          <MovieSText>{singleVid.title}</MovieSText>
          <div>
        
        <FormTextAreaNotes
        type="text"
        required
        value={a}
        placeholder="Type All Your Notes Here"
        onChange={(e) => sa(e.target.value)}
       
        />
     </div>

     <AddNotes
        background={colors.lightgreen}
        color="white"
        border={colors.maingreen}
        onClick={()=>{
            Adder()
        }}
        >Upload
        </AddNotes>
        </>
      )}
    </>)
   }
     
    </>
  );
}

export default VideoWithNotes;

