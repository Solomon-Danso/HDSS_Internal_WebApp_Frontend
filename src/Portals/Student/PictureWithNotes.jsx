import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MovieCard, MovieBText, MovieSText, FormLable, FormTextAreaStudent, FormTextAreaNotes, AdmitButton2, AddNotes } from '../../Designs/Styles/Profile';

import { AES, enc } from 'crypto-js';
import { apiServer } from '../../Constants /Endpoints';
import { colors } from '../../Designs/Colors';
import { Show } from '../../Constants /Alerts';
import { MenuButtonIcon } from '../../Designs/Styles/Styles';
import { RiEyeLine, RiVideoUploadLine } from 'react-icons/ri';
import { GoDownload } from 'react-icons/go';
import { HiOutlineAcademicCap } from 'react-icons/hi';
import { MdOutlineHeadset } from 'react-icons/md';
import Beauty from '../../Designs/Images/beauty.jpg'








const PictureWithNotes = (props) => {
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
    const URL = `api/StudentApp/SinglePicture?SID=${userInfo.studentId}&Id=${Id}`;
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
            resourceType:"Picture",
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
   {
    isMobile?(<>
     {singleVid.slidePath != undefined && (
      
        <MovieCard>
            <img src={apiServer + singleVid.slidePath} width="100%" height="70%" top="0px" alt={"Click Me"}

          />
          <MovieBText>{singleVid.subjectName}</MovieBText>
          <MovieSText>{singleVid.title}</MovieSText>
         
          <div>

          <div style={{
  display: 'flex',
  flexDirection:'row',
  width:"100%",
  height:"auto",
  gap:"1rem",

}}>

<div style={{display:"flex", flexDirection:"row"}}>
          <MenuButtonIcon ><RiEyeLine/></MenuButtonIcon>
          <MovieSText >{formatNumber(singleVid.numberOfViews)} </MovieSText>
  </div>

  <div style={{display:"flex", flexDirection:"row"}}>
  <MenuButtonIcon> <MdOutlineHeadset/></MenuButtonIcon>
  <MovieSText>{singleVid.dateAdded}</MovieSText>
</div>

<div style={{display:"flex", flexDirection:"row"}}>
          <MenuButtonIcon ><HiOutlineAcademicCap/></MenuButtonIcon>
          <MovieSText >{singleVid.academicTerm} </MovieSText>
</div>




</div>

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
          <img src={apiServer + singleVid.slidePath} width="100%" height="70%" top="0px" alt={"Click Me"}
          
         
          />
  


<div style={{display: 'flex',flexDirection:'row',width:"100%",height:"auto",justifyContent:"space-between"}}>
  <div>
  <MovieBText>{singleVid.subjectName}</MovieBText>
  </div>



<div style={{display: 'flex',flexDirection:'row',gap:"3rem"}}>

<div style={{display:"flex", flexDirection:"row"}}>
          <MenuButtonIcon ><RiEyeLine/></MenuButtonIcon>
          <MovieSText >{formatNumber(singleVid.numberOfViews)} </MovieSText>
  </div>

  <div style={{display:"flex", flexDirection:"row"}}>
  <MenuButtonIcon> <MdOutlineHeadset/></MenuButtonIcon>
  <MovieSText>{singleVid.dateAdded}</MovieSText>
</div>

<div style={{display:"flex", flexDirection:"row"}}>
          <MenuButtonIcon ><HiOutlineAcademicCap/></MenuButtonIcon>
          <MovieSText >{singleVid.academicTerm} </MovieSText>
</div>


</div>








</div>
        
        
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

export default PictureWithNotes;

