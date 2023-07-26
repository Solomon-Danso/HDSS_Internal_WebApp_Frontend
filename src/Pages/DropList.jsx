import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MenuButtonDiv,MenuButtonIcon,MenuButtonLink,MenuContainer,MenuButtonOptionLink, MenuButtonMain, MenuButtonOption } from '../Designs/Styles'
import AnimateHeight from 'react-animate-height';


const MenuButtons = ({logo, title, children}) => {
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState); // Toggle the value of dropdownOpen
  };





  return (

        <MenuButtonDiv>

          <MenuButtonMain>
          <MenuButtonIcon onClick={toggleDropdown}>{logo}</MenuButtonIcon>
          <MenuButtonLink onClick={toggleDropdown}>{title} </MenuButtonLink>
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