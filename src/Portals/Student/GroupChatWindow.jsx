import { AES,enc } from 'crypto-js'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { apiServer } from '../../Constants /Endpoints'
import { ChatContainer, ChatCardGroup, ChatImage, ChatImageGroup, HeaderCard, MyMessage, OtherMessage } from '../../Designs/Styles/HyChat'
import { ChatCard } from '../../Designs/Styles/Profile'
import { colors } from '../../Designs/Colors'
import { BsArrowLeft, BsArrowReturnLeft, BsThreeDotsVertical } from 'react-icons/bs'

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
    // const URL = `api/StudentApp/SingleVideo?SID=${userInfo.studentId}&Id=${Id}`;
    const URL = `api/HyChat/GroupInfo?ID=${Id}`;
  
    // Check if Id is defined before making the request
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

   const [Members,setMembers] = useState("")
   //const members = ["solomon", "kwesi", "john", "mary", "peter", "linda", "grace", "david", "sarah", "michael", "anna", "mark", "jane", "robert", "emily", "sam", "olivia", "jacob", "ava", "benjamin", "sophia", "daniel", "mia", "william", "ella", "matthew", "chloe", "james", "hannah", "ethan", "lily", "andrew", "grace", "nathan", "victoria", "samuel", "zoey", "christopher", "audrey", "joseph", "olivia", "oliver", "elizabeth", "elijah", "emily", "noah", "charlotte", "dylan", "amelia", "logan", "ava", "carter", "scarlett", "luke", "sophia", "elizabeth", "grace", "oliver", "david", "lily", "victoria", "harry", "zoe", "george", "natalie", "emily", "benjamin", "mia", "william", "abigail", "lucas", "olivia", "alexander", "ella", "matthew", "elizabeth", "sebastian", "avery", "adrian", "ella", "daniel", "grace", "anthony", "hannah", "nicholas", "scarlett", "jackson", "lily", "madison", "aubrey", "liam", "zoe", "henry", "charlotte", "michael", "nora", "daniel", "aubrey", "joseph", "madison", "john", "nora", "samuel", "amelia", "owen", "emily", "jackson", "chloe", "wyatt", "mia", "logan", "ella", "gabriel", "sophia", "benjamin", "avery", "ryan", "victoria", "william", "hannah", "david", "abigail", "luke", "audrey", "dylan", "lily", "andrew", "zoey"];
   useEffect(() => {
    const URL = `api/HyChat/GroupMembers?ID=${Id}`;
    if (Id) {
      fetch(apiServer + URL)
        .then((response) => response.json())
        .then((data) => {
         
  
          // Calculate the display text here after setting the members
          const maxDisplayedMembers = 1;
          const remainingMembersCount = data.length - maxDisplayedMembers;
  
          const displayedMembers = data.slice(0, maxDisplayedMembers).map((member) => member.userName).join(', ');
  
          const displayText = remainingMembersCount > 0
            ? `${displayedMembers}, ... +${remainingMembersCount} more`
            : displayedMembers;
            setMembers(displayText);
  
          
        })
        .catch((err) => console.error(err));
    }
  }, [Id]);
  
  const navigate = useNavigate()

  const [grpMessage, setGrpMessage] = useState([])

  useEffect(()=>{
    const URL = `api/HyChat/GroupMessage?ID=${userInfo.studentId}&GID=${Id}`;

    if(userInfo.studentId&& Id){
      fetch(apiServer+URL)
      .then(res=>res.json())
      .then(data=>setGrpMessage(data))
      .catch(err=>console.error(err))
      
    }


  },)

  const [grpUnReadMessage, setGrpUnReadMessage] = useState([])

  useEffect(()=>{
    const URL = `api/HyChat/UnReadMessage?ID=${userInfo.studentId}&GID=${Id}`;

    if(userInfo.studentId&& Id){
      fetch(apiServer+URL)
      .then(res=>res.json())
      .then(data=>setGrpUnReadMessage(data))
      .catch(err=>console.error(err))
      
    }


  },[userInfo.studentId,Id])


  

  const [grpUnReadMessageCounter, setGrpUnReadMessageCounter] = useState(0)

  useEffect(()=>{
    const URL = `api/HyChat/UnReadCounter?ID=${userInfo.studentId}&GID=${Id}`;

    if(userInfo.studentId&& Id){
      fetch(apiServer+URL)
      .then(res=>res.text())
      .then(data=>setGrpUnReadMessageCounter(data))
      .catch(err=>console.error(err))
      
    }


  },)











    
  return (
    <div>
      <div
    style={{
        display: 'flex',
        flexDirection: 'column',
        gap:"1rem",
        marginTop:'1rem'
    }}
    >
       
       <>
      <ChatCard>
        <div style={{
          paddingTop:"1rem",


        }} onClick={()=>{
          navigate("/HyChat")
        }}>
        <BsArrowLeft/>
        </div>
     
    <ChatImage src={apiServer + grp?.picture} />

      
        <div style={{display:'flex', flexDirection:"column",  gap:'0.5rem'}} >


        <div style={{display:'flex', flexDirection:"row", justifyContent:"space-between"}}>
     
        <div style={{fontSize:'1.2rem', fontFamily:'times new roman' }}>
          {grp.groupName? grp.groupName.length > 20
          ? grp.groupName.substring(0, 20): grp.groupName: ''}
        </div>
        
        <div style={{right:0,position:"fixed",fontSize:'2rem', color:`${colors.text2}`,}}> 
        <BsThreeDotsVertical/>
        </div>
        
        </div>
        
        <div style={{display:'flex', flexDirection:"row", justifyContent:"space-between"}}>
        
        <div style={{fontSize:'0.9rem'}}>
        
        
        {Members? Members.length > 30
          ? Members.substring(0, 30)+ "...": Members: ''}
            
          </div>
        
        
        
        </div>
        
        
        </div>
        
      

    




</ChatCard>


       </>
  
<ChatContainer>

{
  grpMessage.length>0&&
  grpMessage.map((data)=>(
    <>
    {
      data.messageType==="Text"?(
      <>
      
      {
      data.status===userInfo.studentId?(
      <>
      <MyMessage>
<ChatCardGroup>
    
    <div style={{display:'flex', flexDirection:"column",  gap:'0.5rem', width:"100%"}} >
        
        <div style={{fontSize:'1rem', fontFamily:'times new roman' }}>
           {data?.message}        
        </div>

        <div style={{alignSelf:'flex-end',fontSize:'0.8rem'}}>
        {data?.dateAdded}
        </div>
        
        
        
        </div>


</ChatCardGroup>
</MyMessage>
      </>):(

      <>
            <OtherMessage>
<ChatCardGroup>
    <ChatImageGroup src={apiServer + data?.picture} />
    <div style={{display:'flex', flexDirection:"column",  gap:'0.5rem', width:"100%"}} >


           
        <div style={{fontSize:'1.2rem', fontFamily:'times new roman',color:`${colors.maingreen}` }} onClick={()=>{
          navigate(`/HyChat/${grp.groupId}`)
        }}>
          {data.userName? data.userName.length > 20
          ? data.userName.substring(0, 20): data.userName: ''}
        </div>
        
        <div style={{fontSize:'1rem', fontFamily:'times new roman' }}>
           {data?.message}        
        </div>

        <div style={{alignSelf:'flex-end',fontSize:'0.8rem',}}>
        {data?.dateAdded}
        </div>
        
        
        
        </div>


</ChatCardGroup>
</OtherMessage>
      </>)
    }
    
      </>):(<></>)
    }
    
    
    
    </>
  ))
}







</ChatContainer>

{
 grpUnReadMessageCounter<1?(<></>):(

  <div style={{fontSize:'1.5rem', fontFamily:'times new roman',textAlign:"center", color:`${colors.mainred}` }}>
{grpUnReadMessageCounter} unread {grpUnReadMessageCounter>1?(<>messages</>):(<>message</>)}
</div>

 ) 
}


<ChatContainer>

{
  grpUnReadMessage.length>0&&
  grpUnReadMessage.map((data)=>(
    <>
    {
      data.messageType==="Text"?(
      <>
      
      {
      data.status===userInfo.studentId?(
      <>
      <MyMessage>
<ChatCardGroup>
    
    <div style={{display:'flex', flexDirection:"column",  gap:'0.5rem', width:"100%"}} >
        
        <div style={{fontSize:'1rem', fontFamily:'times new roman' }}>
           {data?.message}        
        </div>

        <div style={{alignSelf:'flex-end',fontSize:'0.8rem'}}>
        {data?.dateAdded}
        </div>
        
        
        
        </div>


</ChatCardGroup>
</MyMessage>
      </>):(

      <>
            <OtherMessage>
<ChatCardGroup>
    <ChatImageGroup src={apiServer + data?.picture} />
    <div style={{display:'flex', flexDirection:"column",  gap:'0.5rem', width:"100%"}} >


           
        <div style={{fontSize:'1.2rem', fontFamily:'times new roman',color:`${colors.maingreen}` }} onClick={()=>{
          navigate(`/HyChat/${grp.groupId}`)
        }}>
          {data.userName? data.userName.length > 20
          ? data.userName.substring(0, 20): data.userName: ''}
        </div>
        
        <div style={{fontSize:'1rem', fontFamily:'times new roman' }}>
           {data?.message}        
        </div>

        <div style={{alignSelf:'flex-end',fontSize:'0.8rem',}}>
        {data?.dateAdded}
        </div>
        
        
        
        </div>


</ChatCardGroup>
</OtherMessage>
      </>)
    }
    
      </>):(<></>)
    }
    
    
    
    </>
  ))
}







</ChatContainer>


     

       



        


    </div>
   
      
      
      </div>
  )
}

export default GroupChatWindow