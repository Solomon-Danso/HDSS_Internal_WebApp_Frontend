import React, { useEffect, useState } from 'react'
import { ChatCard, MenuCard2 } from '../../Designs/Styles/Profile'
import { ChatImage, ChatName, Counter, LastMessage, RowNameandMember, RowNameandMember2 } from '../../Designs/Styles/HyChat'
import Beauty from '../../Designs/Images/beauty.jpg'
import { apiServer } from '../../Constants /Endpoints'
import { AES,enc } from 'crypto-js'
import { colors } from '../../Designs/Colors'
import { useLocation, useNavigate } from 'react-router-dom'


const MainChatPage = () => {
  const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState({});
    const [isMobile, setIsMobile] = useState(false);
const [active, setActive] = useState(null);

useEffect(() => {
  setActive(1);
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



    useEffect(() => {
      const encryptedData = sessionStorage.getItem("userDataEnc");
      const encryptionKey = '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK';
      const decryptedData = AES.decrypt(encryptedData, encryptionKey);
      const decryptedString = decryptedData.toString(enc.Utf8);
      const parsedData = JSON.parse(decryptedString);
        setUserInfo(parsedData);
    }, []);
 
 const [mgroup, setMGroup] = useState([])
 
    useEffect(() => {
   
        const URL=`api/HyChat/MyGroups?ID=${userInfo.studentId}`
        if(userInfo.studentId){
            fetch(apiServer + URL)
            .then(response => response.json()) // Parse the response as JSON
            .then(data => setMGroup(data))
            .catch(error => console.error(error));
        }
       
    
    
    });

 
    const offline = async () => {
  
    
      try {
  
        const URL = `api/HyChat/Offline?ID=${userInfo.studentId}`;
  
        const response = await fetch(apiServer+URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
       
      
    
        if (response.ok) {
          
          
          
        } else {
        console.error("BDK.FHJ ,GSAJKADS JFA KJDSF SAKJDFV ASVF")
        }
      } catch (error) {
  
        console.error(error)
  
      }
  
  }
  
  
   
  
    const location = useLocation();
  
    useEffect(() => {
      // Check if the path is "/HyChat"
      if (location.pathname === '/HyChat') {
        
          offline();
        
      }       return () => {
        // Additional cleanup logic if needed
      };
    });
  


 
 
    return (
    <div
    style={{
        display: 'flex',
        flexDirection: 'column',
        gap:"1rem",
        marginTop:'1rem'
    }}
    >
         {mgroup.length > 0 &&
    mgroup.map((data) => (
       <>
      <ChatCard>
    <ChatImage src={apiServer + data.picture} />
    {
      isMobile?(
      
        <div style={{display:'flex', flexDirection:"column",  gap:'0.5rem'}} onClick={()=>{
          navigate(`/HyChat/${data.groupId}`)
        }}>


        <div style={{display:'flex', flexDirection:"row", justifyContent:"space-between"}}>
        
        <div style={{fontSize:'1.2rem', fontFamily:'times new roman' }}>
          {data.groupName? data.groupName.length > 20
          ? data.groupName.substring(0, 20): data.groupName: ''}
        </div>
        
        <div style={{right:0,position:"fixed",fontSize:'0.75rem', color:`${colors.text2}`,}}> 
        {data.lastSenderDate}
        </div>
        
        </div>
        
        <div style={{display:'flex', flexDirection:"row", justifyContent:"space-between"}}>
        
        <div style={{fontSize:'0.9rem'}}>
        
                {data.lastSenderName
                        ? data.lastSenderName.length > 8
                            ? data.lastSenderName.substring(0, 8)+": "
                            : data.lastSenderName
                        : ''}
        

         <span style={{
           color:`${colors.text}`
        }}>
       
                    
                       
                        {data.lastMessage
                        ? data.lastMessage.length > 30
                            ? data.lastMessage.substring(0, 30) + "..."
                            : data.lastMessage
                        : ''}
               </span>        
        </div>
        
        <div style={{right:0,position:"fixed",}}> 
        {
                        data.totalUnreadMessage<1?(<></>):(<p style={{
                           color:`${colors.lightgreen}`,
                           fontSize: '1rem',
                           backgroundColor:`${colors.maingreen}`,
                           borderRadius:"50%",
                           width:'1.2rem',
                           textAlign: 'center',
                           height:'1.2rem',
                        }}>{data.totalUnreadMessage}</p>)
                    }
        </div>
        
        </div>
        
        
        </div>
        
      
      ):(
      
        <div style={{display:'flex', flexDirection:"column",  gap:'1.5rem'}} onClick={()=>{
          navigate(`/HyChat/${data.groupId}`)
        }}>


        <div style={{display:'flex', flexDirection:"row", justifyContent:"space-between"}}>
        
        <div style={{fontSize:'2.2rem', fontFamily:'times new roman' }}>
          {data.groupName? data.groupName.length > 20
          ? data.groupName.substring(0, 20): data.groupName: ''}
        </div>
        
        <div style={{right:0,position:"fixed",fontSize:'1.75rem', color:`${colors.text2}`,}}> 
        {data.lastSenderDate}
        </div>
        
        </div>
        
        <div style={{display:'flex', flexDirection:"row", justifyContent:"space-between"}}>
        
        <div style={{fontSize:'2rem'}}>
       
      


        
                {data.lastSenderName
                        ? data.lastSenderName.length > 8
                            ? data.lastSenderName.substring(0, 8)+": "
                            : data.lastSenderName
                        : ''}
        
     

          <span style={{
           color:`${colors.text}`
        }}> 
                    
                        
                        {data.lastMessage
                        ? data.lastMessage.length > 30
                            ? data.lastMessage.substring(0, 30) + "..."
                            : data.lastMessage
                        : ''}
        </span>               
        </div>
        
        <div style={{right:0,position:"fixed",}}> 
        {
                        data.totalUnreadMessage<1?(<></>):(<p style={{
                           color:`${colors.lightgreen}`,
                           fontSize: '2rem',
                           backgroundColor:`${colors.maingreen}`,
                           borderRadius:"50%",
                           width:'2.2rem',
                           textAlign: 'center',
                           height:'2.2rem',
                        }}>{data.totalUnreadMessage}</p>)
                    }
        </div>
        
        </div>
        
        
        </div>
        
      
      )
    }




</ChatCard>


       </>
    ))}
        

       



        


    </div>
  )
}

export default MainChatPage