import { AES,enc } from 'crypto-js'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { apiServer } from '../../Constants /Endpoints'
import { ChatContainer, ChatCardGroup, ChatImage, ChatImageGroup, HeaderCard, MyMessage, OtherMessage, ChatMessageInput, OptionCard } from '../../Designs/Styles/HyChat'
import { ChatCard, FormTextAreaNotes, MenuCard2 } from '../../Designs/Styles/Profile'
import { colors } from '../../Designs/Colors'
import { BsArrowLeft, BsArrowReturnLeft, BsFillSendCheckFill, BsPlusCircleFill, BsTelephone, BsThreeDotsVertical } from 'react-icons/bs'
import { Show } from '../../Constants /Alerts'
import { FaGlobe } from 'react-icons/fa'
import { MdContactPhone, MdHeadset, MdOndemandVideo, MdOutlineAutoStories, MdSettings } from 'react-icons/md'
import { GiBookmarklet, GiThreeFriends } from 'react-icons/gi'
import StraightLink from "../../Pages/Student/StraightLink"
import AnimateHeight from 'react-animate-height'
import { AiOutlinePicture, AiTwotoneFileWord } from 'react-icons/ai'




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
        .then((data) => {
          SetGrp(data)
          handleNavigation();
        })
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
     useEffect(() => {
    const URL = `api/HyChat/GroupMembers?ID=${Id}`;
    if (Id) {
      fetch(apiServer + URL)
        .then((response) => response.json())
        .then((data) => {
         
  
          // Calculate the display text here after setting the members
          const maxDisplayedMembers = 2;
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

  useEffect(() => {
    const URL = `api/HyChat/GroupMessage?ID=${userInfo.studentId}&GID=${Id}`;
   

    if (userInfo.studentId && Id) {
      fetch(apiServer + URL)
        .then(res => res.json())
        .then(data => {
         
          setGrpMessage(data);

      
        })
        .catch(err => console.error(err));
    }

  },);
  
  

  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default behavior (e.g., newline insertion)
      setMessage(message + '\n');
    }
  };
  
const [counter, setCounter] = useState(0)


useEffect(()=>{
  const URL= `api/HyChat/UnReadCounter?ID=${userInfo.studentId}&GID=${Id}`;
 
  fetch(apiServer+URL)
  .then(res => res.json())
  .then(data=> setCounter(data))
  .catch(err=> console.error(err))
},[userInfo.studentId, Id])

  const unreadMessageRef = useRef(null);

  

{
  /*
  
  
  useEffect(() => {
    // Scroll to the unread message div when the component mounts or when the unread message count changes.
    if (unreadMessageRef.current) {
      unreadMessageRef.current.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo(0, document.body.scrollHeight);
    }
    else {
      // If the ref is null, scroll to the bottom of the page
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [counter]);
  
  */
}
  
  
  
  
  
  
  
  




  

  const online = async () => {
   
    
    try {

      const URL = `api/HyChat/Online?ID=${userInfo.studentId}&GID=${Id}`;

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
    if (location.pathname.startsWith('/HyChat/')) {
      
        online();
        handleReader();
       
        

       
      
      
    }
  },);


 
  const handleNavigation = () =>{
    if (unreadMessageRef.current) {
      unreadMessageRef.current.scrollIntoView({ behavior: 'smooth' });
      
     
    }
    else{
      window.scrollTo(0, document.body.scrollHeight);
      
    }
    
  }


const [dropper, setDropper] = useState(false) 




const handleReader = async () => {
  
 
  try {

    const URL= `api/HyChat/ReadMessages?ID=${userInfo.studentId}&GID=${Id}`;
        const response = await fetch(apiServer+URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          //body: JSON.stringify({userId, userPassword})
        });
  
       
        if (response.ok) {
          
          
          
        } else {
          
        }
      } catch (error) {
  
        console.error(error);
      }
  

 
 

}

const [message, setMessage] = useState("") 

const handleMessage = async () => {
  
    if(message ===""){
      setMessage("type a message...")
    }
    else if(message ==="type a message..."){
      setMessage("type a message...")
    }
    
    else{

      try {

        const URL= `api/HyChat/Message?ID=${userInfo.studentId}&GID=${Id}`;
            const response = await fetch(apiServer+URL, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({message})
            });
        
           
            if (response.ok) {
              setMessage(" ")
              
              
              
            } else {
              
            }
          } catch (error) {
        
            console.error(error);
          }



    }
 
 

}







    
  return (
    <div style={{ paddingBottom: '90px' }}>
             <div style={{display:"flex", flexDirection:"row", gap:"0.5rem", width:"100%", position:"fixed", top:0, left:0, right:0, zIndex:1}}>
      <ChatCard>
        <div style={{
          paddingTop:"1rem",
          marginBottom:"30%"


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


       </div>


      <div
    style={{
        display: 'flex',
        flexDirection: 'column',
        gap:"1rem",
        marginTop:'7rem'
    }}
    >
       

  
      
<ChatContainer>

  
{
  grpMessage.length>0&&
  grpMessage.map((data,index)=>(
    <>




    {
      data.messageType==="Text"?(
      <>



      {

        
        data.mode==="Offline"?(
        <>

  <OtherMessage ref={unreadMessageRef}>

<ChatCardGroup>
    <ChatImageGroup src={apiServer + data?.picture} />
    <div style={{display:'flex', flexDirection:"column",  gap:'0.5rem', width:"100%"}}  >


           
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

        
        </>
        
        ):(

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
        
        </>)
      }





  
    
      </>):(<></>)
    }
    
    
    
    </>
  ))
}







</ChatContainer>





<AnimateHeight height={dropper ? "auto" : 0} duration={500}>
 <OptionCard>
<StraightLink logo={<AiTwotoneFileWord/>} title="Document" path={`/HyChat/Document/${Id}`}/>
    <StraightLink logo={<MdOndemandVideo/>} title="Video" path={`/HyChat/Video/${Id}`}/>
    <StraightLink logo={<MdHeadset/>} title="Audio" path={`/HyChat/Audio/${Id}`}/>
    <StraightLink logo={<AiOutlinePicture/>} title="Picture" path={`/HyChat/Picture/${Id}`}/>
    <StraightLink logo={<GiBookmarklet/>} title="Book" path={`/HyChat/Book/${Id}`}/>
</OptionCard>

</AnimateHeight>








<div style={{display:"flex", flexDirection:"row", gap:"0.5rem", width:"100vw", position:"fixed", bottom:0, left:0, right:0}}>
<div style={{width:"10%",paddingTop:"1.5rem",paddingLeft:"0.5rem"}} onClick={()=>{setDropper(!dropper)}}><BsPlusCircleFill/></div>
<ChatMessageInput
        type="text"
        placeholder="type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
       
        />
<div style={{width:"10%",paddingTop:"1.5rem",paddingRight:"0.5rem"}} onClick={()=>{handleMessage()}}><BsFillSendCheckFill/></div>
</div>

        


    </div>
   
      
      
      </div>
  )
}

export default GroupChatWindow