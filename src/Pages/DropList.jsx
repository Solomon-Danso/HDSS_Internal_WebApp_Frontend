import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MenuButtonDiv,MenuButtonIcon,MenuButtonLink,MenuContainer,MenuButtonOptionLink, MenuButtonMain, MenuButtonOption, MenuButtonIconAgain } from '../Designs/Styles/Styles'
import AnimateHeight from 'react-animate-height';
import {MdKeyboardArrowRight} from "react-icons/md";
import { IoIosArrowDropright } from 'react-icons/io';

const MenuButtons = ({logo, title, children}) => {
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState); // Toggle the value of dropdownOpen
  };





  return (

        <MenuButtonDiv > 

          <MenuButtonMain>
            <div style={{display:"flex", flexDirection:"row", gap:"0.5rem"}}>
          <MenuButtonIcon onClick={toggleDropdown}>{logo}</MenuButtonIcon>
          <MenuButtonLink onClick={toggleDropdown}>{title} </MenuButtonLink>
          </div>


          <div>
          <MenuButtonIconAgain onClick={toggleDropdown}
           style={{
            transform: dropdownOpen ? "rotate(90deg)" : "rotate(0deg)",
          }}
          ><IoIosArrowDropright />
          
          </MenuButtonIconAgain>
          </div>
          
          </MenuButtonMain>

          <MenuButtonOption>
         
          <AnimateHeight height={dropdownOpen ? "auto" : 0} duration={500}>    
          <div style={{ marginLeft: "10%" }}>{children}</div>
         </AnimateHeight>
  
          </MenuButtonOption>

        </MenuButtonDiv>



  )
}

export default MenuButtons