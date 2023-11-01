import React, { useEffect, useState } from 'react'
import { ChatCard, MenuCard2 } from '../../Designs/Styles/Profile'
import { ChatImage, ChatName, Counter, LastMessage, RowNameandMember, RowNameandMember2 } from '../../Designs/Styles/HyChat'
import Beauty from '../../Designs/Images/beauty.jpg'
import { apiServer } from '../../Constants /Endpoints'
import { AES,enc } from 'crypto-js'
import { colors } from '../../Designs/Colors'

const MainChatPage = () => {

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
       
    
    
    }, [userInfo.studentId]);
 
 
 
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
         <RowNameandMember>
        <ChatName>{data.groupName
                ? data.groupName.length > 12
                    ? data.groupName.substring(0, 12)
                    : data.groupName
                : ''}</ChatName>
        <LastMessage>
        <b>
        {data.lastSenderName
                ? data.lastSenderName.length > 8
                    ? data.lastSenderName.substring(0, 8)+": "
                    : data.lastSenderName
                : ''}
        </b>
       
            
                <i>
                {data.lastMessage
                ? data.lastMessage.length > 20
                    ? data.lastMessage.substring(0, 20) + "..."
                    : data.lastMessage
                : ''}
                </i>
             
        </LastMessage>
    </RowNameandMember>
    
    ):(
        <RowNameandMember>
        <ChatName>{data.groupName}</ChatName>
        <LastMessage>
        
        {data.lastSenderName}{": "}
            
                
             {data.lastMessage}
        </LastMessage>
    </RowNameandMember>
    )
}



    
{
    isMobile?(
        <RowNameandMember2>
        <div>
            <p style={{
                       color:`${colors.mainsecondgreen}`,
                       fontSize: '0.6rem',
                       width:'1rem',
    
                          
                      
                    }}>{data.lastSenderDate}</p>
    
            </div>
    
            <div>
                {
                    data.totalUnreadMessage<1?(<></>):(<p style={{
                       color:`${colors.lightsecondgreen}`,
                       fontSize: '0.9rem',
                       backgroundColor:`${colors.mainsecondgreen}`,
                       borderRadius:"50%",
                       width:'1rem',
                       textAlign: 'center',
                       height:'1rem',
                    }}>{data.totalUnreadMessage}</p>)
                }
            </div>
    
          
    
        </RowNameandMember2>
        ):(
        
        
    <RowNameandMember2>
    <div>
        <p style={{
                   color:`${colors.mainsecondgreen}`,
                   fontSize: '1.2rem',
                   width:'30rem',

                      
                  
                }}>{data.lastSenderDate}</p>

        </div>

        <div>
            {
                data.totalUnreadMessage<1?(<></>):(<p style={{
                   color:`${colors.lightsecondgreen}`,
                   fontSize: '1.3rem',
                   backgroundColor:`${colors.mainsecondgreen}`,
                   borderRadius:"50%",
                   width:'1.5rem',
                   textAlign: 'center',
                   height:'1.5rem',
                }}>{data.totalUnreadMessage}</p>)
            }
        </div>

      

    </RowNameandMember2>
        
        
        )
}


</ChatCard>


       </>
    ))}
        

       



        


    </div>
  )
}

export default MainChatPage