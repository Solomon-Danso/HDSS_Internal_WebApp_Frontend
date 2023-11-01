import React, { useEffect, useState } from 'react'
import { AES,enc } from 'crypto-js';
import { HeaderCard,AppName,RowSB, AppRow } from '../../Designs/Styles/HyChat';
import { MenuButtonDiv,MenuButtonIcon,MenuButtonLink,MenuContainer,MenuButtonOptionLink, MenuButtonMain, MenuButtonOption, MenuButtonIconAgain, SMenuButtonDiv } from '../../Designs/Styles/Styles'
import { BsCamera, BsChatSquareDots, BsGlobeAsiaAustralia, BsTelephone } from 'react-icons/bs';
import {MdContactPhone, MdOutlineAutoStories, MdOutlineGroups, MdPersonSearch, MdSettings} from 'react-icons/md';
import { FormInputSearch, FormInputSearchHyChat, MenuCard2, MenuCardHyChat } from '../../Designs/Styles/Profile';
import StraightLink from "../../Pages/Student/StraightLink"
import { AiOutlineCalendar, AiOutlineFileText, AiOutlineMenuUnfold, AiOutlineNotification } from 'react-icons/ai';
import { RiFileSettingsFill, RiGroupFill } from 'react-icons/ri';
import { colors } from '../../Designs/Colors';
import { FaGlobe, FaLayerGroup } from 'react-icons/fa';
import { GiThreeFriends } from 'react-icons/gi';
import { FcSettings } from 'react-icons/fc';


const HyChat = () => {

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const encryptedData = sessionStorage.getItem("userDataEnc");
    const encryptionKey = '$2a$11$3lkLrAOuSzClGFmbuEAYJeueRET0ujZB2TkY9R/E/7J1Rr2u522CK';
    const decryptedData = AES.decrypt(encryptedData, encryptionKey);
    const decryptedString = decryptedData.toString(enc.Utf8);
    const parsedData = JSON.parse(decryptedString);
      setUserInfo(parsedData);
  }, []);



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
const [openChat, setOpenChat] = useState(false)
const [openSearch, setOpenSearch] = useState(false)
const [OpenMenu, setOpenMenu] = useState(false)

const closer = () =>{
  setOpenMenu(false);
  setOpenChat(false);
  setOpenSearch(false);
}
const [searchTerm, setSearchTerm] = useState()


  return (
    <div>
    <HeaderCard> 
<RowSB>
<AppName>HyChat</AppName>

<AppRow>
<MenuButtonIcon onClick={()=>{closer();setOpenMenu(!OpenMenu)}}> <FaLayerGroup/> </MenuButtonIcon>
<MenuButtonIcon onClick={()=>{closer();setOpenSearch(!openSearch)}}> <MdPersonSearch/> </MenuButtonIcon>
<MenuButtonIcon onClick={()=>{closer();setOpenChat(!openChat)}}> <BsChatSquareDots/> </MenuButtonIcon>
</AppRow>

</RowSB>


    </HeaderCard>
    {
  openChat?(<><MenuCardHyChat >

    <StraightLink logo={<MdOutlineGroups/>} title="New Group" path="/student/group"/>
    <StraightLink logo={<RiGroupFill/>} title="New Chat" path="/student/chat"/>
     
    
    
      
    </MenuCardHyChat></>):(<></>)
}

{
  openSearch?(<>


          <FormInputSearchHyChat
            //background={colors.darkBlue}
        
            border={colors.darkBlue}
            placeholder="Search for anything..."
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ '::placeholder': { color: 'white' } }}
          />
          

    
    
      
   </>):(<></>)
}

{
  OpenMenu?(<><MenuCard2 >

    <StraightLink logo={<FaGlobe/>} title="Global Groups" path="/student/timetable"/>
    <StraightLink logo={<BsTelephone/>} title="Calls" path="/student/lesson"/>
    <StraightLink logo={<MdContactPhone/>} title="Contacts" path="/student/overview"/>
    <StraightLink logo={<GiThreeFriends/>} title="Friends" path="/student"/>
    <StraightLink logo={<MdOutlineAutoStories/>} title="My Stories" path="/student/announcements"/>
    <StraightLink logo={<MdSettings/>} title="Settings" path="/student"/>
   
    
    
      
    </MenuCard2></>):(<></>)
}




    </div>
  )
}



export default HyChat